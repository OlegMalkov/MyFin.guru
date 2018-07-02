/* @flow */

export const
  NAVIGATE: 'Navigation/NAVIGATE' = 'Navigation/NAVIGATE',
  NAVIGATE_BACK: 'Navigation/BACK' = 'Navigation/BACK'

type NavigateAction = {|
  type: typeof NAVIGATE, key: string, routeName: string, params: Object
|}

type NavigateBackAction = {|
  type: typeof NAVIGATE_BACK
|}

export type AnyNavigationAction = NavigateBackAction | NavigateAction
export const
  /* TODO 4 MFG-30 remove params, if context required dispatch specific action with required data than
   * dispatch navigate */
  navigateAC =
    ({ routeName, params = {} }: { routeName: string, params?: Object }): NavigateAction =>
      ({ type: NAVIGATE, key: routeName, routeName, params }),
  navigateBackAC = (): NavigateBackAction => ({ type: NAVIGATE_BACK })
