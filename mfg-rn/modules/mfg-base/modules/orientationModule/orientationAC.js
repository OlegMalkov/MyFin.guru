/* @flow */

import type { Orientation } from './flowTypes';

export const
  DEVICE_ORIENTATION_CHANGED: 'DEVICE_ORIENTATION_CHANGED' = 'DEVICE_ORIENTATION_CHANGED',
  DEVICE_ORIENTATION_LOCK_TO_PORTRAIT: 'DEVICE_ORIENTATION_LOCK_TO_PORTRAIT' =
    'DEVICE_ORIENTATION_LOCK_TO_PORTRAIT',
  DEVICE_ORIENTATION_UNLOCK: 'DEVICE_ORIENTATION_UNLOCK' = 'DEVICE_ORIENTATION_UNLOCK'

export type AnyOrientationAction =
  {| type: typeof DEVICE_ORIENTATION_CHANGED, orientation: Orientation |}
  | {| type: typeof DEVICE_ORIENTATION_LOCK_TO_PORTRAIT |}

export const
  deviceOrientationChangedAC = (orientation: Orientation) => ({
    type: DEVICE_ORIENTATION_CHANGED,
    orientation,
  }),
  deviceOrientationLockToPortraitAC = () => ({ type: DEVICE_ORIENTATION_LOCK_TO_PORTRAIT }),
  deviceOrientationUnlockAC = () => ({ type: DEVICE_ORIENTATION_UNLOCK })
