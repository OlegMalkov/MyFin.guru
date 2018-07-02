/* @flow */

import { nowSC } from './moduleNameModuleSubscriptionsConfMap'
import { NOW_SUBSCRIBE } from './nowSubscriptionAC'

import type { AnyNowSubscriptionsMakerProps } from './moduleNameModuleSubscriptionsConfMap'
import type { BaseMiddlewareFn } from '../../base.flow'

const
  nowModuleMiddlewareFn: BaseMiddlewareFn<void, AnyNowSubscriptionsMakerProps> = (a) => {
    if (a.type === NOW_SUBSCRIBE) {
      return {
        s: nowSC(),
      }
    }

    return null
  }

export {
  nowModuleMiddlewareFn,
}
