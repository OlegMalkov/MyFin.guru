/* @flow */

import type { AnyBaseAction } from 'mfg-base/base.flow'
import type { AnyArchiveAction } from './submodules/archiveScreenModule/archiveScreenAC'
import type { AnyBackupModuleAction } from './submodules/backupModule/backupAC'
import type { AnyEditUserAction } from './submodules/editUserScreenModule/editUserScreenAC'

export const
  SETTING_SCREEN_CRYPT_BP: 'SETTING_SCREEN_CRYPT_BP' = 'SETTING_SCREEN_CRYPT_BP',
  SETTING_SCREEN_BACKUP_BP: 'SETTING_SCREEN_BACKUP_BP' = 'SETTING_SCREEN_BACKUP_BP',
  SETTING_SCREEN_LOGOUT_BP: 'SETTING_SCREEN_LOGOUT_BP' = 'SETTING_SCREEN_LOGOUT_BP',
  SETTING_SCREEN_USERS_BP: 'SETTING_SCREEN_USERS_BP' = 'SETTING_SCREEN_USERS_BP',
  SETTING_SCREEN_PERSONAL_DATA_BP: 'SETTING_SCREEN_PERSONAL_DATA_BP' =
    'SETTING_SCREEN_PERSONAL_DATA_BP',
  SETTING_SCREEN_ARCHIVE_BP: 'SETTING_SCREEN_ARCHIVE_BP' = 'SETTING_SCREEN_ARCHIVE_BP',
  SETTING_SCREEN_BACK_BP: 'SETTING_SCREEN_BACK_BP' = 'SETTING_SCREEN_BACK_BP'

type CryptBtnPressedAction = {| type: typeof SETTING_SCREEN_CRYPT_BP |}
type BackupBtnPressedAction = {| type: typeof SETTING_SCREEN_BACKUP_BP |}
type LogoutBtnPressedAction = {| type: typeof SETTING_SCREEN_LOGOUT_BP |}
type UsersBtnPressedAction = {| type: typeof SETTING_SCREEN_USERS_BP |}
type PersonalDataBtnPressed = {| type: typeof SETTING_SCREEN_PERSONAL_DATA_BP |}
type ArchiveBtnPressedAction = {| type: typeof SETTING_SCREEN_ARCHIVE_BP |}
type BackBPAction = {| type: typeof SETTING_SCREEN_BACK_BP |}

export type AnySettingsScreenAction =
  CryptBtnPressedAction
  | BackupBtnPressedAction
  | LogoutBtnPressedAction
  | UsersBtnPressedAction
  | PersonalDataBtnPressed
  | ArchiveBtnPressedAction

  | AnyBaseAction
  | AnyArchiveAction
  | AnyBackupModuleAction
  | AnyEditUserAction

export const
  settingsScreenCryptBtnPressedAC = (): CryptBtnPressedAction =>
    ({ type: SETTING_SCREEN_CRYPT_BP }),
  settingsScreenBackupBtnPressedAC = (): BackupBtnPressedAction =>
    ({ type: SETTING_SCREEN_BACKUP_BP }),
  settingsScreenLogoutBtnPressedAC = (): LogoutBtnPressedAction =>
    ({ type: SETTING_SCREEN_LOGOUT_BP }),
  settingsScreenUsersBtnPressedAC = (): UsersBtnPressedAction =>
    ({ type: SETTING_SCREEN_USERS_BP }),
  settingsScreenPersonalDataBPAC =
    (): PersonalDataBtnPressed => ({ type: SETTING_SCREEN_PERSONAL_DATA_BP }),
  settingsScreenArchiveBPAC = (): ArchiveBtnPressedAction =>
    ({ type: SETTING_SCREEN_ARCHIVE_BP }),
  settingsScreenBackBPAC = (): BackBPAction =>
    ({ type: SETTING_SCREEN_BACK_BP })
