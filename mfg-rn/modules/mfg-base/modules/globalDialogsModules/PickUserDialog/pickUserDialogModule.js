/* @flow */

import { pickUserDialogModuleId } from './pickUserDialogModuleId'
import { pickUserModuleMiddlewareFn } from './pickUserDialogModuleMiddleware'
import { pickUserDialogReducer } from './pickUserDialogReducer'

import type { PickUserDialogState } from './pickUserDialogReducer'
import type { BaseModule } from '../../../base.flow'

export type PickUserDialogModule = BaseModule<PickUserDialogState>

const
  pickUserDialogModule: PickUserDialogModule = {
    moduleId: pickUserDialogModuleId,
    reducer: pickUserDialogReducer,
    middlewareFn: pickUserModuleMiddlewareFn,
  }

export {
  pickUserDialogModule,
}
