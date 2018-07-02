/* @flow */
import { strings } from '../../localization'

export const errorMessages = Object.freeze({
  EMAIL_UNKNOWN: strings.userNotFound,
  INVALID_CREDENTIALS: strings.wrongPassword,
  SIGNUP_EMAIL_INVALID: strings.emailIsInvalid,
  SIGNUP_USERNAME_INVALID: strings.badUserName,
  SIGNUP_PASSWORD_INVALID: strings.weakPassword,
  EMPTY_FIELDS: strings.allFieldsMustBeFilled,
  PASSWORDS_SHOULD_MATCH: strings.passwordsNotMatch,
})
