/* @flow */

import type { PlannedTransaction } from 'mfg-base/entities/account/live/flowTypes'

export type PlannedTransactionWrapper = {|
  type: 'transaction',
  transaction: PlannedTransaction,
|}
