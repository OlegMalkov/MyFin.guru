/* @flow */

import { __undef, date0 } from 'mfg-base/const'
import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import type { NavModuleState } from 'mfg-base/modules/navModule/makeNavReducer'
import { navDefaultState } from 'mfg-base/modules/navModule/makeNavReducer'
import {
  getMonth, getYear, setBeginOfX, setEndOfCurrentT,
  universalPeriodStrFromTimestamp,
} from 'mfg-base/utils/dateUtils'
import {
  categoriesWithTotalBalanceSelector,
} from 'mfg-base/entities/account/live/categoriesSelectors'
import {
  archivedTransactionsBalanceReducer,
} from 'mfg-base/entities/account/live/parts/archivedTransactionsBalanceReducer';
import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer';
import { categoriesSortReducer } from 'mfg-base/entities/account/live/parts/categoriesSortReducer';
import {
  undefinedCurrencyCode,
} from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer';
import {
  plannedTransactionsReducer,
} from 'mfg-base/entities/account/live/parts/plannedTransactionsReducer';
import { plansReducer } from 'mfg-base/entities/account/live/parts/plansReducer';
import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer';
import { transactionsReducer } from 'mfg-base/entities/account/live/parts/transactionsReducer';
import { usersReducer } from 'mfg-base/entities/account/live/parts/usersReducer';
import { month, year } from 'mfg-base/entities/account/live/periodKinds'
import { getPlan } from 'mfg-base/entities/account/live/planSelectors'
import { totalRemainsInStoragesSelector } from 'mfg-base/entities/account/live/storagesSelectors'
import {
  makeRecursiveWalker, onlyVisibleFilter, uidIsDef,
} from 'mfg-base/entities/account/live/utils'
import { balanceToAnotherCurrency } from 'mfg-base/entities/account/utils'
import { currenciesModuleReducer } from 'mfg-base/entities/currencies/currenciesModuleReducer';
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { strings } from 'mfg-base/localization'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { DB_GET_LIVE_ACCOUNT_DONE } from 'mfg-base/modules/dbModule/dbAC'
import {
  PICK_CURRENCY_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import {
  makeInitComputer, makeUpdateDepsReducer, path, pipe, range, u, updateChild,
  us,
} from 'mfg-base/utils/utils'
import { nowReducer } from 'mfg-base/modules/nowModule/nowReducer'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule';
import {
  makeCategoriesSortFn,
} from 'mfg-base/modules/sortCategoriesScreenModule/makeCategoriesSort'
import { orientationModuleReducer } from 'mfg-base/modules/orientationModule/orientationReducer'
import { windowDimensionsReducer } from 'mfg-base/rn/windowDimensionsReducer'
import { allUserNamesMapSelector } from 'mfg-base/selectors'
import { makePeriodStartReducer } from './periodStartReducer'
import { planCategoryDialogReducer } from './PlanCategoryDialog/planCategoryDialogReducer'
import {
  PLAN_SCREEN_EXPENSE_BP, PLAN_SCREEN_INCOME_BP,
  PLAN_SCREEN_PERIOD_PRESSED,
} from './planScreenAC'
import { planScreenModuleId } from './planScreenModuleId'
import { Orientations } from 'mfg-base/modules/orientationModule/Orientations';
import {
  showTransactionsDialogReducer,
} from './ShowTransactionsDialog/showTransactionsDialogReducer'

import type { Dimensions } from 'mfg-base/global.flow'
import type { PlanModuleReducer } from './plan.flow'
import type { Now } from 'mfg-base/modules/nowModule/nowReducer'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { CurrencyCode, MyDate, PeriodType, UID } from 'mfg-base/const'
import type {
  ArchivedTransactionsBalance,
  Categories, CategoriesSort, CategoryRefWithTotalBalance, PlannedTransactions, Plans,
  Storages, Transactions,
  Users,
} from 'mfg-base/entities/account/live/flowTypes';
import type { OrientationModuleState } from 'mfg-base/modules/orientationModule/orientationReducer'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes';
import type { PlanCategoryDialogState } from './PlanCategoryDialog/planCategoryDialogReducer'
import type { CurrenciesModule } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import type {
  ShowTransactionsDialogState,
} from './ShowTransactionsDialog/showTransactionsDialogReducer'

type Deps = {|
  personalData: PersonalData,
  orientationModule: OrientationModuleState,
  planCategoryDialog: PlanCategoryDialogState,
  showTransactionsDialog: ShowTransactionsDialogState,
  currenciesModule: CurrenciesModule,
  session: Session,
  categories: Categories,
  transactions: Transactions,
  users: Users,
  plans: Plans,
  plannedTransactions: PlannedTransactions,
  storages: Storages,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  categoriesSort: CategoriesSort,
  isAdmin: bool,
  now: Now,
  windowDimensions: Dimensions,
  nav: NavModuleState,
|}

type Computed = {|
  columns: number,
  selectedUid: UID,
  periodStrings: PeriodStrings,
  userName: string,
  renderProps: Array<{|
    expenseCategoriesListProps: CategoriesListProps,
    incomeCategoriesListProps: CategoriesListProps,
    expenseSummary: { data: PlanFactDiffFactoryProps },
    totalSummary: {
      data: {
        planTotal: number,
        planDiff: number,
        factTotal: number,
        factDiff: number,
      }
    },
    incomeSummary: { data: PlanFactDiffFactoryProps },
    onlyPlan: bool,
  |}>,
|}

export type PlanScreenState = {|
  currencyCode: CurrencyCode,
  periodStartTimestamp: MyDate,
  mode: 'expense-only' | 'income-only',
  periodType: PeriodType,
  computed: Computed,
  deps: Deps,
|}


export type CategoryListItem = {
  id: string,
  title: string,
  highlight: bool,
  value: { fact: number, plan: number, diff: number, repeatEveryMonth: bool },
  children?: Array<CategoryListItem>,
  collapsed: bool,
}

type CategoriesListProps = {
  data: Array<CategoryListItem>,
  isActive: bool,
}

type PeriodStrings = Array<{|
  month: number,
  year: number,
  universalPeriodStr: string,
  periodStartTimestamp: MyDate
|}>


export type PlanFactDiffFactoryProps = {
  level: number,
  plan: number,
  fact: number,
  diff: number,
  onPlanPress?: () => any,
  onFactPress?: () => any,
  bold: bool,
  onlyPlan: bool,
}

function makePlanScreenReducer() {
  let _navReducer;

  const
    initialPeriodType: PeriodType = month, /* year,*/
    nowInitialState = getReducerInitialState(nowReducer),
    depsInitialState: Deps = {
      personalData: getReducerInitialState(personalDataReducer),
      orientationModule: getReducerInitialState(orientationModuleReducer),
      planCategoryDialog: getReducerInitialState(planCategoryDialogReducer),
      showTransactionsDialog: getReducerInitialState(showTransactionsDialogReducer),
      currenciesModule: getReducerInitialState(currenciesModuleReducer),
      session: getReducerInitialState(sessionModuleReducer),
      categories: getReducerInitialState(categoriesReducer),
      transactions: getReducerInitialState(transactionsReducer),
      users: getReducerInitialState(usersReducer),
      plans: getReducerInitialState(plansReducer),
      plannedTransactions: getReducerInitialState(plannedTransactionsReducer),
      storages: getReducerInitialState(storagesReducer),
      archivedTransactionsBalance: getReducerInitialState(archivedTransactionsBalanceReducer),
      categoriesSort: getReducerInitialState(categoriesSortReducer),
      isAdmin: getReducerInitialState(isAdminReducer),
      windowDimensions: getReducerInitialState(windowDimensionsReducer),
      now: nowInitialState,
      nav: navDefaultState,
    },
    computedInitialState: Computed = {
      columns: 0,
      selectedUid: __undef,
      periodStrings: [],
      userName: __undef,
      renderProps: [],
    },
    initialPeriodStartReducer = makePeriodStartReducer(initialPeriodType, nowInitialState),
    initialState: PlanScreenState = {
      currencyCode: undefinedCurrencyCode, // todo 3 MFG-60 move to prefs
      periodStartTimestamp: getReducerInitialState(initialPeriodStartReducer),
      mode: 'expense-only',
      periodType: initialPeriodType,
      computed: computedInitialState,
      deps: depsInitialState,
    },
    makeCategoryFilter = (planCollapsedCategoriesIds) =>
      (categoryRefWithTotalBalance) => {
        const collapsed = categoryRefWithTotalBalance.parentId
          && planCollapsedCategoriesIds[categoryRefWithTotalBalance.parentId]

        return onlyVisibleFilter(categoryRefWithTotalBalance) && !collapsed
      },
    makeCategoriesData = ({
      plans,
      categories,
      categoriesSort,
      transactions,
      sessionUid,
      selectedUid,
      currencyCode,
      currenciesModule,
      periodStartTimestamp,
      planData,
      planCollapsedCategoriesIds,
      type,
      periodType,
    }) => {
      const
        periodUniversalStr = universalPeriodStrFromTimestamp(periodStartTimestamp),
        intervalProps = {
          fromTimestamp: periodStartTimestamp,
          toTimestamp: setEndOfCurrentT(periodType)(periodStartTimestamp),
          uid: selectedUid,
          type,
        },
        categoriesWithTotalBalance = categoriesWithTotalBalanceSelector(
          categories,
          transactions,
          intervalProps,
        ),
        /* TODO 3 MFG-61 remove any */
        sortCategories: any = makeCategoriesSortFn({ uid: sessionUid, sortData: categoriesSort }),
        categoryFilter = makeCategoryFilter(planCollapsedCategoriesIds)

      const
        visibleCategories = categoriesWithTotalBalance.filter(categoryFilter),
        recursiveMapper = makeRecursiveWalker({
          mapper: (category: CategoryRefWithTotalBalance) => {
            const
              plan = planData[category.id] ? planData[category.id].amount / 100 : 0,
              fact = balanceToAnotherCurrency(
                currencyCode,
                category.totalBalance,
                currenciesModule,
              ) / 100,
              diff = fact - plan

            return {
              id: category.id,
              title: category.title,
              parentId: category.parentId,
              collapsed: planCollapsedCategoriesIds[category.id],
              highlight: true,
              value: {
                fact,
                plan,
                diff,
                repeatEveryMonth: path(
                  [category.id, selectedUid, periodUniversalStr, 'repeatEveryMonth'],
                  plans,
                ),
              },
              isHidden: category.isHidden,
            }
          },
          filter: categoryFilter,
          sort: sortCategories,
        }),
        categoriesData = sortCategories(
          visibleCategories.map(
            (item: CategoryRefWithTotalBalance, index) => recursiveMapper((item: any), index),
          ),
        )

      return categoriesData
    },
    zeroPlanFactDiff = { plan: 0, fact: 0, diff: 0 },
    sumPlanFactDiff = ({ plan, fact, diff }, { plan: p1, fact: f1, diff: d1 }) => {
      return {
        plan: plan + p1,
        fact: fact + f1,
        diff: diff + d1,
      };
    },
    calcCategoriesSummary = (data) => ({
      ...data.reduce((a, { value }) => {
        return sumPlanFactDiff(a, value);
      }, zeroPlanFactDiff),
      level: 1,
    }),
    calcTotalSummary = ({
      transactions,
      storages,
      archivedTransactionsBalance,
      selectedUid,
      periodStartTimestamp,
      currencyCode,
      incomeSummaryData,
      expenseSummaryData,
      currenciesModule,
    }) => {
      const
        fromBeginTillStartIntervalProps = {
          fromTimestamp: date0,
          toTimestamp: periodStartTimestamp,
          uid: selectedUid,
        },
        totalRemainsBefore = totalRemainsInStoragesSelector(
          transactions,
          storages,
          archivedTransactionsBalance,
          fromBeginTillStartIntervalProps,
        ),
        trboc = (totalRemainsBefore) =>
          balanceToAnotherCurrency(currencyCode, totalRemainsBefore, currenciesModule) / 100,
        totalRemainsBeforeLeftOneCurrency = trboc(totalRemainsBefore),
        planDiff = incomeSummaryData.plan - expenseSummaryData.plan,
        factDiff = incomeSummaryData.fact - expenseSummaryData.fact,
        factTotal = totalRemainsBeforeLeftOneCurrency + factDiff;

      return {
        planTotal: totalRemainsBeforeLeftOneCurrency + planDiff,
        planDiff,
        factTotal,
        factDiff,
      };
    },
    compute = (s: PlanScreenState): Computed => {
      const
        newColumns = s.deps.orientationModule.orientation === Orientations.PORTRAIT ? 2 : 4,
        {
          deps: {
            personalData: { preferences: { planSelectedUid } },
            session: { uid: sessionUid },
            isAdmin,
          },
        } = s,
        correctSelectedUid = isAdmin ? planSelectedUid : sessionUid,
        {
          periodType,
          periodStartTimestamp,
          computed: { columns, selectedUid },
          currencyCode,
          mode,
          deps: {
            currenciesModule,
            personalData: { preferences: { planCollapsedCategoriesIds } },
            session,
            personalData,
            users,
            categories,
            plans,
            plannedTransactions,
            storages,
            archivedTransactionsBalance,
            categoriesSort,
            transactions,
            now,
          },
        } = s,
        periodStrings = range(0, columns)
          .map(x => {
            const periodStart = setBeginOfX(periodType)(x)(periodStartTimestamp)
            return {
              month: getMonth(periodStart),
              year: getYear(periodStart),
              universalPeriodStr: universalPeriodStrFromTimestamp(periodStart),
              periodStartTimestamp: periodStart,
            }
          }),
        allUserNamesMap = allUserNamesMapSelector({
          users,
          personalData,
          session,
        }),
        makeListProps = (type, isActive, period, periodStartTimestamp) => ({
          data: makeCategoriesData({
            plans,
            categories,
            categoriesSort,
            transactions,
            sessionUid,
            selectedUid,
            currencyCode,
            currenciesModule,
            periodStartTimestamp,
            planData: getPlan({
              categories,
              plans,
              plannedTransactions,
              currenciesModule,
              props: {
                period,
                periodType,
                uid: selectedUid,
                currencyCode,
              },
            }),
            planCollapsedCategoriesIds,
            type,
            periodType,
          }),
          isActive,
        }),
        renderProps = periodStrings.map(({ universalPeriodStr, periodStartTimestamp }) => {
          const
            expenseCategoriesListProps = makeListProps(
              'expense',
              mode === 'expense-only',
              universalPeriodStr,
              periodStartTimestamp,
            ),
            incomeCategoriesListProps = makeListProps(
              'income',
              mode === 'income-only',
              universalPeriodStr,
              periodStartTimestamp,
            )

          const
            expenseSummaryData = calcCategoriesSummary(expenseCategoriesListProps.data),
            incomeSummaryData = calcCategoriesSummary(incomeCategoriesListProps.data),
            totalSummary = calcTotalSummary({
              transactions,
              storages,
              archivedTransactionsBalance,
              selectedUid,
              periodStartTimestamp,
              currencyCode,
              incomeSummaryData,
              expenseSummaryData,
              currenciesModule,
            })

          return ({
            expenseCategoriesListProps,
            incomeCategoriesListProps,
            expenseSummary: {
              data: expenseSummaryData,
            },
            totalSummary: {
              data: totalSummary,
            },
            incomeSummary: {
              data: incomeSummaryData,
            },
            onlyPlan: periodStartTimestamp > now,
          })
        })

      return u(s.computed, computed => {
        computed.periodStrings = periodStrings
        computed.renderProps = renderProps
        computed.userName = uidIsDef(selectedUid) ?
          allUserNamesMap[selectedUid] : strings.allUsers
        computed.columns = newColumns
        computed.selectedUid = correctSelectedUid
      })
    },
    depsReducer: PlanModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => {
      if (!_navReducer) {
        throw new Error('_navReducer should be initialized')
      }

      return ({
        personalData: personalDataReducer(s.personalData, a),
        orientationModule: orientationModuleReducer(s.orientationModule, a),
        planCategoryDialog: planCategoryDialogReducer(s.planCategoryDialog, a),
        showTransactionsDialog: showTransactionsDialogReducer(s.showTransactionsDialog, a),
        currenciesModule: currenciesModuleReducer(s.currenciesModule, a),
        session: sessionModuleReducer(s.session, a),
        categories: categoriesReducer(s.categories, a),
        transactions: transactionsReducer(s.transactions, a),
        users: usersReducer(s.users, a),
        plans: plansReducer(s.plans, a),
        plannedTransactions: plannedTransactionsReducer(s.plannedTransactions, a),
        storages: storagesReducer(s.storages, a),
        archivedTransactionsBalance:
          archivedTransactionsBalanceReducer(s.archivedTransactionsBalance, a),
        categoriesSort: categoriesSortReducer(s.categoriesSort, a),
        isAdmin: isAdminReducer(s.isAdmin, a),
        now: nowReducer(s.now, a),
        windowDimensions: windowDimensionsReducer(s.windowDimensions, a),
        nav: _navReducer(s.nav, a),
      })
    }),
    initComputer = makeInitComputer(compute, 'Plan'),
    reducer: PlanModuleReducer<PlanScreenState> = (s = initialState, a) => {
      return pipe(
        s => {
          if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
            const { liveAccount: { mainCurrencyCode } } = a
            return us(s, a, s => s.currencyCode = mainCurrencyCode)
          }

          if (a.type === PICK_CURRENCY_DIALOG_DONE) {
            const { callerId, currencyCode } = a

            if (callerId === planScreenModuleId) {
              return us(s, a, s => s.currencyCode = currencyCode)
            }
          }

          if (a.type === PLAN_SCREEN_EXPENSE_BP) {
            return us(s, a, s => s.mode = 'expense-only')
          }

          if (a.type === PLAN_SCREEN_INCOME_BP) {
            return us(s, a, s => s.mode = 'income-only')
          }

          if (a.type === PLAN_SCREEN_PERIOD_PRESSED) {
            return us(s, a, s => s.periodType = s.periodType === year ? month : year)
          }
          return s
        },
        s => updateChild(s, a, 'periodStartTimestamp',
          makePeriodStartReducer(s.periodType, s.deps.now),
        ),
        s => updateChild(s, a, 'deps', depsReducer),
        initComputer(s, a),
      )(s)
    },
    planScreenReducer: PlanModuleReducer<PlanScreenState> =
      makeModuleReducer({
        reducer,
        provideNavReducer: (navReducer) => _navReducer = navReducer,
        moduleId: planScreenModuleId,
      })

  return planScreenReducer;
}

export {
  makePlanScreenReducer,
}
