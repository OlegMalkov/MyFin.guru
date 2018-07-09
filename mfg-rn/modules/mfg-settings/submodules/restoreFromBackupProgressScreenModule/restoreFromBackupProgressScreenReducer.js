/* @flow */

import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { us } from 'mfg-base/utils/utils'
import type { SettingsModuleReducer } from '../../settings.flow'
import {
  RESTORE_FROM_BACKUP_SETTING_DATA_TO_FIREBASE, RESTORE_FROM_BACKUP_SETTING_DATA_TO_FIREBASE_DONE,
  RESTORE_FROM_BACKUP_START,
} from '../backupModule/backupAC'
import { restoreFromBackupProgressScreenModuleId } from './restoreFromBackupProgressScreenModuleId'

export type RestoreFromBackupProgressScreenState = {|
  status: 'idle' | 'parsing' | 'importing_to_firebase',
|};

type RFBPSReducer = SettingsModuleReducer<RestoreFromBackupProgressScreenState>
const
  initialState = {
    status: 'idle',
  },
  reducer: SettingsModuleReducer<RestoreFromBackupProgressScreenState> =
    (s = initialState, a) => {
      if (a.type === RESTORE_FROM_BACKUP_START) {
        return us(s, a, s => s.status = 'parsing')
      }
      if (a.type === RESTORE_FROM_BACKUP_SETTING_DATA_TO_FIREBASE) {
        return us(s, a, s => s.status = 'importing_to_firebase')
      }
      if (a.type === RESTORE_FROM_BACKUP_SETTING_DATA_TO_FIREBASE_DONE) {
        return us(s, a, s => s.status = 'idle')
      }

      return s;
    },
  restoreFromBackupProgressScreenReducer: RFBPSReducer =
    makeModuleReducer({ reducer, moduleId: restoreFromBackupProgressScreenModuleId })

export {
  restoreFromBackupProgressScreenReducer,
};
