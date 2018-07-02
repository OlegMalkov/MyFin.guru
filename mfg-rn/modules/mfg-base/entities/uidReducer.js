/* @flow */

import { __undef } from '../const'
import { ASYNC_STORAGE_REHYDRATE } from '../modules/asyncStorageModule/asyncStorageAC'
import { LOGIN_SCREEN_USER_LOGGED_IN } from '../modules/loginScreenModule/loginScreenAC'
import { memoMaxOneArgs2 } from '../utils/memo'
import { ifDefined } from '../utils/utils'

import type { BaseReducer } from '../base.flow'
import type { UID } from '../const'

const uidReducer: BaseReducer<UID> = memoMaxOneArgs2((s = __undef, a) => {
  if (a.type === LOGIN_SCREEN_USER_LOGGED_IN) {
    return a.uid
  }
  if (a.type === ASYNC_STORAGE_REHYDRATE && a.retrievedModulesState.session) {
    return ifDefined(s, a.retrievedModulesState.session.uid)
  }
  return s
})

export {
  uidReducer,
}
