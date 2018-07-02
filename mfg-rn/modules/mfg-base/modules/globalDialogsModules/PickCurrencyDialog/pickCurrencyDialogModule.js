/* @flow */

import { pickCurrencyDialogModuleId } from './pickCurrencyDialogModuleId'
import { pickCurrencyDialogModuleMiddlewareFn } from './pickCurrencyDialogModuleMiddleware'
import { pickCurrencyDialogReducer } from './pickCurrencyDialogReducer'

import type { PickCurrencyDialogState } from './pickCurrencyDialogReducer'
import type { BaseModule } from '../../../base.flow'

export type PickCurrencyDialogModule = BaseModule<PickCurrencyDialogState>

const pickCurrencyDialogModule: PickCurrencyDialogModule = {
  moduleId: pickCurrencyDialogModuleId,
  reducer: pickCurrencyDialogReducer,
  middlewareFn: pickCurrencyDialogModuleMiddlewareFn,
}

export {
  pickCurrencyDialogModule,
}
