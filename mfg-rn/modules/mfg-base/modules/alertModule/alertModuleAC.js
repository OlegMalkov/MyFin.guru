/* @flow */

import type { AnyBaseAction } from '../../base.flow'
export const
  ALERT_OPEN: 'ALERT_OPEN' = 'ALERT_OPEN',
  ALERT_DEFAULT_CLOSE: 'ALERT_DEFAULT_CLOSE' = 'ALERT_DEFAULT_CLOSE'

type ButtonProps = {|
  text: string,
  onPressAction?: AnyBaseAction,
|}

export type AlertOpenProps = {|
  title: string,
  message: string,
  buttons?: [ButtonProps] | [ButtonProps, ButtonProps] | [ButtonProps, ButtonProps, ButtonProps]
|}

type OpenAction = {| type: typeof ALERT_OPEN, ...AlertOpenProps |}
type DefaultCloseAction = {| type: typeof ALERT_DEFAULT_CLOSE |}

export type AnyAlertModuleAction =
  OpenAction
  | DefaultCloseAction

export const
  alertOpenAC = ({ title, message, buttons }: AlertOpenProps): OpenAction => ({
    type: ALERT_OPEN,
    title,
    message,
    buttons,
  }),
  alertDefaultCloseAC = (): DefaultCloseAction => ({ type: ALERT_DEFAULT_CLOSE })
