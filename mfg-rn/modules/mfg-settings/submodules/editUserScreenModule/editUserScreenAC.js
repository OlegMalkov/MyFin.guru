/* @flow */

import type { UID } from 'mfg-base/const'
export const
  EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED: 'EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED' = // eslint-disable-line max-len
    'EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED',
  TRANSFER_TRANSACTIONS_BETWEEN_USERS: 'TRANSFER_TRANSACTIONS_BETWEEN_USERS' =
    'TRANSFER_TRANSACTIONS_BETWEEN_USERS',
  USER_NAME_INPUT_CHANGED: 'USER_NAME_INPUT_CHANGED' = 'USER_NAME_INPUT_CHANGED',
  DELETE_USER: 'DELETE_USER' = 'DELETE_USER'

export type AnyEditUserAction =
  {| type: typeof EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED, uid: UID |}
  | {|
  type: typeof TRANSFER_TRANSACTIONS_BETWEEN_USERS,
  fromUser: UID,
  deleteUser: bool,
  toUser: UID
|}
  | {| type: typeof USER_NAME_INPUT_CHANGED, text: string |}
  | {| type: typeof DELETE_USER, uid: UID |}

type TransferTransactionsProps = { fromUser: UID, deleteUser: bool, toUser: UID }
export const
  moveTransactionsTargetUserIdChangedAC = (uid: UID) =>
    ({ type: EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED, uid }),
  transferTransactionsBetweenUsersAC =
    ({ fromUser, deleteUser, toUser }: TransferTransactionsProps) => ({
      type: TRANSFER_TRANSACTIONS_BETWEEN_USERS,
      fromUser,
      deleteUser,
      toUser,
    }),
  userNameInputChangedAC = (text: string) => ({ type: USER_NAME_INPUT_CHANGED, text }),
  deleteUserAC = (uid: UID) => ({ type: DELETE_USER, uid })
