/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { analyticsScreenMiddlewareFn } from './analyticsScreenMiddleware'
import { analyticsScreenReducer } from './analyticsScreenReducer'
import { analyticsScreenModuleId } from './analyticsScreenModuleId'

import type { AnalyticsModuleType } from './analytics.flow'
import type { AnalyticsScreenState } from './analyticsScreenReducer'

export type AnalyticsScreenModule = AnalyticsModuleType<AnalyticsScreenState>

const analyticsScreenModule: AnalyticsScreenModule = {
  reducer: analyticsScreenReducer,
  middlewareFn: analyticsScreenMiddlewareFn,
  screens: isTestEnv ? {} : {
    Analytics: require('./AnalyticsScreen').AnalyticsScreen,
  },
  moduleId: analyticsScreenModuleId,
}

export {
  analyticsScreenModule,
}
