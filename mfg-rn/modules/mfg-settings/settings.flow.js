/* @flow */


import type { Module } from 'mfg-base/global.flow'
import type { BaseAppState } from 'mfg-base/base.flow'
import type { ExDispatch, XReducer, MiddlewareFn, VP } from 'mfg-base/global.flow'
import type { SettingsScreenState } from './settingScreenReducer'
import type { AnySettingsScreenAction } from './settingsScreenAC'
import type { ArchiveScreenState } from './submodules/archiveScreenModule/archiveScreenReducer'
import type { BackupModuleState } from './submodules/backupModule/backupModuleReducer'
import type {
  PersonalDataScreenState,
} from './submodules/personalDataScreenModule/personalDataScreenReducer'
import type {
  RestoreFromBackupProgressScreenState,
} from './submodules/restoreFromBackupProgressScreenModule/restoreFromBackupProgressScreenReducer'
import type { UsersScreenState } from './submodules/usersScreenModule/usersScreenReducer'

export type SettingsScreenDispatch = ExDispatch<AnySettingsScreenAction>
export type SettingsModuleReducer<S> = XReducer<S, AnySettingsScreenAction>
export type SettingsModuleAppState = {|
  ...BaseAppState,
  settingsScreen: SettingsScreenState,
  archiveScreen: ArchiveScreenState,
  backup: BackupModuleState,
  personalDataScreen: PersonalDataScreenState,
  restoreFromBackupProgressScreen: RestoreFromBackupProgressScreenState,
  usersScreen: UsersScreenState
|}
export type SettingsModuleMiddlewareFn<PP = void, SP = void> =
  MiddlewareFn<AnySettingsScreenAction, SettingsModuleAppState, PP, SP>
export type SettingsModuleVP<S> = VP<S, AnySettingsScreenAction>
export type SettingsModuleType<S> = Module<S, AnySettingsScreenAction, SettingsModuleAppState>
