/* @flow */

import { makeModuleReducer } from '../../utils/makeReducer'
import { us } from '../../utils/utils'
import { DB_REGISTER_FAIL, DB_REGISTER_STARTED, DB_REGISTER_SUCCESS } from '../dbModule/dbAC'
import {
  REGISTER_SCREEN_EMAIL_CHANGED, REGISTER_SCREEN_PASSWORD_CHANGED,
  REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED,
} from './registerScreenAC'
import { registerScreenModuleId } from './registerScreenModuleId'

import type { BaseReducer } from '../../base.flow'

export type RegisterScreenState = {|
  email: string,
  password: string,
  repeatPassword: string,
  status: $Keys<typeof RegisterScreenStatus>,
|}

const
  RegisterScreenStatus = {
    idle: 'idle',
    inProgress: 'inProgress',
    success: 'success',
    fail: 'fail',
  },
  initialState: RegisterScreenState = ({
    email: '',
    password: '',
    repeatPassword: '',
    status: 'idle',
  }),
  reducer: BaseReducer<RegisterScreenState> =
    (s = initialState, a) => {
      if (a.type === DB_REGISTER_STARTED) {
        return us(s, a, s => s.status = RegisterScreenStatus.inProgress)
      }
      if (a.type === DB_REGISTER_SUCCESS) {
        return us(s, a, s => s.status = RegisterScreenStatus.success)
      }
      if (a.type === DB_REGISTER_FAIL) {
        return us(s, a, s => s.status = RegisterScreenStatus.fail)
      }
      if (a.type === REGISTER_SCREEN_EMAIL_CHANGED) {
        return us(s, a, (s, a) => s.email = a.email)
      }
      if (a.type === REGISTER_SCREEN_PASSWORD_CHANGED) {
        return us(s, a, (s, a) => s.password = a.password)
      }
      if (a.type === REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED) {
        return us(s, a, (s, a) => s.repeatPassword = a.repeatPassword)
      }
      return s
    },
  registerScreenReducer: BaseReducer<RegisterScreenState> =
    makeModuleReducer({ reducer, moduleId: registerScreenModuleId })

export {
  registerScreenReducer,
  RegisterScreenStatus,
}
