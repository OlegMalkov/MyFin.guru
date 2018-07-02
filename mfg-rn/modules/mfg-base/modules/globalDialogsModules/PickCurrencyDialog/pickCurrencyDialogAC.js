/* @flow */

import type { CurrencyCode } from '../../../const'

export const
  OPEN_PICK_CURRENCY_DIALOG: 'OPEN_PICK_CURRENCY_DIALOG' = 'OPEN_PICK_CURRENCY_DIALOG',
  PICK_CURRENCY_DIALOG_DONE: 'PICK_CURRENCY_DIALOG_DONE' = 'PICK_CURRENCY_DIALOG_DONE',
  PICK_CURRENCY_DIALOG_CANCEL: 'PICK_CURRENCY_DIALOG_CANCEL' = 'PICK_CURRENCY_DIALOG_CANCEL',
  PICK_CURRENCY_DIALOG_SEARCH_CHANGED: 'PICK_CURRENCY_DIALOG_SEARCH_CHANGED'
    = 'PICK_CURRENCY_DIALOG_SEARCH_CHANGED',
  PICK_CURRENCY_DIALOG_IMPORTANT_BP: 'PICK_CURRENCY_DIALOG_IMPORTANT_BP'
    = 'PICK_CURRENCY_DIALOG_IMPORTANT_BP',
  PICK_CURRENCY_DIALOG_CURRENCY_PRESSED: 'PICK_CURRENCY_DIALOG_CURRENCY_PRESSED'
    = 'PICK_CURRENCY_DIALOG_CURRENCY_PRESSED'

type OpenPickCurrencyAction = {|
  type: typeof OPEN_PICK_CURRENCY_DIALOG,
  callerId: string,
  blacklist: Array<CurrencyCode>
|}
type DoneAction = {|
  type: typeof PICK_CURRENCY_DIALOG_DONE,
  currencyCode: CurrencyCode,
  callerId: string
|}
type ImportantTogglePressedAction = {|
  type: typeof PICK_CURRENCY_DIALOG_IMPORTANT_BP,
  currencyCode: CurrencyCode
|}

type RatePressedAction = {|
  type: typeof PICK_CURRENCY_DIALOG_CURRENCY_PRESSED,
  currencyCode: CurrencyCode
|}

type CancelAction = {| type: typeof PICK_CURRENCY_DIALOG_CANCEL |}

type SearchChangedAction = {| type: typeof PICK_CURRENCY_DIALOG_SEARCH_CHANGED, newText: string |}

export type AnyPickCurrencyDialogActionType =
  | OpenPickCurrencyAction
  | DoneAction
  | ImportantTogglePressedAction
  | RatePressedAction
  | CancelAction
  | SearchChangedAction

type OpenPickCurrencyDialogProps = {|
  includeAll?: true,
  callerId: string,
  blacklist?: Array<CurrencyCode>,
|}
export const
  openPickCurrencyDialog =
    ({ callerId, blacklist = [] }: OpenPickCurrencyDialogProps): OpenPickCurrencyAction => ({
      type: OPEN_PICK_CURRENCY_DIALOG,
      callerId,
      blacklist: blacklist || [],
    }),
  pickCurrencyDialogDoneAC = (currencyCode: CurrencyCode, callerId: string) => ({
    type: PICK_CURRENCY_DIALOG_DONE,
    currencyCode,
    callerId,
  }),
  pickCurrencyDialogCanceledAC = () => ({
    type: PICK_CURRENCY_DIALOG_CANCEL,
  }),
  pickCurrencyDialogSearchChangedAC = (newText: string) => ({
    type: PICK_CURRENCY_DIALOG_SEARCH_CHANGED,
    newText,
  }),
  pickCurrencyDialogImportantBPAC = (currencyCode: CurrencyCode) => ({
    type: PICK_CURRENCY_DIALOG_IMPORTANT_BP,
    currencyCode,
  }),
  pickCurrencyDialogCurrencyPressedAC = (currencyCode: CurrencyCode) => ({
    type: PICK_CURRENCY_DIALOG_CURRENCY_PRESSED,
    currencyCode,
  })
