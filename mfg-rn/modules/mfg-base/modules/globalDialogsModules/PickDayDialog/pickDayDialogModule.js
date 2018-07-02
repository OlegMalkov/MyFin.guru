/* @flow */

import { pickDayDialogModuleId } from './pickDayDialogModuleId'
import { pickDayDialogReducer } from './pickDayDialogReducer'

import type { BaseModule } from '../../../base.flow'
import type { PickDayDialogState } from './pickDayDialogReducer'

export type PickDayDialogModule = BaseModule<PickDayDialogState>
const
  pickDayDialogModule: PickDayDialogModule = {
    moduleId: pickDayDialogModuleId,
    reducer: pickDayDialogReducer,
  }

export {
  pickDayDialogModule,
}
