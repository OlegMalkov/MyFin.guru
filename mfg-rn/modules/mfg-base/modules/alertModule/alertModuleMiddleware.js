/* @flow */

import { ALERT_OPEN } from './alertModuleAC'
import { alertClosePC } from './AlertModulePromiseConfMap'

import type { BaseMiddlewareFn } from '../../base.flow'
import type { AlertPromiseMakerProps } from './AlertModulePromiseConfMap'

const
  alertModuleMiddlewareFn: BaseMiddlewareFn<AlertPromiseMakerProps> = (a) => {
    if (a.type === ALERT_OPEN) {
      const { title, message, buttons } = a
      console.log(
        'opening alert: ',
        title,
        'with resolve type: ',
        buttons && buttons.length && buttons[0].onPressAction && buttons[0].onPressAction.type,
      );
      return {
        p: alertClosePC({ title, message, buttons }),
      }
    }
    return null
  }

export {
  alertModuleMiddlewareFn,
}
