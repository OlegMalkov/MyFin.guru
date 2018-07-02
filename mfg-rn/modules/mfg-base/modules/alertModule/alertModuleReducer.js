/* @flow */

import { makeModuleReducer } from '../../utils/makeReducer'
import { alertModuleId } from './alertModuleId'

import type { BaseReducer } from '../../base.flow'

export type AlertModuleState = {}

const
  initialState: AlertModuleState = {},
  reducer: BaseReducer<AlertModuleState> = (s = initialState) => {
    return s
  },
  alertReducer: BaseReducer<AlertModuleState> =
    makeModuleReducer({ reducer, moduleId: alertModuleId })

export {
  alertReducer,
}
