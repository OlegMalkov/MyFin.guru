/* @flow */
/* eslint-disable max-len */

import type { CategoryId, CurrencyCode } from '../../const'

export const
  EDIT_TRANSACTION_DIALOG_CONFIRM_BP: 'EDIT_TRANSACTION_DIALOG_CONFIRM_BP' =
    'EDIT_TRANSACTION_DIALOG_CONFIRM_BP',
  EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED: 'EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED' =
    'EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED',
  EDIT_TRANSACTION_DIALOG_TAGS_CHANGED: 'EDIT_TRANSACTION_DIALOG_TAGS_CHANGED' =
    'EDIT_TRANSACTION_DIALOG_TAGS_CHANGED',
  EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED: 'EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED' =
    'EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED',
  EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS: 'EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS' =
    'EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS',
  EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS: 'EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS' =
    'EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS',
  EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED: 'EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED' =
    'EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED',
  EDIT_TRANSACTION_DIALOG_DATE_PRESSED: 'EDIT_TRANSACTION_DIALOG_DATE_PRESSED' =
    'EDIT_TRANSACTION_DIALOG_DATE_PRESSED',
  EDIT_TRANSACTION_DIALOG_CANCEL_BP: 'EDIT_TRANSACTION_DIALOG_CANCEL_BP' =
    'EDIT_TRANSACTION_DIALOG_CANCEL_BP',
  EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS: 'EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS' =
    'EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS',
  EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO: 'EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO' =
    'EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO',
  EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS: 'EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS' =
    'EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS',
  OPEN_ADD_INCOME_TRANSACTION_DIALOG: 'OPEN_ADD_INCOME_TRANSACTION_DIALOG' =
    'OPEN_ADD_INCOME_TRANSACTION_DIALOG',
  OPEN_ADD_EXPENSE_TRANSACTION_DIALOG: 'OPEN_ADD_EXPENSE_TRANSACTION_DIALOG' =
    'OPEN_ADD_EXPENSE_TRANSACTION_DIALOG',
  OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG: 'OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG' =
    'OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG',
  OPEN_ADD_TRANSFER_TRANSACTION_DIALOG: 'OPEN_ADD_TRANSFER_TRANSACTION_DIALOG' =
    'OPEN_ADD_TRANSFER_TRANSACTION_DIALOG',
  OPEN_EDIT_INCOME_TRANSACTION_DIALOG: 'OPEN_EDIT_INCOME_TRANSACTION_DIALOG' =
    'OPEN_EDIT_INCOME_TRANSACTION_DIALOG',
  OPEN_EDIT_EXPENSE_TRANSACTION_DIALOG: 'OPEN_EDIT_EXPENSE_TRANSACTION_DIALOG' =
    'OPEN_EDIT_EXPENSE_TRANSACTION_DIALOG',
  OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG: 'OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG' =
    'OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG',
  OPEN_EDIT_TRANSFER_TRANSACTION_DIALOG: 'OPEN_EDIT_TRANSFER_TRANSACTION_DIALOG' =
    'OPEN_EDIT_TRANSFER_TRANSACTION_DIALOG'

type OpenAddTransactionBase = {|
  currencyCode: CurrencyCode,
  storageId: string,
|}

type OpenAddExchangeTransferPart = {|
  ...OpenAddTransactionBase,
  targetStorageId: string,
  targetCurrencyCode: CurrencyCode,
|}

type OpenIncomeExpensePart = {|
  ...OpenAddTransactionBase,
  categoryId: CategoryId,
|}

type OnAddTransactionConfirmBtnPressAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_CONFIRM_BP |}
type OnAddTransactionCancelBtnPressAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_CANCEL_BP |}
type OnAddTransactionAmountChangedAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED, payload: number |}
type OnAddTransactionTagsChangedAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_TAGS_CHANGED, tags: Array<string> |}
type OnAddTransactionTagsTextChangedAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED, tagsText: string |}
type OnCurrencyPressAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS |}
type OnAddTransactionExchangeCurrencyPressAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS |}
type OnAddTransactionExchangeAmountChangedAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED, payload: number |}
type OnDatePressAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_DATE_PRESSED |}
type OnExchangeFromStoragePressAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS |}
type OnTransferFromStoragePressAction =
  {| type: typeof EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS |}
type EditTransactionSetAmountToAction =
  {| type: typeof EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO, amount: number |}

