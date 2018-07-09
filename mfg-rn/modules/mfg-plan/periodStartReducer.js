/* @flow */

import { date0 } from 'mfg-base/const'
import { NOW_SUBSCRIPTION_SYNC } from 'mfg-base/modules/nowModule/nowSubscriptionAC'
import {
  setBeginOfCurrentT,
  setBeginOfNextT,
  setBeginOfPrevT,
} from 'mfg-base/utils/dateUtils';
import { memoMaxOneArgs2 } from 'mfg-base/utils/memo'
import { PLAN_SCREEN_NEXT_PERIOD_BP, PLAN_SCREEN_PREVIOUS_PERIOD_BP } from './planScreenAC';

import type { AnyPlanScreenAction } from './planScreenAC'
import type { PlanModuleReducer } from './plan.flow'
import type { MyDate, PeriodType } from 'mfg-base/const'
import type { Now } from 'mfg-base/modules/nowModule/nowReducer'

const
  makePeriodStartReducer =
    memoMaxOneArgs2((type: PeriodType, now: Now): PlanModuleReducer<MyDate> => {
      const
        setBeginOfCurrent = setBeginOfCurrentT(type),
        setBeginOfPrev = setBeginOfPrevT(type),
        setBeginOfNext = setBeginOfNextT(type)

      return (s: MyDate = setBeginOfCurrent(now), a: AnyPlanScreenAction) => {
        if (a.type === PLAN_SCREEN_PREVIOUS_PERIOD_BP) {
          return setBeginOfPrev(s)
        }

        if (a.type === PLAN_SCREEN_NEXT_PERIOD_BP) {
          return setBeginOfNext(s)
        }

        if (a.type === NOW_SUBSCRIPTION_SYNC && now === date0 && s === setBeginOfCurrent(now)) {
          return setBeginOfCurrent(a.now)
        }

        return s;
      }
    })

export {
  makePeriodStartReducer,
}
