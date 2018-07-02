/* @flow */

import { UTIL_GENERATE_GUID } from './utilAC'
import { utilGenerateGuidPC } from './utilPromiseConfMap'

import type { BaseMiddlewareFn } from '../../base.flow'
import type { AnyUtilPromiseMakerProps } from './utilPromiseConfMap'

const
  utilModuleMiddlewareFn: BaseMiddlewareFn<AnyUtilPromiseMakerProps> = (a) => {
    if (a.type === UTIL_GENERATE_GUID) {
      return { p: utilGenerateGuidPC(a.callerId) }
    }

    return null
  }

export {
  utilModuleMiddlewareFn,
}
