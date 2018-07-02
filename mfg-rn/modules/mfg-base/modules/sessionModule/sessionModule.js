/* @flow */

import { sessionModuleId } from './sessionModuleId'
import { sessionModuleReducer } from './sessionModuleReducer'

import type { BaseModule } from '../../base.flow'
import type { Session } from './flowTypes'

export type SessionModule = BaseModule<Session>

const
  sessionModule: SessionModule = {
    reducer: sessionModuleReducer,
    moduleId: sessionModuleId,
    persistent: true,
  }

export {
  sessionModule,
  sessionModuleReducer,
}
