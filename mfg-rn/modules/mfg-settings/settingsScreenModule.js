/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { logoutAC } from 'mfg-base/modules/logoutScreenModule/logoutScreenAC'
import { navigateAC, navigateBackAC } from 'mfg-base/modules/navModule/navAC'
import { settingsScreenReducer } from './settingScreenReducer'
import { settingsScreenModuleId } from './settingsScreenModuleId'
import {
  SETTING_SCREEN_ARCHIVE_BP, SETTING_SCREEN_BACK_BP,
  SETTING_SCREEN_BACKUP_BP,
  SETTING_SCREEN_CRYPT_BP, SETTING_SCREEN_LOGOUT_BP,
  SETTING_SCREEN_PERSONAL_DATA_BP,
} from './settingsScreenAC';

import type { SettingsModuleMiddlewareFn, SettingsModuleType } from './settings.flow'
import type { SettingsScreenState } from './settingScreenReducer'

export type SettingsScreenModule = SettingsModuleType<SettingsScreenState>

const
  middlewareFn: SettingsModuleMiddlewareFn<> = (a) => {
    if (a.type === SETTING_SCREEN_CRYPT_BP) {
      return { a: navigateAC({ routeName: 'Crypt' }) }
    }
    if (a.type === SETTING_SCREEN_BACKUP_BP) {
      return { a: navigateAC({ routeName: 'ImportExport' }) }
    }
    /*  TODO 2 MFG-65 users screen if (a.type === SETTING_SCREEN_USERS_BP) {
          store.dispatch(navigateAC({ routeName: 'Users' }))
        }*/
    if (a.type === SETTING_SCREEN_PERSONAL_DATA_BP) {
      return { a: navigateAC({ routeName: 'PersonalData' }) }
    }
    if (a.type === SETTING_SCREEN_ARCHIVE_BP) {
      return { a: navigateAC({ routeName: 'Archive' }) }
    }

    if (a.type === SETTING_SCREEN_LOGOUT_BP) {
      return { a: logoutAC() }
    }

    if (a.type === SETTING_SCREEN_BACK_BP) {
      return { a: navigateBackAC() }
    }

    return null
  },
  settingsScreenModule: SettingsScreenModule = {
    reducer: settingsScreenReducer,
    middlewareFn,
    screens: isTestEnv ? {} : {
      Settings: require('./SettingsScreen').SettingsScreen,
    },
    moduleId: settingsScreenModuleId,
  }

export {
  settingsScreenModule,
}
