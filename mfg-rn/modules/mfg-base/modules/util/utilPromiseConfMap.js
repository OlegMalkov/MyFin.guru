/* @flow */

import { makeGuid } from '../../utils/makeGuid'
import { utilGuidGeneratedAC } from './utilAC'

import type { BaseModulePromiseMaker } from '../../base.flow'

export const
  UTIL_GENERATE_GUID_PROMISE: 'UTIL_GENERATE_GUID_PROMISE' = 'UTIL_GENERATE_GUID_PROMISE'

export type UtilGenerateGuidPromiseProps = {|
  type: typeof UTIL_GENERATE_GUID_PROMISE,
  callerId: string,
|}

export type AnyUtilPromiseMakerProps =
  UtilGenerateGuidPromiseProps

export const
  utilGenerateGuidPC = (callerId: string): UtilGenerateGuidPromiseProps =>
    ({ type: UTIL_GENERATE_GUID_PROMISE, callerId })

const
  generateGuidPromiseMaker: BaseModulePromiseMaker<AnyUtilPromiseMakerProps> =
    ({ callerId }) => (resolve) => {
      resolve(utilGuidGeneratedAC({ guid: makeGuid(), callerId }))
    }

const
  utilModulePromiseConfMap = {
    [UTIL_GENERATE_GUID_PROMISE]: generateGuidPromiseMaker,
  }

export {
  utilModulePromiseConfMap,
}
