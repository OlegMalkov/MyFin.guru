/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { editCategoryScreenMiddlewareFn } from './editCategoryScreenMiddleware'
import { editCategoryScreenReducer } from './editCategoryScreenReducer'
import { editCategoryScreenModuleId } from './editCategoryScreenModuleId'

import type { OverviewModuleType } from '../../overview.flow'
import type { EditCategoryScreenState } from './editCategoryScreenReducer'

export type EditCategoryScreenModule = OverviewModuleType<EditCategoryScreenState>

const editCategoryScreenModule: EditCategoryScreenModule = {
  reducer: editCategoryScreenReducer,
  middlewareFn: editCategoryScreenMiddlewareFn,
  screens: isTestEnv ? {} : {
    EditCategory: require('./EditCategoryScreen').EditCategoryScreen,
  },
  moduleId: editCategoryScreenModuleId,
}

export {
  editCategoryScreenModule,
}
