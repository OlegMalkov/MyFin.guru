/* @flow */

import { networkIsConnectedModuleId } from './networkIsConnectedModuleId'
import { networkIsConnectedModuleMiddlewareFn } from './networkIsConnectedModuleMiddleware'
import {
  networkIsConnectedModuleSubscriptionsConfMap,
} from './networkIsConnectedModuleSubscriptionsConfMap'
import { networkIsConnectedReducer } from './networkIsConnectedReducer'

import type { BaseModule } from '../../base.flow'
import type { NetworkIsConnected } from './networkIsConnectedReducer'

export type NetworkIsConnectedModule = BaseModule<NetworkIsConnected>

const networkIsConnectedModule: NetworkIsConnectedModule = {
  reducer: networkIsConnectedReducer,
  middlewareFn: networkIsConnectedModuleMiddlewareFn,
  moduleId: networkIsConnectedModuleId,
  subscriptionsConfMap: networkIsConnectedModuleSubscriptionsConfMap,
}

export {
  networkIsConnectedModule,
}
