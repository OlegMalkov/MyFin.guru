/* @flow */

import { NATIVE_APP_STATE_UPDATE } from '../nativeAppState/nativeAppStateAC'
import { NativeAppStates } from '../nativeAppState/nativeAppStateReducer'
import { GEO_GET_POSITION } from './geoAC'
import { geoGetPositionPC } from './geoModulePromiseConfMap'

import type { BaseMiddlewareFn } from '../../base.flow'
import type { AnyGeoPromiseMakerProps } from './geoModulePromiseConfMap'

const
  geoModuleMiddlewareFn: BaseMiddlewareFn<AnyGeoPromiseMakerProps> = (a) => {
    if (a.type === GEO_GET_POSITION) {
      return {
        p: geoGetPositionPC(),
      }
    }

    if (a.type === NATIVE_APP_STATE_UPDATE && a.nativeAppState === NativeAppStates.active) {
      /* TODO 5 MFG-25 get approximate position first and then accurate one */
      return {
        p: geoGetPositionPC(),
      }
    }

    return null
  }

export {
  geoModuleMiddlewareFn,
}
