/* @flow */
/* eslint-disable max-len */

import assert from 'assert'
import type {
  AnyBaseAction, BaseAppState, BaseDispatchResult, BaseMiddleware,
  BaseStore,
} from '../../base.flow'
import type { CurrencyCode, MyDate, UID } from '../../const'
import {
  __undef, date0, debitStorageType, expenseCategoryType,
  expenseTransactionType,
} from '../../const'
import type {
  DbAccount, DbLiveAccount,
  FbsDatabaseState,
} from '../../entities/account/live/account.flowTypes'
import type {
  AStorage,
  DebitStorage, TransactionExpense,
  Transactions,
} from '../../entities/account/live/flowTypes'
import type {
  Categories, Category, CategoryTypes,
  Storages,
} from '../../entities/account/live/flowTypes'
import { appMountAC } from '../../modules/coreModule/coreAC'
import { dbModuleId } from '../../modules/dbModule/dbModuleId'
import type { DbModuleState } from '../../modules/dbModule/dbModuleReducer'
import { pickCurrencyDialogCurrencyPressedAC } from '../../modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { pickUserDoneBPAC } from '../../modules/globalDialogsModules/PickUserDialog/pickUserDialogAC'
import {
  loginScreenEmailChangedAC, loginScreenLoginButtonPressedAC,
  loginScreenPasswordChangedAC,
} from '../../modules/loginScreenModule/loginScreenAC'
import type { NavModuleState } from '../../modules/navModule/makeNavReducer'
import { navigateAC } from '../../modules/navModule/navAC'
import { navModuleId } from '../../modules/navModule/navModuleId'
import {
  currentRouteNameSelector,
} from '../../modules/navModule/selectors'
import { nowModuleId } from '../../modules/nowModule/nowModuleId'
import { nowSubscriptionSyncAC } from '../../modules/nowModule/nowSubscriptionAC'
import {
  registerScreenEmailChangedAC,
  registerScreenPasswordChangedAC, registerScreenRegisterButtonPressedAC,
  registerScreenRepeatPasswordChangedAC,
} from '../../modules/registerScreenModule/registerScreenAC'
import {
  registerScreenModuleId,
} from '../../modules/registerScreenModule/registerScreenModuleId'
import { RegisterScreenStatus } from '../../modules/registerScreenModule/registerScreenReducer'
import type { Session } from '../../modules/sessionModule/flowTypes'
import { sessionModuleId } from '../../modules/sessionModule/sessionModuleId'
import {
  SIDE_EFFECT_MANAGER_NEW_PROMISES,
  SIDE_EFFECT_PROMISE_RESOLVE_ERROR, sideEffectManagerOnPromiseDoneAC,
} from '../../modules/sideEffectManagerModule/sideEffectManagerAC'
import { makeStore } from '../../store/makeStore'
import {
  databaseAfterUserRegistration, testDatabaseIdentities,
  testMainUserUid,
} from '../../test/testData'
import { testGeoPosition } from '../../test/testData'
import { makeGuid } from '../../utils/makeGuid'

import {
  capitalizeFirstLetter, deepClone, findInMap, isDefined, keys,
  values,
} from '../../utils/utils'
import {
  asyncStorageRetrievePromiseResolveAfterAppInstall,
  asyncStorageRetrievePromiseResolveUserLoggedIn,
  asyncStoragePersistSessionPromiseResolve,
} from './promiseResolvers'

import type { AnyModule, AnyValue, MapV } from '../../global.flow'
import type {
  RegisterScreenState,
} from '../../modules/registerScreenModule/registerScreenReducer'
import {
  makeDbGetAccountEncryptionPromiseResolveNotEncrypted,
  makeDbGetLiveAccountPromiseResolveNewUser,
  makeDbGetVersionPromiseResolve, makeGeoPositionPromiseResolve, makePersonalDataPromiseResolve,
} from './promiseResolversMakers'
import { parseAmountStr, parseBalanceStr, parseDateTimeStr } from './utils'

const
  uiMode = !!process.env.UI,
  DEFAULT_ASYNC_DONE_WAIT_TIMEOUT_MS = 5000

