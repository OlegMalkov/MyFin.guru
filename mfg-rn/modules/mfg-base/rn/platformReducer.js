/* @flow */

import { RN_PLATFORM } from './rnAC'

import type { BaseReducer } from '../base.flow'
import type { RNPlatform } from './rnAC'

export const platformReducer: BaseReducer<RNPlatform> = (s = 'unknown', a) => {
  if (a.type === RN_PLATFORM) {
    return a.platform
  }

  return s
}

