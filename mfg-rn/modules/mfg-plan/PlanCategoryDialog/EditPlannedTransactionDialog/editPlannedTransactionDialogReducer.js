/* @flow */

import { __undef } from 'mfg-base/const'
import {
  mainCurrencyCodeReducer,
} from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import {
  plannedTransactionsReducer,
} from 'mfg-base/entities/account/live/parts/plannedTransactionsReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeUpdateDepsReducer, pipe, updateChild, us } from 'mfg-base/utils/utils'
import {
  DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE,
  DB_UPDATE_PLANNED_TRANSACTION_DONE,
} from 'mfg-base/modules/dbModule/dbAC'
import {
  PICK_CURRENCY_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { PICK_DAY_DONE } from 'mfg-base/modules/globalDialogsModules/PickDayDialog/pickDayDialogAC'
import type { PlanModuleReducer } from '../../plan.flow'
import { planScreenModuleId } from '../../planScreenModuleId'
import { selectedPeriodComponentReducer } from '../../selectedPeriodReducer'
import type { SelectedPeriodComponent } from '../../selectedPeriodReducer'
import {
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS,
} from '../EditPlannedTransactionActionsDialog/editPlannedTransactionActionsDialogAC'
import {
  EDIT_PLANNED_TRANSACTION_CLOSE_DIALOG,
  EDIT_PLANNED_TRANSACTION_DIALOG_AMOUNT_CHANGED, EDIT_PLANNED_TRANSACTION_DIALOG_CANCEL_BP,
  EDIT_PLANNED_TRANSACTION_DIALOG_COMMENT_CHANGED,
  EDIT_PLANNED_TRANSACTION_DIALOG_REPEAT_EVERY_MONTH_PRESSED,
  EDIT_PLANNED_TRANSACTION_DIALOG_TAGS_CHANGED,
  EDIT_PLANNED_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED,
  OPEN_EDIT_PLANNED_TRANSACTION_DIALOG,
} from './editPlannedTransactionDialogAC'
import { planScreenModuleEditPlannedTransactionSubmoduleId } from './submoduleId'

import type { CurrencyCode, MyDay } from 'mfg-base/const'
import type { PlannedTransactions } from 'mfg-base/entities/account/live/flowTypes'

type Deps = {|
  mainCurrencyCode: CurrencyCode,
  plannedTransactions: PlannedTransactions,
  selectedPeriodComponent: SelectedPeriodComponent,
|}

export type EditPlannedTransactionDialogState = {|
  pickedAction: typeof NO_ACTION
    | typeof EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS
    | typeof EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING,
  transactionId: string,
  repeatEveryMonth: bool,
  amount: number,
  comment: string,
  tags: Array<string>,
  repeatDay: MyDay,
  currencyCode: CurrencyCode,
  opened: bool,
  deps: Deps,
|}

export const NO_ACTION = 'NO_ACTION'

const
  depsReducer: PlanModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    selectedPeriodComponent: selectedPeriodComponentReducer(s.selectedPeriodComponent, a),
    plannedTransactions: plannedTransactionsReducer(s.plannedTransactions, a),
    mainCurrencyCode: mainCurrencyCodeReducer(s.mainCurrencyCode, a),
  })),
  initialState = {
    pickedAction: NO_ACTION,
    transactionId: __undef,
    repeatEveryMonth: false,
    amount: 0,
    comment: '',
    tags: [],
    repeatDay: 'no-day',
    currencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    opened: false,
    deps: {
      mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
      plannedTransactions: getReducerInitialState(plannedTransactionsReducer),
      selectedPeriodComponent: getReducerInitialState(selectedPeriodComponentReducer),
    },
  },
  editPlannedTransactionDialogReducer: PlanModuleReducer<EditPlannedTransactionDialogState> =
    (s = initialState, a) => {
      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
        s => {
          if (a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS) {
            return us(s, a, s => s.pickedAction = EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS)
          }
          if (a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING) {
            return us(s, a,
              s => s.pickedAction = EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING,
            )
          }

          if (a.type === OPEN_EDIT_PLANNED_TRANSACTION_DIALOG) {
            return us(s, a, (s, a) => {
              const
                { transactionId } = a,
                {
                  deps: {
                    plannedTransactions,
                    selectedPeriodComponent: { computed: { selectedPeriod } },
                  },
                } = s,
                planedTransaction = plannedTransactions[transactionId]

              s.transactionId = transactionId
              s.currencyCode = s.deps.mainCurrencyCode
              s.amount = initialState.amount
              s.repeatEveryMonth = initialState.repeatEveryMonth
              s.repeatDay = initialState.repeatDay
              s.comment = initialState.comment
              s.tags = initialState.tags
              s.opened = true

              if (planedTransaction) {
                const {
                  repeatEveryMonth,
                  day,
                  amount,
                  comment,
                  tags,
                  currencyCode,
                  overriddenPeriods,
                  startDate,
                } = planedTransaction
                if (repeatEveryMonth) {
                  if (
                    selectedPeriod === startDate
                    && s.pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING
                  ) {
                    s.pickedAction = NO_ACTION
                  }

                  if (
                    s.pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING
                  ) {
                    s.repeatEveryMonth = true
                  } else if (s.pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS) {
                    s.repeatEveryMonth = false
                  }
                } else {
                  s.repeatEveryMonth = false
                  s.pickedAction = NO_ACTION
                }
                s.repeatDay = day
                s.amount = amount / 100
                s.comment = comment
                s.tags = tags || []
                s.currencyCode = currencyCode

                if (overriddenPeriods && overriddenPeriods[selectedPeriod]) {
                  const { amount, tags, comment, day } = overriddenPeriods[selectedPeriod]
                  if (amount !== undefined) {
                    s.amount = amount / 100
                  }
                  if (tags !== undefined) {
                    s.tags = tags
                  }
                  if (comment !== undefined) {
                    s.comment = comment
                  }
                  if (day !== undefined) {
                    s.repeatDay = day
                  }
                }
              }
            })
          }

          if (a.type === EDIT_PLANNED_TRANSACTION_CLOSE_DIALOG) {
            return us(s, a, s => s.pickedAction = initialState.pickedAction)
          }

          if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_AMOUNT_CHANGED) {
            return us(s, a, (s, a) => s.amount = a.amount)
          }

          if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_COMMENT_CHANGED) {
            return us(s, a, (s, a) => s.comment = a.comment)
          }

          if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_TAGS_CHANGED) {
            return us(s, a, (s, a) => s.tags = a.tags)
          }

          if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED) {
            return us(s, a, (s, a) => s.comment = a.tagsText)
          }

          if (
            a.type === EDIT_PLANNED_TRANSACTION_DIALOG_REPEAT_EVERY_MONTH_PRESSED
            && s.pickedAction === NO_ACTION
          ) {
            return us(s, a, s => s.repeatEveryMonth = !s.repeatEveryMonth)
          }

          if (a.type === PICK_DAY_DONE) {
            const { callerId, day } = a

            if (callerId === planScreenModuleId) {
              return us(s, a, s => {
                s.repeatDay = day
              })
            }
          }

          if (a.type === PICK_CURRENCY_DIALOG_DONE) {
            const { callerId } = a
            if (callerId === planScreenModuleEditPlannedTransactionSubmoduleId) {
              return us(s, a, (s, a) => s.currencyCode = a.currencyCode)
            }
          }

          if (
            a.type === EDIT_PLANNED_TRANSACTION_CLOSE_DIALOG
            || a.type === EDIT_PLANNED_TRANSACTION_DIALOG_CANCEL_BP
            || a.type === DB_UPDATE_PLANNED_TRANSACTION_DONE
            || a.type === DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE
          ) {
            return us(s, a, s => s.opened = false)
          }

          return s
        },
      )(s)
    }

export {
  editPlannedTransactionDialogReducer,
}
