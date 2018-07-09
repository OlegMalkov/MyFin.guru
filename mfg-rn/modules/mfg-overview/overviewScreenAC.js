/* @flow */
/* eslint-disable max-len */
import type { CategoryId, UID } from 'mfg-base/const'
import type { CategoryTypes } from 'mfg-base/entities/account/live/flowTypes';
import type {
  AnyAddTransactionDialogAction,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsAC'
import type { AnyBaseAction } from 'mfg-base/base.flow'
import type {
  AnyStoragesActionsDialogAction,
} from './StoragesActionsDialog/storagesActionsDialogAC'
import type {
  AnyCategoriesActionsDialogAction,
} from './CategoriesActionsDialog/categoriesActionDialogAC'
import type { StorageIdWithCurrencyCode } from './flowTypes'
import type { AnyToLendMoneyDialogAction } from './ToLendMoneyDialog/toLendMoneyDialogAC';

export const
  /* User Actions*/
  OVERVIEW_ADD_STORAGE_BP: 'OVERVIEW_ADD_STORAGE_BP' = 'OVERVIEW_ADD_STORAGE_BP',
  OVERVIEW_ADD_TRANSACTION_BP: 'OVERVIEW_ADD_TRANSACTION_BP' =
    'OVERVIEW_ADD_TRANSACTION_BP',
  OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED: 'OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED' =
    'OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED',
  OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED: 'OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED' =
    'OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED',
  OVERVIEW_CATEGORY_PRESSED: 'OVERVIEW_CATEGORY_PRESSED' =
    'OVERVIEW_CATEGORY_PRESSED',
  OVERVIEW_CATEGORY_LONG_PRESSED: 'OVERVIEW_CATEGORY_LONG_PRESSED' =
    'OVERVIEW_CATEGORY_LONG_PRESSED',
  OVERVIEW_SECURE_MODE_BP: 'OVERVIEW_SECURE_MODE_BP' =
    'OVERVIEW_SECURE_MODE_BP',
  OVERVIEW_TOTAL_REMAINS_ARROW_BP: 'OVERVIEW_TOTAL_REMAINS_ARROW_BP' =
    'OVERVIEW_TOTAL_REMAINS_ARROW_BP',
  OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP: 'OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP' =
    'OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP',
  OVERVIEW_TRANSFER_BP: 'OVERVIEW_TRANSFER_BP' =
    'OVERVIEW_TRANSFER_BP',
  OVERVIEW_INCOME_EXPENSE_BP: 'OVERVIEW_INCOME_EXPENSE_BP' =
    'OVERVIEW_INCOME_EXPENSE_BP',
  OVERVIEW_TO_LEND_MONEY_BP: 'OVERVIEW_TO_LEND_MONEY_BP' =
    'OVERVIEW_TO_LEND_MONEY_BP',
  OVERVIEW_BORROW_MONEY_BP: 'OVERVIEW_BORROW_MONEY_BP' =
    'OVERVIEW_BORROW_MONEY_BP',
  OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED: 'OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED' =
    'OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED',
  OVERVIEW_CATEGORIES_VIEW_MODE_BP: 'OVERVIEW_CATEGORIES_VIEW_MODE_BP' =
    'OVERVIEW_CATEGORIES_VIEW_MODE_BP',
  OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED: 'OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED' =
    'OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED',
  OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED: 'OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED' =
    'OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED',
  OVERVIEW_TOTAL_USAGE_LABEL_PRESSED: 'OVERVIEW_TOTAL_USAGE_LABEL_PRESSED' =
    'OVERVIEW_TOTAL_USAGE_LABEL_PRESSED',
  OVERVIEW_ADD_CATEGORY_BP: 'OVERVIEW_ADD_CATEGORY_BP' = 'OVERVIEW_ADD_CATEGORY_BP',
  OVERVIEW_SETTINGS_BP: 'OVERVIEW_SETTINGS_BP' = 'OVERVIEW_SETTINGS_BP',
  OVERVIEW_ANALYTICS_BP: 'OVERVIEW_ANALYTICS_BP' = 'OVERVIEW_ANALYTICS_BP',
  OVERVIEW_PLAN_BP: 'OVERVIEW_PLAN_BP' = 'OVERVIEW_PLAN_BP',
  OVERVIEW_SWIPE_LEFT: 'OVERVIEW_SWIPE_LEFT' = 'OVERVIEW_SWIPE_LEFT',
  OVERVIEW_SWIPE_RIGHT: 'OVERVIEW_SWIPE_RIGHT' = 'OVERVIEW_SWIPE_RIGHT',

  /* Middleware actions */
  OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG: 'OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG' =
    'OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG',
  OVERVIEW_DELETE_CATEGORY_DONE: 'OVERVIEW_DELETE_CATEGORY_DONE' = 'OVERVIEW_DELETE_CATEGORY_DONE'

type AddStorageBPAction = {| type: typeof OVERVIEW_ADD_STORAGE_BP |}
type AddTransactionBPAction = {| type: typeof OVERVIEW_ADD_TRANSACTION_BP |}
type StorageCurrencyBalancePressedAction =
  {| type: typeof OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED, ...StorageIdWithCurrencyCode |}
type StorageCurrencyBalanceLongPressedAction =
  {| type: typeof OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED, ...StorageIdWithCurrencyCode |}
type CategoryPressedAction = {| type: typeof OVERVIEW_CATEGORY_PRESSED, categoryId: CategoryId |}
type CategoryLongPressedAction = {|
  type: typeof OVERVIEW_CATEGORY_LONG_PRESSED,
  categoryId: CategoryId,
|}
type StoragesUserNameLabelPressedAction =
  {| type: typeof OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED, uid: UID |}
type SecureModeBPAction = {| type: typeof OVERVIEW_SECURE_MODE_BP |}
type TotalRemainsArrowBPAction = {| type: typeof OVERVIEW_TOTAL_REMAINS_ARROW_BP |}
type FamilyMembersExpandedBPAction = {| type: typeof OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP |}
type TransferBPAction = {| type: typeof OVERVIEW_TRANSFER_BP |}
type IncomeExpenseBPAction = {| type: typeof OVERVIEW_INCOME_EXPENSE_BP |}
type ToLendMoneyBPAction = {| type: typeof OVERVIEW_TO_LEND_MONEY_BP |}
type BorrowMoneyBPAction = {| type: typeof OVERVIEW_BORROW_MONEY_BP |}
type TotalUsageLabelPressedAction = {| type: typeof OVERVIEW_TOTAL_USAGE_LABEL_PRESSED |}
type TotalBalanceCurrencyPressed = {| type: typeof OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED |}
type AdminCategoriesUserNamePressedAction =
  {| type: typeof OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED |}
type CategoriesViewModeBPAction = {| type: typeof OVERVIEW_CATEGORIES_VIEW_MODE_BP |}
type AddCategoryBPAction = {| type: typeof OVERVIEW_ADD_CATEGORY_BP |}
type SettingsBPAction = {| type: typeof OVERVIEW_SETTINGS_BP |}
type AnalyticsBPAction = {| type: typeof OVERVIEW_ANALYTICS_BP |}
type PlanBPAction = {| type: typeof OVERVIEW_PLAN_BP |}
type SwipeLeftAction = {| type: typeof OVERVIEW_SWIPE_LEFT |}
type SwipeRightAction = {| type: typeof OVERVIEW_SWIPE_RIGHT |}

type AnyOverviewScreenUserAction =
  AddStorageBPAction
  | AddTransactionBPAction
  | StorageCurrencyBalancePressedAction
  | StorageCurrencyBalanceLongPressedAction
  | CategoryPressedAction
  | CategoryLongPressedAction
  | StoragesUserNameLabelPressedAction
  | SecureModeBPAction
  | TransferBPAction
  | IncomeExpenseBPAction
  | ToLendMoneyBPAction
  | BorrowMoneyBPAction
  | TotalUsageLabelPressedAction
  | TotalBalanceCurrencyPressed
  | AdminCategoriesUserNamePressedAction
  | CategoriesViewModeBPAction
  | AddCategoryBPAction
  | SettingsBPAction
  | AnalyticsBPAction
  | PlanBPAction
  | TotalRemainsArrowBPAction
  | FamilyMembersExpandedBPAction

type OpenCategoryActionsDialogAction = {|
  type: typeof OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG,
  categoryId: CategoryId,
  categoryType: CategoryTypes
|}

type DeleteCategoryDoneAction = {| type: typeof OVERVIEW_DELETE_CATEGORY_DONE |}

type AnyOverviewScreenMiddlewareAction =
  | OpenCategoryActionsDialogAction
  | DeleteCategoryDoneAction

export type AnyOverviewScreenAction =
  | AnyBaseAction
  | AnyOverviewScreenMiddlewareAction
  | AnyOverviewScreenUserAction
  | AnyStoragesActionsDialogAction
  | AnyCategoriesActionsDialogAction
  | AnyAddTransactionDialogAction
  | AnyToLendMoneyDialogAction
  | SwipeLeftAction
  | SwipeRightAction


/* User action creators */
export const
  overviewAddStorageBPAC = (): AddStorageBPAction => ({ type: OVERVIEW_ADD_STORAGE_BP }),
  overviewAddTransactionBPAC = (): AddTransactionBPAction =>
    ({ type: OVERVIEW_ADD_TRANSACTION_BP }),
  overviewStorageCurrencyBalancePressedAC =
    ({ storageId, currencyCode }: StorageIdWithCurrencyCode): StorageCurrencyBalancePressedAction =>
      ({
        type: OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED,
        storageId,
        currencyCode,
      }),
  overviewStorageCurrencyBalanceLongPressedAC =
    ({ storageId, currencyCode }: StorageIdWithCurrencyCode): StorageCurrencyBalanceLongPressedAction => ({
      type: OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED,
      storageId,
      currencyCode,
    }),
  overviewCategoryPressedAC = (categoryId: CategoryId): CategoryPressedAction => ({
    type: OVERVIEW_CATEGORY_PRESSED,
    categoryId,
  }),
  overviewCategoryLongPressAC = (categoryId: CategoryId): CategoryLongPressedAction => ({
    type: OVERVIEW_CATEGORY_LONG_PRESSED,
    categoryId,
  }),
  overviewCollapseUserStoragesPressAC = (uid: UID): StoragesUserNameLabelPressedAction => ({
    type: OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED,
    uid,
  }),
  overviewSecureModeBPAC = (): SecureModeBPAction => ({
    type: OVERVIEW_SECURE_MODE_BP,
  }),
  overviewTotalRemainsPressedAC = (): TotalRemainsArrowBPAction => ({
    type: OVERVIEW_TOTAL_REMAINS_ARROW_BP,
  }),
  overviewTransferBP = (): TransferBPAction => ({ type: OVERVIEW_TRANSFER_BP }),
  overviewIncomeExpenseBP = (): IncomeExpenseBPAction => ({ type: OVERVIEW_INCOME_EXPENSE_BP }),
  overviewSettingsBPAC = (): SettingsBPAction => ({ type: OVERVIEW_SETTINGS_BP }),
  overviewAnalyticsBPAC = (): AnalyticsBPAction => ({ type: OVERVIEW_ANALYTICS_BP }),
  overviewPlanBPAC = (): PlanBPAction => ({ type: OVERVIEW_PLAN_BP }),
  overviewToLendMoneyBPAC = (): ToLendMoneyBPAction => ({
    type: OVERVIEW_TO_LEND_MONEY_BP,
  }),
  overviewToBorrowMoneyBPAC = (): BorrowMoneyBPAction => ({
    type: OVERVIEW_BORROW_MONEY_BP,
  }),
  overviewTotalUsageStrPressAC = (): TotalUsageLabelPressedAction => ({
    type: OVERVIEW_TOTAL_USAGE_LABEL_PRESSED,
  }),
  overviewTotalBalanceCurrencyPressedAC = (): TotalBalanceCurrencyPressed => ({
    type: OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED,
  }),
  overviewAdminCategoriesUserNamePressedAC = (): AdminCategoriesUserNamePressedAction => ({
    type: OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED,
  }),
  overviewCategoriesViewModeBPAC = (): CategoriesViewModeBPAction => ({
    type: OVERVIEW_CATEGORIES_VIEW_MODE_BP,
  }),
  overviewAddCategoryBPAC = (): AddCategoryBPAction => ({
    type: OVERVIEW_ADD_CATEGORY_BP,
  }),
  overviewScreenSwipeLeftAC = (): SwipeLeftAction => ({
    type: OVERVIEW_SWIPE_LEFT,
  }),
  overviewScreenSwipeRightAC = (): SwipeRightAction => ({
    type: OVERVIEW_SWIPE_RIGHT,
  }),
  familyMembersExpandedBPAC = (): FamilyMembersExpandedBPAction => ({
    type: OVERVIEW_FAMILY_MEMBERS_EXPANDED_ARROW_BP,
  })

/* Middleware action creators */
export const
  overviewOpenCategoryActionsDialogAC = (categoryId: CategoryId,
    categoryType: CategoryTypes): OpenCategoryActionsDialogAction => ({
    type: OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG,
    categoryId,
    categoryType,
  }),
  overviewDeleteCategoryDoneAC = (): DeleteCategoryDoneAction => ({ type: OVERVIEW_DELETE_CATEGORY_DONE })
