/* @flow */

import type { Module } from 'mfg-base/global.flow'
import type { BaseAppState } from 'mfg-base/base.flow'
import type { ExDispatch, XReducer, MiddlewareFn, VP } from 'mfg-base/global.flow'
import type { AnyPlanScreenAction } from './planScreenAC'
import type { PlanScreenState } from './planScreenReducer'

export type PlanModuleDispatch = ExDispatch<AnyPlanScreenAction>
export type PlanModuleReducer<S> = XReducer<S, AnyPlanScreenAction>
export type PlanModuleAppState = {|
  ...BaseAppState,
  planScreen: PlanScreenState
|}
export type PlanModuleMiddlewareFn<PP = void, SP = void> =
  MiddlewareFn<AnyPlanScreenAction, PlanModuleAppState, PP, SP>
export type PlanModuleVP<S> = VP<S, AnyPlanScreenAction>
export type PlanModuleType<S> = Module<S, AnyPlanScreenAction, PlanModuleAppState>