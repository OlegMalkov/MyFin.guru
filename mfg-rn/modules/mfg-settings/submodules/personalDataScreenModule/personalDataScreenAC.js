/* @flow */

export const
  PERSONAL_USER_NAME_INPUT_CHANGED: 'PERSONAL_USER_NAME_INPUT_CHANGED' =
    'PERSONAL_USER_NAME_INPUT_CHANGED',
  DISCONNECT_FROM_MAIN_ACCOUNT: 'DISCONNECT_FROM_MAIN_ACCOUNT' =
    'DISCONNECT_FROM_MAIN_ACCOUNT'

export type AnyPersonalDataAction =
  | {| type: typeof PERSONAL_USER_NAME_INPUT_CHANGED, userName: string |}


export const
  disconnectFromMainAccountAC = () => ({ type: DISCONNECT_FROM_MAIN_ACCOUNT }),
  personalUserNameInputChangedAC = (userName: string) => ({
    type: PERSONAL_USER_NAME_INPUT_CHANGED,
    userName,
  })
