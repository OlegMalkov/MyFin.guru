/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_STORAGES_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { Storages } from '../flowTypes'

const initialState = {}

const storagesReducer: BaseReducer<Storages> = (s = initialState, a) => {
  if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
    return a.liveAccount.storages || initialState
  }

  if (a.type === DB_LIVE_ACCOUNT_STORAGES_ARRIVED) {
    return a.value || initialState
  }

  return s
}

export {
  storagesReducer,
}
