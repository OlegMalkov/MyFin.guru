/* @flow */

import { isNotTestEnv, isTestEnv } from '../isTestEnv'
import { RESTART_APP } from '../modules/coreModule/coreAC'
import { rnKeyboard, rnPlatform, RNRestart, rnStatusBar } from '../rn/RN'
import { makeModuleMiddleware } from '../utils/makeModuleMiddleware'
import { getWindowDimensions } from '../utils/myDimensions'
import {
  RN_DISMISS_KEYBOARD,
  RN_GET_PLATFORM, RN_GET_WINDOW_DIMENSIONS, RN_SET_STATUS_BAR_BACKGROUND_COLOR,
  RN_SET_STATUS_BAR_STYLE,
  rnPlatformAC, rnWindowDimensionsAC,
} from './rnAC'

import type { BaseMiddlewareFn } from '../base.flow'
import { rnModuleId } from './rnModuleId'

const
  webDimensions = { height: 1136 / 2, width: 640 / 2 },
  fn: BaseMiddlewareFn<> =
    (a) => {
      if (a.type === RN_DISMISS_KEYBOARD) {
        if (!isTestEnv) {
          rnKeyboard.dismiss()
        }
      }

      if (a.type === RESTART_APP) {
        if (!isTestEnv) {
          RNRestart();
        }
      }

      if (a.type === RN_GET_PLATFORM) {
        if (isTestEnv) {
          return { a: rnPlatformAC('ios') }
        }
        return { a: rnPlatformAC(rnPlatform.OS) }
      }

      if (isNotTestEnv) {
        if (a.type === RN_SET_STATUS_BAR_BACKGROUND_COLOR) {
          rnStatusBar.setBackgroundColor('#0279ba');
        }

        if (a.type === RN_SET_STATUS_BAR_STYLE) {
          rnStatusBar.setBarStyle('dark-content');
        }
      }

      if (a.type === RN_GET_WINDOW_DIMENSIONS) {
        const dimensions = rnPlatform.OS === 'web' ? webDimensions : getWindowDimensions()
        return { a: rnWindowDimensionsAC(dimensions) }
      }

      return null
    },
  rnMiddleware = makeModuleMiddleware({ moduleId: rnModuleId, fn })

export {
  rnMiddleware,
}
