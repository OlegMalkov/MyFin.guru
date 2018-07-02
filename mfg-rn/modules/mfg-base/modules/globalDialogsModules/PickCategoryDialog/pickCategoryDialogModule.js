/* @flow */

import { pickCategoryDialogModuleId } from './pickCategoryDialogModuleId'
import { pickCategoryDialogReducer } from './pickCategoryDialogReducer'

import type { BaseModule } from '../../../base.flow'
import type { PickCategoryDialogState } from './pickCategoryDialogReducer'

export type PickCategoryDialogModule = BaseModule<PickCategoryDialogState>

const pickCategoryDialogModule: PickCategoryDialogModule = {
  moduleId: pickCategoryDialogModuleId,
  reducer: pickCategoryDialogReducer,
}

export {
  pickCategoryDialogModule,
}
