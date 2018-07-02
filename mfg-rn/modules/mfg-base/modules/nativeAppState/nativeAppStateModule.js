/* @flow */

import { nativeAppStateModuleId } from './nativeAppStateModuleId'
import { nativeAppStateModuleMiddlewareFn } from './nativeAppStateModuleMiddleware'
import {
  nativeAppStateModuleSubscriptionsConfMap,
} from './nativeAppStateModuleSubscriptionsConfMap'
import { nativeAppStateReducer } from './nativeAppStateReducer'

import type { BaseModule } from '../../base.flow'
import type { NativeAppState } from './nativeAppStateReducer'

export type NativeAppStateModule = BaseModule<NativeAppState>
const nativeAppStateModule: NativeAppStateModule = {
  reducer: nativeAppStateReducer,
  middlewareFn: nativeAppStateModuleMiddlewareFn,
  moduleId: nativeAppStateModuleId,
  subscriptionsConfMap: nativeAppStateModuleSubscriptionsConfMap,
}

export {
  nativeAppStateModule,
}
