/* @flow */

import { isTraceEnabled } from '../../isTraceEnabled'
import { NAVIGATE } from '../../modules/navModule/navAC'

import type { BaseMiddleware } from '../../base.flow'

const
  ignoredActionType = [
    'SIDE_EFFECT_MANAGER_NEW_PROMISES',
    'SIDE_EFFECT_MANAGER_PROMISE_DONE',
  ],
  traceMiddleware: BaseMiddleware<> = () => (next) => (a) => {
    if (isTraceEnabled) {
      if (ignoredActionType.indexOf(a.type) !== -1) {
        // ignore
      } else if (a.type === NAVIGATE) {
        console.log('navigate to', a.routeName)
      } else {
        console.log('action', a.type)
      }
    }
    return next(a)
  }

export {
  traceMiddleware,
}
