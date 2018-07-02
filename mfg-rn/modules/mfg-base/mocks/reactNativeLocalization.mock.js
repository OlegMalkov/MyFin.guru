/* @flow */

const ReactNativeLocalizationMock = function (localesConfig: Object) {
  return {
    ...localesConfig[Object.keys(localesConfig)[0]],
    formatString: () => '',
  }
}

export {
  ReactNativeLocalizationMock,
}
