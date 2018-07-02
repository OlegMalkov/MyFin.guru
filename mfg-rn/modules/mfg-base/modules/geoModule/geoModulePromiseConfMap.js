/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { geoPositionRetrievedAC, geoPositionRetrieveFailAC } from './geoAC'

import type { BaseModulePromiseMaker } from '../../base.flow'
import type { GeoPosition } from '../../entities/account/live/flowTypes'

export const
  GEO_GET_POSITION_PROMISE: 'GEO_GET_POSITION_PROMISE' = 'GEO_GET_POSITION_PROMISE'

export type GeoPositionPromiseProps = {|
  type: typeof GEO_GET_POSITION_PROMISE,
|}

export type AnyGeoPromiseMakerProps =
  GeoPositionPromiseProps

export const
  geoGetPositionPC = (): GeoPositionPromiseProps =>
    ({ type: GEO_GET_POSITION_PROMISE })

const getPositionPromiseMaker: BaseModulePromiseMaker<GeoPositionPromiseProps> =
  () => (resolve) => {
    /* TODO 2 MFG-26 type navigator */
    const _navigator: any = navigator

    _navigator.geolocation.getCurrentPosition(
      (position: GeoPosition) => resolve(geoPositionRetrievedAC(position)),
      () => resolve(geoPositionRetrieveFailAC()),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 },
    )
  }

const
  geoModulePromiseConfMap = {
    [GEO_GET_POSITION_PROMISE]: getPositionPromiseMaker,
  }

export {
  geoModulePromiseConfMap,
}
