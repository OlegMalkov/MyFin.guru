/* @flow */

import { __undef } from '../../const'
import { makeModuleReducer } from '../../utils/makeReducer'
import {
  isDefinedAndNotEmpty, makeInitComputer, pipe,
  us,
} from '../../utils/utils'
import { DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE } from '../dbModule/dbAC'
import { INIT_ENCRYPTION_PASSWORD_PROVIDED } from '../initModule/initAC'
import { LOGIN_SCREEN_USER_LOGGED_IN } from '../loginScreenModule/loginScreenAC'
import { LOGOUT } from '../logoutScreenModule/logoutScreenAC'
import { sessionModuleId } from './sessionModuleId'

import type { BaseComputer, BaseReducer } from '../../base.flow'
import type { Session } from './flowTypes'

type Computed = {| isAuthenticated: bool |}
const
  computedInitialState: Computed = {
    isAuthenticated: false,
  },
  initialState: Session = {
    email: __undef,
    password: __undef,
    uid: __undef,
    accountEncrypted: false,
    encryptionPassword: __undef,
    computed: computedInitialState,
  },
  initComputer: BaseComputer<Session> = makeInitComputer(
    (s: Session): Computed => {
      return {
        isAuthenticated: isDefinedAndNotEmpty(s.password) && isDefinedAndNotEmpty(s.email),
      }
    },
  ),
  reducer: BaseReducer<Session> = (s = initialState, a) => {
    return pipe(
      s => {
        if (a.type === LOGIN_SCREEN_USER_LOGGED_IN) {
          return us(s, a, (s, a) => {
            s.email = a.email
            s.uid = a.uid
            s.password = a.password
          })
        }

        if (a.type === LOGOUT) {
          return us(s, a, s => s.password = __undef)
        }

        if (a.type === DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE) {
          return us(s, a, (s, a) => s.accountEncrypted = a.encrypted)
        }

        if (a.type === INIT_ENCRYPTION_PASSWORD_PROVIDED) {
          return us(s, a, (s, a) => s.encryptionPassword = a.encryptionPassword)
        }
        return s
      },
      initComputer(s, a),
    )(s)
  },
  sessionModuleReducer: BaseReducer<Session> =
    makeModuleReducer({ reducer, moduleId: sessionModuleId })

export {
  sessionModuleReducer,
}
