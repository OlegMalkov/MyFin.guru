/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { moduleNameModuleId } from './moduleNameModuleId'
import { moduleNameModuleMiddlewareFn } from './moduleNameModuleMiddlewareFn'
import { moduleNameModulePromiseConfMap } from './moduleNameModulePromiseConfMap'
import { moduleNameReducer } from './moduleNameModuleReducer'
import { moduleNameModuleSubscriptionsConfMap } from './moduleNameModuleSubscriptionsConfMap'

import type { BaseModule } from '../../base.flow'
import type { ModuleNameModuleState } from './moduleNameModuleReducer'

export type ModuleNameModule = BaseModule<ModuleNameModuleState>
const moduleNameModule: ModuleNameModule = {
  reducer: moduleNameReducer,
  middlewareFn: moduleNameModuleMiddlewareFn,
  moduleId: moduleNameModuleId,
  screens: isTestEnv ? {} : {
    ModuleName: require('./ModuleNameScreen').ModuleNameScreen,
  },
  promiseConfMap: moduleNameModulePromiseConfMap,
  subscriptionsConfMap: moduleNameModuleSubscriptionsConfMap,
}

export {
  moduleNameModule,
}
