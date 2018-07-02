/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { rnNetInfo } from '../../rn/RN'
import { networkStateChangedAC } from './networkIsConnectedAC'

import type { BaseModuleSubscriptionMaker } from '../../base.flow'

export const
  NETWORK_IS_CONNECTED_SUBSCRIPTION: 'NETWORK_IS_CONNECTED_SUBSCRIPTION'
    = 'NETWORK_IS_CONNECTED_SUBSCRIPTION'

type NetworkIsConnectedSubscriptionProps = {|
  type: typeof NETWORK_IS_CONNECTED_SUBSCRIPTION,
|}

type M = BaseModuleSubscriptionMaker<NetworkIsConnectedSubscriptionProps>
const
  networkIsConnectedSubscriptionMaker: M =
    () => (resolve) => {
      const
        handleNetworkChange = (isConnected) => {
          resolve(networkStateChangedAC(isConnected));
        };
      if (isTestEnv) {
        handleNetworkChange(true)
        return () => null
      }
      rnNetInfo.isConnected.fetch().then((isConnected) => {
        handleNetworkChange(isConnected)
        rnNetInfo.isConnected.addEventListener('connectionChange', handleNetworkChange);
      });
      return () => {
        rnNetInfo.isConnected.removeEventListener('connectionChange', handleNetworkChange);
      }
    }

export type AnyNetworkIsConnectedSubscriptionsMakerProps =
  NetworkIsConnectedSubscriptionProps

export const
  networkIsConnectedSC = (): NetworkIsConnectedSubscriptionProps =>
    ({ type: NETWORK_IS_CONNECTED_SUBSCRIPTION })

const
  networkIsConnectedModuleSubscriptionsConfMap = {
    [NETWORK_IS_CONNECTED_SUBSCRIPTION]: networkIsConnectedSubscriptionMaker,
  }

export {
  networkIsConnectedModuleSubscriptionsConfMap,
}
