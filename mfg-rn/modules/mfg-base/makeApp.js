/* @flow */

import { RNCodepush } from './rn/RN'
import React from 'react'
import { Provider } from 'react-redux'
import { CoreContainer } from './CoreContainer'
import { makeStore } from './store/makeStore'

import type { AppConfig } from './base.flow'
import type { AnyModule } from './global.flow'

function makeApp(
  modules: Array<AnyModule> = [],
  appConf: AppConfig = ({}: any),
) {
  if (!console.time) {
    console.time = () => 0
  }
  if (!console.timeEnd) {
    console.timeEnd = () => 0
  }

  const
    { store, MyNavigator } = makeStore({ middlewares: [], appConf, modules }),
    App = () => (
      <Provider store={store}>
        <CoreContainer MyNavigator={MyNavigator}/>
      </Provider>
    )

  if (appConf.enableCodePush) {
    const
      codePushOptions = {
        checkFrequency: RNCodepush.CheckFrequency.ON_APP_RESUME,
      }

    return {
      App: RNCodepush(codePushOptions)(App),
      store,
    }
  }

  return {
    App,
    store,
  }
}

export {
  makeApp,
}
