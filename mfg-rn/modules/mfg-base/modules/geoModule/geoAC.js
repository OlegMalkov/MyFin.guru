/* @flow */

import type { GeoPosition } from '../../entities/account/live/flowTypes'
export const
  GEO_GET_POSITION: 'GEO_GET_POSITION' = 'GEO_GET_POSITION',
  GEO_POSITION_RETRIEVED: 'GEO_POSITION_RETRIEVED' = 'GEO_POSITION_RETRIEVED',
  GEO_POSITION_RETRIEVE_FAIL: 'GEO_POSITION_RETRIEVE_FAIL' = 'GEO_POSITION_RETRIEVE_FAIL'

type GetPosition = {| type: typeof GEO_GET_POSITION |}
type PositionRetrieved = {| type: typeof GEO_POSITION_RETRIEVED, position: GeoPosition |}
type PositionRetrieveFail = {| type: typeof GEO_POSITION_RETRIEVE_FAIL |}

export type AnyGeoModuleAction =
  | GetPosition
  | PositionRetrieved

export const
  geoGetPositionAC = (): GetPosition => ({ type: GEO_GET_POSITION }),
  geoPositionRetrievedAC = (position: GeoPosition): PositionRetrieved =>
    ({ type: GEO_POSITION_RETRIEVED, position }),
  geoPositionRetrieveFailAC = (): PositionRetrieveFail => ({ type: GEO_POSITION_RETRIEVE_FAIL })
