/* @flow */

/* eslint-disable max-len */

import { __undef } from 'mfg-base/const'
import type { BaseModulePromiseMaker } from '../../base.flow'
import { date0 } from '../../const'
import { transactionsBalanceSelector } from '../../entities/account/live/accountSelectors'
import { strings } from '../../localization'
import { onError } from '../../reportError'
import {
  assocPath, defaultTo, filterObj, I, keys, merge, path, pipe,
  values,
} from '../../utils/utils'
import { makeCrypt } from '../cryptScreenModule/cryptScreenMiddleware'
import {
  dbArchiveTransactionsDoneAC, dbArchiveTransactionsFailAC,
  dbAuthFailAC, dbAuthSuccessAC, dbDeleteTransactionDoneAC, dbRegisterFailAC, dbRegisterSuccessAC,
  dbSendBackupDoneAC, dbUpdateTransactionDoneAC, dbUpdateBackupEmailDoneAC, dbUpdateCategoryDoneAC,
  dbUpdatePreferencesDoneAC, dbUpdateStorageDoneAC, dbUpdateCurrencyCodeDoneAC,
  updateStorageHiddenDoneAC, DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE,
  dbUpdatePersonalNameDoneAC, dbUpdateSortDoneAC, deleteCategoryPlanDoneAC,
  updateCategoryPlanDoneAC, dbUpdatePlannedTransactionDoneAC,
  dbEndPrevPlannedTransactionAndCreateNewDoneAC,
  dbUpdatePlannedTransactionsPeriodOverrideDoneAC, dbUpdatePlannedTransactionDeletedPeriodsDoneAC,
  dbDeletePlannedTransactionDoneAC, dbUpdatePlannedTransactionEndDateDoneAC,
  dbGetPersonalDataDoneAC, dbGetAccountVersionDoneAC,
  dbGetAccountEncryptionStatusDoneAC, dbGetLiveAccountDoneAC,
} from './dbAC'
import { getDbModuleState } from './getDbModuleState'

import type { Preferences } from '../../entities/personalData/personalData.flow'
import type { AnyValue } from '../../global.flow'
import type {
  AStorage, Category, PlannedTransaction,
  Transaction,
} from '../../entities/account/live/flowTypes'
import type {
  DeleteCategoryPlanProps, EmailPasswordProps, EndPrevPlannedTransactionAndCreateNewProps,
  UpdateCategoryPlanProps,
  UpdateCategoryProps, UpdatePlannedTransactionDeletedPeriodsProps,
  UpdatePlannedTransactionEndDateProps,
  UpdatePlannedTransactionsPeriodOverrideProps, UpdateSortProps,
  UpdateStorageHiddenProps,
  UpdateStorageShowInSecureModeProps,
} from './dbAC'
import type { CurrencyCode, EMAIL, MyDate, TransactionId, UID } from '../../const'
import type { FbsApp } from './fbs.flow'

