/* @flow */

import {
  networkIsConnectedModuleId,
} from 'mfg-base/modules/networkIsConnected/networkIsConnectedModuleId'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { NETWORK_STATE_UPDATED } from './networkIsConnectedAC'

import type { BaseReducer } from '../../base.flow'

export type NetworkIsConnected = bool

export const networkIsConnectedReducer: BaseReducer<bool> = makeModuleReducer(
  {
    reducer: (s = false, a) => {
      if (a.type === NETWORK_STATE_UPDATED) {
        return a.isConnected
      }

      return s
    },
    moduleId: networkIsConnectedModuleId,
  },
)
