/* @flow */

import type { MapKV } from '../../global.flow'

export const
  ASYNC_STORAGE_PERSISTING_STARTED: 'ASYNC_STORAGE_PERSISTING_STARTED' =
    'ASYNC_STORAGE_PERSISTING_STARTED',
  ASYNC_STORAGE_PERSISTING_DONE: 'ASYNC_STORAGE_PERSISTING_DONE' =
    'ASYNC_STORAGE_PERSISTING_DONE',
  ASYNC_STORAGE_REHYDRATE: 'ASYNC_STORAGE_REHYDRATE' =
    'ASYNC_STORAGE_REHYDRATE'

type PersistingStartedAction = {| type: typeof ASYNC_STORAGE_PERSISTING_STARTED |}
type PersistingDoneAction = {| type: typeof ASYNC_STORAGE_PERSISTING_DONE |}
export type RetrievedModulesState = MapKV<string, Object>
type RehydrateAction = {|
  type: typeof ASYNC_STORAGE_REHYDRATE,
  retrievedModulesState: RetrievedModulesState,
|}
export type AnyAsyncStorageModuleAction =
  PersistingStartedAction
  | PersistingDoneAction
  | RehydrateAction

export const
  asyncStoragePersistingStartedAC = (): PersistingStartedAction =>
    ({ type: ASYNC_STORAGE_PERSISTING_STARTED }),
  asyncStoragePersistingDoneAC = (): PersistingDoneAction =>
    ({ type: ASYNC_STORAGE_PERSISTING_DONE }),
  rehydrateAC = (retrievedModulesState: RetrievedModulesState): RehydrateAction => ({
    type: ASYNC_STORAGE_REHYDRATE,
    retrievedModulesState,
  })
