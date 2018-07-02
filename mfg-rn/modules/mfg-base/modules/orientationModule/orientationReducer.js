/* @flow */

import { __undef } from '../../const'
import { makeModuleReducer } from '../../utils/makeReducer'
import { us } from '../../utils/utils'
import {
  DEVICE_ORIENTATION_CHANGED, DEVICE_ORIENTATION_LOCK_TO_PORTRAIT,
  DEVICE_ORIENTATION_UNLOCK,
} from './orientationAC'
import { orientationModuleId } from './orientationModuleId'
import { Orientations } from './Orientations'

import type { Undefined } from '../../const'
import type { BaseReducer } from '../../base.flow'
import type { Orientation } from './flowTypes'

export type OrientationModuleState = {
  orientation: Orientation,
  lockedTo: Orientation | Undefined,
}

const initialState = {
  orientation: Orientations.PORTRAIT,
  lockedTo: __undef,
}
const
  reducer: BaseReducer<OrientationModuleState> = (s = initialState, a) => {
    if (a.type === DEVICE_ORIENTATION_CHANGED) {
      return us(s, a, (s, a) => s.orientation = a.orientation)
    }

    if (a.type === DEVICE_ORIENTATION_LOCK_TO_PORTRAIT) {
      return us(s, a, s => s.lockedTo = Orientations.PORTRAIT)
    }

    if (a.type === DEVICE_ORIENTATION_UNLOCK) {
      return us(s, a, s => s.lockedTo = __undef)
    }

    return s
  },
  orientationModuleReducer: BaseReducer<OrientationModuleState> =
    makeModuleReducer({ reducer, moduleId: orientationModuleId })

export {
  orientationModuleReducer,
}
