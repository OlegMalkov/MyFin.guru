/* @flow */

import { APP_MOUNT } from '../coreModule/coreAC'
import { nativeAppStateSC } from './nativeAppStateModuleSubscriptionsConfMap'

import type { BaseMiddlewareFn } from '../../base.flow'
import type {
  AnyNativeAppStateSubscriptionsMakerProps,
} from './nativeAppStateModuleSubscriptionsConfMap'

type FN = BaseMiddlewareFn<void, AnyNativeAppStateSubscriptionsMakerProps>
const
  nativeAppStateModuleMiddlewareFn: FN = (a) => {
    if (a.type === APP_MOUNT) {
      return { s: nativeAppStateSC() }
    }

    return null
  }

export {
  nativeAppStateModuleMiddlewareFn,
}
