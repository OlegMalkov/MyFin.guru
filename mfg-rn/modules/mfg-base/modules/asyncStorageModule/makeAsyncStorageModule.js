/* @flow */

import { asyncStorageModuleId } from './asyncStorageModuleId';
import {
  makeAsyncStorageReducerAndMiddleware,
} from './makeAsyncStorageReducerAndMiddlewareAndPromises'

import type { BaseModule } from '../../base.flow'
import type {
  AsyncStorageModuleState,
} from './makeAsyncStorageReducerAndMiddlewareAndPromises'

type M = BaseModule<AsyncStorageModuleState>
const makeAsyncStorageModule = (modules: Array<BaseModule<any>>): M => {
  const {
    asyncStorageModuleMiddlewareFn,
    asyncStorageModuleReducer,
    asyncStorageModulePromiseConfMap,
  } = makeAsyncStorageReducerAndMiddleware(modules)

  return {
    reducer: asyncStorageModuleReducer,
    middlewareFn: asyncStorageModuleMiddlewareFn,
    moduleId: asyncStorageModuleId,
    promiseConfMap: asyncStorageModulePromiseConfMap,
  }
}

export {
  makeAsyncStorageModule,
}
