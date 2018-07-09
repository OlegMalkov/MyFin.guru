/* @flow */

import { __undef, date0 } from 'mfg-base/const'
import {
  categoriesWithTotalBalanceSelector,
} from 'mfg-base/entities/account/live/categoriesSelectors'
import {
  archivedTransactionsBalanceReducer,
} from 'mfg-base/entities/account/live/parts/archivedTransactionsBalanceReducer'
import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer'
import { categoriesSortReducer } from 'mfg-base/entities/account/live/parts/categoriesSortReducer'
import {
  mainCurrencyCodeReducer, undefinedCurrencyCode,
} from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import {
  plannedTransactionsReducer,
} from 'mfg-base/entities/account/live/parts/plannedTransactionsReducer'
import { plansReducer } from 'mfg-base/entities/account/live/parts/plansReducer'
import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { storagesSortReducer } from 'mfg-base/entities/account/live/parts/storagesSortReducer'
import { transactionsReducer } from 'mfg-base/entities/account/live/parts/transactionsReducer'
import { usersReducer } from 'mfg-base/entities/account/live/parts/usersReducer'
import { month } from 'mfg-base/entities/account/live/periodKinds'
import { getPlan } from 'mfg-base/entities/account/live/planSelectors'
import {
  allRemainsSelector,
  totalRemainsInStoragesSelector,
} from 'mfg-base/entities/account/live/storagesSelectors'
import {
  makeRecursiveWalker, onlyVisibleFilter,
  uidIsDef,
} from 'mfg-base/entities/account/live/utils'
import { balanceToMainCurrency } from 'mfg-base/entities/account/utils'
import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import {
  OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG,
  OPEN_ADD_TRANSFER_TRANSACTION_DIALOG,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsAC'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import {
  all, filterArray, I, keys, makeUpdateDepsReducer, pipe, u, updateChild,
  updateStateIfChanged,
  us, values,
} from 'mfg-base/utils/utils'
import { nowReducer } from 'mfg-base/modules/nowModule/nowReducer'
import {
  makeCategoriesSortFn,
} from 'mfg-base/modules/sortCategoriesScreenModule/makeCategoriesSort'
import { strings } from 'mfg-base/localization'
import { allUserNamesMapSelector } from 'mfg-base/selectors'
import {
  categoriesActionsDialogReducer,
} from './CategoriesActionsDialog/categoriesActionsDialogReducer'
import { overviewScreenModuleId } from './overviewScreenModuleId'
import { storagesActionsDialogReducer } from './StoragesActionsDialog/storagesActionsDialogReducer'
import { currenciesModuleReducer } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import {
  OVERVIEW_CATEGORY_PRESSED,
  OVERVIEW_INCOME_EXPENSE_BP,
  OVERVIEW_SECURE_MODE_BP,
  OVERVIEW_CATEGORIES_VIEW_MODE_BP,
  OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED,
  OVERVIEW_TRANSFER_BP, OVERVIEW_CATEGORY_LONG_PRESSED, OVERVIEW_SWIPE_LEFT, OVERVIEW_SWIPE_RIGHT,
  OVERVIEW_TOTAL_REMAINS_ARROW_BP, OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP,
} from './overviewScreenAC'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule'
import {
  setBeginOfCurrentMonth, setEndOfCurrentMonth,
  universalPeriodStrFromTimestamp,
} from 'mfg-base/utils/dateUtils'
import { makeGroupStorageLikeByUser } from './groupStorages'
import { toMoneyLimited1 } from 'mfg-base/utils/format'
import { toLendMoneyDialogReducer } from './ToLendMoneyDialog/toLendMoneyDialogReducer'

