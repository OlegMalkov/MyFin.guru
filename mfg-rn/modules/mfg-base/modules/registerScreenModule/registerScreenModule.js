/* @flow */

import { errorMessages } from '../loginScreenModule/errorMessages'
import { isTestEnv } from '../../isTestEnv'
import { strings } from '../../localization'
import { isEmptyOrUndef } from '../../utils/utils'
import { alertOpenAC } from '../alertModule/alertModuleAC'
import { DB_REGISTER_FAIL, dbRegisterEmailPasswordAC } from '../dbModule/dbAC'
import { navigateBackAC } from '../navModule/navAC'
import {
  REGISTER_SCREEN_BACK_BUTTON_PRESSED,
  REGISTER_SCREEN_PASSWORDS_NOT_MATCH,
  REGISTER_SCREEN_REGISTER_BP,
  registerScreensPasswordsNotMatchAC,
} from './registerScreenAC'
import { registerScreenModuleId } from './registerScreenModuleId'
import { registerScreenReducer } from './registerScreenReducer'

import type { BaseAppState, BaseMiddlewareFn, BaseModule } from '../../base.flow'
import type { RegisterScreenState } from './registerScreenReducer'

export type RegisterScreenModule = BaseModule<RegisterScreenState>

const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[registerScreenModuleId],
  registerScreenModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === REGISTER_SCREEN_REGISTER_BP) {
      const
        s = getModuleState(getAppState),
        { email, password, repeatPassword } = s

      if (isEmptyOrUndef(email) || isEmptyOrUndef(password)) {
        return {
          a: alertOpenAC({
            title: strings.error,
            message: errorMessages.EMPTY_FIELDS,
          }),
        }
      } else if (password !== repeatPassword) {
        return { a: registerScreensPasswordsNotMatchAC() }
      }
      return { a: dbRegisterEmailPasswordAC({ email, password }) }
    }

    if (a.type === REGISTER_SCREEN_PASSWORDS_NOT_MATCH) {
      return {
        a: alertOpenAC({
          title: strings.error,
          message: errorMessages.PASSWORDS_SHOULD_MATCH,
        }),
      }
    }

    if (a.type === DB_REGISTER_FAIL) {
      return {
        a: alertOpenAC({
          title: strings.registerFail,
          message: a.message,
        }),
      }
    }

    if (a.type === REGISTER_SCREEN_BACK_BUTTON_PRESSED) {
      return { a: navigateBackAC() }
    }

    return null
  },
  registerScreenModule: RegisterScreenModule = {
    reducer: registerScreenReducer,
    middlewareFn: registerScreenModuleMiddlewareFn,
    screens: isTestEnv ? {} : {
      Register: require('./RegisterScreen').RegisterScreen,
    },
    moduleId: registerScreenModuleId,
  }

export {
  registerScreenModule,
}
