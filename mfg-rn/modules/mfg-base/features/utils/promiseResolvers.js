/* @flow */

import { asyncStoragePersistingDoneAC } from '../../modules/asyncStorageModule/asyncStorageAC'
import {
  ASYNC_STORAGE_PERSIST_PROMISE,
} from '../../modules/asyncStorageModule/makeAsyncStorageReducerAndMiddlewareAndPromises'
import { sessionModuleId } from '../../modules/sessionModule/sessionModuleId'

import {
  makeAsyncStorageRetrievePromiseResolve,
} from './promiseResolversMakers'
import {
  testSessionUserLoggedIn,
} from '../../test/testData'

import type {
  AsyncStoragePersistPromiseProps,
} from '../../modules/asyncStorageModule/makeAsyncStorageReducerAndMiddlewareAndPromises'
import type { PromiseResolveConf } from './TestWorld'

export const
  asyncStoragePersistSessionPromiseResolve: PromiseResolveConf<AsyncStoragePersistPromiseProps> = {
    expectedProps: { type: ASYNC_STORAGE_PERSIST_PROMISE, moduleIdsToPersist: [sessionModuleId] },
    action: asyncStoragePersistingDoneAC(),
    shouldDispatchActionInsteadOfExpect: true,
  },
  asyncStorageRetrievePromiseResolveUserLoggedIn = makeAsyncStorageRetrievePromiseResolve({
    retrievedModulesState: {
      session: testSessionUserLoggedIn,
    },
  }),
  asyncStorageRetrievePromiseResolveAfterAppInstall = makeAsyncStorageRetrievePromiseResolve({
    retrievedModulesState: {},
  })