type AsyncDispatch = (action: AnyBaseAction) => Promise<BaseDispatchResult<>>

interface IStore {
  +dispatch: AsyncDispatch,

  getState(): Promise<BaseAppState>
}

type StoreConstructorProps = {|
  databaseInitialState: FbsDatabaseState,
  testInitialDateTime: MyDate,
  addError: Error => any,
  onAction: (as: BaseAppState, a: AnyBaseAction) => void,
  extraModules: Array<AnyModule>,
  initialRouteName?: string,
|}

class ReduxStore implements IStore {
  _store: BaseStore
  _addError: (e: Error) => any

  constructor({
    addError, onAction, databaseInitialState, testInitialDateTime, extraModules, initialRouteName,
  }: StoreConstructorProps) {
    const
      testMiddleware: BaseMiddleware<> = (store) => next => a => {
        const as = store.getState()
        onAction(as, a)
        if (a.type === SIDE_EFFECT_PROMISE_RESOLVE_ERROR) {
          this._addError(a.error)
        }

        /* User actions can be dispatched only from current screen */
        if (a.type.indexOf('_BP') !== -1
          || a.type.indexOf('_PRESS') !== -1
          || a.type.indexOf('_CHANGED') !== -1) {
          const
            firstIndexOf_ = a.type.indexOf('_'),
            secondIndexOf_ = a.type.indexOf('_', firstIndexOf_ + 1),
            thirdIndexOf_ = a.type.indexOf('_', secondIndexOf_ + 1),
            actionRouteNameOneWord = capitalizeFirstLetter(
              a.type.substring(0, firstIndexOf_)
                .toLowerCase(),
            ),
            actionRouteNameTwoWords = actionRouteNameOneWord + capitalizeFirstLetter(
              a.type.substring(firstIndexOf_ + 1, secondIndexOf_)
                .toLowerCase(),
            ),
            actionRouteNameThreeWords = actionRouteNameTwoWords + capitalizeFirstLetter(
              a.type.substring(secondIndexOf_ + 1, thirdIndexOf_)
                .toLowerCase(),
            ),
            currentRouteName = currentRouteNameSelector(as.nav)

          if (
            currentRouteName !== actionRouteNameOneWord
            && currentRouteName !== actionRouteNameTwoWords
            && currentRouteName !== actionRouteNameThreeWords
            && a.type.toUpperCase()
              .indexOf('DIALOG') === -1
          ) {
            throw new Error(`Action ${a.type} can't be dispatched from ${currentRouteName} route`)
          }
        }

        return next(a)
      }

    const
      { store } = makeStore({
        middlewares: [testMiddleware],
        appConf: {
          testDatabaseInitialState: databaseInitialState,
          testDatabaseIdentities,
          testInitialDateTime,
          initialRouteName,
        },
        modules: extraModules,
        onError: (error) => addError(error),
      })
    this._store = store
    this._addError = addError
  }

  dispatch(a: AnyBaseAction) {
    const dispatchResult = this._store.dispatch(a)
    if (dispatchResult.error) {
      this._addError(dispatchResult.error)
    }
    return Promise.resolve(dispatchResult)
  }

  getState() {
    return Promise.resolve(this._store.getState())
  }
}

class UiStore implements IStore {
  _addError: (e: Error) => any

  constructor({ addError }: StoreConstructorProps) {
    this._addError = addError
  }

  dispatch(a: AnyBaseAction) {
    return Promise.resolve({ dispatchedActions: [a], promises: [], subscriptions: [] })
  }

  getState() {
    return Promise.reject('todo UiStore getState')
  }
}

export type PromiseResolveConf<P> = {|
  expectedProps: P,
  action: AnyBaseAction,
  assertAppState?: (BaseAppState) => any,
  shouldDispatchActionInsteadOfExpect?: true,
|}

export class BaseDriver {
  _world: BaseTestWorld
  _store: IStore
  _dispatch: AsyncDispatch
  _promiseResolveConfsMap: MapV<Array<PromiseResolveConf<any>>>
  _isReadyToDispatchUserActions: bool
  _asyncActionsWaitMap: MapV<AnyBaseAction>
  _waitAsyncOpDoneResolver: null | () => void
  _addError: (error: Error) => void
  _uid: UID
  _databaseInitialState: FbsDatabaseState
  _testInitialDateTime: MyDate