import type { Now } from 'mfg-base/modules/nowModule/nowReducer'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { OverviewModuleReducer } from './overview.flow'
import type { AnyOverviewScreenAction } from './overviewScreenAC'
import type { CurrencyCode, UID } from 'mfg-base/const'
import type {
  ArchivedTransactionsBalance, AStorageType,
  Balance, Categories, CategoriesSort, CategoryRefWithTotalBalance,
  PlannedTransactions, Plans,
  Storages, StoragesSort, Transactions, Users,
} from 'mfg-base/entities/account/live/flowTypes'
import type {
  StorageTotalBalance,
} from 'mfg-base/entities/account/live/storagesSelectors'
import type { StorageLikeGroupedByUser } from './groupStorages'
import type {
  CategoriesActionsDialogState,
} from './CategoriesActionsDialog/categoriesActionsDialogReducer'
import type {
  StoragesActionsDialogState,
} from './StoragesActionsDialog/storagesActionsDialogReducer'
import type { StorageIdWithCurrencyCode } from './flowTypes'
import type { CurrenciesModule } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'
import type { ToLendMoneyDialogState } from './ToLendMoneyDialog/toLendMoneyDialogReducer'

type CategoryData = {|
  hasPlan: bool,
  id: string,
  isHidden: bool,
  selected: bool,
  title: string,
  value: string | number,
  valueIsNumber: bool,
  children: Array<CategoryData>
|}

type SharedCategoriesComputedProps = {|
  categoriesData: Array<CategoryData>,
  totalUsage: number,
  currentPeriodTotal: number,
  currentPeriodPlan: number,
  overviewTotalUsageMode: 'percent' | 'number',
|}

type CAdmin = {| type: 'admin', adminCategoriesUserName: string, ...SharedCategoriesComputedProps |}
type CUser = {| type: 'user', ...SharedCategoriesComputedProps |}
type ComputeCategoriesPropsResult = CAdmin | CUser

const defaultComputedCategoriesProps: ComputeCategoriesPropsResult = {
  type: 'user',
  categoriesData: [],
  totalUsage: 0,
  currentPeriodTotal: 0,
  currentPeriodPlan: 0,
  overviewTotalUsageMode: 'percent',
}

type GetCategoriesProps = {
  now: Now,
  mainCurrencyCode: CurrencyCode,
  currentUserId: UID,
  uid: UID,
  showExpenseMode: bool,
  showNotPlannedCategories: bool,
  selectedCategoryId: string,
  currenciesModule: CurrenciesModule,
  overviewTotalUsageMode: 'percent' | 'number',
  categories: Categories,
  transactions: Transactions,
  plans: Plans,
  plannedTransactions: PlannedTransactions,
  categoriesSort: CategoriesSort,
}

type MappedCategoryRefWithId = {
  id: string,
  title: string,
  value: number | string,
  valueIsNumber: bool,
  selected: bool,
  hasPlan: bool,
  isHidden: bool,
}

type CategoriesScreenPart = {
  showExpenseMode: bool,
  selectedCategoryId: string,
  showNotPlannedCategories: bool,
  computed: ComputeCategoriesPropsResult
}

type ComputeStoragesPropsResult = {|
  totalRemainsOneCurrency: Balance,
  totalRemains: Balance,
  data: Array<StorageLikeGroupedByUser>,
  mainCurrencyCode: CurrencyCode,
  storages: Storages,
|}

const defaultComputedStorageProps: ComputeStoragesPropsResult = {
  totalRemainsOneCurrency: {},
  totalRemains: {},
  data: [],
  mainCurrencyCode: undefinedCurrencyCode,
  storages: {},
}

export type StoragesScreenPart = {
  isSecureMode: bool,
  isTotalRemainsExpanded: bool,
  familyMembersExpanded: bool,
  selectedStorageCurrency: StorageIdWithCurrencyCode | null,
  computed: ComputeStoragesPropsResult
}

type Screen = {
  categoriesScreenPart: CategoriesScreenPart,
  storagesScreenPart: StoragesScreenPart,
  isTransferMode: bool,
  navState: 'analytics' | 'expense' | 'income'
}
type Deps = {|
  currenciesModule: CurrenciesModule,
  session: Session,
  personalData: PersonalData,
  categories: Categories,
  storages: Storages,
  mainCurrencyCode: CurrencyCode,
  plans: Plans,
  plannedTransactions: PlannedTransactions,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  users: Users,
  storagesSort: StoragesSort,
  categoriesSort: CategoriesSort,
  transactions: Transactions,
  isAdmin: bool,
  now: Now,
|}

export type OverviewScreenState = {|
  screen: Screen,
  storagesActionsDialog: StoragesActionsDialogState,
  categoriesActionsDialog: CategoriesActionsDialogState,
  toLendMoneyDialog: ToLendMoneyDialogState,
  deps: Deps
|}

