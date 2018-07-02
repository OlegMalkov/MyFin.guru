/* @flow */

/* TODO 3 MFG-37 put proper annotations */
export type RNImpl = {
  rn: any,
  setJSExceptionHandler: any,
  rnLocalization: any,
  rnRestart: any,
  rnFirebase: any,
  rnElements: any,
  rnSimpleDialog: any,
  rnCalendar: any,
  rnSortableList: any,
  rnNavigation: any,
  rnStackNavigator: any,
  rnSplashScreen: { hide: () => any },
  createReactNavigationReduxMiddleware: any,
  createReduxBoundAddListener: any,
  codePush: any
}
let rnImpl: RNImpl

export const
  setRNImpl = (impl: RNImpl) => {
    rnImpl = impl
  },
  getRNImpl = () => {
    if (!rnImpl) {
      throw new Error('RN implementation should be initialized')
    }
    return rnImpl
  }
