/* @flow */

import { moduleNameModuleId } from './moduleNameModuleId'

import type { BaseAppState, BaseMiddlewareFn } from '../../base.flow'

const
  /* $FlowFixMe TODO remove after scaffold */
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[moduleNameModuleId],
  moduleNameModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === '') {
      const s = getModuleState(getAppState)
      console.log(s)
    }
    return null
  }

export {
  moduleNameModuleMiddlewareFn,
}
