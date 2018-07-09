/* @flow */

import type { TransactionId } from 'mfg-base/const'
import type { AnyBaseAction } from 'mfg-base/base.flow'

export const
  ANALYTICS_PREVIOUS_PERIOD_BP: 'ANALYTICS_PREVIOUS_PERIOD_BP' = 'ANALYTICS_PREVIOUS_PERIOD_BP',
  ANALYTICS_NEXT_PERIOD_BP: 'ANALYTICS_NEXT_PERIOD_BP' = 'ANALYTICS_NEXT_PERIOD_BP',
  ANALYTICS_TRANSACTION_PRESS: 'ANALYTICS_TRANSACTION_PRESS' =
    'ANALYTICS_TRANSACTION_PRESS',
  ANALYTICS_TRANSACTION_LONG_PRESS: 'ANALYTICS_TRANSACTION_LONG_PRESS' =
    'ANALYTICS_TRANSACTION_LONG_PRESS',
  ANALYTICS_DELETE_TRANSACTION_BP: 'ANALYTICS_DELETE_TRANSACTION_BP' =
    'ANALYTICS_DELETE_TRANSACTION_BP',
  ANALYTICS_USER_NAME_PRESSED: 'ANALYTICS_USER_NAME_PRESSED' = 'ANALYTICS_USER_NAME_PRESSED',
  ANALYTICS_BACK_BP: 'ANALYTICS_BACK_BP' = 'ANALYTICS_BACK_BP'

type PreviousPeriodBtnPressAction = {| type: typeof ANALYTICS_PREVIOUS_PERIOD_BP |}
type NextPeriodBtnPressAction = {| type: typeof ANALYTICS_NEXT_PERIOD_BP |}
type TransactionPressAction =
  {| type: typeof ANALYTICS_TRANSACTION_PRESS, transactionId: string |}
type TransactionLongPressAction =
  {| type: typeof ANALYTICS_TRANSACTION_LONG_PRESS, transactionId: string |}
type DeleteTransactionBtnPressAction = {| type: typeof ANALYTICS_DELETE_TRANSACTION_BP |}
type UserNameOnPressAction = {| type: typeof ANALYTICS_USER_NAME_PRESSED |}
type BackBPAction = {| type: typeof ANALYTICS_BACK_BP |}
export type AnyAnalyticsScreenAction =
  | AnyBaseAction
  | PreviousPeriodBtnPressAction
  | NextPeriodBtnPressAction
  | TransactionPressAction
  | TransactionLongPressAction
  | DeleteTransactionBtnPressAction
  | UserNameOnPressAction
  | BackBPAction


export const
  analyticsScreenPreviousPeriodBPAC = (): PreviousPeriodBtnPressAction =>
    ({ type: ANALYTICS_PREVIOUS_PERIOD_BP }),
  analyticsScreenNextPeriodBPAC = (): NextPeriodBtnPressAction =>
    ({ type: ANALYTICS_NEXT_PERIOD_BP }),
  analyticsScreenTransactionPressAC = (transactionId: TransactionId): TransactionPressAction =>
    ({ type: ANALYTICS_TRANSACTION_PRESS, transactionId }),
  analyticsScreenTransactionLongPressAC =
    (transactionId: TransactionId): TransactionLongPressAction =>
      ({ type: ANALYTICS_TRANSACTION_LONG_PRESS, transactionId }),
  analyticsScreenDeleteTransactionBPAC = (): DeleteTransactionBtnPressAction =>
    ({ type: ANALYTICS_DELETE_TRANSACTION_BP }),
  analyticsScreenUserNamePressAC = (): UserNameOnPressAction => ({
    type: ANALYTICS_USER_NAME_PRESSED,
  }),
  analyticsScreenBackBP = (): BackBPAction => ({
    type: ANALYTICS_BACK_BP,
  })