export const
  DB_AUTH_EMAIL_PASSWORD_PROMISE: 'DB_AUTH_EMAIL_PASSWORD_PROMISE' =
    'DB_AUTH_EMAIL_PASSWORD_PROMISE',
  DB_REGISTER_EMAIL_PASSWORD_PROMISE: 'DB_REGISTER_EMAIL_PASSWORD_PROMISE' =
    'DB_REGISTER_EMAIL_PASSWORD_PROMISE',
  DB_UPDATE_PREFERENCES_PROMISE: 'DB_UPDATE_PREFERENCES_PROMISE' =
    'DB_UPDATE_PREFERENCES_PROMISE',
  DB_DELETE_TRANSACTION_PROMISE: 'DB_DELETE_TRANSACTION_PROMISE' =
    'DB_DELETE_TRANSACTION_PROMISE',
  DB_ARCHIVE_TRANSACTIONS_PROMISE: 'DB_ARCHIVE_TRANSACTIONS_PROMISE' =
    'DB_ARCHIVE_TRANSACTIONS_PROMISE',
  DB_SEND_BACKUP_PROMISE: 'DB_SEND_BACKUP_PROMISE' =
    'DB_SEND_BACKUP_PROMISE',
  DB_UPDATE_BACKUP_EMAIL_PROMISE: 'DB_UPDATE_BACKUP_EMAIL_PROMISE' =
    'DB_UPDATE_BACKUP_EMAIL_PROMISE',
  DB_UPDATE_CATEGORY_PROMISE: 'DB_UPDATE_CATEGORY_PROMISE' =
    'DB_UPDATE_CATEGORY_PROMISE',
  DB_UPDATE_STORAGE_PROMISE: 'DB_UPDATE_STORAGE_PROMISE' =
    'DB_UPDATE_STORAGE_PROMISE',
  DB_UPDATE_TRANSACTION_PROMISE: 'DB_UPDATE_TRANSACTION_PROMISE' =
    'DB_UPDATE_TRANSACTION_PROMISE',
  DB_UPDATE_CURRENCY_CODE_PROMISE: 'DB_UPDATE_CURRENCY_CODE_PROMISE' =
    'DB_UPDATE_CURRENCY_CODE_PROMISE',
  DB_UPDATE_STORAGE_HIDDEN_PROMISE: 'DB_UPDATE_STORAGE_HIDDEN_PROMISE' =
    'DB_UPDATE_STORAGE_HIDDEN_PROMISE',
  DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_PROMISE: 'DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_PROMISE' =
    'DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_PROMISE',
  DB_UPDATE_PERSONAL_NAME_PROMISE: 'DB_UPDATE_PERSONAL_NAME_PROMISE' =
    'DB_UPDATE_PERSONAL_NAME_PROMISE',
  DB_UPDATE_SORT_PROMISE: 'DB_UPDATE_SORT_PROMISE' =
    'DB_UPDATE_SORT_PROMISE',
  DB_DELETE_CATEGORY_PLAN_PROMISE: 'DB_DELETE_CATEGORY_PROMISE' = 'DB_DELETE_CATEGORY_PROMISE',
  DB_UPDATE_CATEGORY_PLAN_PROMISE: 'DB_UPDATE_CATEGORY_PLAN_PROMISE' =
    'DB_UPDATE_CATEGORY_PLAN_PROMISE',
  DB_UPDATE_PLANNED_TRANSACTION_PROMISE: 'DB_UPDATE_PLANNED_TRANSACTION_PROMISE' =
    'DB_UPDATE_PLANNED_TRANSACTION_PROMISE',
  DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_PROMISE: 'DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_PROMISE' =
    'DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_PROMISE',
  DB_UPDATE_PLANNED_TRANSACTIONS_PERIOD_OVERRIDE_PROMISE: 'DB_UPDATE_PLANNED_TRANSACTIONS_PERIOD_OVERRIDE_PROMISE' =
    'DB_UPDATE_PLANNED_TRANSACTIONS_PERIOD_OVERRIDE_PROMISE',
  DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_PROMISE: 'DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_PROMISE' =
    'DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_PROMISE',
  DB_DELETE_PLANNED_TRANSACTION_PROMISE: 'DB_DELETE_PLANNED_TRANSACTION_PROMISE' =
    'DB_DELETE_PLANNED_TRANSACTION_PROMISE',
  DB_UPDATE_PLANNED_TRANSACTION_END_DATE_PROMISE: 'DB_UPDATE_PLANNED_TRANSACTION_END_DATE_PROMISE' =
    'DB_UPDATE_PLANNED_TRANSACTION_END_DATE_PROMISE',
  DB_GET_PERSONAL_DATA_PROMISE: 'DB_GET_PERSONAL_DATA_PROMISE' =
    'DB_GET_PERSONAL_DATA_PROMISE',
  DB_GET_ACCOUNT_VERSION_PROMISE: 'DB_GET_ACCOUNT_VERSION_PROMISE' =
    'DB_GET_ACCOUNT_VERSION_PROMISE',
  DB_GET_ACCOUNT_ENCRYPTION_STATUS_PROMISE: 'DB_GET_ACCOUNT_ENCRYPTION_STATUS_PROMISE' =
    'DB_GET_ACCOUNT_ENCRYPTION_STATUS_PROMISE',
  DB_GET_LIVE_ACCOUNT_PROMISE: 'DB_GET_LIVE_ACCOUNT_PROMISE' =
    'DB_GET_LIVE_ACCOUNT_PROMISE'

export type DbAuthEmailPasswordPromiseProps = {|
  type: typeof DB_AUTH_EMAIL_PASSWORD_PROMISE,
  ...EmailPasswordProps,
|}

export type DbRegisterEmailPasswordPromiseProps = {|
  type: typeof DB_REGISTER_EMAIL_PASSWORD_PROMISE,
  ...EmailPasswordProps,
|}

export type DbUpdatePreferencesPromiseProps = {|
  type: typeof DB_UPDATE_PREFERENCES_PROMISE,
  preferencesToUpdate: Preferences,
|}

export type DbDeleteTransactionPromiseProps = {|
  type: typeof DB_DELETE_TRANSACTION_PROMISE,
  transactionId: TransactionId,
|}

export type DbArchiveTransactionsPromiseProps = {|
  type: typeof DB_ARCHIVE_TRANSACTIONS_PROMISE,
  borderDate: MyDate,
|}

export type DbSendBackupPromiseProps = {|
  type: typeof DB_SEND_BACKUP_PROMISE,
  backupEmail: EMAIL,
|}

export type DbUpdateBackupEmailPromiseProps = {|
  type: typeof DB_UPDATE_BACKUP_EMAIL_PROMISE,
  backupEmail: EMAIL,
|}

export type DbUpdateCategoryPromiseProps = {|
  type: typeof DB_UPDATE_CATEGORY_PROMISE,
  ...UpdateCategoryProps
|}

export type DbUpdateStoragePromiseProps = {|
  type: typeof DB_UPDATE_STORAGE_PROMISE,
  storage: AStorage,
|}

export type DbUpdateTransactionPromiseProps = {|
  type: typeof DB_UPDATE_TRANSACTION_PROMISE,
  transaction: Transaction,
|}

