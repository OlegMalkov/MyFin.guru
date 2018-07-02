/* @flow */

import { alertModuleId } from './alertModuleId'
import { alertModuleMiddlewareFn } from './alertModuleMiddleware'
import { alertModulePromiseConfMap } from './AlertModulePromiseConfMap'
import { alertReducer } from './alertModuleReducer'

import type { BaseModule } from '../../base.flow'
import type { AlertModuleState } from './alertModuleReducer'

export type AlertModule = BaseModule<AlertModuleState>

const alertModule: AlertModule = {
  reducer: alertReducer,
  middlewareFn: alertModuleMiddlewareFn,
  moduleId: alertModuleId,
  promiseConfMap: alertModulePromiseConfMap,
}

export {
  alertModule,
}
