/* @flow */

import { makeModuleReducer } from '../../utils/makeReducer'
import { us } from '../../utils/utils'
import { LOGOUT } from './logoutScreenAC'
import { logoutScreenModuleId } from './logoutScreenModuleId'

import type { BaseReducer } from '../../base.flow'

export type LogoutScreenModuleState = {|
  isLogoutInProgress: bool,
|}

const
  initialState: LogoutScreenModuleState = {
    isLogoutInProgress: false,
  },
  reducer: BaseReducer<LogoutScreenModuleState> = (s = initialState, a) => {
    if (a.type === LOGOUT) {
      return us(s, a, s => s.isLogoutInProgress = true)
    }

    return s
  },
  logoutScreenReducer: BaseReducer<LogoutScreenModuleState> =
    makeModuleReducer({ reducer, moduleId: logoutScreenModuleId })

export {
  logoutScreenReducer,
}