  constructor(world: BaseTestWorld) {
    this._world = world
    this._promiseResolveConfsMap = {}
    this._isReadyToDispatchUserActions = false
    this._asyncActionsWaitMap = {}
    this._waitAsyncOpDoneResolver = null
    this._testInitialDateTime = date0
    const
      addError = world.addError.bind(world),
      addErrorIfDispatchFail = ({ error }) => {
        if (error) {
          addError(error)
        }
      },
      driver = this
    this._uid = testMainUserUid

    this._addError = addError
    this._databaseInitialState = deepClone(databaseAfterUserRegistration)

    const initStore = () => {
      this._store = new (uiMode ? UiStore : ReduxStore)({
        initialRouteName: world._initialRouteName,
        extraModules: world._extraModules,
        databaseInitialState: this._databaseInitialState,
        testInitialDateTime: this._testInitialDateTime,
        addError,
        onAction: (as: BaseAppState, a: AnyBaseAction) => {
          if (a.type === SIDE_EFFECT_MANAGER_NEW_PROMISES) {
            const { propsMap } = a
            Object.keys(propsMap)
              .forEach(promiseId => {
                const
                  promiseProps = propsMap[promiseId].props,
                  confArrForType = driver._promiseResolveConfsMap[promiseProps.type]

                if (!confArrForType) {
                  throw Error(`Expected resolver for promise type: "${promiseProps.type}"`)
                }
                const
                  conf = confArrForType.shift()

                if (conf) {
                  const { expectedProps, action, assertAppState } = conf

                  if (promiseProps.type !== expectedProps.type) {
                    throw Error(
                      `Expected promise type: "${expectedProps.type}" but got "${promiseProps.type}"`,
                    )
                    // fail test
                  }

                  assert.deepEqual(promiseProps, expectedProps, 'promise props should be equal')

                  if (assertAppState) {
                    assertAppState(as)
                  }

                  if (driver._promiseResolveConfsMap[promiseProps.type].length === 0) {
                    delete driver._promiseResolveConfsMap[promiseProps.type]
                  }

                  if (conf.shouldDispatchActionInsteadOfExpect) {
                    driver._dispatch(action)
                      .then(addErrorIfDispatchFail)

                    driver._dispatch(sideEffectManagerOnPromiseDoneAC(promiseId))
                      .then(addErrorIfDispatchFail)
                  } else {
                    driver._asyncActionsWaitMap[action.type] = action
                  }
                } else {
                  throw Error(`Expected resolver for promise type: "${promiseProps.type}"`)
                }
              })
          }

          if (driver._asyncActionsWaitMap[a.type]) {
            const expectedAction = driver._asyncActionsWaitMap[a.type]

            assert.deepEqual(
              a,
              expectedAction,
              `Expected async action ${a.type} arrived, but has wrong payload`,
            )

            delete driver._asyncActionsWaitMap[a.type]
            if (
              keys(driver._asyncActionsWaitMap).length === 0
              && driver._waitAsyncOpDoneResolver
              && keys(driver._promiseResolveConfsMap).length === 0
            ) {
              driver._waitAsyncOpDoneResolver();
              driver._waitAsyncOpDoneResolver = null;
            }
          }
        },
      })
    }


    let storeDispatch;
    this._dispatch = async (a) => {
      if (!this._store) {
        initStore()
        storeDispatch = this._store.dispatch.bind(this._store)
      }
      await this.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()
      return storeDispatch(a)
    }
  }

  onStepEnd() {
    if (keys(this._promiseResolveConfsMap).length > 0) {
      this._addError(new Error(`${values(this._promiseResolveConfsMap)[0][0].expectedProps.type} promise is expected but was not triggered by code`)) // eslint-disable-line max-len
    }
  }

  shouldWaitAsyncOpDone() {
    return keys(this._asyncActionsWaitMap).length > 0
  }

  async _getAppState() {
    await this.startAppAfterUserLoggedInInLastSessionIfStoreNotReady();
    const appState: BaseAppState = await this._store.getState()

    return appState;
  }

