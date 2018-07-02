/* @flow */

import { appMountAC } from '../../modules/coreModule/coreAC'

import type { BaseModulePromiseMaker } from '../../base.flow'

export const
  SOME_PROMISE: 'SOME_PROMISE' = 'SOME_PROMISE'

type SomePromiseProps = {|
  type: typeof SOME_PROMISE,
|}

export type AnyModuleNamePromiseMakerProps =
  SomePromiseProps

export const
  somePC = (): SomePromiseProps =>
    ({ type: SOME_PROMISE })

const
  someModulePromiseMaker: BaseModulePromiseMaker<SomePromiseProps> =
    () => (resolve) => {
      resolve(appMountAC())
    }

const
  moduleNameModulePromiseConfMap = {
    [SOME_PROMISE]: someModulePromiseMaker,
  }

export {
  moduleNameModulePromiseConfMap,
}
