/* @flow */

import { makeModuleReducer } from '../../utils/makeReducer'
import { us } from '../../utils/utils'
import {
  SIDE_EFFECT_MANAGER_NEW_PROMISES,
  SIDE_EFFECT_MANAGER_PROMISE_DONE,
} from './sideEffectManagerAC'
import { sideEffectManagerModuleId } from './sideEffectManagerModuleId'

import type { AnyModulePromiseDispatchResult } from './sideEffectManagerAC'
import type { BaseReducer } from '../../base.flow'
import type { MapV } from '../../global.flow'

export type SideEffectManagerModuleState = {|
  activePromises: MapV<AnyModulePromiseDispatchResult>
|}

const
  initialState: SideEffectManagerModuleState = {
    activePromises: {},
  },
  reducer: BaseReducer<SideEffectManagerModuleState> = (s = initialState, a) => {
    if (a.type === SIDE_EFFECT_MANAGER_NEW_PROMISES) {
      return us(s, a, (s, a) => s.activePromises = { ...s.activePromises, ...a.propsMap })
    }

    if (a.type === SIDE_EFFECT_MANAGER_PROMISE_DONE) {
      return us(s, a, (s, a) => delete s.activePromises[a.id])
    }

    return s
  },
  sideEffectManagerReducer: BaseReducer<SideEffectManagerModuleState> =
    makeModuleReducer({ reducer, moduleId: sideEffectManagerModuleId })

export {
  sideEffectManagerReducer,
}