export type DbUpdateCurrencyCodePromiseProps =
  ({ type: typeof DB_UPDATE_CURRENCY_CODE_PROMISE, currencyCode: CurrencyCode })

export type DbUpdateStorageHiddenPromiseProps = {|
  type: typeof DB_UPDATE_STORAGE_HIDDEN_PROMISE,
  ...UpdateStorageHiddenProps,
|}

export type DbUpdateStorageShowInSecureModePromiseProps = {|
  type: typeof DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_PROMISE,
  ...UpdateStorageShowInSecureModeProps,
|}

export type DbUpdatePersonalNamePromiseProps = {|
  type: typeof DB_UPDATE_PERSONAL_NAME_PROMISE,
  name: string,
|}

export type DbUpdateSortPromiseProps = {|
  type: typeof DB_UPDATE_SORT_PROMISE,
  ...UpdateSortProps,
|}

export type DbDeleteCategoryPlanPromiseProps = {|
  type: typeof DB_DELETE_CATEGORY_PLAN_PROMISE,
  ...DeleteCategoryPlanProps,
|}

export type DbUpdateCategoryPlanPromiseProps = {|
  type: typeof DB_UPDATE_CATEGORY_PLAN_PROMISE,
  ...UpdateCategoryPlanProps,
|}

export type DbUpdatePlannedTransactionPromiseProps = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_PROMISE,
  plannedTransaction: PlannedTransaction,
|}

export type DbEndPrevPlannedTransactionAndCreateNewPromiseProps = {|
  type: typeof DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_PROMISE,
  ...EndPrevPlannedTransactionAndCreateNewProps,
|}

export type DbUpdatePlannedTransactionsPeriodOverridePromiseProps = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTIONS_PERIOD_OVERRIDE_PROMISE,
  ...UpdatePlannedTransactionsPeriodOverrideProps
|}

export type DbUpdatePlannedTransactionDeletedPeriodsPromiseProps = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_PROMISE,
  ...UpdatePlannedTransactionDeletedPeriodsProps,
|}

export type DbDeletePlannedTransactionPromiseProps = {|
  type: typeof DB_DELETE_PLANNED_TRANSACTION_PROMISE,
  transactionId: TransactionId,
|}

export type DbUpdatePlannedTransactionEndDatePromiseProps = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_END_DATE_PROMISE,
  ...UpdatePlannedTransactionEndDateProps,
|}

export type DbGetPersonalDataPromiseProps = {|
  type: typeof DB_GET_PERSONAL_DATA_PROMISE,
|}

export type DbGetAccountVersionPromiseProps = {|
  type: typeof DB_GET_ACCOUNT_VERSION_PROMISE,
|}

export type DbGetAccountEncryptionStatusPromiseProps = {|
  type: typeof DB_GET_ACCOUNT_ENCRYPTION_STATUS_PROMISE,
|}

export type DbGetLiveAccountPromiseProps = {|
  type: typeof DB_GET_LIVE_ACCOUNT_PROMISE,
|}

export type AnyDbPromiseMakerProps =
  DbAuthEmailPasswordPromiseProps
  | DbRegisterEmailPasswordPromiseProps
  | DbUpdatePreferencesPromiseProps
  | DbDeleteTransactionPromiseProps
  | DbArchiveTransactionsPromiseProps
  | DbSendBackupPromiseProps
  | DbUpdateBackupEmailPromiseProps
  | DbUpdateCategoryPromiseProps
  | DbUpdateStoragePromiseProps
  | DbUpdateTransactionPromiseProps
  | DbUpdateCurrencyCodePromiseProps
  | DbUpdateStorageHiddenPromiseProps
  | DbUpdateStorageShowInSecureModePromiseProps
  | DbUpdatePersonalNamePromiseProps
  | DbUpdateSortPromiseProps
  | DbDeleteCategoryPlanPromiseProps
  | DbUpdateCategoryPlanPromiseProps
  | DbUpdatePlannedTransactionPromiseProps
  | DbEndPrevPlannedTransactionAndCreateNewPromiseProps
  | DbUpdatePlannedTransactionsPeriodOverridePromiseProps
  | DbUpdatePlannedTransactionDeletedPeriodsPromiseProps
  | DbDeletePlannedTransactionPromiseProps
  | DbUpdatePlannedTransactionEndDatePromiseProps
  | DbGetPersonalDataPromiseProps
  | DbGetAccountVersionPromiseProps
  | DbGetAccountEncryptionStatusPromiseProps
  | DbGetLiveAccountPromiseProps

