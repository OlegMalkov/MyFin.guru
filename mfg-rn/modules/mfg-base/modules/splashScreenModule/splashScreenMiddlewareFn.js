/* @flow */

import { SPLASH_SCREEN_HIDE } from '../splashScreenModule/splashScreenAC'
import { RNSplashScreenHide } from '../../rn/RN'
import type { BaseMiddlewareFn } from '../../base.flow'

const
  splashScreenModuleMiddlewareFn: BaseMiddlewareFn<> = (a) => {
    if (a.type === SPLASH_SCREEN_HIDE) {
      RNSplashScreenHide();
    }
    return null
  }

export {
  splashScreenModuleMiddlewareFn,
}
