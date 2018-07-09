/* @flow */

import type { StorageId } from 'mfg-base/const'
export const
  EDIT_STORAGE_TITLE_CHANGED: 'EDIT_STORAGE_TITLE_CHANGED' =
    'EDIT_STORAGE_TITLE_CHANGED',
  EDIT_STORAGE_TYPE_PRESSED: 'EDIT_STORAGE_TYPE_PRESSED' =
    'EDIT_STORAGE_TYPE_PRESSED',
  EDIT_STORAGE_INITIAL_BALANCE_CHANGED: 'EDIT_STORAGE_INITIAL_BALANCE_CHANGED' =
    'EDIT_STORAGE_INITIAL_BALANCE_CHANGED',
  EDIT_STORAGE_ADD_CURRENCY_BP: 'EDIT_STORAGE_ADD_CURRENCY_BP' =
    'EDIT_STORAGE_ADD_CURRENCY_BP',
  EDIT_STORAGE_USER_PRESSED: 'EDIT_STORAGE_USER_PRESSED' =
    'EDIT_STORAGE_USER_PRESSED',
  EDIT_STORAGE_SAVE_BP: 'EDIT_STORAGE_SAVE_BP' =
    'EDIT_STORAGE_SAVE_BP',
  EDIT_STORAGE_LIMIT_BALANCE_CHANGED: 'EDIT_STORAGE_LIMIT_BALANCE_CHANGED' =
    'EDIT_STORAGE_LIMIT_BALANCE_CHANGED',
  ADD_STORAGE: 'ADD_STORAGE' = 'ADD_STORAGE',
  EDIT_STORAGE: 'EDIT_STORAGE' = 'EDIT_STORAGE'

type TitleChangedAction = {| type: typeof EDIT_STORAGE_TITLE_CHANGED, newTitle: string |}
type TypePressAction = {| type: typeof EDIT_STORAGE_TYPE_PRESSED |}
type BalanceChangedActionProps = {| currencyCode: string, value: number |}
type InitialBalanceChangedAction = {|
  type: typeof EDIT_STORAGE_INITIAL_BALANCE_CHANGED,
  ...BalanceChangedActionProps,
|}
type LimitBalanceChangedAction = {|
  type: typeof EDIT_STORAGE_LIMIT_BALANCE_CHANGED,
  ...BalanceChangedActionProps,
|}
type AddCurrencyPressedAction = {| type: typeof EDIT_STORAGE_ADD_CURRENCY_BP |}
type UserPressedAction = {| type: typeof EDIT_STORAGE_USER_PRESSED |}
type SaveBPAction = {| type: typeof EDIT_STORAGE_SAVE_BP |}

type AddStorageAction = {| type: typeof ADD_STORAGE, newStorageId: StorageId |}
type EditStorageAction = {| type: typeof EDIT_STORAGE, storageId: StorageId |}

export type AnyEditStoragesAction =
  | TitleChangedAction
  | TypePressAction
  | InitialBalanceChangedAction
  | LimitBalanceChangedAction
  | AddCurrencyPressedAction
  | UserPressedAction
  | SaveBPAction
  | AddStorageAction
  | EditStorageAction

export const
  editStorageTitleChangedAC = (newTitle: string): TitleChangedAction =>
    ({ type: EDIT_STORAGE_TITLE_CHANGED, newTitle }),
  editStorageTypePressedAC = (): TypePressAction => ({ type: EDIT_STORAGE_TYPE_PRESSED }),
  editStorageInitialBalanceChangedAC =
    ({ currencyCode, value }: BalanceChangedActionProps): InitialBalanceChangedAction =>
      ({
        type: EDIT_STORAGE_INITIAL_BALANCE_CHANGED,
        currencyCode,
        value,
      }),
  editStorageLimitBalanceChangedAC =
    ({ currencyCode, value }: BalanceChangedActionProps): LimitBalanceChangedAction => ({
      type: EDIT_STORAGE_LIMIT_BALANCE_CHANGED,
      currencyCode,
      value,
    }),
  editStorageAddCurrencyBPAC = (): AddCurrencyPressedAction =>
    ({ type: EDIT_STORAGE_ADD_CURRENCY_BP }),
  editStorageUserPressedAC = (): UserPressedAction => ({ type: EDIT_STORAGE_USER_PRESSED }),
  editStorageSaveBPAC = (): SaveBPAction => ({ type: EDIT_STORAGE_SAVE_BP }),
  addStorageAC = (newStorageId: StorageId): AddStorageAction =>
    ({ type: ADD_STORAGE, newStorageId }),
  editStorageAC = (storageId: StorageId): EditStorageAction => ({ type: EDIT_STORAGE, storageId })

