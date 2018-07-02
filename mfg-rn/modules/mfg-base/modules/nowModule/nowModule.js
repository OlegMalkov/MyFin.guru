/* @flow */

import { date0 } from '../../const'
import { nowModuleId } from './nowModuleId'
import {
  makeNowModuleSubscriptionsConfMap,
} from './moduleNameModuleSubscriptionsConfMap'
import { nowModuleMiddlewareFn } from './nowModuleMiddleware'
import { nowReducer } from './nowReducer'

import type { ZoneLessDateTime } from '../../global.flow'
import type { AppConfig, BaseModule } from '../../base.flow'

export type NowModule = BaseModule<ZoneLessDateTime>
const makeNowModule = (appConfig: AppConfig): NowModule => ({
  reducer: nowReducer,
  middlewareFn: nowModuleMiddlewareFn,
  moduleId: nowModuleId,
  subscriptionsConfMap: makeNowModuleSubscriptionsConfMap(appConfig.testInitialDateTime || date0),
})

export {
  makeNowModule,
}
