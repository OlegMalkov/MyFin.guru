/* @flow */
import { dbModuleId } from './dbModuleId'

import type { BaseAppState } from '../../base.flow'
import type { DbModuleState } from './dbModuleReducer'

export const getDbModuleState = (getAppState: () => BaseAppState): DbModuleState =>
  getAppState()[dbModuleId]
