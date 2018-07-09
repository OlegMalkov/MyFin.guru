/* @flow */

import type { Transaction } from 'mfg-base/entities/account/live/flowTypes';

export const
  PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG: 'PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG' = 'PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG',
  PLAN_SCREEN_CLOSE_TRANSACTIONS_DIALOG: 'PLAN_SCREEN_CLOSE_TRANSACTIONS_DIALOG' = 'PLAN_SCREEN_CLOSE_TRANSACTIONS_DIALOG'

export type AnyShowTransactionsDialogAction =
  {| type: typeof PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG, transactions: Array<Transaction> |}
 | {| type: typeof PLAN_SCREEN_CLOSE_TRANSACTIONS_DIALOG |}


export const
  showTransactionsDialogAC =
    (transactions: Array<Transaction>) => ({ type: PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG, transactions })
