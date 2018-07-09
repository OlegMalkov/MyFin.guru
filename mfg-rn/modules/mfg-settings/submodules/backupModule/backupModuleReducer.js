/* @flow */

import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { pipe, updateChild, us } from 'mfg-base/utils/utils'
import { BACKUP_EMAIL_CHANGED } from './backupAC'
import { backupModuleId } from './backupModuleId'

import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { SettingsModuleReducer } from '../../settings.flow'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'

type Deps = {
  personalData: PersonalData,
  session: Session,
}

export type BackupModuleState = {
  deps: Deps,
  editBackupEmail: string,
}

const
  depsInitialState: Deps = {
    personalData: getReducerInitialState(personalDataReducer),
    session: getReducerInitialState(sessionModuleReducer),
  },
  initialState = {
    deps: depsInitialState,
    editBackupEmail: '',
  },
  depsReducer: SettingsModuleReducer<Deps> = (s, a) => {
    return pipe(
      s => updateChild(s, a, 'personalData', personalDataReducer),
    )(s)
  },
  reducer: SettingsModuleReducer<BackupModuleState> = (s = initialState, a) => {
    if (a.type === BACKUP_EMAIL_CHANGED) {
      return us(s, a, (s, a) => s.editBackupEmail = a.text)
    }

    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  backupModuleReducer: SettingsModuleReducer<BackupModuleState> =
    makeModuleReducer({ reducer, moduleId: backupModuleId })

export {
  backupModuleReducer,
}
