/* @flow */

import { rnAlert } from '../../rn/RN'
import { strings } from '../../localization'
import { alertDefaultCloseAC } from './alertModuleAC'

import type { BaseModulePromiseMaker } from '../../base.flow'
import type { AlertOpenProps } from './alertModuleAC'

export const
  ALERT_CLOSE_PROMISE: 'ALERT_CLOSE_PROMISE' = 'ALERT_CLOSE_PROMISE'

type AlertClosePromiseProps = {|
  type: typeof ALERT_CLOSE_PROMISE,
  ...AlertOpenProps,
|}

const
  alertClosePromiseMaker: BaseModulePromiseMaker<AlertClosePromiseProps> =
    ({ title, message, buttons }) => (resolve) => {
      rnAlert(
        title,
        message,
        (buttons || [{ text: strings.ok, onPressAction: alertDefaultCloseAC() }])
          .map(({ text, onPressAction }) => ({
            text,
            onPress: onPressAction ? () => resolve(onPressAction) : () => null,
          })),
        { cancelable: false },
      )
    }

export const
  alertClosePC = ({ title, message, buttons }: AlertOpenProps): AlertClosePromiseProps =>
    ({ type: ALERT_CLOSE_PROMISE, title, message, buttons })

export type AlertPromiseMakerProps =
  AlertClosePromiseProps

const
  alertModulePromiseConfMap = {
    [ALERT_CLOSE_PROMISE]: alertClosePromiseMaker,
  }

export {
  alertModulePromiseConfMap,
}