const
  screenInitialState: Screen = {
    categoriesScreenPart: {
      showExpenseMode: true,
      selectedCategoryId: __undef,
      showNotPlannedCategories: true,
      computed: defaultComputedCategoriesProps,
    },
    storagesScreenPart: {
      isSecureMode: true,
      isTotalRemainsExpanded: false,
      familyMembersExpanded: false,
      selectedStorageCurrency: null,
      computed: defaultComputedStorageProps,
    },
    navState: 'expense',
    isTransferMode: false,
  },
  dependenciesInitialState: Deps = {
    mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    currenciesModule: getReducerInitialState(currenciesModuleReducer),
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
    categories: getReducerInitialState(categoriesReducer),
    plans: getReducerInitialState(plansReducer),
    storages: getReducerInitialState(storagesReducer),
    plannedTransactions: getReducerInitialState(plannedTransactionsReducer),
    archivedTransactionsBalance: getReducerInitialState(archivedTransactionsBalanceReducer),
    users: getReducerInitialState(usersReducer),
    storagesSort: getReducerInitialState(storagesSortReducer),
    categoriesSort: getReducerInitialState(categoriesSortReducer),
    transactions: getReducerInitialState(transactionsReducer),
    isAdmin: getReducerInitialState(isAdminReducer),
    now: getReducerInitialState(nowReducer),
  },
  initialState: OverviewScreenState = {
    screen: screenInitialState,
    storagesActionsDialog: getReducerInitialState(storagesActionsDialogReducer),
    categoriesActionsDialog: getReducerInitialState(categoriesActionsDialogReducer),
    toLendMoneyDialog: getReducerInitialState(toLendMoneyDialogReducer),
    deps: dependenciesInitialState,
  }

