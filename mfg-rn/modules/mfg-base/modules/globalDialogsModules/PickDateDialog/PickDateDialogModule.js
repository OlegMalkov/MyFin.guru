/* @flow */

import type { BaseModule } from '../../../base.flow'
import { pickDateDialogModuleId } from './pickDateDialogModuleId'
import { pickDateDialogReducer } from './pickDateDialogReducer'

import type { PickDateDialogState } from './pickDateDialogReducer'

export type PickDateDialogModule = BaseModule<PickDateDialogState>

const
  pickDateDialogModule: PickDateDialogModule = {
    moduleId: pickDateDialogModuleId,
    reducer: pickDateDialogReducer,
  }

export {
  pickDateDialogModule,
}
