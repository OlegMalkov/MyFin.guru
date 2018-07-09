/* @flow */

import { __undef } from 'mfg-base/const'
import { plannedTransactionsToBalance } from 'mfg-base/entities/account/live/accountSelectors'
import {
  categoriesReducer,
  getCategoryTitleByIdSelector,
} from 'mfg-base/entities/account/live/parts/categoriesReducer'
import {
  mainCurrencyCodeReducer,
} from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import {
  plannedTransactionsReducer,
} from 'mfg-base/entities/account/live/parts/plannedTransactionsReducer'
import { plansReducer } from 'mfg-base/entities/account/live/parts/plansReducer'
import { month } from 'mfg-base/entities/account/live/periodKinds'
import {
  _getPlan,
  _makeApplyEffectivePlanTransactionOverridePeriods,
  _makePlannedTransactionFilterPredicate, _plannedTransactionsByCategorySelector,
} from 'mfg-base/entities/account/live/planSelectors'
import { uidIsDef } from 'mfg-base/entities/account/live/utils'
import { balanceToMainCurrency } from 'mfg-base/entities/account/utils'
import { currenciesModuleReducer } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { monthPeriodStr } from 'mfg-base/utils/dateUtils'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeUpdateDepsReducer, path, pipe, updateChild, us } from 'mfg-base/utils/utils'
import {
  DB_UPDATE_CATEGORY_PLAN_DONE,
  DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED,
} from 'mfg-base/modules/dbModule/dbAC'
import {
  PICK_CURRENCY_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule'
import { windowHeightReducer } from 'mfg-base/rn/windowDimensionsReducer'
import { PLAN_SCREEN_CATEGORY_PLAN_PRESSED } from '../planScreenAC'
import { selectedPeriodComponentReducer } from '../selectedPeriodReducer'
import {
  editPlannedTransactionActionsDialogReducer,
} from './EditPlannedTransactionActionsDialog/editPlannedTransactionActionsDialogReducer'
import {
  editPlannedTransactionDialogReducer,
} from './EditPlannedTransactionDialog/editPlannedTransactionDialogReducer'
import {
  PLAN_SCREEN_CATEGORY_EXTENDED_PLAN_PRESSED,
  PLAN_SCREEN_CATEGORY_DIALOG_AMOUNT_CHANGED,
  PLAN_SCREEN_CATEGORY_DIALOG_CANCEL_BP,
  PLAN_SCREEN_CATEGORY_DIALOG_CLOSE,
  PLAN_SCREEN_CATEGORY_DIALOG_DELETE_PRESSED,
  PLAN_SCREEN_CATEGORY_DIALOG_REPEAT_EVERY_MONTH_PRESSED,
} from './planCategoryDialogAC'
import { planCategoryDialogModes } from './planCategoryDialogModes'
import { planScreenModulePlanCategorySubmoduleId } from './submoduleId'

import type { CategoryId, CurrencyCode, MyDate, UID } from 'mfg-base/const'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { PlanModuleReducer } from '../plan.flow'
import type {
  Categories, CategoryPlan,
  PlannedTransactions, Plans,
} from 'mfg-base/entities/account/live/flowTypes'
import type { CurrenciesModule } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'
import type { SelectedPeriodComponent } from '../selectedPeriodReducer'
import type {
  EditPlannedTransactionActionsDialogState,
} from './EditPlannedTransactionActionsDialog/editPlannedTransactionActionsDialogReducer'
import type {
  EditPlannedTransactionDialogState,
} from './EditPlannedTransactionDialog/editPlannedTransactionDialogReducer'
import type { PlannedTransactionWrapper } from './flowTypes'

type Deps = {|
  plans: Plans,
  plannedTransactions: PlannedTransactions,
  currencies: CurrenciesModule,
  editPlannedTransactionDialog: EditPlannedTransactionDialogState,
  editPlannedTransactionActionsDialog: EditPlannedTransactionActionsDialogState,
  categories: Categories,
  mainCurrencyCode: CurrencyCode,
  personalData: PersonalData,
  session: Session,
  isAdmin: bool,
  windowHeight: number,
|}

export type PlanCategoryDialogState = {|
  categoryId: CategoryId,
  periodIndex: number,
  repeatEveryMonth: bool,
  amount: number,
  currencyCode: CurrencyCode,
  effectiveSince: MyDate,
  effectiveAmount: number,
  opened: bool,
  selectedPeriodComponent: SelectedPeriodComponent,
  computed: {
    title: string,
    periodStr: string,
    selectedUid: UID,
    canDelete: bool,
    mode: 'simple' | 'extended',
    plannedTransactions: Array<PlannedTransactionWrapper>,
    totalAmount: number,
  },
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    plans: getReducerInitialState(plansReducer),
    plannedTransactions: getReducerInitialState(plannedTransactionsReducer),
    currencies: getReducerInitialState(currenciesModuleReducer),
    editPlannedTransactionDialog: getReducerInitialState(editPlannedTransactionDialogReducer),
    editPlannedTransactionActionsDialog:
      getReducerInitialState(editPlannedTransactionActionsDialogReducer),
    categories: getReducerInitialState(categoriesReducer),
    mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    personalData: getReducerInitialState(personalDataReducer),
    session: getReducerInitialState(sessionModuleReducer),
    isAdmin: getReducerInitialState(isAdminReducer),
    windowHeight: getReducerInitialState(windowHeightReducer),
  },
  initialState: PlanCategoryDialogState = {
    selectedPeriodComponent: getReducerInitialState(selectedPeriodComponentReducer),
    categoryId: __undef,
    periodIndex: 0,
    repeatEveryMonth: false,
    amount: 0,
    currencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    effectiveSince: __undef,
    effectiveAmount: 0,
    opened: false,
    computed: {
      title: '',
      periodStr: '',
      selectedUid: __undef,
      canDelete: false,
      mode: planCategoryDialogModes.simple,
      plannedTransactions: [],
      totalAmount: 0,
    },
    deps: depsInitialState,
  },
  depsReducer: PlanModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    plans: plansReducer(s.plans, a),
    plannedTransactions: plannedTransactionsReducer(s.plannedTransactions, a),
    currencies: currenciesModuleReducer(s.currencies, a),
    editPlannedTransactionDialog:
      editPlannedTransactionDialogReducer(s.editPlannedTransactionDialog, a),
    editPlannedTransactionActionsDialog:
      editPlannedTransactionActionsDialogReducer(s.editPlannedTransactionActionsDialog, a),
    personalData: personalDataReducer(s.personalData, a),
    categories: categoriesReducer(s.categories, a),
    mainCurrencyCode: mainCurrencyCodeReducer(s.mainCurrencyCode, a),
    session: sessionModuleReducer(s.session, a),
    isAdmin: isAdminReducer(s.isAdmin, a),
    windowHeight: windowHeightReducer(s.windowHeight, a),
  })),
  planCategoryDialogReducer: PlanModuleReducer<PlanCategoryDialogState> =
    (s = initialState, a) => {
      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
        s => updateChild(s, a, 'selectedPeriodComponent', selectedPeriodComponentReducer),

        s => {
          if (a.type === PLAN_SCREEN_CATEGORY_PLAN_PRESSED) {
            return us(s, a, (s, a) => {
              const
                { categoryId, periodIndex } = a,
                {
                  deps: {
                    mainCurrencyCode,
                    plans,
                    personalData: { preferences: { planSelectedUid } },
                    session: { uid: sessionUid },
                    isAdmin,
                    categories,
                    currencies,
                    plannedTransactions,
                  },
                  selectedPeriodComponent: { computed: { selectedPeriod } },
                } = s,
                selectedUid = (isAdmin && uidIsDef(planSelectedUid)) ?
                  planSelectedUid : sessionUid,
                plan: ?CategoryPlan = path([categoryId, selectedUid, selectedPeriod], plans)


              s.categoryId = categoryId
              s.periodIndex = periodIndex
              s.currencyCode = mainCurrencyCode
              s.repeatEveryMonth = initialState.repeatEveryMonth
              s.amount = initialState.amount
              s.effectiveSince = initialState.effectiveSince
              s.effectiveAmount = initialState.effectiveAmount
              s.computed.selectedUid = selectedUid
              s.computed.periodStr = monthPeriodStr(selectedPeriod)
              s.computed.title = getCategoryTitleByIdSelector(categories, categoryId)
              s.computed.canDelete = initialState.computed.canDelete
              const r = calcPlannedTransactionsAndTotalAmount(
                s,
                s.deps.plannedTransactions,
              )
              s.computed.plannedTransactions = r.plannedTransactions
              s.computed.totalAmount = r.totalAmount
              s.computed.mode = s.computed.plannedTransactions.length === 0 ?
                'simple' : 'extended'
              s.opened = true

              if (plan) {
                s.repeatEveryMonth = plan.repeatEveryMonth
                s.amount = plan.amount / 100
                s.currencyCode = plan.currencyCode
                s.computed.canDelete = true
              } else {
                const
                  planProps = {
                    currencyCode: mainCurrencyCode,
                    period: selectedPeriod,
                    uid: selectedUid,
                    periodType: month,
                  },
                  effectivePlans = _getPlan(
                    categories,
                    plans,
                    plannedTransactions,
                    currencies,
                    planProps,
                  ),
                  effectivePlan = effectivePlans[categoryId]

                s.effectiveSince = effectivePlan.effectiveSince
                s.effectiveAmount = effectivePlan.amount
              }
            })
          }

          if (a.type === DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED) {
            const r = calcPlannedTransactionsAndTotalAmount(s, a.value)
            return us(s, a, s => {
              s.computed.plannedTransactions = r.plannedTransactions
              s.computed.totalAmount = r.totalAmount
            })
          }

          if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_REPEAT_EVERY_MONTH_PRESSED) {
            return us(s, a, s => s.repeatEveryMonth = !s.repeatEveryMonth)
          }

          if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_AMOUNT_CHANGED) {
            return us(s, a, (s, a) => s.amount = a.amount)
          }

          if (a.type === PICK_CURRENCY_DIALOG_DONE) {
            const { callerId } = a
            if (callerId === planScreenModulePlanCategorySubmoduleId) {
              return us(s, a, (s, a) => s.currencyCode = a.currencyCode)
            }
          }

          if (a.type === PLAN_SCREEN_CATEGORY_EXTENDED_PLAN_PRESSED) {
            return us(s, a, s => s.computed.mode = planCategoryDialogModes.extended)
          }

          if (
            a.type === PLAN_SCREEN_CATEGORY_DIALOG_CANCEL_BP
            || a.type === PLAN_SCREEN_CATEGORY_DIALOG_CLOSE
            || a.type === PLAN_SCREEN_CATEGORY_DIALOG_DELETE_PRESSED
            || a.type === DB_UPDATE_CATEGORY_PLAN_DONE
          ) {
            return us(s, a, s => s.opened = false)
          }

          return s
        },
      )(s)
    },
  calcPlannedTransactionsAndTotalAmount = (s, newPlannedTransactions) => {
    const
      {
        selectedPeriodComponent: { computed: { selectedPeriod } },
        computed: { selectedUid },
        categoryId,
      } = s,
      plannedTransactionsByCategory =
        _plannedTransactionsByCategorySelector(newPlannedTransactions),
      filterPredicate = _makePlannedTransactionFilterPredicate(
        selectedPeriod,
        selectedUid,
      ),
      mapper = _makeApplyEffectivePlanTransactionOverridePeriods(selectedPeriod),
      plannedTransactions = pipe(
        arr => arr.filter(filterPredicate),
        arr => arr.map(transaction => {
          return ({ type: 'transaction', transaction: mapper(transaction) })
        }),
        arr => arr.sort(({ transaction: { day: d1 } }, { transaction: { day: d2 } }) => {
          let
            day1 = 0,
            day2 = 0

          if (d1 !== 'no-day') {
            day1 = d1
          }
          if (d2 !== 'no-day') {
            day2 = d2
          }

          return parseInt(day1, 10) - parseInt(day2, 10)
        }),
      )(plannedTransactionsByCategory[categoryId] || []),
      balance = plannedTransactionsToBalance(
        plannedTransactions.map(({ transaction }) => transaction),
      ),
      totalAmount = balanceToMainCurrency(balance, s.deps.currencies) / 100

    return {
      plannedTransactions,
      totalAmount,
    }
  }

export {
  planCategoryDialogReducer,
  planCategoryDialogModes,
}
