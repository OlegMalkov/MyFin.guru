/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { welcomeScreenModuleId } from './welcomeScreenModuleId'
import { welcomeScreenReducer } from './welcomeScreenReducer'

import type { BaseModule } from '../../base.flow'
import type { WelcomeScreenModuleState } from './welcomeScreenReducer'

export type WelcomeScreenModule = BaseModule<WelcomeScreenModuleState>

const welcomeScreenModule: WelcomeScreenModule = {
  reducer: welcomeScreenReducer,
  moduleId: welcomeScreenModuleId,
  screens: isTestEnv ? {} : {
    Welcome: require('./WelcomeScreen').WelcomeScreen,
  },
}

export {
  welcomeScreenModule,
}
