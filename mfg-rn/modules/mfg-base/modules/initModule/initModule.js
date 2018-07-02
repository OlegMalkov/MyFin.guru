/* @flow */

import { initModuleId } from './initModuleId'
import { initModuleMiddlewareFn } from './initModuleMiddleware'
import { initModuleReducer } from './initModuleReducer'

import type { BaseModule } from '../../base.flow'
import type { InitModuleState } from './initModuleReducer'

export type InitModule = BaseModule<InitModuleState>

const initModule: InitModule = {
  reducer: initModuleReducer,
  middlewareFn: initModuleMiddlewareFn,
  moduleId: initModuleId,
}

export {
  initModule,
}
