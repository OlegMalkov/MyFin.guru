/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_USERS_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { Users } from '../flowTypes'

const
  initialState: Users = {},

  usersReducer: BaseReducer<Users> = (s = initialState, a) => {
    if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
      return a.liveAccount.users || initialState
    }

    if (a.type === DB_LIVE_ACCOUNT_USERS_ARRIVED) {
      return a.value || initialState
    }

    return s
  }

export {
  usersReducer,
}
