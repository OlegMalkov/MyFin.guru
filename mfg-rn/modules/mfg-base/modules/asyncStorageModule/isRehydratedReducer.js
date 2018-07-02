/* @flow */

import { ASYNC_STORAGE_REHYDRATE } from './asyncStorageAC'

import type { BaseReducer } from '../../base.flow'

export type IsRehydratedState = bool

const
  initialState = false,
  isRehydratedReducer: BaseReducer<IsRehydratedState> = (s = initialState, a) => {
    if (a.type === ASYNC_STORAGE_REHYDRATE) {
      return true
    }

    return s
  }

export {
  isRehydratedReducer,
}
