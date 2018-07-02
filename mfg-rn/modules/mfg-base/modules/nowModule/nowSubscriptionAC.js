/* @flow */

import type { ZoneLessDateTime } from '../../global.flow'

export const
  NOW_SUBSCRIBE: 'NOW_SUBSCRIBE' = 'NOW_SUBSCRIBE',
  NOW_SUBSCRIPTION_SYNC: 'NOW_SUBSCRIPTION_SYNC' = 'NOW_SUBSCRIPTION_SYNC'


type SubscribeAction = {| type: typeof NOW_SUBSCRIBE |}

type SyncAction =
  {| type: typeof NOW_SUBSCRIPTION_SYNC, now: ZoneLessDateTime |}
  | SubscribeAction

export type AnyNowSubscriptionAction =
  SyncAction

export const
  nowSubscribeAC = () => ({ type: NOW_SUBSCRIBE }),
  nowSubscriptionSyncAC = (now: ZoneLessDateTime): SyncAction =>
    ({ type: NOW_SUBSCRIPTION_SYNC, now })
