/* @flow */
/* eslint-disable max-len */

export const
  OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP: 'OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP' = 'OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP',
  OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP: 'OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP' = 'OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP',
  OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP: 'OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP' = 'OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP',
  OVERVIEW_CATEGORIES_ACTION_DIALOG_DELETE_CATEGORY_BP: 'OVERVIEW_CATEGORIES_ACTION_DIALOG_DELETE_CATEGORY_BP' = 'OVERVIEW_CATEGORIES_ACTION_DIALOG_DELETE_CATEGORY_BP',
  OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED: 'OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED' = 'OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED'

export type Status = {| type: 'select_action' |}
  | {| type: 'deleting_category_fetching_live_transactions' |}
  | {|
  type: 'deleting_category_fetching_archive_transactions',
  linkedLiveTransactionIds: Array<string>
|}
  | {|
  type: 'deleting_category_processing',
  linkedLiveTransactionIds: Array<string>,
  linkedArchiveTransactionIds: Array<string>,
|}

type AddCategoryBPAction = {| type: typeof OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP |}
type EditCategoryBPAction = {| type: typeof OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP |}
type DeleteCategoryBPAction = {| type: typeof OVERVIEW_CATEGORIES_ACTION_DIALOG_DELETE_CATEGORY_BP |}
type SortCategoriesBPAction = {| type: typeof OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP |}

type BackdropPressedAction = {| type: typeof OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED |}
export type AnyCategoriesActionsDialogAction =
  | AddCategoryBPAction
  | EditCategoryBPAction
  | DeleteCategoryBPAction
  | SortCategoriesBPAction
  | BackdropPressedAction


export const
  categoriesActionDialogAddCategoryBPAC = (): AddCategoryBPAction => ({ type: OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP }),
  categoriesActionDialogEditCategoryBPAC = (): EditCategoryBPAction => ({ type: OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP }),
  categoriesActionDialogDeleteCategoryBPAC = (): DeleteCategoryBPAction => ({ type: OVERVIEW_CATEGORIES_ACTION_DIALOG_DELETE_CATEGORY_BP }),
  categoriesActionDialogSortCategoriesBPAC = (): SortCategoriesBPAction => ({ type: OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP }),
  categoriesActionDialogBackdropPressedAC = (): BackdropPressedAction => ({ type: OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED })
