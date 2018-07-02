/* @flow */

import type { CategoryId } from '../../../const'
import type { CategoryTypes } from '../../../entities/account/live/flowTypes'

export const
  OPEN_PICK_CATEGORY_DIALOG: 'OPEN_PICK_CATEGORY_DIALOG' = 'OPEN_PICK_CATEGORY_DIALOG',
  PICK_CATEGORY_DONE: 'PICK_CATEGORY_DONE' = 'PICK_CATEGORY_DONE',
  PICK_CATEGORY_CANCEL: 'PICK_CATEGORY_CANCEL' = 'PICK_CATEGORY_CANCEL'

export type
  AnyPickCategoryDialogActionType =
  {|
    type: typeof OPEN_PICK_CATEGORY_DIALOG,
    callerId: string,
    title: string,
    categoryType: CategoryTypes,
    includeNoParent: bool
  |}
  | {| type: typeof PICK_CATEGORY_DONE, callerId: string, categoryId: CategoryId |}
  | {| type: typeof PICK_CATEGORY_CANCEL, callerId: string |}

export const
  openPickCategoryDialog =
    ({
      callerId,
      title,
      categoryType,
      includeNoParent,
    }: {|
      callerId: string,
      title: string,
      categoryType: CategoryTypes,
      includeNoParent: bool
    |}) => ({
      type: OPEN_PICK_CATEGORY_DIALOG,
      callerId,
      title,
      categoryType,
      includeNoParent,
    }),
  onPickCategoryDoneAC =
    ({ categoryId, callerId }: { categoryId: CategoryId, callerId: string }) =>
      ({ type: PICK_CATEGORY_DONE, categoryId, callerId }),
  onPickCategoryCancelAC =
    (callerId: string) => ({ type: PICK_CATEGORY_CANCEL, callerId })
