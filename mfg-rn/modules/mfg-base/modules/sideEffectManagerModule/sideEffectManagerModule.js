/* @flow */

import { sideEffectManagerModuleId } from './sideEffectManagerModuleId'
import { makeSideEffectManagerModuleMiddleware } from './sideEffectManagerMiddleware'
import { sideEffectManagerReducer } from './sideEffectManagerReducer'

import type { BaseModule } from '../../base.flow'
import type { AnyModuleMap } from '../../global.flow'
import type { SideEffectManagerModuleState } from './sideEffectManagerReducer'

export type SideEffectManagerModule = BaseModule<SideEffectManagerModuleState>

const makeSideEffectManagerModule =
  (moduleMap: AnyModuleMap, onError?: Error => any): SideEffectManagerModule => ({
    reducer: sideEffectManagerReducer,
    middleware: makeSideEffectManagerModuleMiddleware(moduleMap, onError),
    moduleId: sideEffectManagerModuleId,
  })

export {
  makeSideEffectManagerModule,
}