  async _getModuleState(moduleId: string) {
    const appState: BaseAppState = await this._getAppState()

    return appState[(moduleId: any)]
  }

  async waitAsyncOpDone() {
    if (this._waitAsyncOpDoneResolver) {
      throw new Error('_waitAsyncOfDoneResolver is already set')
    }
    const timeoutId = setTimeout(() => {
      const actionNames = keys(this._asyncActionsWaitMap)
        .join(', ')
      this._world.addError(new Error(`Wait for async actions: "${actionNames} timeout."`))
      if (!this._waitAsyncOpDoneResolver) {
        throw new Error('this._waitAsyncOpDoneResolver is null in setTimeout')
      }
      this._waitAsyncOpDoneResolver()
    }, DEFAULT_ASYNC_DONE_WAIT_TIMEOUT_MS)
    return new Promise(resolve => {
      this._waitAsyncOpDoneResolver = resolve
    }).then(() => clearTimeout(timeoutId))
  }

  addPromiseResolveConf(conf: PromiseResolveConf<any>) {
    if (!this._promiseResolveConfsMap[conf.expectedProps.type]) {
      this._promiseResolveConfsMap[conf.expectedProps.type] = []
    }
    this._promiseResolveConfsMap[conf.expectedProps.type].push(conf)
  }

  _getTestUid() {
    return testMainUserUid
  }

  _mutateTestUserInitialAccount(mutator: (dbAccount: DbAccount) => void) {
    mutator(this._databaseInitialState.accounts[this._getTestUid()])
  }

  _mutateMainUserInitialLiveAccount(mutator: (liveAccount: DbLiveAccount) => void) {
    this._mutateTestUserInitialAccount((dbAccount: DbAccount) => mutator(dbAccount.live))
  }

  _mutateMainUserInitialLiveAccountCategories(mutator: (categories: Categories) => void) {
    this._mutateMainUserInitialLiveAccount((liveAccount: DbLiveAccount) => {
      if (!liveAccount.categories) {
        liveAccount.categories = {}
      }
      mutator(liveAccount.categories)
    })
  }

  _mutateMainUserInitialLiveAccountStorages(mutator: (storages: Storages) => void) {
    this._mutateMainUserInitialLiveAccount((liveAccount: DbLiveAccount) => {
      if (!liveAccount.storages) {
        liveAccount.storages = {}
      }
      mutator(liveAccount.storages)
    })
  }

  _mutateMainUserInitialLiveAccountTransactions(mutator: (transactions: Transactions) => void) {
    this._mutateMainUserInitialLiveAccount((liveAccount: DbLiveAccount) => {
      if (!liveAccount.transactions) {
        liveAccount.transactions = {}
      }
      mutator(liveAccount.transactions)
    })
  }

  addInitialCategory(categoryTitle: string, categoryType?: CategoryTypes = expenseCategoryType) {
    this._mutateMainUserInitialLiveAccountCategories((categories: Categories) => {
      const newCategory: Category = {
        id: makeGuid(),
        type: categoryType,
        parentId: __undef,
        isHidden: false,
        title: categoryTitle,
      }
      categories[newCategory.id] = newCategory
    })
  }

  addInitialDebitStorage({ storageTitle, storageInitialBalanceStr, hidden = false }: {| storageTitle: string, storageInitialBalanceStr: string, hidden?: true |}) {
    this._mutateMainUserInitialLiveAccountStorages((storages: Storages) => {
      const newStorage: DebitStorage = {
        type: debitStorageType,
        id: makeGuid(),
        title: storageTitle,
        hidden,
        showInSecureMode: true,
        initialBalance: parseBalanceStr(storageInitialBalanceStr),
        uid: makeGuid(),
      }
      storages[newStorage.id] = newStorage
    })
  }

  _getMainUserAccount(): DbAccount {
    const
      { accounts } = this._databaseInitialState,
      mainUserAccount = accounts[testMainUserUid]

    if (!mainUserAccount) {
      throw new Error('mainUserAccount not found in database initial state')
    }

    return mainUserAccount
  }

