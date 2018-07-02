/* @flow */

import { date0 } from '../../const'
import { makeModuleReducer } from '../../utils/makeReducer'
import { nowModuleId } from './nowModuleId'
import { NOW_SUBSCRIPTION_SYNC } from './nowSubscriptionAC'

import type { ZoneLessDateTime } from '../../global.flow'
import type { BaseReducer } from '../../base.flow'

export type Now = ZoneLessDateTime

const
  nowInitialState = date0,
  nowReducer: BaseReducer<Now> = makeModuleReducer({
    moduleId: nowModuleId, reducer: (s = nowInitialState, a) => {
      if (a.type === NOW_SUBSCRIPTION_SYNC) {
        return a.now
      }
      return s
    },
  })

export {
  nowReducer,
}
