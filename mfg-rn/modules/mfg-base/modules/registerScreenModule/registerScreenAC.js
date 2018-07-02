/* @flow */

import type { EMAIL } from '../../const'

export const
  REGISTER_SCREEN_EMAIL_CHANGED: 'REGISTER_SCREEN_EMAIL_CHANGED' =
    'REGISTER_SCREEN_EMAIL_CHANGED',
  REGISTER_SCREEN_PASSWORD_CHANGED: 'REGISTER_SCREEN_PASSWORD_CHANGED' =
    'REGISTER_SCREEN_PASSWORD_CHANGED',
  REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED: 'REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED' =
    'REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED',
  REGISTER_SCREEN_REGISTER_BP: 'REGISTER_SCREEN_REGISTER_BP' =
    'REGISTER_SCREEN_REGISTER_BP',
  REGISTER_SCREEN_PASSWORDS_NOT_MATCH: 'REGISTER_SCREEN_PASSWORDS_NOT_MATCH' =
    'REGISTER_SCREEN_PASSWORDS_NOT_MATCH',
  REGISTER_SCREEN_BACK_BUTTON_PRESSED: 'REGISTER_SCREEN_BACK_BUTTON_PRESSED' =
    'REGISTER_SCREEN_BACK_BUTTON_PRESSED'

type EmailChangedAction =
  {| type: typeof REGISTER_SCREEN_EMAIL_CHANGED, email: EMAIL |}

type PasswordChangedAction =
  {| type: typeof REGISTER_SCREEN_PASSWORD_CHANGED, password: string |}

type RepeatPasswordChangedAction =
  {| type: typeof REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED, repeatPassword: string |}

type RegisterButtonPressedAction =
  {| type: typeof REGISTER_SCREEN_REGISTER_BP |}

type PasswordsNotMatchAction =
  {| type: typeof REGISTER_SCREEN_PASSWORDS_NOT_MATCH |}

type BackButtonPressedAction =
  {| type: typeof REGISTER_SCREEN_BACK_BUTTON_PRESSED |}

export type AnyRegisterScreenAction =
  EmailChangedAction
  | PasswordChangedAction
  | RepeatPasswordChangedAction
  | RegisterButtonPressedAction
  | PasswordsNotMatchAction


export const
  registerScreenEmailChangedAC = (email: EMAIL): EmailChangedAction =>
    ({ type: REGISTER_SCREEN_EMAIL_CHANGED, email }),
  registerScreenPasswordChangedAC = (password: string): PasswordChangedAction =>
    ({ type: REGISTER_SCREEN_PASSWORD_CHANGED, password }),
  registerScreenRepeatPasswordChangedAC =
    (repeatPassword: string): RepeatPasswordChangedAction =>
      ({ type: REGISTER_SCREEN_REPEAT_PASSWORD_CHANGED, repeatPassword }),
  registerScreenRegisterButtonPressedAC = (): RegisterButtonPressedAction =>
    ({ type: REGISTER_SCREEN_REGISTER_BP }),
  registerScreensPasswordsNotMatchAC = (): PasswordsNotMatchAction =>
    ({ type: REGISTER_SCREEN_PASSWORDS_NOT_MATCH }),
  registerScreenBackButtonPressedAC = (): BackButtonPressedAction => ({
    type: REGISTER_SCREEN_BACK_BUTTON_PRESSED,
  })
