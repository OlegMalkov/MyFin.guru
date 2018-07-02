/* @flow */

import { splashScreenModuleId } from './splashScreenModuleId'
import { splashScreenModuleMiddlewareFn } from './splashScreenMiddlewareFn'
import { splashScreenReducer } from './splashScreenReducer'

import type { BaseModule } from '../../base.flow'
import type { SplashScreenModuleState } from './splashScreenReducer'

export type SplashScreenModule = BaseModule<SplashScreenModuleState>

const splashScreenModule: SplashScreenModule = {
  reducer: splashScreenReducer,
  middlewareFn: splashScreenModuleMiddlewareFn,
  moduleId: splashScreenModuleId,
}

export {
  splashScreenModule,
}
