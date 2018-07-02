/* @flow */

import { geoModuleId } from './geoModuleId'
import { geoModuleMiddlewareFn } from './geoModuleMiddleware'
import { geoModulePromiseConfMap } from './geoModulePromiseConfMap'
import { geoReducer } from './geoModuleReducer'

import type { BaseModule } from '../../base.flow'
import type { GeoModuleState } from './geoModuleReducer'

export type GeoModule = BaseModule<GeoModuleState>
const geoModule: GeoModule = {
  reducer: geoReducer,
  middlewareFn: geoModuleMiddlewareFn,
  moduleId: geoModuleId,
  promiseConfMap: geoModulePromiseConfMap,
}

export {
  geoModule,
}