const
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    currenciesModule: currenciesModuleReducer(s.currenciesModule, a),
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
    categories: categoriesReducer(s.categories, a),
    plans: plansReducer(s.plans, a),
    storages: storagesReducer(s.storages, a),
    plannedTransactions: plannedTransactionsReducer(s.plannedTransactions, a),
    mainCurrencyCode: mainCurrencyCodeReducer(s.mainCurrencyCode, a),
    archivedTransactionsBalance:
      archivedTransactionsBalanceReducer(s.archivedTransactionsBalance, a),
    users: usersReducer(s.users, a),
    storagesSort: storagesSortReducer(s.storagesSort, a),
    categoriesSort: categoriesSortReducer(s.categoriesSort, a),
    transactions: transactionsReducer(s.transactions, a),
    isAdmin: isAdminReducer(s.isAdmin, a),
    now: nowReducer(s.now, a),
  })),
  updateStoragesActionsDialog = (s, a) => updateChild(s, a,
    'storagesActionsDialog', storagesActionsDialogReducer),
  updateCategoriesActionsDialog = (s, a) => updateChild(s, a,
    'categoriesActionsDialog', categoriesActionsDialogReducer),
  updateToLendMoneyDialog = (s, a) => updateChild(s,
    a,
    'toLendMoneyDialog',
    toLendMoneyDialogReducer),
  updateDialogs = (s, a) => pipe(
    (s) => updateStoragesActionsDialog(s, a),
    (s) => updateCategoriesActionsDialog(s, a),
    (s) => updateToLendMoneyDialog(s, a),
  )(s),
  getCategoriesProps = ({
    now,
    mainCurrencyCode,
    currentUserId,
    uid,
    showExpenseMode,
    showNotPlannedCategories,
    overviewTotalUsageMode,
    selectedCategoryId,
    currenciesModule,
    categories,
    transactions,
    plans,
    plannedTransactions,
    categoriesSort,
  }: GetCategoriesProps) => {
    const
      getTotalExpenses = catsWithTotalBalance =>
        catsWithTotalBalance
          .map(({ totalBalance }) => totalBalance)
          .reduce((acc, balance) => acc + balanceToMainCurrency(balance, currenciesModule), 0),
      planData = getPlan({
        categories,
        plans,
        plannedTransactions,
        currenciesModule,
        props: {
          uid,
          period: universalPeriodStrFromTimestamp(setBeginOfCurrentMonth(now)),
          currencyCode: mainCurrencyCode,
          periodType: month,
        },
      }),
      getCurrentPeriodTotalPlan = (catsWithTotalBalance) => pipe(
        keys,
        x => x.filter(key => catsWithTotalBalance[key]),
        x => x.map((key) => planData[key]),
        x => x.reduce((a, v) => a + v.amount, 0),
      )(planData),
      toIdsMap = (arr) => arr.reduce((acc, { id }) => ({ ...acc, [id]: true }), {}),
      currentPeriodProps = {
        fromTimestamp: setBeginOfCurrentMonth(now),
        toTimestamp: setEndOfCurrentMonth(now),
        uid,
        type: showExpenseMode ? 'expense' : 'income',
      },
      categoriesWithTotalBalance = categoriesWithTotalBalanceSelector(
        categories,
        transactions,
        currentPeriodProps,
      ),
      currentPeriodPlan = getCurrentPeriodTotalPlan(toIdsMap(categoriesWithTotalBalance)) / 100,
      currentPeriodTotal = getTotalExpenses(categoriesWithTotalBalance) / 100,
      totalUsage = Math.round((currentPeriodTotal / currentPeriodPlan) * 100),

      filterCategory = (cat: MappedCategoryRefWithId) =>
        (showNotPlannedCategories || cat.hasPlan)
        && onlyVisibleFilter(cat),
      sortCategories = makeCategoriesSortFn({ uid: currentUserId, sortData: categoriesSort }),
      recursiveMapper =
        /* $FlowFixMe TODO 3 MFG-57 */
        makeRecursiveWalker({
          mapper: (category: CategoryRefWithTotalBalance): MappedCategoryRefWithId => {
            const
              fact = balanceToMainCurrency(category.totalBalance, currenciesModule),
              plan = planData[category.id],
              value = plan ? (overviewTotalUsageMode === 'percent' ?
                `${Math.round(fact / plan.amount / 0.01)} %` :
                `${toMoneyLimited1(fact / 100)}/${toMoneyLimited1(plan.amount / 100)}`) : '-'

            return {
              id: category.id,
              title: category.title,
              value,
              valueIsNumber: overviewTotalUsageMode === 'number',
              selected: category.id === selectedCategoryId,
              hasPlan: plan ? !!plan.amount : false,
              isHidden: category.isHidden,
            }
          },
          filter: filterCategory,
          sort: sortCategories,
        }),
      getCatData = pipe(
        x => x.map(
          (item: any, index) => recursiveMapper(item, index),
        ), // $FlowFixMe TODO 5 MFG-57 remove any, already spend 5 hours
        x => x.filter(filterCategory),
        sortCategories,
      ),
      /* $FlowFixMe TODO 3 fix MFG-57 */
      categoriesData: any = getCatData(categoriesWithTotalBalance)

    return {
      categoriesData,
      totalUsage: totalUsage === Infinity ? 100 : totalUsage,
      currentPeriodTotal,
      currentPeriodPlan,
    }
  },
  computeCategoriesProps = (s: OverviewScreenState): ComputeCategoriesPropsResult => {
    const
      {
        screen: {
          categoriesScreenPart: {
            showExpenseMode,
            showNotPlannedCategories,
            selectedCategoryId,
          },
        },
        deps: {
          currenciesModule,
          isAdmin,
          session: { uid: currentUserId },
          personalData: { preferences: { overviewCategoriesUid, overviewTotalUsageMode } },
          categories,
          plans,
          plannedTransactions,
          mainCurrencyCode,
          categoriesSort,
          transactions,
          now,
        },
      } = s,
      execGetCategoriesProps = (uid: UID) => getCategoriesProps({
        now,
        mainCurrencyCode,
        currentUserId,
        uid,
        showExpenseMode,
        showNotPlannedCategories,
        overviewTotalUsageMode,
        selectedCategoryId,
        currenciesModule,
        categories,
        plans,
        plannedTransactions,
        categoriesSort,
        transactions,
      })

    if (isAdmin) {
      const
        { deps: { users, personalData, session } } = s,
        allUserNamesMap = allUserNamesMapSelector({ users, personalData, session }),
        adminCategoriesUserName = uidIsDef(overviewCategoriesUid) ?
          allUserNamesMap[overviewCategoriesUid] : strings.allUsers,
        {
          categoriesData,
          totalUsage,
          currentPeriodTotal,
          currentPeriodPlan,
        } = execGetCategoriesProps(overviewCategoriesUid)

      return {
        type: 'admin',
        adminCategoriesUserName,
        categoriesData,
        totalUsage,
        currentPeriodTotal,
        currentPeriodPlan,
        overviewTotalUsageMode,
      }
    }
    const {
      categoriesData,
      totalUsage,
      currentPeriodTotal,
      currentPeriodPlan,
    } = execGetCategoriesProps(currentUserId)
    return {
      type: 'user',
      categoriesData,
      totalUsage,
      currentPeriodTotal,
      currentPeriodPlan,
      overviewTotalUsageMode,
    }
  },
  makeAssocSelectedCurrencyCode = (selectedStorageCurrency) => {
    if (selectedStorageCurrency === null) {
      return I
    }
    const { storageId, currencyCode } = selectedStorageCurrency
    return (arr: Array<StorageTotalBalance>): Array<StorageTotalBalance> => {
      return arr.map(
        (storage: StorageTotalBalance) => {
          if (storage.id === storageId) {
            return u(storage, storage => storage.selectedCurrencyCode = currencyCode)
          }
          return storage
        },
      )
    }
  },
  computeStoragesProps = (s: OverviewScreenState): ComputeStoragesPropsResult => {
    const
      {
        screen: { storagesScreenPart: { selectedStorageCurrency, isSecureMode, familyMembersExpanded } },
        deps: {
          transactions,
          currenciesModule,
          storages,
          session,
          archivedTransactionsBalance,
          mainCurrencyCode,
          users,
          personalData,
          storagesSort,
          isAdmin,
          now,
        },
      } = s,
      filterOtherThanCurrentUser = filterArray(({ uid }) => uid === session.uid),
      filterByUid = isAdmin ? I : filterOtherThanCurrentUser,
      filterDoneDebts = filterArray((s: { type: AStorageType, balance: Balance }) => {
        const { type, balance } = s
        if (type !== 'debt') {
          return true
        }

        return !all(x => x === 0, values(balance))
      }),
      assocSelectedSelectedStorageCurrency =
        makeAssocSelectedCurrencyCode(selectedStorageCurrency),
      allStoragesRemains: Array<StorageTotalBalance> = allRemainsSelector(
        transactions,
        storages,
        archivedTransactionsBalance,
        {
          fromTimestamp: date0,
          toTimestamp: now,
          uid: __undef,
        },
      ),
      filterStorages: (arr: Array<StorageTotalBalance>) => Array<StorageTotalBalance> =
        pipe(
          filterArray(({ hidden }) => !hidden),
          filterByUid,
          filterDoneDebts,
          familyMembersExpanded ? I : filterOtherThanCurrentUser,
        ),
      allRemainsWithSelectedStorageCurrency: Array<StorageTotalBalance> =
        assocSelectedSelectedStorageCurrency(allStoragesRemains),
      filteredRemains: Array<StorageTotalBalance> =
        filterStorages(allRemainsWithSelectedStorageCurrency),
      groupedRemainsByUser: Array<StorageLikeGroupedByUser> = makeGroupStorageLikeByUser({
        session,
        users,
        personalData,
        storagesSort,
        isSecureMode,
        currenciesModule,
      })(filteredRemains),
      filteredGroupedRemainsByUser: Array<StorageLikeGroupedByUser> = groupedRemainsByUser.filter(
        (props: StorageLikeGroupedByUser) => {
          if (props.type === 'label' || props.type === 'my-storages-separator') {
            return true
          }
          return !isSecureMode || props.showInSecureMode
        }),
      totalRemains = totalRemainsInStoragesSelector(
        transactions,
        storages,
        archivedTransactionsBalance,
        {
          fromTimestamp: date0,
          toTimestamp: now,
          uid: isAdmin ? __undef : session.uid,
        }),
      totalRemainsOneCurrency = { [mainCurrencyCode]: balanceToMainCurrency(totalRemains, currenciesModule) }

    console.log('familyMembersExpanded', familyMembersExpanded);
    return {
      totalRemainsOneCurrency,
      totalRemains,
      data: filteredGroupedRemainsByUser,
      /* TODO 3 MFG-58 remove mainCurrencyCode and storages from computed props,
       pass only required data */
      mainCurrencyCode: s.deps.mainCurrencyCode,
      storages: s.deps.storages,
    }
  },

  overviewScreenNavStates = ['income', 'expense', 'analytics'],
  getNavStateBefore = navState =>
    overviewScreenNavStates[Math.max(0, overviewScreenNavStates.indexOf(navState) - 1)],
  getNavStateAfter = navState =>
    overviewScreenNavStates[Math.min(
      overviewScreenNavStates.length - 1,
      overviewScreenNavStates.indexOf(navState) + 1,
    )],
  reducer: OverviewModuleReducer<OverviewScreenState> =
    (s = initialState, a: AnyOverviewScreenAction) => {
      return pipe(
        s => {
          if (a.type === OVERVIEW_SWIPE_RIGHT) {
            return us(s, a, s => {
              s.screen.navState = getNavStateBefore(s.screen.navState)
            })
          }

          if (a.type === OVERVIEW_SWIPE_LEFT) {
            return us(s, a, s => {
              s.screen.navState = getNavStateAfter(s.screen.navState)
            })
          }

          if (a.type === OVERVIEW_CATEGORY_PRESSED || a.type === OVERVIEW_CATEGORY_LONG_PRESSED) {
            return us(s,
              a,
              (s, a) => s.screen.categoriesScreenPart.selectedCategoryId = a.categoryId)
          }

          if (a.type === OVERVIEW_SECURE_MODE_BP) {
            return us(s, a, s => s.screen.storagesScreenPart.isSecureMode =
              !s.screen.storagesScreenPart.isSecureMode)
          }

          if (a.type === OVERVIEW_TOTAL_REMAINS_ARROW_BP) {
            return us(s, a, s => s.screen.storagesScreenPart.isTotalRemainsExpanded =
              !s.screen.storagesScreenPart.isTotalRemainsExpanded)
          }

          if (a.type === OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP) {
            return us(s, a, s => s.screen.storagesScreenPart.familyMembersExpanded =
              !s.screen.storagesScreenPart.familyMembersExpanded)
          }

          if (a.type === OVERVIEW_INCOME_EXPENSE_BP) {
            return us(s, a, s => {
              s.screen.categoriesScreenPart.showExpenseMode =
                !s.screen.categoriesScreenPart.showExpenseMode
              s.screen.categoriesScreenPart.selectedCategoryId = __undef
            })
          }

          if (a.type === OVERVIEW_TRANSFER_BP) {
            return us(s, a, s => {
              s.screen.isTransferMode = !s.screen.isTransferMode
              s.screen.categoriesScreenPart.selectedCategoryId = __undef
            })
          }

          if (a.type === OVERVIEW_CATEGORIES_VIEW_MODE_BP) {
            return us(s, a,
              s => s.screen.categoriesScreenPart.showNotPlannedCategories =
                !s.screen.categoriesScreenPart.showNotPlannedCategories,
            )
          }

          if (a.type === OPEN_ADD_TRANSFER_TRANSACTION_DIALOG
            || a.type === OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG) {
            return us(s, a, s => {
              s.screen.isTransferMode = false
            })
          }

          if (a.type === OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED) {
            return us(s, a, (s, a) => {
              if (!(s.screen.isTransferMode
                  && s.screen.storagesScreenPart.selectedStorageCurrency)) {
                const { storageId, currencyCode } = a
                s.screen.storagesScreenPart.selectedStorageCurrency = { storageId, currencyCode }
              }
            })
          }

          return s
        },
        s => updateDialogs(s, a),
        s => updateChild(s, a, 'deps', depsReducer),
        cs => updateStateIfChanged(s, cs, a, s => {
          s.screen.categoriesScreenPart.computed = computeCategoriesProps(s)
          s.screen.storagesScreenPart.computed = computeStoragesProps(s)
        }),
      )(s)
    },
  overviewScreenReducer: OverviewModuleReducer<OverviewScreenState> =
    makeModuleReducer({ reducer, moduleId: overviewScreenModuleId })

export {
  overviewScreenReducer,
  overviewScreenNavStates,
}
