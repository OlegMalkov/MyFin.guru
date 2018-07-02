/* @flow */

// import RNOrientation from 'react-native-orientation';
import { orientationModuleId } from './orientationModuleId';
import { orientationModuleReducer } from './orientationReducer'

import type { BaseModule } from '../../base.flow'
import type { OrientationModuleState } from './orientationReducer'

let
  lastRouteName,
  subscribedToOrientationsChanges = false

/* TODO 2 MFG-32 orientation module */
const orientationMiddleware = () => next => action => {
  /* if (!subscribedToOrientationsChanges) {
    subscribedToOrientationsChanges = true
    RNOrientation.addOrientationListener((orientation) => {
      let currentOrientation = Orientations.PORTRAIT
      if (orientation === Orientations.LANDSCAPE) {
        currentOrientation = Orientations.LANDSCAPE
      }
      store.dispatch(deviceOrientationChangedAC(currentOrientation))

      const { orientation: { lockedTo } } = store.getState()
      if (lockedTo !== null && currentOrientation !== lockedTo) {
        if (lockedTo === Orientations.PORTRAIT) {
          RNOrientation.lockToPortrait();
        }
      }
    });
  }
  const result = next(action)

  const { routeName } = currentPageSelector(store.getState())
  if (lastRouteName !== routeName) {
    lastRouteName = routeName
    if (routeName === 'Plan') {
      RNOrientation.unlockAllOrientations();
      store.dispatch(deviceOrientationUnlockAC())
    } else {
      RNOrientation.lockToPortrait();
      store.dispatch(deviceOrientationLockToPortraitAC())
    }
  }*/

  // return result
  return next(action)
}

export type OrientationModule = BaseModule<OrientationModuleState>
const orientationModule: OrientationModule = {
  reducer: orientationModuleReducer,
  moduleId: orientationModuleId,
}

export {
  orientationModule,
}
