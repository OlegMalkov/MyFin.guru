/* @flow */

import { SPLASH_SCREEN_HIDE } from './splashScreenAC'
import { makeModuleReducer } from '../../utils/makeReducer'
import { splashScreenModuleId } from './splashScreenModuleId'

import type { BaseReducer } from '../../base.flow'

export type SplashScreenModuleState = {|
  hidden: bool,
|}

const
  initialState: SplashScreenModuleState = {
    hidden: false,
  },
  reducer: BaseReducer<SplashScreenModuleState> = (s = initialState, a) => {
    if (a.type === SPLASH_SCREEN_HIDE) {
      return {
        hidden: true,
      }
    }
    return s
  },
  splashScreenReducer: BaseReducer<SplashScreenModuleState> =
    makeModuleReducer({ reducer, moduleId: splashScreenModuleId })

export {
  splashScreenReducer,
}
