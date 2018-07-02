/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { PlannedTransactions } from '../flowTypes'

const
  initialState: PlannedTransactions = {},

  plannedTransactionsReducer: BaseReducer<PlannedTransactions> = (s = initialState, a) => {
    if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
      return a.liveAccount.plannedTransactions || initialState
    }

    if (a.type === DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED) {
      return a.value || initialState
    }

    return s
  }

export {
  plannedTransactionsReducer,
}
