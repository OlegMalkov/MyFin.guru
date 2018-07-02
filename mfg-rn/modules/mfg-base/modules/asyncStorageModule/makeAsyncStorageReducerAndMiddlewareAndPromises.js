/* @flow */

import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import type {
  BaseAppState, BaseMiddlewareFn, BaseModulePromiseMaker,
  BaseReducer,
} from '../../base.flow'
import type { AnyModule } from '../../global.flow'
import { isTraceEnabled } from '../../isTraceEnabled'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { onError } from '../../reportError'
import {
  keys, makeUpdateDepsReducer, modulesArrayToMap, omit, pipe, updateChild, updateStateIfChanged,
  us,
} from '../../utils/utils'
import { APP_MOUNT } from '../coreModule/coreAC'
import {
  ASYNC_STORAGE_PERSISTING_STARTED, ASYNC_STORAGE_REHYDRATE, asyncStoragePersistingDoneAC,
  asyncStoragePersistingStartedAC,
  rehydrateAC,
} from './asyncStorageAC'
import { asyncStorageModuleId } from './asyncStorageModuleId'
import { getFromAsyncStorage, setToAsyncStorage } from './asyncStorageWrapper'

type Deps = {
  [string]: AnyModule,
}

export type AsyncStorageModuleState = {|
  deps: Deps,
  moduleIdsToPersist: Array<string>
|}

// PROMISE START
export const
  ASYNC_STORAGE_PERSIST_PROMISE: 'ASYNC_STORAGE_PERSIST_PROMISE' = 'ASYNC_STORAGE_PERSIST_PROMISE',
  ASYNC_STORAGE_RETRIEVE_PROMISE: 'ASYNC_STORAGE_RETRIEVE_PROMISE' =
    'ASYNC_STORAGE_RETRIEVE_PROMISE'

export type AsyncStoragePersistPromiseProps = {|
  type: typeof ASYNC_STORAGE_PERSIST_PROMISE,
  moduleIdsToPersist: Array<string>
|}

export type AsyncStorageRetrievePromiseProps = {|
  type: typeof ASYNC_STORAGE_RETRIEVE_PROMISE,
|}

export type AnyAsyncStorageModulePromiseMakerProps =
  AsyncStoragePersistPromiseProps
  | AsyncStorageRetrievePromiseProps
// PROMISE END

type PersistProps = {|
  moduleState: AsyncStorageModuleState, moduleIdsToPersist: Array<string>
|}
const
  makeAsyncStorageReducerAndMiddleware = (modules: Array<AnyModule>) => {
    const
      persistentModules = modules.filter(m => m.persistent),
      persistentModulesMap = modulesArrayToMap(modules),
      persistentModulesIds = persistentModules.map(m => m.moduleId),
      depsInitialState: Deps = persistentModulesIds
        .filter(moduleId => persistentModulesMap[moduleId].reducer)
        .reduce((acc, moduleId) => {
          acc[moduleId] = getReducerInitialState((persistentModulesMap[moduleId].reducer: any))
          return acc
        }, {}),
      initialState: AsyncStorageModuleState = {
        deps: depsInitialState,
        moduleIdsToPersist: [],
      },
      depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s: Deps, a) => {
        return persistentModulesIds.reduce((acc, moduleId) => {
          acc[moduleId] = persistentModulesMap[moduleId]
          /* $FlowOk */
            .reducer(s[moduleId], a)
          return acc
        }, {})
      }),
      asyncStorageModuleReducer: BaseReducer<AsyncStorageModuleState> = makeModuleReducer({
        reducer: (s = initialState, a) => {
          if (a.type === ASYNC_STORAGE_PERSISTING_STARTED) {
            return us(s, a, s => s.moduleIdsToPersist = [])
          }
          return pipe(
            s => updateChild(s, a, 'deps', depsReducer),
            cs => {
              if (a.type === ASYNC_STORAGE_REHYDRATE) {
                return cs
              }

              return updateStateIfChanged(s, cs, a, (cs: AsyncStorageModuleState) => {
                const changedKeys = keys(cs.deps)
                  .filter(depKey => s.deps[depKey] !== cs.deps[depKey])
                cs.moduleIdsToPersist = changedKeys
              })
            },
          )(s)
        },
        moduleId: asyncStorageModuleId,
      }),

      /* MIDDLEWARE */
      storeKey = 'persist',
      makeStorageKey = (key) => `${storeKey}:${key}`,
      getModuleState = (getAppState: () => BaseAppState) => getAppState()[asyncStorageModuleId],
      retrieve = async () => {
        const retrieveMap = {}

        for (let i = 0; i < persistentModulesIds.length; i++) {
          const
            persistentModuleId = persistentModulesIds[i],
            persistenceData = await getFromAsyncStorage(makeStorageKey(persistentModuleId))

          if (persistenceData) {
            try {
              retrieveMap[persistentModuleId] = JSON.parse(persistenceData)
            } catch (e) {
              onError({ e, description: `JSON.parse of ${persistentModuleId} failed` })
            }
          }
        }

        return rehydrateAC(retrieveMap)
      },
      persist = async ({ moduleState, moduleIdsToPersist }: PersistProps) => {
        for (let i = 0; i < moduleIdsToPersist.length; i++) {
          const
            persistentModuleId = moduleIdsToPersist[i],
            dep = moduleState.deps[persistentModuleId]
          await setToAsyncStorage(
            makeStorageKey(persistentModuleId),
            JSON.stringify(omit(['deps', 'computed'], dep)),
          )
        }
        return asyncStoragePersistingDoneAC()
      },
      asyncStorageModuleMiddlewareFn: BaseMiddlewareFn<AnyAsyncStorageModulePromiseMakerProps> =
        (a, getAppState) => {
          if (a.type === APP_MOUNT) {
            return { p: { type: ASYNC_STORAGE_RETRIEVE_PROMISE } }
          }

          const s = getModuleState(getAppState)

          if (s.moduleIdsToPersist.length > 0) {
            if (isTraceEnabled) {
              console.log('persisting of ', s.moduleIdsToPersist, 'to async storage')
            }
            return {
              a: asyncStoragePersistingStartedAC(),
              p: { type: ASYNC_STORAGE_PERSIST_PROMISE, moduleIdsToPersist: s.moduleIdsToPersist },
            }
          }

          return null
        }

    //  PROMISES

    const
      retrievePromiseMaker: BaseModulePromiseMaker<AsyncStorageRetrievePromiseProps> =
        () => (resolve) => {
          retrieve()
            .then(resolve)
        },
      persistPromiseMaker: BaseModulePromiseMaker<AsyncStoragePersistPromiseProps> =
        ({ moduleIdsToPersist }, getAppState) => (resolve) => {
          persist({ moduleState: getModuleState(getAppState), moduleIdsToPersist })
            .then(resolve)
        }

    const asyncStorageModulePromiseConfMap = {
      [ASYNC_STORAGE_RETRIEVE_PROMISE]: retrievePromiseMaker,
      [ASYNC_STORAGE_PERSIST_PROMISE]: persistPromiseMaker,
    }

    return {
      asyncStorageModuleReducer,
      asyncStorageModuleMiddlewareFn,
      asyncStorageModulePromiseConfMap,
    }
  }

export {
  makeAsyncStorageReducerAndMiddleware,
}
