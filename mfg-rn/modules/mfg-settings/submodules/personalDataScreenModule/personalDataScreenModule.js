/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { personalDataScreenModuleMiddlewareFn } from './personalDataModuleMiddleware'
import { personalDataScreenReducer } from './personalDataScreenReducer'
import { personalDataScreenModuleId } from './personalDataScreenModuleId'

import type { SettingsModuleType } from '../../settings.flow'
import type { PersonalDataScreenState } from './personalDataScreenReducer'

export type PersonalDataScreenModule = SettingsModuleType<PersonalDataScreenState>

const personalDataScreenModule: PersonalDataScreenModule = {
  reducer: personalDataScreenReducer,
  middlewareFn: personalDataScreenModuleMiddlewareFn,
  screens: isTestEnv ? {} : {
    PersonalData: require('./PersonalDataScreen').PersonalDataScreen,
  },
  moduleId: personalDataScreenModuleId,
}

export {
  personalDataScreenModule,
}
