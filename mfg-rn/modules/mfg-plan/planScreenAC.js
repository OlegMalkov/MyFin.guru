/* @flow */

import type { CategoryId } from 'mfg-base/const'
import type { AnyBaseAction } from 'mfg-base/base.flow'
import type {
  AnyEditPlannedTransactionActionsDialogAction,
} from './PlanCategoryDialog/EditPlannedTransactionActionsDialog/editPlannedTransactionActionsDialogAC'
import type {
  AnyEditPlannedTransactionDialogAction,
} from './PlanCategoryDialog/EditPlannedTransactionDialog/editPlannedTransactionDialogAC'
import type { AnyPlanCategoryDialogAction } from './PlanCategoryDialog/planCategoryDialogAC'

export const
  PLAN_SCREEN_PREVIOUS_PERIOD_BP: 'PLAN_SCREEN_PREVIOUS_PERIOD_BP' =
    'PLAN_SCREEN_PREVIOUS_PERIOD_BP',
  PLAN_SCREEN_NEXT_PERIOD_BP: 'PLAN_SCREEN_NEXT_PERIOD_BP' = 'PLAN_SCREEN_NEXT_PERIOD_BP',
  PLAN_SCREEN_CATEGORY_PLAN_PRESSED: 'PLAN_SCREEN_CATEGORY_PLAN_PRESSED' =
    'PLAN_SCREEN_CATEGORY_PLAN_PRESSED',
  PLAN_SCREEN_CATEGORY_FACT_PRESSED: 'PLAN_SCREEN_CATEGORY_FACT_PRESSED' =
    'PLAN_SCREEN_CATEGORY_FACT_PRESSED',
  PLAN_SCREEN_EXPENSE_BP: 'PLAN_SCREEN_EXPENSE_BP' = 'PLAN_SCREEN_EXPENSE_BP',
  PLAN_SCREEN_INCOME_BP: 'PLAN_SCREEN_INCOME_BP' = 'PLAN_SCREEN_INCOME_BP',
  PLAN_SCREEN_PERIOD_PRESSED: 'PLAN_SCREEN_PERIOD_PRESSED' = 'PLAN_SCREEN_PERIOD_PRESSED',
  PLAN_SCREEN_CATEGORY_TITLE_PRESSED: 'PLAN_SCREEN_CATEGORY_TITLE_PRESSED' =
    'PLAN_SCREEN_CATEGORY_TITLE_PRESSED',
  PLAN_SCREEN_CURRENCY_CODE_PRESSED: 'PLAN_SCREEN_CURRENCY_CODE_PRESSED' =
    'PLAN_SCREEN_CURRENCY_CODE_PRESSED',
  PLAN_SCREEN_USER_NAME_PRESSED: 'PLAN_SCREEN_USER_NAME_PRESSED' = 'PLAN_SCREEN_USER_NAME_PRESSED',
  PLAN_SCREEN_BACK_BUTTON_PRESSED: 'PLAN_SCREEN_BACK_BUTTON_PRESSED' =
    'PLAN_SCREEN_BACK_BUTTON_PRESSED'

type PreviousPeriodBtnPressAction = {| type: typeof PLAN_SCREEN_PREVIOUS_PERIOD_BP |}
type NextPeriodBtnPressAction = {| type: typeof PLAN_SCREEN_NEXT_PERIOD_BP |}
type CategoryPlanPressAction = {|
  type: typeof PLAN_SCREEN_CATEGORY_PLAN_PRESSED, categoryId: CategoryId, periodIndex: number
|}
type CategoryFactPressAction = {|
  type: typeof PLAN_SCREEN_CATEGORY_FACT_PRESSED, categoryId: CategoryId, periodIndex: number
|}
type CategoryTitlePressAction = {|
  type: typeof PLAN_SCREEN_CATEGORY_TITLE_PRESSED, categoryId: CategoryId
|}
type ExpenseBPAction = {| type: typeof PLAN_SCREEN_EXPENSE_BP |}
type IncomeBPAction = {| type: typeof PLAN_SCREEN_INCOME_BP |}
type PeriodPressedAction = {| type: typeof PLAN_SCREEN_PERIOD_PRESSED |}
type CurrencyCodePressedAction = {| type: typeof PLAN_SCREEN_CURRENCY_CODE_PRESSED |}
type UserNamePressedAction = {| type: typeof PLAN_SCREEN_USER_NAME_PRESSED |}
type PlanScreenBackButtonPressedAction = {| type: typeof PLAN_SCREEN_BACK_BUTTON_PRESSED |}

export type AnyPlanScreenAction =
  | AnyBaseAction
  | PreviousPeriodBtnPressAction
  | NextPeriodBtnPressAction
  | CategoryPlanPressAction
  | ExpenseBPAction
  | IncomeBPAction
  | PeriodPressedAction
  | CategoryFactPressAction
  | CategoryTitlePressAction
  | CurrencyCodePressedAction
  | UserNamePressedAction
  | AnyEditPlannedTransactionActionsDialogAction
  | AnyEditPlannedTransactionDialogAction
  | AnyPlanCategoryDialogAction
  | PlanScreenBackButtonPressedAction

export const
  planScreenPreviousPeriodBtnPressAC = (): PreviousPeriodBtnPressAction =>
    ({ type: PLAN_SCREEN_PREVIOUS_PERIOD_BP }),
  planScreenNextPeriodBtnPressAC = (): NextPeriodBtnPressAction =>
    ({ type: PLAN_SCREEN_NEXT_PERIOD_BP }),
  planScreenCategoryPlanPressAC =
    (categoryId: CategoryId, periodIndex: number): CategoryPlanPressAction =>
      ({ type: PLAN_SCREEN_CATEGORY_PLAN_PRESSED, categoryId, periodIndex }),
  planScreenCategoryFactPressAC =
    (categoryId: CategoryId, periodIndex: number): CategoryFactPressAction =>
      ({ type: PLAN_SCREEN_CATEGORY_FACT_PRESSED, categoryId, periodIndex }),
  planScreenCategoryTitlePressAC = (categoryId: CategoryId): CategoryTitlePressAction =>
    ({ type: PLAN_SCREEN_CATEGORY_TITLE_PRESSED, categoryId }),
  planScreenExpenseBPAC = (): ExpenseBPAction => ({ type: PLAN_SCREEN_EXPENSE_BP }),
  planScreenIncomeBPAC = (): IncomeBPAction => ({ type: PLAN_SCREEN_INCOME_BP }),
  planScreenPeriodPressedAC = (): PeriodPressedAction => ({ type: PLAN_SCREEN_PERIOD_PRESSED }),
  planScreenCurrencyCodePressedAC = (): CurrencyCodePressedAction => ({
    type: PLAN_SCREEN_CURRENCY_CODE_PRESSED,
  }),
  planScreenUserNamePressedAC = (): UserNamePressedAction =>
    ({ type: PLAN_SCREEN_USER_NAME_PRESSED }),
  planScreenBackButtonPressedAC = (): PlanScreenBackButtonPressedAction =>
    ({ type: PLAN_SCREEN_BACK_BUTTON_PRESSED })
