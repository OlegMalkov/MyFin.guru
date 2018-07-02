/* @flow */

import { RNCreateReactNavigationReduxMiddleware } from '../rn/RN'
import { createStore } from 'redux'
import reduxLogger from 'redux-logger'
import { makeModulesRegistry } from '../makeModulesRegistry'
import { isTestEnv } from '../isTestEnv'
import { makeRootReducer } from '../makeRootReducer'
import { rnMiddleware } from '../rn/rnMiddleware'
import { getReducerInitialState } from '../utils/getReducerInitialState'
import { deserialize, serialize } from '../utils/serializer'
import { T, values } from '../utils/utils'
import { makeCatchMiddleware, ReducerExceptionKind } from './middleware/makeCatchMiddleware'
import { traceMiddleware } from './middleware/traceMiddleware'
import { myApplyMiddleware } from './myApplyMiddleware'
import { getReactotron } from './reactotron'

import type { AppConfig, BaseAppState } from '../base.flow'
import type { AnyMiddleware, AnyModule } from '../global.flow'
import type { $R, ExceptionReport } from './flowTypes'

type Props = {|
  middlewares: Array<AnyMiddleware>,
  appConf: AppConfig,
  modules: Array<AnyModule>,
  onError?: (Error) => any,
|}


function makeStore(props: Props) {
  const
    isDev = !isTestEnv && global.__DEV__,

    navMiddleware = RNCreateReactNavigationReduxMiddleware(
      'root',
      (as: BaseAppState) => as.nav.nav,
    ),

    { MyNavigator, modulesRegistry } =
      makeModulesRegistry(props.appConf, props.modules, props.onError),
    modulesMiddlewares: Array<AnyMiddleware> =
      values(modulesRegistry)
        .filter(x => x.middleware ? true : false)
        .map((x): AnyMiddleware =>
          /* $FlowOk may be will understand later */
          x.middleware,
        ),
    middlewares = [
      ...props.middlewares,
      navMiddleware,
      rnMiddleware,
      ...modulesMiddlewares,
    ]

  navMiddleware._name = 'navMiddleware'
  if (isDev) {
    middlewares.push(reduxLogger({
      predicate: T,
      collapsed: true,
      duration: true, /*
      stateTransformer: () => 1,*/
    }))
  }
  // TODO 1 MFG-72 Add test that checks random action execution on redux tree takes less than 2ms
  const
    rootReducer = makeRootReducer(modulesRegistry),
    initialState = getReducerInitialState(rootReducer),
    cs: any = isTestEnv || !getReactotron() ? createStore : getReactotron().createStore,
    guardedMiddlewares = [
      makeCatchMiddleware('middleware', props.onError),
      traceMiddleware,
      ...middlewares,
      makeCatchMiddleware('reducer', props.onError),
    ],
    store = cs(rootReducer, initialState, myApplyMiddleware(...guardedMiddlewares))

  try {
    const _$R: $R = {
      rootReducer,
      store,
      serialize,
      deserialize,
      reproduceEx: (recordId) => {
        const record: ExceptionReport = _$R.exReports[recordId]
        if (!record) {
          console.log(`Record ${recordId} not found`)
          return
        }
        if (record.exceptionKind === ReducerExceptionKind) {
          console.log('exec root reducer with', record.state, record.action)
          _$R.rootReducer(record.state, record.action)
        }
      },
      exReports: {},
    }
    global.$R = _$R
  } catch (e) {
    /* nothing to do */
  }

  return { store, MyNavigator }
}

export {
  makeStore,
}