  _getInitialStorage(storageTitle: string): AStorage {
    const
      { live: { storages = {} } } = this._getMainUserAccount(),
      storage = values(storages)
        .find(({ title }) => title === storageTitle)

    if (!storage) {
      throw new Error(`Storage ${storageTitle} not found in initial database state`)
    }

    return storage
  }

  _getInitialStorageId(storageTitle: string) {
    return this._getInitialStorage(storageTitle).id
  }

  getInitialCategory(categoryTitle: string) {
    const
      { live: { categories = {} } } = this._getMainUserAccount(),
      category = values(categories)
        .find(({ title }) => title === categoryTitle)

    if (!category) {
      throw new Error(`Category ${categoryTitle} not found in initial database state`)
    }

    return category
  }

  _getInitialCategoryId(categoryTitle: string) {
    return this.getInitialCategory(categoryTitle).id
  }

  addInitialExpenseTransaction({
    transactionTitle,
    storageTitle,
    categoryTitle,
    amountStr,
    dateTimeStr,
  }: {|
    transactionTitle: string,
    storageTitle: string,
    categoryTitle: string,
    amountStr: string,
    dateTimeStr: string
  |}) {
    this._mutateMainUserInitialLiveAccountTransactions((tranactions: Transactions) => {
      const
        { amount, currencyCode } = parseAmountStr(amountStr),
        date = parseDateTimeStr(dateTimeStr),
        newTransaction: TransactionExpense = {
          id: makeGuid(),
          comment: transactionTitle,
          currencyCode,
          value: amount,
          date,
          tags: [],
          uid: this._getTestUid(),
          type: 'expense',
          storageIdFrom: this._getInitialStorageId(storageTitle),
          categoryId: this._getInitialCategoryId(categoryTitle),
        }

      tranactions[newTransaction.id] = newTransaction
    })
  }

  async startAppAfterInstall() {
    this.addPromiseResolveConf(makeGeoPositionPromiseResolve(testGeoPosition))
    this.addPromiseResolveConf(asyncStorageRetrievePromiseResolveAfterAppInstall)

    this._isReadyToDispatchUserActions = true
    await this._dispatch(appMountAC())
  }

  async startAppAfterUserLoggedInInLastSessionIfStoreNotReady() {
    if (!this._isReadyToDispatchUserActions) {
      // begin step was not provided in scenario, because it does not matter for that scenario
      // so we will initialize initial app state as "Logged in, new account"
      await this.startAppAfterUserLoggedInInLastSession()
    }
  }

  async startAppAfterUserLoggedInInLastSession() {
    this.addPromiseResolveConf(makeGeoPositionPromiseResolve(testGeoPosition))
    this.addPromiseResolveConf(asyncStorageRetrievePromiseResolveUserLoggedIn)
    this.mockLoginPromisesToDefaults()

    this._isReadyToDispatchUserActions = true
    await this._dispatch(appMountAC())
    if (this.shouldWaitAsyncOpDone()) {
      await this.waitAsyncOpDone()
    }
  }

  async navigateToRegisterPage() {
    await this._dispatch(navigateAC({ routeName: 'Register' }))
  }

  async _getRegisterScreenModuleState() {
    const
      s: RegisterScreenState = await this._getModuleState(registerScreenModuleId)

    return s
  }

  async _getNavModuleState() {
    const
      s: NavModuleState = await this._getModuleState(navModuleId)

    return s
  }

  async _getDbModuleState() {
    const
      s: DbModuleState = await this._getModuleState(dbModuleId)

    return s
  }

  async _getSessionModuleState() {
    const
      s: Session = await this._getModuleState(sessionModuleId)

    return s
  }

  async _getPickUserDialogModuleState() {
    const appState: BaseAppState = await this._getAppState()

    return appState.pickUserDialog
  }

  async _getPickCurrencyDialogModuleState() {
    const appState: BaseAppState = await this._getAppState()

    return appState.pickCurrencyDialog
  }

  async _getTestModuleState() {
    const appState: BaseAppState = await this._getAppState()

    return appState.test
  }

