/* @flow */

import { __undef } from 'mfg-base/const'
import {
  plannedTransactionsReducer,
} from 'mfg-base/entities/account/live/parts/plannedTransactionsReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { pipe, updateChild, us } from 'mfg-base/utils/utils'
import { selectedPeriodComponentReducer } from '../../selectedPeriodReducer'
import { PLAN_SCREEN_CATEGORY_DIALOG_PLANNED_TRANSACTION_PRESSED } from '../planCategoryDialogAC'
import {
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_CLOSE,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_ALL_FOLLOWING,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_THIS,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS,
} from './editPlannedTransactionActionsDialogAC'

import type { PlanModuleReducer } from '../../plan.flow'
import type { PlannedTransactions } from 'mfg-base/entities/account/live/flowTypes'
import type { SelectedPeriodComponent } from '../../selectedPeriodReducer'

type Deps = {|
  plannedTransactions: PlannedTransactions,
  selectedPeriodComponent: SelectedPeriodComponent,
|}

export type EditPlannedTransactionActionsDialogState = {
  transactionId: string,
  opened: bool,
  computed: {|
    isRepeating: bool,
  |},
  deps: Deps,
}

type EditPlannedTransactionActionsDialogReducer =
  PlanModuleReducer<EditPlannedTransactionActionsDialogState>

const
  depsInitialState: Deps = {
    plannedTransactions: getReducerInitialState(plannedTransactionsReducer),
    selectedPeriodComponent: getReducerInitialState(selectedPeriodComponentReducer),
  },
  initialState = {
    transactionId: __undef,
    opened: false,
    computed: {
      isRepeating: false,
    },
    deps: depsInitialState,
  },
  depsReducer: PlanModuleReducer<Deps> = (s, a) => {
    return pipe(
      s => updateChild(s, a, 'selectedPeriodComponent', selectedPeriodComponentReducer),
      s => updateChild(s, a, 'plannedTransactions', plannedTransactionsReducer),
    )(s)
  },
  editPlannedTransactionActionsDialogReducer: EditPlannedTransactionActionsDialogReducer =
    (s = initialState, a) => {
      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
        s => {
          if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_PLANNED_TRANSACTION_PRESSED) {
            return us(s, a, (s, a) => {
              s.transactionId = a.transactionId
              const transaction = s.deps.plannedTransactions[a.transactionId]
              s.computed.isRepeating = transaction.repeatEveryMonth
              s.opened = true
            })
          }

          if (
            a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_CLOSE
            || a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_ALL_FOLLOWING
            || a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_THIS
            || a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING
            || a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS
          ) {
            return us(s, a, s => s.opened = false)
          }
          return s
        },
      )(s)
    }

export {
  editPlannedTransactionActionsDialogReducer,
}
