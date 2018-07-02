/* @flow */

export const
  LOGOUT: 'LOGOUT' = 'LOGOUT'

type LogoutAction = {| type: typeof LOGOUT |}

export type AnyLogoutScreenModuleAction = LogoutAction

export const
  logoutAC = (): LogoutAction => ({ type: LOGOUT })