export const
  dbRegisterEmailPasswordPC =
    ({ email, password }: EmailPasswordProps): DbRegisterEmailPasswordPromiseProps =>
      ({ type: DB_REGISTER_EMAIL_PASSWORD_PROMISE, email, password }),
  dbAuthEmailPasswordPC =
    ({ email, password }: EmailPasswordProps): DbAuthEmailPasswordPromiseProps =>
      ({ type: DB_AUTH_EMAIL_PASSWORD_PROMISE, email, password }),
  dbUpdatePreferencesPC = (preferencesToUpdate: Preferences): DbUpdatePreferencesPromiseProps =>
    ({ type: DB_UPDATE_PREFERENCES_PROMISE, preferencesToUpdate }),
  dbDeleteTransactionPC = (transactionId: TransactionId): DbDeleteTransactionPromiseProps =>
    ({ type: DB_DELETE_TRANSACTION_PROMISE, transactionId }),
  dbArchiveTransactionsPC = (borderDate: MyDate): DbArchiveTransactionsPromiseProps =>
    ({ type: DB_ARCHIVE_TRANSACTIONS_PROMISE, borderDate }),
  dbSendBackupPC = (backupEmail: EMAIL): DbSendBackupPromiseProps =>
    ({ type: DB_SEND_BACKUP_PROMISE, backupEmail }),
  dbUpdateBackupPC = (backupEmail: EMAIL): DbUpdateBackupEmailPromiseProps =>
    ({ type: DB_UPDATE_BACKUP_EMAIL_PROMISE, backupEmail }),
  dbUpdateCategoryPC = (category: Category): DbUpdateCategoryPromiseProps =>
    ({ type: DB_UPDATE_CATEGORY_PROMISE, category }),
  dbUpdateStoragePC = (storage: AStorage): DbUpdateStoragePromiseProps =>
    ({ type: DB_UPDATE_STORAGE_PROMISE, storage }),
  dbUpdateCurrencyCodePC = (currencyCode: CurrencyCode): DbUpdateCurrencyCodePromiseProps =>
    ({ type: DB_UPDATE_CURRENCY_CODE_PROMISE, currencyCode }),
  dbUpdateStorageHiddenPC =
    ({ storageId, hidden }: UpdateStorageHiddenProps): DbUpdateStorageHiddenPromiseProps => ({
      type: DB_UPDATE_STORAGE_HIDDEN_PROMISE,
      storageId,
      hidden,
    }),
  dbUpdateStorageShowInSecureModePC =
    ({
      storageId, showInSecureMode,
    }: UpdateStorageShowInSecureModeProps): DbUpdateStorageShowInSecureModePromiseProps =>
      ({
        type: DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_PROMISE,
        storageId,
        showInSecureMode,
      }),
  dbUpdatePersonalNamePC = (name: string): DbUpdatePersonalNamePromiseProps =>
    ({ type: DB_UPDATE_PERSONAL_NAME_PROMISE, name }),
  dbUpdateSortPC = ({ dbKey, sortSpecificPath, sort }: UpdateSortProps): DbUpdateSortPromiseProps =>
    ({ type: DB_UPDATE_SORT_PROMISE, dbKey, sortSpecificPath, sort }),
  deleteCategoryPlanPC = ({
    categoryId, uid, period,
  }: DeleteCategoryPlanProps): DbDeleteCategoryPlanPromiseProps =>
    ({ type: DB_DELETE_CATEGORY_PLAN_PROMISE, categoryId, uid, period }),
  updateCategoryPlanPC = ({
    categoryId,
    uid,
    period,
    plan,
  }: UpdateCategoryPlanProps): DbUpdateCategoryPlanPromiseProps =>
    ({
      type: DB_UPDATE_CATEGORY_PLAN_PROMISE,
      categoryId,
      uid,
      period,
      plan,
    }),
  dbUpdatePlannedTransactionPC =
    (plannedTransaction: PlannedTransaction): DbUpdatePlannedTransactionPromiseProps =>
      ({ type: DB_UPDATE_PLANNED_TRANSACTION_PROMISE, plannedTransaction }),
  dbEndPrevPlannedTransactionAndCreateNewPC =
    ({
      plannedTransaction,
      endPrevProps,
    }: EndPrevPlannedTransactionAndCreateNewProps): DbEndPrevPlannedTransactionAndCreateNewPromiseProps =>
      ({
        type: DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_PROMISE,
        plannedTransaction,
        endPrevProps,
      }),
  dbUpdatePlannedTransactionsPeriodOverridePC =
    ({
      transactionId,
      period,
      periodOverride,
    }: UpdatePlannedTransactionsPeriodOverrideProps): DbUpdatePlannedTransactionsPeriodOverridePromiseProps =>
      ({
        type: DB_UPDATE_PLANNED_TRANSACTIONS_PERIOD_OVERRIDE_PROMISE,
        transactionId,
        period,
        periodOverride,
      }),
  dbUpdatePlannedTransactionDeletedPeriodsPC =
    ({ transactionId, period }: UpdatePlannedTransactionDeletedPeriodsProps): DbUpdatePlannedTransactionDeletedPeriodsPromiseProps =>
      ({ type: DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_PROMISE, transactionId, period }),
  dbDeletePlannedTransactionPC = (transactionId: TransactionId): DbDeletePlannedTransactionPromiseProps =>
    ({ type: DB_DELETE_PLANNED_TRANSACTION_PROMISE, transactionId }),
  dbUpdatePlannedTransactionEndDatePC =
    ({
      transactionId,
      endDate,
    }: UpdatePlannedTransactionEndDateProps): DbUpdatePlannedTransactionEndDatePromiseProps =>
      ({
        type: DB_UPDATE_PLANNED_TRANSACTION_END_DATE_PROMISE,
        transactionId,
        endDate,
      }),
  dbGetPersonalDataPC = (): DbGetPersonalDataPromiseProps =>
    ({ type: DB_GET_PERSONAL_DATA_PROMISE }),
  dbGetAccountVersionPC = (): DbGetAccountVersionPromiseProps =>
    ({ type: DB_GET_ACCOUNT_VERSION_PROMISE }),
  dbGetAccountEncryptionStatusPC = (): DbGetAccountEncryptionStatusPromiseProps =>
    ({ type: DB_GET_ACCOUNT_ENCRYPTION_STATUS_PROMISE }),
  dbGetLiveAccountPC = (): DbGetLiveAccountPromiseProps => ({
    type: DB_GET_LIVE_ACCOUNT_PROMISE,
  }),
  dbUpdateTransactionPC = (transaction: Transaction): DbUpdateTransactionPromiseProps => ({
    type: DB_UPDATE_TRANSACTION_PROMISE,
    transaction,
  })

