/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { showHiddenStoragesScreenModuleId } from './showHiddenStoragesModuleId'
import { showHiddenStoragesScreenModuleMiddlewareFn } from './showHiddenStoragesModuleMiddleware'
import { showHiddenStoragesScreenReducer } from './showHiddenStoragesModuleReducer'

import type { OverviewModuleType } from '../../overview.flow'
import type { ShowHiddenStoragesScreenState } from './showHiddenStoragesModuleReducer'

export type ShowHiddenStoragesScreenModule =
  OverviewModuleType<ShowHiddenStoragesScreenState>

const showHiddenStoragesScreenModule: ShowHiddenStoragesScreenModule = {
  reducer: showHiddenStoragesScreenReducer,
  middlewareFn: showHiddenStoragesScreenModuleMiddlewareFn,
  moduleId: showHiddenStoragesScreenModuleId,
  screens: isTestEnv ? {} : {
    ShowHiddenStorages: require('./ShowHiddenStoragesScreen').ShowHiddenStoragesScreenScreen,
  },
}

export {
  showHiddenStoragesScreenModule,
}
