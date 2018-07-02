/* @flow */

import type { EMAIL, UID } from '../../const'

export const
  LOGIN_SCREEN_REGISTER_BP: 'LOGIN_SCREEN_REGISTER_BP' = 'LOGIN_SCREEN_REGISTER_BP',
  LOGIN_SCREEN_LOGIN_BP: 'LOGIN_SCREEN_LOGIN_BP' = 'LOGIN_SCREEN_LOGIN_BP',
  LOGIN_SCREEN_USER_LOGGED_IN: 'LOGIN_SCREEN_USER_LOGGED_IN' = 'LOGIN_SCREEN_USER_LOGGED_IN',
  LOGIN_SCREEN_EMAIL_CHANGED: 'LOGIN_SCREEN_EMAIL_CHANGED' = 'LOGIN_SCREEN_EMAIL_CHANGED',
  LOGIN_SCREEN_PASSWORD_CHANGED: 'LOGIN_SCREEN_PASSWORD_CHANGED' = 'LOGIN_SCREEN_PASSWORD_CHANGED'

type UserLoggedInActionProps = {| email: EMAIL, uid: UID, password: string |}
type UserLoggedInAction = {|
  type: typeof LOGIN_SCREEN_USER_LOGGED_IN,
  ...UserLoggedInActionProps
|}
type RegisterButtonPressedAction = {| type: typeof LOGIN_SCREEN_REGISTER_BP |}
type LoginButtonPressedAction = {| type: typeof LOGIN_SCREEN_LOGIN_BP |}
type EmailChangedAction = {| type: typeof LOGIN_SCREEN_EMAIL_CHANGED, email: EMAIL |}
type PasswordChangedAction = {| type: typeof LOGIN_SCREEN_PASSWORD_CHANGED, password: EMAIL |}

export type AnyLoginScreenAction =
  RegisterButtonPressedAction
  | LoginButtonPressedAction
  | UserLoggedInAction
  | EmailChangedAction
  | PasswordChangedAction

export const
  loginScreenRegisterButtonPressedAC = () => ({ type: LOGIN_SCREEN_REGISTER_BP }),
  loginScreenLoginButtonPressedAC = (): LoginButtonPressedAction =>
    ({ type: LOGIN_SCREEN_LOGIN_BP }),
  loginScreenUserLoggedInAC =
    ({ email, uid, password }: UserLoggedInActionProps): UserLoggedInAction =>
      ({
        type: LOGIN_SCREEN_USER_LOGGED_IN,
        email,
        uid,
        password,
      }),
  loginScreenEmailChangedAC = (email: EMAIL): EmailChangedAction =>
    ({ type: LOGIN_SCREEN_EMAIL_CHANGED, email }),
  loginScreenPasswordChangedAC = (password: string): PasswordChangedAction =>
    ({ type: LOGIN_SCREEN_PASSWORD_CHANGED, password })
