/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { archiveScreenReducer } from './archiveScreenReducer'
import { archiveScreenMiddlewareFn } from './archiveScreenMiddleware'
import { archiveScreenModuleId } from './archiveScreenModuleId'

import type { SettingsModuleType } from '../../settings.flow'
import type { ArchiveScreenState } from './archiveScreenReducer'

export type ArchiveScreenModule = SettingsModuleType<ArchiveScreenState>

const archiveScreenModule: ArchiveScreenModule = {
  reducer: archiveScreenReducer,
  middlewareFn: archiveScreenMiddlewareFn,
  screens: isTestEnv ? {} : {
    Archive: require('./ArchiveScreen').ArchiveScreen,
  },
  moduleId: archiveScreenModuleId,
}

export {
  archiveScreenModule,
}
