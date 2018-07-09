/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { restoreFromBackupProgressScreenModuleId } from './restoreFromBackupProgressScreenModuleId'
import { restoreFromBackupProgressScreenReducer } from './restoreFromBackupProgressScreenReducer'

import type { SettingsModuleType } from '../../settings.flow'
import type { RestoreFromBackupProgressScreenState } from './restoreFromBackupProgressScreenReducer'

export type RestoreFromBackupProgressScreenModule =
  SettingsModuleType<RestoreFromBackupProgressScreenState>

const restoreFromBackupProgressScreenModule: RestoreFromBackupProgressScreenModule = {
  reducer: restoreFromBackupProgressScreenReducer,
  screens: isTestEnv ? {} : {
    RestoreFromBackup: require('./RestoreFromBackupScreen').RestoreFromBackupScreen,
  },
  moduleId: restoreFromBackupProgressScreenModuleId,
}

export {
  restoreFromBackupProgressScreenModule,
}
