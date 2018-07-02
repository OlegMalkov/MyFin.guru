/* @flow */

import type { NativeAppState } from './nativeAppStateReducer'

export const
  NATIVE_APP_STATE_UPDATE: 'NATIVE_APP_STATE_UPDATE' =
    'NATIVE_APP_STATE_UPDATE'

type NativeAppStateChangedAction = {|
  type: typeof NATIVE_APP_STATE_UPDATE,
  nativeAppState: NativeAppState
|}

export type AnyNativeAppStateAction = NativeAppStateChangedAction

export const
  nativeAppStateChangedAC = (nativeAppState: NativeAppState): NativeAppStateChangedAction =>
    ({ type: NATIVE_APP_STATE_UPDATE, nativeAppState })

