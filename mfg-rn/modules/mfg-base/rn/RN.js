/* @flow */

const {
  rn,
  setJSExceptionHandler,
  rnLocalization,
  rnRestart,
  rnFirebase,
  rnElements,
  rnSimpleDialog,
  rnCalendar,
  rnSortableList,
  rnNavigation,
  rnStackNavigator,
  rnSplashScreen,
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
  codePush,
} = require('./rnImpl')
  .getRNImpl()

type RNAlertButtons = Array<{| text: string, onPress: () => any |}>
export const
  rnAlert = (title: string,
    message: string,
    buttons?: RNAlertButtons,
    conf?: {| cancelable?: false |}) =>
    rn.Alert.alert(title, message, buttons),
  rnSetJSExceptionHandler = (handler: (e: Error, isFatal: bool) => any) => {
    setJSExceptionHandler(handler)
  },
  rnCreateStylesheet = (conf: Object) => rn.StyleSheet.create(conf),
  rnAsyncStorage = rn.AsyncStorage,
  rnAppState = rn.AppState,
  rnNetInfo = rn.NetInfo,
  rnKeyboard = rn.Keyboard,
  rnPlatform = rn.Platform,
  rnStatusBar = rn.StatusBar,
  rnEasing = rn.Easing,
  rnDimensions = rn.Dimensions,
  rnAppRegistry = rn.AppRegistry,
  rnAnimated = rn.Animated,
  rnNativeModules = rn.NativeModules,
  rnLayoutAnimation = rn.LayoutAnimation,
  RNLocalization = rnLocalization,
  RNRestart = rnRestart,
  RNfirebase = rnFirebase,
  RNElements = rnElements,
  RN = rn,
  RNSimpleDialog = rnSimpleDialog,
  RNCalendar = rnCalendar,
  RNSortableList = rnSortableList,
  RNNavigation = rnNavigation,
  RNStackNavigator = rnStackNavigator,
  RNSplashScreenHide = () => rnSplashScreen.hide(),
  RNCreateReactNavigationReduxMiddleware = createReactNavigationReduxMiddleware,
  RNCreateReduxBoundAddListener = createReduxBoundAddListener,
  RNCodepush = codePush