const
  makeDbModulePromiseConfMap = (fbs: FbsApp) => {
    const
      getOnceNotNull = (path: string, callback: (val: any) => any) => {
        const
          ref = fbs.database()
            .ref(path),
          cb = (versionSnapshot) => {
            const val = versionSnapshot.val()
            if (val !== null) {
              ref.off('value', cb)
              callback(callback(val))
            } else {
              console.log(`received ${path} = null. skipping`)
            }
          }

        ref.on('value', cb)
      },
      getOnceWithDefault = ({
        path,
        defaultValue,
        callback,
      }: { path: string, defaultValue: AnyValue, callback: (val: any) => any }) => {
        const
          ref = fbs.database()
            .ref(path),
          cb = (versionSnapshot) => {
            const val = versionSnapshot.val()

            ref.off('value', cb)
            if (val !== null) {
              callback(val)
            } else {
              console.log('getOnceWithDefault on value',
                path,
                'to default',
                defaultValue,
                'db returned value was',
                val)
              callback(defaultValue)
            }
          }
        ref.on('value', cb)
      },
      authEmailPasswordModulePromiseMaker: BaseModulePromiseMaker<DbAuthEmailPasswordPromiseProps> =
        ({ email, password }) => (resolve) => {
          fbs
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ uid }: { email: string, uid: UID }) => {
              resolve(dbAuthSuccessAC({ uid }))
            })
            .catch((error) => {
              const { code, message } = error

              let _message = message
              switch (code) {
                case 'auth/user-not-found':
                  _message = strings.userNotFound
                  break
                case 'auth/user-disabled':
                  _message = strings.userDisabled
                  break
                case 'auth/wrong-password':
                  _message = strings.wrongPassword
                  break
                case 'auth/invalid-email':
                  _message = strings.emailIsInvalid
                  break
                default:
              }
              resolve(dbAuthFailAC(_message))
            })
        },
      registerEmailPasswordModulePromiseMaker: BaseModulePromiseMaker<DbRegisterEmailPasswordPromiseProps> =
        ({ email, password }) => (resolve) => {
          fbs
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              resolve(dbRegisterSuccessAC())
            })
            .catch((error) => {
              const { code, message } = error

              let _message = message
              switch (code) {
                case 'auth/email-already-in-use':
                  _message = strings.emailIsInUse
                  break
                case 'auth/weak-password':
                  _message = strings.weakPassword
                  break
                case 'auth/invalid-email':
                  _message = strings.emailIsInvalid
                  break
                case 'auth/operation-not-allowed':
                  _message = strings.emailRegistrationTemporaryDisabled
                  break
                default:
                  break
              }
              resolve(dbRegisterFailAC(_message))
            })
        },
      updatePreferencesPromiseMaker: BaseModulePromiseMaker<DbUpdatePreferencesPromiseProps> =
        ({ preferencesToUpdate }, getAppState) => (resolve) => {
          const prefKeys = keys(preferencesToUpdate)
          if (prefKeys.length === 0) {
            throw new Error('Update preferences request should contain at least one prop to update')
          }
          if (prefKeys.length > 1) {
            throw new Error('Update of multiple preferences at once is not implemented yet')
          }
          const
            { session: { uid } } = getAppState(),
            key = prefKeys[0];

          console.log('key', key)
          console.log('preferencesToUpdate', preferencesToUpdate)
          fbs.database()
            .ref(`personalData/${uid}/preferences/${key}`)
            .set(preferencesToUpdate[key] === __undef ? undefined : preferencesToUpdate[key]) // TODO MFG-80 remove __undef hack once migration to new version done
            .then(() => resolve(dbUpdatePreferencesDoneAC()))
        },
      // TODO 2 MFG-18 don't delete transaction from DB, but instead set deletedSince field to currentData
      deleteTransactionPromiseMaker: BaseModulePromiseMaker<DbDeleteTransactionPromiseProps> =
        ({ transactionId }, getAppState) => (resolve) => {
          const { deps: { maUid } } = getDbModuleState(getAppState)
          fbs.database()
            .ref(`accounts/${maUid}/live/transactions/${transactionId}`)
            .set(null)
            .then(() => resolve(dbDeleteTransactionDoneAC()))
        },
      archiveTransactionsPromiseMaker: BaseModulePromiseMaker<DbArchiveTransactionsPromiseProps> =
        ({ borderDate }, getAppState) => resolve => {
          const
            { deps: { maUid, session: { encryptionPassword } } } = getDbModuleState(getAppState),
            fromDate = date0,
            filterOnlyTransactionsToArchive =
              filterObj(({ date }) => date > fromDate && date < borderDate)

          fbs.database()
            .ref(`accounts/${maUid}`)
            .transaction((account) => {
              const
                liveTransactions = account.live.transactions,
                transactionsToArchive = filterOnlyTransactionsToArchive(liveTransactions),
                filterOnlyNewTransactions = filterObj(({ id }) => !transactionsToArchive[id]),
                newLiveTransactions = filterOnlyNewTransactions(liveTransactions),
                newArchivedTransactions = pipe(
                  path(['archive', 'transactions']),
                  defaultTo({}),
                  merge(transactionsToArchive),
                )(account),
                { decryptTransaction } = makeCrypt(encryptionPassword),
                newArchivedTransactionsBalance = pipe(
                  account.encrypted ? x => x.map(decryptTransaction) : I,
                  values,
                  transactionsBalanceSelector,
                )(newArchivedTransactions),
                newAccount = pipe(
                  assocPath(['live', 'transactions'], newLiveTransactions),
                  assocPath(
                    ['live', 'archivedTransactionsBalance'],
                    // TODO 3 MFG-19 crypt newArchivedTransactionsBalance, migration required
                    newArchivedTransactionsBalance,
                  ),
                  assocPath(['archive', 'transactions'], newArchivedTransactions),
                )(account)

              return newAccount
            }, (e) => {
              if (e) {
                onError({ e, description: 'Archiving transactions fail' })
                resolve(dbArchiveTransactionsFailAC())
              } else {
                resolve(dbArchiveTransactionsDoneAC())
              }
            })
        },
      sendBackupPromiseMaker: BaseModulePromiseMaker<DbSendBackupPromiseProps> =
        ({ backupEmail }, getAppState) => resolve => {
          const { deps: { uid } } = getDbModuleState(getAppState)
          fbs.database()
            .ref(`service/sendBackup/${uid}`)
            .set({ done: false, email: backupEmail, rnd: Math.random() })
            .then(() => resolve(dbSendBackupDoneAC()))
        },
      updateBackupEmailPromiseMaker: BaseModulePromiseMaker<DbUpdateBackupEmailPromiseProps> =
        ({ backupEmail }, getAppState) => resolve => {
          const { deps: { uid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`personalData/${uid}/backupEmail`)
            .set(backupEmail)
            .then(() => resolve(dbUpdateBackupEmailDoneAC()))
        },
      /* TODO 2 MFG-20 refactor like storage, pass whole category */
      updateCategoryPromiseMaker: BaseModulePromiseMaker<DbUpdateCategoryPromiseProps> =
        ({ category }, getAppState) =>
          resolve => {
            let finalCategory

            const
              {
                deps: { maUid, session: { accountEncrypted, encryptionPassword } },
              } = getDbModuleState(getAppState)

            if (!accountEncrypted) {
              finalCategory = category
            } else {
              const
                { encryptCategory } = makeCrypt(encryptionPassword)

              finalCategory = encryptCategory(category)
            }


            fbs.database()
              .ref(`accounts/${maUid}/live/categories/${category.id}`)
              .set(finalCategory)
              .then(() => resolve(dbUpdateCategoryDoneAC()))
          },
      updateStoragePromiseMaker: BaseModulePromiseMaker<DbUpdateStoragePromiseProps> =
        ({ storage }, getAppState) => resolve => {
          let
            finalStorage: AStorage

          const
            {
              deps: {
                maUid,
                session: { accountEncrypted, encryptionPassword },
              },
            } = getDbModuleState(getAppState)

          if (!accountEncrypted) {
            finalStorage = storage
          } else {
            const { encryptStorage } = makeCrypt(encryptionPassword)

            finalStorage = encryptStorage(storage)
          }

          fbs.database()
            .ref(`accounts/${maUid}/live/storages/${storage.id}`)
            .set(finalStorage)
            .then(() => resolve(dbUpdateStorageDoneAC()))
        },
      updateTransactionPromiseMaker: BaseModulePromiseMaker<DbUpdateTransactionPromiseProps> =
        ({ transaction }, getAppState) => resolve => {
          const
            {
              deps: {
                maUid,
                session: { accountEncrypted, encryptionPassword },
              },
            } = getDbModuleState(getAppState)

          let finalTransaction = transaction
          if (accountEncrypted) {
            const
              { encryptTransaction } = makeCrypt(encryptionPassword),
              encryptedTransaction = encryptTransaction(transaction)

            finalTransaction = encryptedTransaction
          }

          fbs.database()
            .ref(`accounts/${maUid}/live/transactions/${finalTransaction.id}`)
            .set(finalTransaction)
            .then(() => resolve(dbUpdateTransactionDoneAC()))
        },
      updateCurrencyCodePromiseMaker: BaseModulePromiseMaker<DbUpdateCurrencyCodePromiseProps> =
        ({ currencyCode }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/mainCurrencyCode`)
            .set(currencyCode)
            .then(() => resolve(dbUpdateCurrencyCodeDoneAC()))
        },
      updateStorageHiddenPromiseMaker: BaseModulePromiseMaker<DbUpdateStorageHiddenPromiseProps> =
        ({ storageId, hidden }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/storages/${storageId}/hidden`)
            .set(hidden)
            .then(() => resolve(updateStorageHiddenDoneAC()))
        },
      updateStorageShowInSecureModePromiseMaker: BaseModulePromiseMaker<DbUpdateStorageShowInSecureModePromiseProps> =
        ({ storageId, showInSecureMode }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/storages/${storageId}/showInSecureMode`)
            .set(showInSecureMode)
            .then(() => resolve(updateStorageHiddenDoneAC()))
        },
      updatePersonalNamePromiseMaker: BaseModulePromiseMaker<DbUpdatePersonalNamePromiseProps> =
        ({ name }, getAppState) => resolve => {
          const { deps: { uid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`personalData/${uid}/name`)
            .set(name)
            .then(() => resolve(dbUpdatePersonalNameDoneAC()))
        },
      updateSortPromiseMaker: BaseModulePromiseMaker<DbUpdateSortPromiseProps> =
        ({ dbKey, sortSpecificPath, sort }, getAppState) => resolve => {
          const { deps: { uid, maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/${dbKey}/${uid}/${sortSpecificPath}`)
            .set(sort)
            .then(() => resolve(dbUpdateSortDoneAC()))
        },
      mPlanPath = ({ maUid, categoryId, uid, period }) =>
        `accounts/${maUid}/live/plans/${categoryId}/${uid}/${period}`,
      deleteCategoryPlanPromiseMaker: BaseModulePromiseMaker<DbDeleteCategoryPlanPromiseProps> =
        ({ categoryId, uid, period }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)
          fbs.database()
            .ref(mPlanPath({ maUid, categoryId, uid, period }))
            .set(null)
            .then(() => resolve(deleteCategoryPlanDoneAC()))
        },
      updateCategoryPlanPromiseMaker: BaseModulePromiseMaker<DbUpdateCategoryPlanPromiseProps> =
        ({ categoryId, uid, period, plan }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)
          fbs.database()
            .ref(mPlanPath({ maUid, categoryId, uid, period }))
            .set(plan)
            .then(() => resolve(updateCategoryPlanDoneAC()))
        },
      mPlannedTransactionPath = ({ maUid, id }) =>
        `accounts/${maUid}/live/plannedTransactions/${id}`,
      updatePlannedTransactionPromiseMaker: BaseModulePromiseMaker<DbUpdatePlannedTransactionPromiseProps> =
        ({ plannedTransaction }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(mPlannedTransactionPath({ maUid, id: plannedTransaction.id }))
            .set(plannedTransaction)
            .then(() => resolve(dbUpdatePlannedTransactionDoneAC()))
        },
      dbEndPrevPlannedTransactionAndCreateNewPromiseMaker: BaseModulePromiseMaker<DbEndPrevPlannedTransactionAndCreateNewPromiseProps> =
        ({ plannedTransaction, endPrevProps }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/plannedTransactions/${endPrevProps.transactionId}/endDate`)
            .set(endPrevProps.period)
            .then(() => {
              fbs.database()
                .ref(mPlannedTransactionPath({ maUid, id: plannedTransaction.id }))
                .set(plannedTransaction)
                .then(() => resolve(dbEndPrevPlannedTransactionAndCreateNewDoneAC()))
            })
        },
      dbUpdatePlannedTransactionsPeriodOverridePromiseMaker: BaseModulePromiseMaker<DbUpdatePlannedTransactionsPeriodOverridePromiseProps> =
        ({ transactionId, period, periodOverride }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/plannedTransactions/${transactionId}/overriddenPeriods/${period}`)
            .set(periodOverride)
            .then(() => resolve(dbUpdatePlannedTransactionsPeriodOverrideDoneAC()))
        },
      dbUpdatePlannedTransactionDeletedPeriodsPromiseMaker: BaseModulePromiseMaker<DbUpdatePlannedTransactionDeletedPeriodsPromiseProps> =
        ({ transactionId, period }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/plannedTransactions/${transactionId}/deletedPeriods/${period}`)
            .set(true)
            .then(() => resolve(dbUpdatePlannedTransactionDeletedPeriodsDoneAC()))
        },
      dbDeletePlannedTransactionPromiseMaker: BaseModulePromiseMaker<DbDeletePlannedTransactionPromiseProps> =
        ({ transactionId }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/plannedTransactions/${transactionId}`)
            .set(null)
            .then(() => resolve(dbDeletePlannedTransactionDoneAC()))
        },
      dbUpdatePlannedTransactionEndDatePromiseMaker: BaseModulePromiseMaker<DbUpdatePlannedTransactionEndDatePromiseProps> =
        ({ transactionId, endDate }, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}/live/plannedTransactions/${transactionId}/endDate`)
            .set(endDate)
            .then(() => resolve(dbUpdatePlannedTransactionEndDateDoneAC()))
        },
      dbGetPersonalDataPromiseMaker: BaseModulePromiseMaker<DbUpdatePlannedTransactionEndDatePromiseProps> =
        (p, getAppState) => resolve => {
          const { deps: { uid } } = getDbModuleState(getAppState)

          getOnceWithDefault({
            path: `personalData/${uid}`,
            defaultValue: {},
            callback: personalData => resolve(dbGetPersonalDataDoneAC(personalData)),
          })
        },
      dbGetAccountVersionPromiseMaker: BaseModulePromiseMaker<DbGetAccountVersionPromiseProps> =
        (p, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          getOnceNotNull(
            `accounts/${maUid}/version`,
            version => resolve(dbGetAccountVersionDoneAC(version)),
          )
        },
      dbGetAccountEncryptionStatusPromiseMaker: BaseModulePromiseMaker<DbGetAccountVersionPromiseProps> =
        (p, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          getOnceNotNull(
            `accounts/${maUid}/encrypted`,
            encrypted => resolve(dbGetAccountEncryptionStatusDoneAC(encrypted)),
          )
        },
      dbGetLiveAccountPromiseMaker: BaseModulePromiseMaker<DbGetAccountVersionPromiseProps> =
        (p, getAppState) => resolve => {
          const { deps: { maUid } } = getDbModuleState(getAppState)

          getOnceNotNull(
            `accounts/${maUid}/live`,
            account => resolve(dbGetLiveAccountDoneAC(account)),
          )
        }

    return {
      [DB_AUTH_EMAIL_PASSWORD_PROMISE]: authEmailPasswordModulePromiseMaker,
      [DB_REGISTER_EMAIL_PASSWORD_PROMISE]: registerEmailPasswordModulePromiseMaker,
      [DB_UPDATE_PREFERENCES_PROMISE]: updatePreferencesPromiseMaker,
      [DB_DELETE_TRANSACTION_PROMISE]: deleteTransactionPromiseMaker,
      [DB_ARCHIVE_TRANSACTIONS_PROMISE]: archiveTransactionsPromiseMaker,
      [DB_SEND_BACKUP_PROMISE]: sendBackupPromiseMaker,
      [DB_UPDATE_BACKUP_EMAIL_PROMISE]: updateBackupEmailPromiseMaker,
      [DB_UPDATE_CATEGORY_PROMISE]: updateCategoryPromiseMaker,
      [DB_UPDATE_STORAGE_PROMISE]: updateStoragePromiseMaker,
      [DB_UPDATE_TRANSACTION_PROMISE]: updateTransactionPromiseMaker,
      [DB_UPDATE_CURRENCY_CODE_PROMISE]: updateCurrencyCodePromiseMaker,
      [DB_UPDATE_STORAGE_HIDDEN_PROMISE]: updateStorageHiddenPromiseMaker,
      [DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE]: updateStorageShowInSecureModePromiseMaker,
      [DB_UPDATE_PERSONAL_NAME_PROMISE]: updatePersonalNamePromiseMaker,
      [DB_UPDATE_SORT_PROMISE]: updateSortPromiseMaker,
      [DB_DELETE_CATEGORY_PLAN_PROMISE]: deleteCategoryPlanPromiseMaker,
      [DB_UPDATE_CATEGORY_PLAN_PROMISE]: updateCategoryPlanPromiseMaker,
      [DB_UPDATE_PLANNED_TRANSACTION_PROMISE]: updatePlannedTransactionPromiseMaker,
      [DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_PROMISE]:
      dbEndPrevPlannedTransactionAndCreateNewPromiseMaker,
      [DB_UPDATE_PLANNED_TRANSACTIONS_PERIOD_OVERRIDE_PROMISE]:
      dbUpdatePlannedTransactionsPeriodOverridePromiseMaker,
      [DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_PROMISE]:
      dbUpdatePlannedTransactionDeletedPeriodsPromiseMaker,
      [DB_DELETE_PLANNED_TRANSACTION_PROMISE]: dbDeletePlannedTransactionPromiseMaker,
      [DB_UPDATE_PLANNED_TRANSACTION_END_DATE_PROMISE]: dbUpdatePlannedTransactionEndDatePromiseMaker,
      [DB_GET_PERSONAL_DATA_PROMISE]: dbGetPersonalDataPromiseMaker,
      [DB_GET_ACCOUNT_VERSION_PROMISE]: dbGetAccountVersionPromiseMaker,
      [DB_GET_ACCOUNT_ENCRYPTION_STATUS_PROMISE]: dbGetAccountEncryptionStatusPromiseMaker,
      [DB_GET_LIVE_ACCOUNT_PROMISE]: dbGetLiveAccountPromiseMaker,
    }
  }

export {
  makeDbModulePromiseConfMap,
}
