/* @flow */

import { settingsScreenModule } from './settingsScreenModule'
import { archiveScreenModule } from './submodules/archiveScreenModule/archiveScreenModule'
import { backupModule } from './submodules/backupModule/backupModule'
import { editUserScreenModule } from './submodules/editUserScreenModule/editUserScreenModule'
import {
  personalDataScreenModule,
} from './submodules/personalDataScreenModule/personalDataScreenModule'
import {
  restoreFromBackupProgressScreenModule,
} from './submodules/restoreFromBackupProgressScreenModule/restoreFromBackupProgressScreenModule'
import { usersScreenModule } from './submodules/usersScreenModule/usersScreenModule'
export const settingsModuleRegistry = [
  settingsScreenModule,
  archiveScreenModule,
  backupModule,
  editUserScreenModule,
  personalDataScreenModule,
  restoreFromBackupProgressScreenModule,
  usersScreenModule,
]
