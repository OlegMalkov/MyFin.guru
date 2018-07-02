/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { makeNavReducer } from './makeNavReducer'
import { navModuleId } from './navModuleId'

import type { AppConfig, BaseModule } from '../../base.flow'
import type { NavModuleState } from './makeNavReducer'

const
  makeNavModule = (modules: Array<BaseModule<mixed>>, appConfig: AppConfig) => {
    const
      { MyNavigator, router } = (
        isTestEnv ?
          require('../../mocks/makeMyNavigatorMock').makeMyNavigatorMock :
          require('./makeMyNavigator').makeMyNavigator
      )(modules),
      navModule: BaseModule<NavModuleState> = {
        reducer: makeNavReducer(router.getStateForAction, appConfig.initialRouteName),
        moduleId: navModuleId,
      }

    return {
      navModule,
      MyNavigator,
    }
  }

export {
  makeNavModule,
}
