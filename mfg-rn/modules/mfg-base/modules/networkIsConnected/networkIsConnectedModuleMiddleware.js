/* @flow */

import { APP_MOUNT } from '../coreModule/coreAC'
import { networkIsConnectedSC } from './networkIsConnectedModuleSubscriptionsConfMap'

import type { BaseMiddlewareFn } from '../../base.flow'
import type {
  AnyNetworkIsConnectedSubscriptionsMakerProps,
} from './networkIsConnectedModuleSubscriptionsConfMap'

type Fn = BaseMiddlewareFn<void, AnyNetworkIsConnectedSubscriptionsMakerProps>

const
  networkIsConnectedModuleMiddlewareFn: Fn = (a) => {
    if (a.type === APP_MOUNT) {
      return { s: networkIsConnectedSC() }
    }
    return null
  }

export {
  networkIsConnectedModuleMiddlewareFn,
}
