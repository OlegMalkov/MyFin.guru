/* @flow */
/* eslint-disable */

require('./babelSetup')

require('../../rn/rnImpl')
  .setRNImpl({
    rnLocalization: require('../../mocks/reactNativeLocalization.mock').ReactNativeLocalizationMock,
    rn: {
      Platform: { OS: 'ios' },
    },
    setJSExceptionHandler: () => {
    },
    rnRestart: {},
    rnFirebase: {},
    rnElements: {},
    rnSimpleDialog: {},
    rnCalendar: {},
    rnSortableList: {},
    rnNavigation: {},
    rnStackNavigator: {},
    rnSplashScreen: { hide: () => 1 },
    createReactNavigationReduxMiddleware: () => () => (next) => (a) => next(a),
    createReduxBoundAddListener: () => 1,
    codePush: {}
  })

let cucumber = {}
let _WorldConstructor
module.exports.getCucumber = ()/* : any */ => {
  return cucumber
}

module.exports.init = ({
  BeforeAll,
  Before,
  After,
  AfterAll,
  Given,
  When,
  Then,
  setDefaultTimeout,
  setWorldConstructor
}/*: any*/) => {
  cucumber = {
    Given,
    When,
    Then,
    setDefaultTimeout,
    setWorldConstructor
  }
  const
    config = require('../../package.json').detox,
    reactotronServer = require('./reactotronServer').reactotronServer,
    uiMode = !!process.env.UI

  BeforeAll({ timeout: 120 * 1000 }, async function () {
    console.time('----- All Tests took -----')
    console.time('----- BeforeAll -----')
    /* if (uiMode) {
      reactotronServer.start()
      const detox = require('detox')
      await detox.init(config)
    }*/
    console.timeEnd('----- BeforeAll -----')
  })
  Before({ timeout: 120 * 1000 }, async function () {
    console.time('----- One Test took -----')
    /* if (uiMode) {
      await device.reloadReactNative()
    }*/
  })
  After({ timeout: 120 * 1000 }, async function () {
    console.timeEnd('----- One Test took -----')
  })
  AfterAll({ timeout: 120 * 1000 }, async function () {
    console.time('----- AfterAll -----')
    /* if (uiMode) {
      const detox = require('detox')
      await detox.cleanup()
      reactotronServer.stop()
    }*/
    console.timeEnd('----- AfterAll -----')
    console.timeEnd('----- All Tests took -----')
  })
}