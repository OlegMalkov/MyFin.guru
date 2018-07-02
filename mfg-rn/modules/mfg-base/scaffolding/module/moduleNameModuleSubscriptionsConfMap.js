/* @flow */

import { appMountAC } from '../../modules/coreModule/coreAC'

import type { BaseModuleSubscriptionMaker } from '../../base.flow'

export const
  SOME_SUBSCRIPTION: 'SOME_SUBSCRIPTION' = 'SOME_SUBSCRIPTION'

type SomeSubscriptionProps = {|
  type: typeof SOME_SUBSCRIPTION,
|}

const
  someModuleSubscriptionMaker: BaseModuleSubscriptionMaker<SomeSubscriptionProps> =
    () => (resolve) => {
      resolve(appMountAC())
      return () => { /* unsubscribe here */ }
    }

export type AnyModuleNameSubscriptionsMakerProps =
  SomeSubscriptionProps

const
  moduleNameModuleSubscriptionsConfMap = {
    [SOME_SUBSCRIPTION]: someModuleSubscriptionMaker,
  }

export {
  moduleNameModuleSubscriptionsConfMap,
}
