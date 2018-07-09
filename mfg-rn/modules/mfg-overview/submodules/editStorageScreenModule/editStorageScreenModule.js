/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { editStorageReducer } from './editStorageScreenReducer'
import { editStoragesMiddlewareFn } from './editStorageScreenMiddleware'
import { editStorageScreenModuleId } from './editStorageScreenModuleId'

import type { OverviewModuleType } from '../../overview.flow'
import type { EditStorageScreenState } from './editStorageScreenReducer'

export type EditStorageScreenModule = OverviewModuleType<EditStorageScreenState>

const editStorageScreenModule: EditStorageScreenModule = {
  reducer: editStorageReducer,
  middlewareFn: editStoragesMiddlewareFn,
  screens: isTestEnv ? {} : {
    EditStorage: require('./EditStorageScreen').EditStorageScreen,
  },
  moduleId: editStorageScreenModuleId,
}

export {
  editStorageScreenModule,
}
