/* @flow */

import { nativeAppStateModuleId } from 'mfg-base/modules/nativeAppState/nativeAppStateModuleId'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { NATIVE_APP_STATE_UPDATE } from './nativeAppStateAC'

import type { BaseReducer } from '../../base.flow'

export const NativeAppStates = {
  active: 'active',
  background: 'background',
  inactive: 'inactive',
}

export type NativeAppState = 'active' | 'background' | 'inactive'

export const nativeAppStateReducer: BaseReducer<NativeAppState> = makeModuleReducer(
  {
    reducer: (s = NativeAppStates.inactive, a) => {
      if (a.type === NATIVE_APP_STATE_UPDATE) {
        return a.nativeAppState
      }

      return s
    },
    moduleId: nativeAppStateModuleId,
  },
);
