/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_PLANS_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { Plans } from '../flowTypes'

const initialState: Plans = {}

const plansReducer: BaseReducer<Plans> = (s = initialState, a) => {
  if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
    return a.liveAccount.plans || initialState
  }

  if (a.type === DB_LIVE_ACCOUNT_PLANS_ARRIVED) {
    return a.value || initialState
  }

  return s
}

export {
  plansReducer,
}
