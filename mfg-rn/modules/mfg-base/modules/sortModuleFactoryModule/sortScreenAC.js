/* @flow */

export const SORT_SCREEN_ROW_MOVED: 'SORT_SCREEN_ROW_MOVED' = 'SORT_SCREEN_ROW_MOVED'
export const SORT_SCREEN_BACK_BUTTON_PRESSED: SORT_SCREEN_BACK_BUTTON_PRESSED =
  'SORT_SCREEN_BACK_BUTTON_PRESSED'
type SortRowMovedAction = {| type: typeof SORT_SCREEN_ROW_MOVED, newOrder: Object |}
type BackButtonPressedAction = {| type: typeof SORT_SCREEN_BACK_BUTTON_PRESSED |}
/* todo 4 MFG-35 replace newOrder: Object */
export type AnySortModuleActionTypes =
  | SortRowMovedAction
  | BackButtonPressedAction
export const sortRowMovedAC = (newOrder: Object): SortRowMovedAction => ({
  type: SORT_SCREEN_ROW_MOVED,
  newOrder,
})
export const sortScreenBackButtonPressedAC = (): BackButtonPressedAction => ({
  type: SORT_SCREEN_BACK_BUTTON_PRESSED,
})
