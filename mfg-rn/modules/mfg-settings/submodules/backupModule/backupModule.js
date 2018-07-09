/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { strings } from 'mfg-base/localization'
import { alertOpenAC } from 'mfg-base/modules/alertModule/alertModuleAC'
import {
  DB_SEND_BACKUP_DONE, dbSendBackupAC,
  dbUpdateBackupEmailAC,
} from 'mfg-base/modules/dbModule/dbAC'
import { backupModuleId } from './backupModuleId'
import { SEND_BACKUP_NOW_BP, BACKUP_EMAIL_CHANGED } from './backupAC'
import { backupModuleReducer } from './backupModuleReducer'

import type {
  SettingsModuleAppState, SettingsModuleMiddlewareFn,
  SettingsModuleType,
} from '../../settings.flow'
import type { BackupModuleState } from './backupModuleReducer'

const
  getModuleState = (getAppState: () => SettingsModuleAppState) => getAppState()[backupModuleId],
  middlewareFn: SettingsModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === SEND_BACKUP_NOW_BP) {
      const
        s = getModuleState(getAppState),
        { personalData: { backupEmail } } = s.deps

      if (backupEmail) {
        return {
          a: dbSendBackupAC(backupEmail),
        }
      }
      return {
        a: alertOpenAC({
          title: strings.fail,
          message: strings.emailMissing,
        }),
      }
    }

    if (a.type === DB_SEND_BACKUP_DONE) {
      return {
        a: alertOpenAC({
          title: strings.done,
          message: strings.sendBackupDone,
        }),
      }
    }

    if (a.type === BACKUP_EMAIL_CHANGED) {
      return {
        a: dbUpdateBackupEmailAC(a.text),
      }
    }

    return null
  }

export type BackupModuleModule = SettingsModuleType<BackupModuleState>
const backupModule: BackupModuleModule = {
  reducer: backupModuleReducer,
  middlewareFn,
  moduleId: backupModuleId,
  screens: isTestEnv ? {} : {
    ImportExport: require('./ImportExportScreen').ImportExportScreen,
  },
}

export {
  backupModule,
}
