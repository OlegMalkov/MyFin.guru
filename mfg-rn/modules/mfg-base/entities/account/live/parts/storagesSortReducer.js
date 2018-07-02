/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { StoragesSort } from '../flowTypes'

const initialState = {}

const storagesSortReducer: BaseReducer<StoragesSort> = (s = initialState, a) => {
  if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
    return a.liveAccount.storagesSort || initialState
  }

  if (a.type === DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED) {
    return a.value || initialState
  }

  return s
}

export {
  storagesSortReducer,
}
