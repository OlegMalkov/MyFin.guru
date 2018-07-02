/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { rnAppState } from '../../rn/RN'
import { nativeAppStateChangedAC } from './nativeAppStateAC'
import { NativeAppStates } from './nativeAppStateReducer'

import type { BaseModuleSubscriptionMaker } from '../../base.flow'

export const
  NATIVE_APP_STATE_SUBSCRIPTION: 'NATIVE_APP_STATE_SUBSCRIPTION' = 'NATIVE_APP_STATE_SUBSCRIPTION'

type NativeAppStateSubscriptionProps = {|
  type: typeof NATIVE_APP_STATE_SUBSCRIPTION,
|}

const
  nativeAppStateSubscriptionMaker: BaseModuleSubscriptionMaker<NativeAppStateSubscriptionProps> =
    () => (resolve) => {
      const listener = (state) => {
        resolve(nativeAppStateChangedAC(state));
      }
      if (isTestEnv) {
        listener(NativeAppStates.active)
        return () => null
      }
      rnAppState.addEventListener('change', listener);
      return () => {
        rnAppState.removeEventListener('change', listener);
      }
    }

export const nativeAppStateSC = (): NativeAppStateSubscriptionProps =>
  ({ type: NATIVE_APP_STATE_SUBSCRIPTION })

export type AnyNativeAppStateSubscriptionsMakerProps =
  NativeAppStateSubscriptionProps

const
  nativeAppStateModuleSubscriptionsConfMap = {
    [NATIVE_APP_STATE_SUBSCRIPTION]: nativeAppStateSubscriptionMaker,
  }

export {
  nativeAppStateModuleSubscriptionsConfMap,
}
