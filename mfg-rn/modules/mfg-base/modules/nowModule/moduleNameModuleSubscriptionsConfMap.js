/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { toZoneLessDateTime } from '../../utils/dateUtils'
import { isDefined } from '../../utils/utils'
import { nowSubscriptionSyncAC } from './nowSubscriptionAC'

import type { BaseDispatch, BaseModuleSubscriptionMaker } from '../../base.flow'
import type { MyDate } from '../../const'
import type { ZoneLessDateTime } from '../../global.flow'

export const NOW_SUBSCRIPTION: 'NOW_SUBSCRIPTION' = 'NOW_SUBSCRIPTION'

type NowSubscriptionProps = {|
  type: typeof NOW_SUBSCRIPTION,
|}

const
  nowSubscriptionMaker =
    (initialDateTime: MyDate): BaseModuleSubscriptionMaker<NowSubscriptionProps> =>
      () => {
        let intervalId;

        return (dispatch: BaseDispatch<>) => {
          if (isTestEnv) {
            const dt: ZoneLessDateTime = isDefined(initialDateTime) ?
              ((initialDateTime: any): ZoneLessDateTime) : toZoneLessDateTime(Date.now())

            dispatch(nowSubscriptionSyncAC(dt))
            return () => null
          }
          const sync = () => dispatch(nowSubscriptionSyncAC(toZoneLessDateTime(Date.now())))

          sync()
          if (intervalId) {
            throw new Error('now subscription is already active')
          }
          intervalId = setInterval(sync, 30 * 1000)

          return () => clearInterval(intervalId)
        }
      }

export type AnyNowSubscriptionsMakerProps =
  NowSubscriptionProps


const
  makeNowModuleSubscriptionsConfMap =
    (initialDateTime: MyDate) => ({
      [NOW_SUBSCRIPTION]: nowSubscriptionMaker(initialDateTime),
    })

export const
  nowSC = (): NowSubscriptionProps => ({ type: NOW_SUBSCRIPTION })

export {
  makeNowModuleSubscriptionsConfMap,
}