export type AnyAddTransactionDialogAction =
  | OnAddTransactionConfirmBtnPressAction
  | OnAddTransactionCancelBtnPressAction
  | OnAddTransactionAmountChangedAction
  | OnAddTransactionTagsChangedAction
  | OnAddTransactionTagsTextChangedAction
  | OnCurrencyPressAction
  | OnAddTransactionExchangeCurrencyPressAction
  | OnAddTransactionExchangeAmountChangedAction
  | OnDatePressAction
  | OnExchangeFromStoragePressAction
  | OnTransferFromStoragePressAction
  | EditTransactionSetAmountToAction
  | {| type: typeof OPEN_ADD_INCOME_TRANSACTION_DIALOG, ...OpenIncomeExpensePart |}
  | {| type: typeof OPEN_ADD_EXPENSE_TRANSACTION_DIALOG, ...OpenIncomeExpensePart |}
  | {| type: typeof OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG, ...OpenAddExchangeTransferPart |}
  | {| type: typeof OPEN_ADD_TRANSFER_TRANSACTION_DIALOG, ...OpenAddExchangeTransferPart |}
  | {| type: typeof OPEN_EDIT_INCOME_TRANSACTION_DIALOG, transactionId: string |}
  | {| type: typeof OPEN_EDIT_EXPENSE_TRANSACTION_DIALOG, transactionId: string |}
  | {| type: typeof OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG, transactionId: string |}
  | {| type: typeof OPEN_EDIT_TRANSFER_TRANSACTION_DIALOG, transactionId: string |}

type AddExpenseOrIncomeTransactionProps = {|
  ...OpenAddTransactionBase,
  categoryId: CategoryId
|}

const
  openAddIncomeExpenseTransactionDialogFactory = (actionType) =>
    ({
       currencyCode,
       storageId,
       categoryId,
     }: AddExpenseOrIncomeTransactionProps) =>
      ({
        type: actionType,
        currencyCode,
        storageId,
        categoryId,
      }),
  openEditTransactionDialogFactory = (actionType) => (transactionId: string) =>
    ({
      type: actionType,
      transactionId,
    }),
  openAddExchangeTransferTransactionDialogFactory = (actionType) =>
    ({
       currencyCode,
       storageId,
       targetCurrencyCode,
       targetStorageId,
     }: OpenAddExchangeTransferPart) =>
      ({
        type: actionType,
        currencyCode,
        storageId,
        targetCurrencyCode,
        targetStorageId,
      })

export const
  editTransactionOnAddTransactionConfirmBPAC =
    (): OnAddTransactionConfirmBtnPressAction => ({ type: EDIT_TRANSACTION_DIALOG_CONFIRM_BP }),
  editTransactionOnAddTransactionCancelBtnPressAC =
    (): OnAddTransactionCancelBtnPressAction =>
      ({ type: EDIT_TRANSACTION_DIALOG_CANCEL_BP }),
  editTransactionOnAddTransactionAmountChangedAC =
    (payload: number): OnAddTransactionAmountChangedAction => ({
      type: EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED,
      payload,
    }),
  editTransactionOnAddTransactionTagsChangedAC =
    (tags: Array<string>): OnAddTransactionTagsChangedAction => ({
      type: EDIT_TRANSACTION_DIALOG_TAGS_CHANGED,
      tags,
    }),
  editTransactionOnAddTransactionTagsTextChangedAC =
    (tagsText: string): OnAddTransactionTagsTextChangedAction => ({
      type: EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED,
      tagsText,
    }),
  editTransactionOnCurrencyPressAC = (): OnCurrencyPressAction =>
    ({ type: EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS }),
  editTransactionOnAddTransactionExchangeCurrencyPressAC =
    (): OnAddTransactionExchangeCurrencyPressAction => ({
      type: EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS,
    }),
  editTransactionOnAddTransactionExchangeAmountChangedAC =
    (payload: number): OnAddTransactionExchangeAmountChangedAction => ({
      type: EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED,
      payload,
    }),
  editTransactionOnDatePressAC = (): OnDatePressAction =>
    ({ type: EDIT_TRANSACTION_DIALOG_DATE_PRESSED }),
  editTransactionOnExchangeFromStoragePressAC = (): OnExchangeFromStoragePressAction =>
    ({ type: EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS }),
  editTransactionOnTransferFromStoragePressAC = (): OnTransferFromStoragePressAction =>
    ({ type: EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS }),
  editTransactionEditTransactionSetAmountToAC =
    (amount: number): EditTransactionSetAmountToAction =>
      ({ type: EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO, amount }),

  openAddIncomeTransactionDialogAC =
    openAddIncomeExpenseTransactionDialogFactory(OPEN_ADD_INCOME_TRANSACTION_DIALOG),
  openAddExpenseTransactionDialogAC =
    openAddIncomeExpenseTransactionDialogFactory(OPEN_ADD_EXPENSE_TRANSACTION_DIALOG),
  openAddExchangeTransactionDialogAC =
    openAddExchangeTransferTransactionDialogFactory(OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG),
  openAddTransferTransactionDialogAC =
    openAddExchangeTransferTransactionDialogFactory(OPEN_ADD_TRANSFER_TRANSACTION_DIALOG),
  openEditIncomeTransactionDialogAC =
    openEditTransactionDialogFactory(OPEN_ADD_INCOME_TRANSACTION_DIALOG),
  openEditExpenseTransactionDialogAC =
    openEditTransactionDialogFactory(OPEN_ADD_EXPENSE_TRANSACTION_DIALOG),
  openEditExchangeTransactionDialogAC =
    openEditTransactionDialogFactory(OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG),
  openEditTransferTransactionDialogAC =
    openEditTransactionDialogFactory(OPEN_ADD_TRANSFER_TRANSACTION_DIALOG)
