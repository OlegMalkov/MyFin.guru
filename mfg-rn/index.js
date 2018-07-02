/* @flow */

const
  rn = require('react-native'),
  setJSExceptionHandler = require('react-native-exception-handler').setJSExceptionHandler,
  rnLocalization = require('react-native-localization').default,
  rnRestart = require('react-native-restart').Restart,
  rnFirebase = require('react-native-firebase').default,
  rnElements = require('react-native-elements'),
  rnSimpleDialog = require('react-native-simple-modal').default,
  rnCalendar = require('react-native-calendar').default,
  rnSortableList = require('react-native-sortable-list'),
  rnNavigation = require('react-navigation'),
  rnStackNavigator = rnNavigation.StackNavigator,
  rnSplashScreen = require('react-native-splash-screen').default,
  { createReactNavigationReduxMiddleware, createReduxBoundAddListener } =
    require('react-navigation-redux-helpers'),
  codePush = require('react-native-code-push')

require('mfg-base/rn/rnImpl')
  .setRNImpl({
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
  })

if (process.env.NODE_ENV !== 'production') {
  const reactotron = require('reactotron-react-native').default
  require('mfg-base/store/reactotron.js')
    .initReactotron(reactotron)
  require('./ReactotronConfig')
}
const { App } = require('mfg-base/makeApp.js')
  .makeApp([
    ...require('./modules/mfg-overview/overviewModulesRegistry.js').overviewModuleRegistry,
    ...require('./modules/mfg-plan/planModuleRegistry.js').planModuleRegistry,
    ...require('./modules/mfg-settings/settingsModuleRegistry.js').settingsModuleRegistry,
  ], {
    enableCodePush: true,
  });

rn.AppRegistry.registerComponent('mfg', () => App);

/*
import { Sentry } from 'react-native-sentry';

if (process.env.NODE_ENV === 'production') {
  Sentry.config('https://5b70da978f87458cbd6101ba6a09659c:9fdd4f4d124c4a2191dea6b4e55d1697@sentry.io/188078').install();
}
*/
