/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { logoutScreenModuleId } from './logoutScreenModuleId'
import { logoutScreenModuleMiddlewareFn } from './logoutScreenModuleMiddleware'
import { logoutScreenReducer } from './logoutScreenModuleReducer'

import type { BaseModule } from '../../base.flow'
import type { LogoutScreenModuleState } from './logoutScreenModuleReducer'

export type LogoutScreenModule = BaseModule<LogoutScreenModuleState>

const logoutScreenModule: LogoutScreenModule = {
  reducer: logoutScreenReducer,
  middlewareFn: logoutScreenModuleMiddlewareFn,
  moduleId: logoutScreenModuleId,
  screens: isTestEnv ? {} : {
    Logout: require('./LogoutScreenScreen').LogoutScreenScreen,
  },
}

export {
  logoutScreenModule,
}
