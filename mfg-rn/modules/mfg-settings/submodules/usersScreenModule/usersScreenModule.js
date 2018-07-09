/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { usersScreenModuleId } from './usersScreenModuleId'
import { usersScreenReducer } from './usersScreenReducer'

import type { SettingsModuleType } from '../../settings.flow'
import type { UsersScreenState } from './usersScreenReducer'

export type UsersScreenModule = SettingsModuleType<UsersScreenState>

const
  usersScreenModule: UsersScreenModule = {
    reducer: usersScreenReducer,
    screens: isTestEnv ? {} : {
      Users: require('./UsersScreen').UsersScreen,
    },
    moduleId: usersScreenModuleId,
  }

export {
  usersScreenModule,
}
