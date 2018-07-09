/* @flow */

import type { CategoryTypes } from 'mfg-base/entities/account/live/flowTypes'
import type { CategoryId } from 'mfg-base/const'

export const
  EDIT_CATEGORY_TITLE_CHANGED: 'EDIT_CATEGORY_TITLE_CHANGED' = 'EDIT_CATEGORY_TITLE_CHANGED',
  EDIT_CATEGORY_SAVE_BP: 'EDIT_CATEGORY_SAVE_BP' = 'EDIT_CATEGORY_SAVE_BP',
  EDIT_CATEGORY_PARENT_PRESSED: 'EDIT_CATEGORY_PARENT_PRESS' = 'EDIT_CATEGORY_PARENT_PRESS',
  ADD_CATEGORY: 'ADD_CATEGORY' = 'ADD_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY' = 'EDIT_CATEGORY'

type EditCategoryProps = {| categoryId: CategoryId |}
type AddCategoryProps = {|
  categoryId: CategoryId,
  parentCategoryId: CategoryId,
  mode: CategoryTypes,
|}

type TitleChangedAction = {| type: typeof EDIT_CATEGORY_TITLE_CHANGED, newTitle: string |}
type ParentPressedAction = {| type: typeof EDIT_CATEGORY_PARENT_PRESSED |}
type EditDoneBPAction = {| type: typeof EDIT_CATEGORY_SAVE_BP |}
type AddCategoryAction = {| type: typeof ADD_CATEGORY, ...AddCategoryProps |}
type EditCategoryAction = {| type: typeof EDIT_CATEGORY, ...EditCategoryProps |}

export type AnyEditCategoryAction =
  TitleChangedAction
  | ParentPressedAction
  | EditDoneBPAction
  | AddCategoryAction
  | EditCategoryAction

export const
  editCategoryTitleChangedAC =
    (newTitle: string): TitleChangedAction => ({ type: EDIT_CATEGORY_TITLE_CHANGED, newTitle }),
  editCategoryParentPressedAC = (): ParentPressedAction => ({ type: EDIT_CATEGORY_PARENT_PRESSED }),
  editCategorySaveBPAC = (): EditDoneBPAction => ({ type: EDIT_CATEGORY_SAVE_BP }),
  addCategoryAC = ({ categoryId, mode, parentCategoryId }: AddCategoryProps): AddCategoryAction =>
    ({ type: ADD_CATEGORY, categoryId, mode, parentCategoryId }),
  editCategoryAC = ({ categoryId }: EditCategoryProps): EditCategoryAction =>
    ({ type: EDIT_CATEGORY, categoryId })
