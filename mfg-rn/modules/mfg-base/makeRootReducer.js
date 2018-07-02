/* @flow */

import { combineReducers } from 'redux'
import { RESET_APP_STATE } from './modules/coreModule/coreAC'
import { windowDimensionsReducer } from './rn/windowDimensionsReducer'
import { deepFreeze } from './utils/deepFreeze'
import { getReducerInitialState } from './utils/getReducerInitialState'
import { assoc, pipe, values } from './utils/utils'

import type { AnyModuleMap, AnyReducer, MapKV } from './global.flow'

const
  makeRootReducer = (modulesRegistry: AnyModuleMap) => {
    const
      modulesReducersMap: MapKV<string, AnyReducer> = pipe(
        values,
        modules => modules
          .filter(({ reducer }) => reducer)
          .reduce((acc, { reducer, moduleId }) => {
            if (!reducer) {
              return acc
            }
            if (!reducer.isModuleReducer) {
              throw new Error(`${moduleId} reducer should be wrapped by makeModuleReducer`)
            }

            if (reducer.provideNavReducer) {
              reducer.provideNavReducer(modulesRegistry.nav.reducer)
            }
            return assoc(moduleId, reducer, acc)
          }, {}),
      )(modulesRegistry),
      _rootReducer = combineReducers({
        ...modulesReducersMap,
        windowDimensions: windowDimensionsReducer,
      }),
      initialAppState = getReducerInitialState(_rootReducer),
      rootReducer: AnyReducer = (s, a) => {
        if (a.type === RESET_APP_STATE) {
          return deepFreeze(initialAppState)
        }

        return deepFreeze(_rootReducer(s, a))
      }

    return rootReducer
  }

export {
  makeRootReducer,
}
