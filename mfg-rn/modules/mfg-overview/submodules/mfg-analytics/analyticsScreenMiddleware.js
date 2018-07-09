/* @flow */

import { navigateBackAC } from 'mfg-base/modules/navModule/navAC'
import { isDefined } from 'mfg-base/utils/utils'
import { alertOpenAC } from 'mfg-base/modules/alertModule/alertModuleAC'
import { dbDeleteTransactionAC, dbUpdatePreferencesAC } from 'mfg-base/modules/dbModule/dbAC'
import { analyticsScreenModuleId } from './analyticsScreenModuleId';
import {
  openPickUserDialogAC,
  PICK_USER_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickUserDialog/pickUserDialogAC';
import {
  ANALYTICS_BACK_BP,
  ANALYTICS_DELETE_TRANSACTION_BP,
  ANALYTICS_TRANSACTION_LONG_PRESS, ANALYTICS_USER_NAME_PRESSED,
} from './analyticsScreenAC';
import {
  openEditExpenseTransactionDialogAC, openEditIncomeTransactionDialogAC,
  openEditExchangeTransactionDialogAC, openEditTransferTransactionDialogAC,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsAC';
import { strings } from 'mfg-base/localization';

import type { AnalyticsModuleAppState, AnalyticsModuleMiddlewareFn } from './analytics.flow'

const
  getModuleState = (getAppState: () => AnalyticsModuleAppState) =>
    getAppState()[analyticsScreenModuleId],
  analyticsScreenMiddlewareFn: AnalyticsModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === PICK_USER_DIALOG_DONE) {
      const { callerId, uid: pickedUid } = a;
      if (callerId === analyticsScreenModuleId) {
        return { a: dbUpdatePreferencesAC(p => p.analyticsSelectedUid = pickedUid) }
      }
    }

    if (a.type === ANALYTICS_TRANSACTION_LONG_PRESS) {
      const
        { deps: { transactions } } = getModuleState(getAppState),
        { transactionId } = a,
        transaction = transactions[transactionId]

      if (transaction) {
        switch (transaction.type) {
          case 'expense':
            return { a: openEditExpenseTransactionDialogAC(transactionId) }
          case 'income':
            return { a: openEditIncomeTransactionDialogAC(transactionId) }
          case 'exchange':
            return { a: openEditExchangeTransactionDialogAC(transactionId) }
          case 'transfer':
            return { a: openEditTransferTransactionDialogAC(transactionId) }
          default:
        }
      } else {
        return {
          a: alertOpenAC({
            title: strings.blocked,
            message: strings.cantEditArchivedTransaction,
          }),
        }
      }
    }

    if (a.type === ANALYTICS_DELETE_TRANSACTION_BP) {
      const s = getModuleState(getAppState)

      if (isDefined(s.selectedTransactionId)) {
        return { a: dbDeleteTransactionAC(s.selectedTransactionId) }
      }
    }

    if (a.type === ANALYTICS_USER_NAME_PRESSED) {
      return {
        a: openPickUserDialogAC({ callerId: analyticsScreenModuleId, includeAll: true }),
      }
    }

    if (a.type === ANALYTICS_BACK_BP) {
      return {
        a: navigateBackAC(),
      }
    }

    return null
  }

export { analyticsScreenMiddlewareFn }
