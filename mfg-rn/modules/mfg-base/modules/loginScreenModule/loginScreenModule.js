/* @flow */

import { errorMessages } from './errorMessages'
import { isTestEnv } from '../../isTestEnv'
import { strings } from '../../localization'
import { isEmptyOrUndef } from '../../utils/utils'
import { alertOpenAC } from '../alertModule/alertModuleAC'
import { DB_AUTH_FAIL, DB_AUTH_SUCCESS, dbAuthEmailPasswordAC } from '../dbModule/dbAC'
import { navigateAC } from '../navModule/navAC'
import {
  LOGIN_SCREEN_REGISTER_BP, LOGIN_SCREEN_USER_LOGGED_IN,
  loginScreenUserLoggedInAC, LOGIN_SCREEN_LOGIN_BP,
} from './loginScreenAC'
import { loginScreenModuleId } from './loginScreenModuleId'
import { loginScreenModuleReducer } from './loginScreenReducer'

import type { BaseAppState, BaseMiddlewareFn, BaseModule } from '../../base.flow'
import type { LoginScreenState } from './loginScreenReducer'

export type LoginScreenModule = BaseModule<LoginScreenState>

const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[loginScreenModuleId],
  loginScreenModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === LOGIN_SCREEN_REGISTER_BP) {
      return { a: navigateAC({ routeName: 'Register' }) }
    }

    if (a.type === LOGIN_SCREEN_USER_LOGGED_IN) {
      return { a: navigateAC({ routeName: 'Overview' }) }
    }

    if (a.type === LOGIN_SCREEN_LOGIN_BP) {
      const { computed: { email, password } } = getModuleState(getAppState)

      if (isEmptyOrUndef(email) || isEmptyOrUndef(password)) {
        return {
          a: alertOpenAC({
            title: strings.error,
            message: errorMessages.EMPTY_FIELDS,
          }),
        }
      }
      return { a: dbAuthEmailPasswordAC({ email, password }) }
    }

    if (a.type === DB_AUTH_SUCCESS) {
      const
        { computed: { email, password } } = getModuleState(getAppState),
        { uid } = a

      return { a: loginScreenUserLoggedInAC({ email, uid, password }) }
    }

    if (a.type === DB_AUTH_FAIL) {
      return {
        a: alertOpenAC({
          title: strings.error,
          message: a.message,
        }),
      }
    }

    return null
  },
  loginScreenModule: LoginScreenModule = {
    reducer: loginScreenModuleReducer,
    middlewareFn: loginScreenModuleMiddlewareFn,
    screens: isTestEnv ? {} : {
      Login: require('./LoginScreen').LoginScreen,
    },
    moduleId: loginScreenModuleId,
  }

export {
  loginScreenModule,
}
