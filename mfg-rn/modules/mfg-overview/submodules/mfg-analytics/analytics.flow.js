/* @flow */

import type { Module, ExDispatch, MiddlewareFn, VP, XReducer } from 'mfg-base/global.flow'
import type { BaseAppState } from 'mfg-base/base.flow'
import type { AnyAnalyticsScreenAction } from './analyticsScreenAC'
import type { AnalyticsScreenState } from './analyticsScreenReducer'

export type AnalyticsModuleDispatch = ExDispatch<AnyAnalyticsScreenAction>
export type AnalyticsModuleReducer<S> = XReducer<S, AnyAnalyticsScreenAction>
export type AnalyticsModuleAppState = {|
  ...BaseAppState,
  analyticsScreen: AnalyticsScreenState,
|}
export type AnalyticsModuleMiddlewareFn<PP = void, SP = void> =
  MiddlewareFn<AnyAnalyticsScreenAction, AnalyticsModuleAppState, PP, SP>
export type AnalyticsModuleVP<S> = VP<S, AnyAnalyticsScreenAction>
export type AnalyticsModuleType<S> =
  Module<S, AnyAnalyticsScreenAction, AnalyticsModuleAppState>
