/* @flow */

export const
  NETWORK_STATE_UPDATED: 'NETWORK_STATE_UPDATED' = 'NETWORK_STATE_UPDATED'

type NetworkStateChangedAction = {| type: typeof NETWORK_STATE_UPDATED, isConnected: bool |}

export type AnyNetworkIsConnectedAction = NetworkStateChangedAction

export const
  networkStateChangedAC = (isConnected: boolean) => ({ type: NETWORK_STATE_UPDATED, isConnected })
