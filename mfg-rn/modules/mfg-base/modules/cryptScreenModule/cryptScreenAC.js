/* @flow */

export const
  CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP: 'CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP' =
    'CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP',
  CRYPT_SCREEN_DECRYPT_ACCOUNT_BP: 'CRYPT_SCREEN_DECRYPT_ACCOUNT_BP' =
    'CRYPT_SCREEN_DECRYPT_ACCOUNT_BP',
  CRYPT_SCREEN_ENCRYPTION_PASSWORD_PROVIDED: 'CRYPT_SCREEN_ENCRYPTION_PASSWORD_PROVIDED' =
    'CRYPT_SCREEN_ENCRYPTION_PASSWORD_PROVIDED',
  CRYPT_SCREEN_BACK_BUTTON_PRESSED: 'CRYPT_SCREEN_BACK_BUTTON_PRESSED' =
    'CRYPT_SCREEN_BACK_BUTTON_PRESSED',
  CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED: 'CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED' =
    'CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED'

type EncryptAccountBP = {| type: typeof CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP |}
type DecryptAccountBP = {| type: typeof CRYPT_SCREEN_DECRYPT_ACCOUNT_BP |}
type PasswordFieldChanged = {|
  type: typeof CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED,
  password: string,
|}
type RepeatPasswordFieldChanged = {|
  type: typeof CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED,
  repeatPassword: string,
|}
type BackButtonPressedAction = {| type: typeof CRYPT_SCREEN_BACK_BUTTON_PRESSED |}
export type AnyEncryptionAction =
  | EncryptAccountBP
  | DecryptAccountBP
  | PasswordFieldChanged
  | RepeatPasswordFieldChanged

export const
  cryptScreenEncryptAccountAC = (): EncryptAccountBP => ({ type: CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP }),
  cryptScreenDecryptAccountAC = (): DecryptAccountBP => ({ type: CRYPT_SCREEN_DECRYPT_ACCOUNT_BP }),
  cryptScreenBackButtonPressedAC = (): BackButtonPressedAction => ({
    type: CRYPT_SCREEN_BACK_BUTTON_PRESSED,
  }),
  cryptScreenPasswordFieldChangedAC = (password: string): PasswordFieldChanged => ({
    type: CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED,
    password,
  }),
  cryptScreenRepeatPasswordFieldChangedAC = (repeatPassword: string): RepeatPasswordFieldChanged => ({
    type: CRYPT_SCREEN_REPEAT_PASSWORD_FIELD_CHANGED,
    repeatPassword,
  })
