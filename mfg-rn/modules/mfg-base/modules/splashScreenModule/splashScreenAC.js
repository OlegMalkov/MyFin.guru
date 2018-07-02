/* @flow */

export const
  SPLASH_SCREEN_HIDE: 'SPLASH_SCREEN_HIDE' = 'SPLASH_SCREEN_HIDE'

type Hide = {| type: typeof SPLASH_SCREEN_HIDE |}

export type AnySplashScreenModuleAction = Hide

export const
  splashScreenHideAC = (): Hide => ({ type: SPLASH_SCREEN_HIDE })