  async getUidByName(name: string) {
    const {
      deps: {
        users,
        personalData: { name: personalName },
        session: { uid },
      },
    } = await this._getTestModuleState()

    if (name === personalName) {
      return uid
    }
    for (const uid in users) { // eslint-disable-line no-restricted-syntax
      if (users[uid].name === name) {
        return uid
      }
    }
    throw new Error(`User with name ${name} not found`)
  }

  async getCategoryByTitle(title: string) {
    const { deps: { categories } } = await this._getTestModuleState()

    const category = findInMap(categories, c => c.title === title)

    if (!category) {
      throw new Error(`Category ${title} not found in Overview screen dependencies`)
    }

    return category
  }

  async getStorageByTitle(title: string) {
    const { deps: { storages } } = await this._getTestModuleState()

    const storage = findInMap(storages, c => c.title === title)

    if (!storage) {
      throw new Error(`Storage ${title} not found in Overview screen deps`)
    }

    return storage
  }

  async getFirstStorage() {
    const { deps: { storages } } = await this._getTestModuleState()

    const storage = values(storages)[0]

    if (!storage) {
      throw new Error("Can't get first storage from Overview screen deps. There is no any")
    }

    return storage
  }

  async getFirstStorageId() {
    const storage = await this.getFirstStorage()

    return storage.id
  }

  async getStorageIdByTitle(title: string) {
    await this.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()
    const storage = await this.getStorageByTitle(title)

    return storage.id
  }

  async getCategoryIdByTitle(title: string) {
    const category = await this.getCategoryByTitle(title)

    return category.id
  }

  async getUid() {
    const { uid } = await this._getSessionModuleState()

    return uid
  }

  async getNow() {
    const now = await await this._getModuleState(nowModuleId)

    return now
  }

  async setInitialDateTime(dateTimeStr: string) {
    this._testInitialDateTime = parseDateTimeStr(dateTimeStr)
  }

  async setNow(dateTimeStr: string) {
    const now = parseDateTimeStr(dateTimeStr)
    await this._dispatch(nowSubscriptionSyncAC(now))
  }

  async registerScreenEnterEmail(email: string) {
    await this._dispatch(registerScreenEmailChangedAC(email))
  }

  async registerScreenEnterPassword(password: string) {
    await this._dispatch(registerScreenPasswordChangedAC(password))
  }

  async registerScreenEnterRepeatPassword(repeatPassword: string) {
    await this._dispatch(registerScreenRepeatPasswordChangedAC(repeatPassword))
  }

  async registerScreenPressRegisterButton() {
    await this._dispatch(registerScreenRegisterButtonPressedAC())
  }

  async registerScreenAssertRegistrationSuccessful() {
    const s: RegisterScreenState = await this._getRegisterScreenModuleState()
    const { status } = s

    assert.equal(status, RegisterScreenStatus.success, 'status should be success')
  }

  async loginScreenEnterEmail(email: string) {
    await this._dispatch(loginScreenEmailChangedAC(email))
  }

  async loginScreenEnterPassword(password: string) {
    await this._dispatch(loginScreenPasswordChangedAC(password))
  }

  async loginScreenPressLoginButton() {
    await this._dispatch(loginScreenLoginButtonPressedAC())
  }

  async pickCurrencyDialogPressOnCurrency(currencyCode: CurrencyCode) {
    const
      { computed: { currencies } } = await this._getPickCurrencyDialogModuleState(),
      currencyData = currencies.find(({ currencyCode }) => currencyCode)

    if (!currencyData) {
      throw new Error(`Can't press on ${currencyCode} in pick currency dialog, it's not there`)
    }

    await this._dispatch(pickCurrencyDialogCurrencyPressedAC(currencyCode))
  }

  async pickUserDialogSelectOption(label: string) {
    const uid = await this.getUidByName(label)
    await this._dispatch(pickUserDoneBPAC(uid))
  }

  /* ASSERTS*/

  async assertCurrentScreenName(screenName: string) {
    const
      nav = await this._getNavModuleState(),
      currentRoute = currentRouteNameSelector(nav)

    assert.equal(currentRoute, screenName, 'assertCurrentScreenName')
  }

