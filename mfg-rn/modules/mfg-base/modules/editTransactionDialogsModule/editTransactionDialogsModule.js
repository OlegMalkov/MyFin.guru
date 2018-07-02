/* @flow */

import { editTransactionDialogsModuleMiddlewareFn } from './editTransactionDialogsModuleMiddleware'
import { editTransactionDialogsReducer } from './editTransactionDialogsReducer'
import { editTransactionDialogsModuleId } from './editTransactionDialogsModuleId'

import type { BaseModule } from '../../base.flow'
import type { EditTransactionDialogsState } from './editTransactionDialogsReducer'

export type EditTransactionDialogsModule = BaseModule<EditTransactionDialogsState>

const editTransactionDialogsModule: EditTransactionDialogsModule = {
  reducer: editTransactionDialogsReducer,
  middlewareFn: editTransactionDialogsModuleMiddlewareFn,
  moduleId: editTransactionDialogsModuleId,
};

export {
  editTransactionDialogsModule,
}
