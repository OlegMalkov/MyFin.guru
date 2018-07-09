/* @flow */

import type { Module } from 'mfg-base/global.flow'
import type { BaseAppState } from 'mfg-base/base.flow'
import type { ExDispatch, XReducer, MiddlewareFn, VP } from 'mfg-base/global.flow'
import type { AnyOverviewScreenAction } from './overviewScreenAC'
import type { OverviewScreenState } from './overviewScreenReducer'
import type {
  EditCategoryScreenState,
} from './submodules/editCategoryScreenModule/editCategoryScreenReducer'
import type {
  EditStorageScreenState,
} from './submodules/editStorageScreenModule/editStorageScreenReducer'
import type {
  ShowHiddenStoragesScreenState,
} from './submodules/showHiddenStoragesScreenModule/showHiddenStoragesModuleReducer'

export type OverviewModuleDispatch = ExDispatch<AnyOverviewScreenAction>
export type OverviewModuleReducer<S> = XReducer<S, AnyOverviewScreenAction>
export type OverviewModuleAppState = {|
  ...BaseAppState,
  overviewScreen: OverviewScreenState,
  editStorageScreen: EditStorageScreenState,
  editCategoryScreen: EditCategoryScreenState,
  showHiddenStoragesScreen: ShowHiddenStoragesScreenState
|}
export type OverviewModuleMiddlewareFn<PP = void, SP = void> =
  MiddlewareFn<AnyOverviewScreenAction, OverviewModuleAppState, PP, SP>
export type OverviewModuleVP<S> = VP<S, AnyOverviewScreenAction>
export type OverviewModuleType<S> = Module<S, AnyOverviewScreenAction, OverviewModuleAppState>