  async assertExpenseTransactionExistOnDbLayer({
    transactionTitle,
    storageTitle,
    categoryTitle,
    amountStr,
  }: {
    transactionTitle: string,
    storageTitle: string,
    categoryTitle: string,
    amountStr: string
  }) {
    const
      { deps: { liveTransactions } } = await this._getDbModuleState(),
      transaction = values(liveTransactions)
        .find(t => t.comment === transactionTitle)

    if (!transaction) {
      throw new Error(`Transaction with comment ${transactionTitle} not found`)
    }

    if (transaction.type !== expenseTransactionType) {
      throw new Error(`Transaction ${transactionTitle} type should be expense`)
    }

    const
      { deps: { storages, categories } } = await this._getTestModuleState(),
      storage = values(storages)
        .find(s => s.id === transaction.storageIdFrom),
      category = values(categories)
        .find(c => c.id === transaction.categoryId)

    if (!storage) {
      throw new Error(`Storage with id ${transaction.storageIdFrom} not found, referenced from transaction ${transactionTitle}`)
    }

    if (!category) {
      throw new Error(`Category with id ${transaction.categoryId} not found, referenced from transaction ${transactionTitle}`)
    }

    assert.equal(storage.title, storageTitle, 'storage title should match')
    assert.equal(category.title, categoryTitle, 'storage title should match')

    const { amount, currencyCode } = parseAmountStr(amountStr)

    assert.equal(amount, transaction.value, 'amount should match')
    assert.equal(currencyCode, transaction.currencyCode, 'currencyCode should match')
  }

  async globalDialogsAssertUserDialogOpened({ options }: { options: Array<string> }) {
    const { opened, computed: { values } } = await this._getPickUserDialogModuleState()

    assert.equal(opened, true, 'Pick user dialog should be opened')
    assert.equal(values.length,
      options.length,
      `Pick user dialog should have ${options.length} options`)

    options.forEach((o, i) => {
      assert.equal(values[i].label, o, `Pick user dialog options index ${i} should match`)
      /* TODO 5 MFG-11 assert value as well */
    })
  }

  mockLoginPromisesToDefaults() {
    const
      personalData = this._databaseInitialState.personalData[this._uid],
      maUid = personalData && isDefined(personalData.maUid) ? personalData.maUid : this._uid
    this.addPromiseResolveConf(makePersonalDataPromiseResolve({
      personalData: this._databaseInitialState.personalData[this._uid],
      uid: this._uid,
    }))
    this.addPromiseResolveConf(asyncStoragePersistSessionPromiseResolve)
    this.addPromiseResolveConf(makeDbGetVersionPromiseResolve({ maUid }))
    this.addPromiseResolveConf(makeDbGetAccountEncryptionPromiseResolveNotEncrypted({ maUid }))
    this.addPromiseResolveConf(makeDbGetLiveAccountPromiseResolveNewUser({
      account: this._databaseInitialState.accounts[maUid].live,
      maUid,
    }))
  }
}

class BaseTestWorld {
  _contextData: Object
  _extraModules: Array<AnyModule>
  _initialRouteName: string
  _uiMode: boolean
  driver: $Subtype<BaseDriver>
  errors: Array<Error>

  constructor(ctx: any,
    Driver: Class<BaseDriver> = BaseDriver,
    extraModules: Array<AnyModule> = [],
    initialRouteName: string = 'Overview') {
    this._contextData = {}
    this._uiMode = uiMode
    this.errors = []
    this._extraModules = extraModules
    this._initialRouteName = initialRouteName
    this.driver = new Driver(this)
  }

  getDriverClass() {
    return BaseDriver;
  }

  setContextData(key: string, value: AnyValue) {
    if (this._contextData[key]) throw new Error(`Context data value by key '${key}' is already set`)
    this._contextData[key] = value
    return value
  }

  getContextData(key: string) {
    if (this._contextData[key] === undefined) {
      throw new Error(`Missing context data value by key '${key}'`)
    }
    return this._contextData[key]
  }

  addError(e: Error) {
    this.errors.push(e)
  }

  getContextDataOptional(key: string) {
    return this._contextData[key]
  }
}

export {
  BaseTestWorld,
}
