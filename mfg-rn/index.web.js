/* @flow */

require('babel-polyfill');

global.__DEV__ = true

const
  React = require('react'),
  { Mock } = require('firebase-nightlight'),
  { testDatabaseIdentities, demoDatabaseInitialState } =
    require('./modules/mfg-base/test/testData.js'),
  rnFirebase = {
    app: () => new Mock({
      database: { content: demoDatabaseInitialState },
      identities: testDatabaseIdentities,
    }).initializeApp({}),
  },
  RN = require('react-native-web'),
  setJSExceptionHandler = () => null,
  rnLocalization =
    require('./modules/mfg-base/mocks/reactNativeLocalization.mock.js').ReactNativeLocalizationMock,
  rnRestart = () => null,
  rnElements = require('react-native-elements'),
  rnSimpleDialog = require('react-native-simple-modal').default,
  rnCalendar = require('react-native-calendar').default,
  rnSortableList = require('react-native-sortable-list'),
  rnNavigation = require('react-navigation/src/react-navigation.web.js'),
  rnStackNavigator = (routeConfigMap, stackConfig) => {
    const
      { View } = RN,
      { rnCreateStylesheet } = require('./modules/mfg-base/rn/RN.js'),
      style = rnCreateStylesheet({
        width: 400,
        height: 500,
      }),
      result = (props) => {
        const
          { index, routes } = props.navigation.state,
          { routeName } = routes[index],
          Screen = props.modulesScreens[routeName].screen

        return (<View style={style}><Screen/></View>)
      }
    result.router = rnNavigation.StackRouter(routeConfigMap, stackConfig)
    return result;
  }

require('./modules/mfg-base/rn/rnImpl.js')
  .setRNImpl({
    rn: {
      ...RN, Alert: {
        alert: (title, description) => {
          console.log('alert: ', title, description)
        },
      },
    },
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
    rnSplashScreen: { hide: () => 1 },
    createReactNavigationReduxMiddleware: () => () => (next) => (a) => next(a),
    createReduxBoundAddListener: () => 1,
    codePush: {},
  })

const
  modules = [
    require('./modules/mfg-plan/planScreenModule.js').makePlanScreenModule(),
  ],
  appConf = {
    initialRouteName: 'Plan',
  },
  { App } = require('./modules/mfg-base/makeApp.js')
    .makeApp(modules, appConf);

RN.AppRegistry.registerComponent('myfinguru', () => App);

RN.AppRegistry.runApplication('myfinguru', { rootTag: document.getElementById('react-root') })

const iconFont = require('react-native-vector-icons/Fonts/MaterialIcons.ttf');
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Material Icons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(iconFontStyles));

// $FlowOk
document.head.appendChild(style);
