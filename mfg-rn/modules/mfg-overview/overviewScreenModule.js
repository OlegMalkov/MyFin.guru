/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { overviewScreenMiddlewareFn } from './overviewScreenMiddleware'
import { overviewScreenReducer } from './overviewScreenReducer'
import { overviewScreenModuleId } from './overviewScreenModuleId'

import type { OverviewModuleType } from './overview.flow'
import type { OverviewScreenState } from './overviewScreenReducer'

export type OverviewScreenModule = OverviewModuleType<OverviewScreenState>

const overviewScreenModule: OverviewScreenModule = {
  reducer: overviewScreenReducer,
  middlewareFn: overviewScreenMiddlewareFn,
  screens: isTestEnv ? {} : {
    Overview: require('./OverviewScreen').OverviewScreen,
  },
  moduleId: overviewScreenModuleId,
}

export {
  overviewScreenModule,
}
