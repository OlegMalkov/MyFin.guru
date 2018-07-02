/* @flow */

import { ASYNC_STORAGE_REHYDRATE } from '../modules/asyncStorageModule/asyncStorageAC'
import { deepFreeze } from './deepFreeze'
import { memoMaxOneArgs2 } from './memo'
import { forceRecomputeAC } from './utilsAC'

import type { NavModuleState } from 'mfg-base/modules/navModule/makeNavReducer'
import type { BaseReducer } from '../base.flow'

type Props<S> = {|
  reducer: BaseReducer<S>,
  provideNavReducer?: (navReducer: BaseReducer<NavModuleState>) => any,
  moduleId: string,
|}

export const
  makeModuleReducer =
    <S>({ reducer, provideNavReducer, moduleId }: Props<S>): BaseReducer<S> => {
      const moduleReducer = memoMaxOneArgs2((s, a) => {
        if (a.type === ASYNC_STORAGE_REHYDRATE) {
          if (a.retrievedModulesState[moduleId]) {
            return reducer({ ...s, ...a.retrievedModulesState[moduleId] }, forceRecomputeAC())
          }
        }
        return deepFreeze(reducer(s, a))
      })
      moduleReducer.isModuleReducer = true;
      moduleReducer.provideNavReducer = (navReducer) => {
        if (provideNavReducer) {
          provideNavReducer(navReducer)
        }
      }
      return moduleReducer;
    },
  makeEntityReducer = <S>({ reducer }: { reducer: BaseReducer<S> }): BaseReducer<S> => {
    return memoMaxOneArgs2((s, a) => {
      return deepFreeze(reducer(s, a))
    })
  }
