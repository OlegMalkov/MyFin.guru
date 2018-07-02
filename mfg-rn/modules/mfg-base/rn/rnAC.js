/* @flow */

import type { Dimensions } from '../global.flow'
export const
  RN_SET_STATUS_BAR_BACKGROUND_COLOR: 'RN_SET_STATUS_BAR_BACKGROUND_COLOR'
    = 'RN_SET_STATUS_BAR_BACKGROUND_COLOR',
  RN_SET_STATUS_BAR_STYLE: 'RN_SET_STATUS_BAR_STYLE'
    = 'RN_SET_STATUS_BAR_STYLE',
  RN_GET_PLATFORM: 'RN_GET_PLATFORM' = 'RN_GET_PLATFORM',
  RN_PLATFORM: 'RN_PLATFORM' = 'RN_PLATFORM',
  RN_DISMISS_KEYBOARD: 'RN_DISMISS_KEYBOARD' = 'RN_DISMISS_KEYBOARD',
  RN_GET_WINDOW_DIMENSIONS: 'RN_GET_WINDOW_DIMENSIONS' = 'RN_GET_WINDOW_DIMENSIONS',
  RN_WINDOW_DIMENSIONS: 'RN_WINDOW_DIMENSIONS' = 'RN_WINDOW_DIMENSIONS'

type SetStatusBarBgColorAction = {|
  type: typeof RN_SET_STATUS_BAR_BACKGROUND_COLOR,
  color: string
|}
type SetStatusBarStyleAction = {| type: typeof RN_SET_STATUS_BAR_STYLE, style: string |}
type GetPlatformAction = {| type: typeof RN_GET_PLATFORM |}
type DismissKeyboardAction = {| type: typeof RN_DISMISS_KEYBOARD |}
export type RNPlatform = 'ios' | 'android' | 'web' | 'unknown'
type PlatformAction = {| type: typeof RN_PLATFORM, platform: RNPlatform |}
type GetWindowDimensionsAction = {| type: typeof RN_GET_WINDOW_DIMENSIONS |}
type WindowDimensionsAction = {| type: typeof RN_WINDOW_DIMENSIONS, dimensions: Dimensions |}

export type AnyRnModuleAction =
  | SetStatusBarBgColorAction
  | SetStatusBarStyleAction
  | GetPlatformAction
  | PlatformAction
  | DismissKeyboardAction
  | GetWindowDimensionsAction
  | WindowDimensionsAction

export const
  rnSetStatusBarBgColorAC = (color: string): SetStatusBarBgColorAction =>
    ({ type: RN_SET_STATUS_BAR_BACKGROUND_COLOR, color }),
  rnSetStatusBarStyle = (style: string): SetStatusBarStyleAction =>
    ({ type: RN_SET_STATUS_BAR_STYLE, style }),
  rnGetPlatformAC = (): GetPlatformAction => ({ type: RN_GET_PLATFORM }),
  rnPlatformAC = (platform: RNPlatform): PlatformAction => ({ type: RN_PLATFORM, platform }),
  rnDismissKeyboardAC = (): DismissKeyboardAction => ({ type: RN_DISMISS_KEYBOARD }),
  rnGetWindowDimensionsAC = (): GetWindowDimensionsAction => ({
    type: RN_GET_WINDOW_DIMENSIONS,
  }),
  rnWindowDimensionsAC = (dimensions: Dimensions): WindowDimensionsAction => ({
    type: RN_WINDOW_DIMENSIONS,
    dimensions,
  })

