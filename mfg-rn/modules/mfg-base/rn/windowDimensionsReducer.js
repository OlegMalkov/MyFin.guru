/* @flow */

import { RN_WINDOW_DIMENSIONS } from './rnAC'

import type { Dimensions } from '../global.flow'
import type { BaseReducer } from '../base.flow'

const zeroDimensions: Dimensions = { width: 320, height: 568 }
export const
  windowDimensionsReducer: BaseReducer<Dimensions> = (s = zeroDimensions, a) => {
    if (a.type === RN_WINDOW_DIMENSIONS) {
      return a.dimensions
    }

    return s
  },
  windowHeightReducer: BaseReducer<number> = (s = zeroDimensions.height, a) => {
    if (a.type === RN_WINDOW_DIMENSIONS) {
      return a.dimensions.height
    }

    return s
  },
  windowWidthReducer: BaseReducer<number> = (s = zeroDimensions.width, a) => {
    if (a.type === RN_WINDOW_DIMENSIONS) {
      return a.dimensions.width
    }

    return s
  }

