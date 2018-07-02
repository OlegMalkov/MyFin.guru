/* @flow */

import { isTestEnv } from '../../isTestEnv'
import type { RNPlatform } from '../../rn/rnAC'
import { INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN } from '../initModule/initAC'
import {
  DB_ARCHIVE_TRANSACTIONS,
  DB_AUTH_EMAIL_PASSWORD, DB_DELETE_CATEGORY_PLAN, DB_DELETE_PLANNED_TRANSACTION,
  DB_DELETE_TRANSACTION_ACTION,
  DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW, DB_GET_ACCOUNT_ENCRYPTION_STATUS,
  DB_GET_ACCOUNT_VERSION, DB_GET_LIVE_ACCOUNT, DB_GET_PERSONAL_DATA,
  DB_REGISTER_EMAIL_PASSWORD, DB_SEND_BACKUP, DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS,
  DB_SUBSCRIBE_NEW_TRANSACTIONS, DB_SUBSCRIBE_PERSONAL_DATA,
  DB_UPDATE_BACKUP_EMAIL, DB_UPDATE_CATEGORY, DB_UPDATE_CATEGORY_PLAN, DB_UPDATE_CURRENCY_CODE,
  DB_UPDATE_PERSONAL_NAME, DB_UPDATE_PLANNED_TRANSACTION,
  DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS, DB_UPDATE_PLANNED_TRANSACTION_END_DATE,
  DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE,
  DB_UPDATE_PREFERENCES, DB_UPDATE_SORT, DB_UPDATE_STORAGE, DB_UPDATE_STORAGE_HIDDEN,
  DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE, DB_UPDATE_TRANSACTION,
  dbArchiveTransactionsStartedAC, dbAuthStartedAC,
  dbDeleteTransactionStartedAC, dbIsOfflineAC, dbIsOnlineAC,
  dbRegisterStartedAC, dbUpdatePreferencesStartedAC,
} from './dbAC'
import { dbModuleId } from './dbModuleId'
import {
  dbArchiveTransactionsPC,
  dbAuthEmailPasswordPC, dbDeletePlannedTransactionPC, dbDeleteTransactionPC,
  dbEndPrevPlannedTransactionAndCreateNewPC, dbGetAccountEncryptionStatusPC, dbGetAccountVersionPC,
  dbGetLiveAccountPC,
  dbGetPersonalDataPC,
  dbRegisterEmailPasswordPC, dbSendBackupPC,
  dbUpdateBackupPC, dbUpdateCategoryPC, dbUpdateCurrencyCodePC, dbUpdatePersonalNamePC,
  dbUpdatePlannedTransactionDeletedPeriodsPC, dbUpdatePlannedTransactionEndDatePC,
  dbUpdatePlannedTransactionPC, dbUpdatePlannedTransactionsPeriodOverridePC,
  dbUpdatePreferencesPC, dbUpdateSortPC, dbUpdateStorageHiddenPC, dbUpdateStoragePC,
  dbUpdateStorageShowInSecureModePC, dbUpdateTransactionPC, deleteCategoryPlanPC,
  updateCategoryPlanPC,
} from './dbModulePromiseConfMap'
import {
  dbLiveAccountPartsSC, dbNewTransactionsSC,
  dbPersonalDataSC,
} from './dbModuleSubscriptionsConfMap'

import type { BaseAppState, BaseMiddlewareFn } from '../../base.flow'
import type { AnyDbPromiseMakerProps } from './dbModulePromiseConfMap'
import type { AnyDbSubscriptionsMakerProps } from './dbModuleSubscriptionsConfMap'
import type { FbsApp } from './fbs.flow'

type FN = BaseMiddlewareFn<AnyDbPromiseMakerProps, AnyDbSubscriptionsMakerProps>
const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[dbModuleId],
  makeDbModuleMiddlewareFn = (fbs: FbsApp): FN => {
    const
      fn: FN =
        (a, getAppState) => {
          if (a.type === DB_AUTH_EMAIL_PASSWORD) {
            const { email, password } = a

            return {
              a: dbAuthStartedAC(),
              p: dbAuthEmailPasswordPC({ email, password }),
            }
          }

          if (a.type === DB_REGISTER_EMAIL_PASSWORD) {
            const { email, password } = a

            return {
              a: dbRegisterStartedAC(),
              p: dbRegisterEmailPasswordPC({ email, password }),
            }
          }

          if (a.type === DB_UPDATE_PREFERENCES) {
            return {
              a: dbUpdatePreferencesStartedAC(),
              p: dbUpdatePreferencesPC(a.preferencesToUpdate),
            }
          }

          if (a.type === DB_DELETE_TRANSACTION_ACTION) {
            return {
              a: dbDeleteTransactionStartedAC(),
              p: dbDeleteTransactionPC(a.transactionId),
            }
          }

          if (a.type === DB_ARCHIVE_TRANSACTIONS) {
            return {
              a: dbArchiveTransactionsStartedAC(),
              p: dbArchiveTransactionsPC(a.borderDate),
            }
          }

          if (a.type === DB_SEND_BACKUP) {
            return {
              p: dbSendBackupPC(a.backupEmail),
            }
          }

          if (a.type === DB_UPDATE_BACKUP_EMAIL) {
            return {
              p: dbUpdateBackupPC(a.backupEmail),
            }
          }

          if (a.type === DB_UPDATE_CATEGORY) {
            return {
              p: dbUpdateCategoryPC(a.category),
            }
          }

          if (a.type === DB_UPDATE_STORAGE) {
            return {
              p: dbUpdateStoragePC(a.storage),
            }
          }

          if (a.type === DB_UPDATE_CURRENCY_CODE) {
            return {
              p: dbUpdateCurrencyCodePC(a.currencyCode),
            }
          }

          if (a.type === DB_UPDATE_STORAGE_HIDDEN) {
            const { storageId, hidden } = a
            return {
              p: dbUpdateStorageHiddenPC({ storageId, hidden }),
            }
          }

          if (a.type === DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE) {
            const { storageId, showInSecureMode } = a
            return {
              p: dbUpdateStorageShowInSecureModePC({ storageId, showInSecureMode }),
            }
          }

          if (a.type === DB_UPDATE_PERSONAL_NAME) {
            return {
              p: dbUpdatePersonalNamePC(a.name),
            }
          }

          if (a.type === DB_UPDATE_SORT) {
            const { dbKey, sortSpecificPath, sort } = a
            return {
              p: dbUpdateSortPC({ dbKey, sortSpecificPath, sort }),
            }
          }

          if (a.type === DB_DELETE_CATEGORY_PLAN) {
            const { categoryId, uid, period } = a
            return {
              p: deleteCategoryPlanPC({ categoryId, uid, period }),
            }
          }

          if (a.type === DB_UPDATE_CATEGORY_PLAN) {
            const { categoryId, uid, period, plan } = a
            return {
              p: updateCategoryPlanPC({ categoryId, uid, period, plan }),
            }
          }

          if (a.type === DB_UPDATE_PLANNED_TRANSACTION) {
            const { plannedTransaction } = a
            return {
              p: dbUpdatePlannedTransactionPC(plannedTransaction),
            }
          }

          if (a.type === DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW) {
            const { plannedTransaction, endPrevProps } = a
            return {
              p: dbEndPrevPlannedTransactionAndCreateNewPC({ plannedTransaction, endPrevProps }),
            }
          }

          if (a.type === DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE) {
            const { transactionId, period, periodOverride } = a
            return {
              p: dbUpdatePlannedTransactionsPeriodOverridePC({
                transactionId,
                period,
                periodOverride,
              }),
            }
          }

          if (a.type === DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS) {
            const { transactionId, period } = a
            return {
              p: dbUpdatePlannedTransactionDeletedPeriodsPC({ transactionId, period }),
            }
          }

          if (a.type === DB_DELETE_PLANNED_TRANSACTION) {
            return {
              p: dbDeletePlannedTransactionPC(a.transactionId),
            }
          }

          if (a.type === DB_UPDATE_PLANNED_TRANSACTION_END_DATE) {
            const { transactionId, endDate } = a

            return {
              p: dbUpdatePlannedTransactionEndDatePC({ transactionId, endDate }),
            }
          }

          if (a.type === DB_GET_PERSONAL_DATA) {
            return { p: dbGetPersonalDataPC() }
          }

          if (a.type === DB_GET_ACCOUNT_VERSION) {
            return { p: dbGetAccountVersionPC() }
          }

          if (a.type === INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN) {
            // we need a promise when migration will be done
            /*
            TODO 3 MFG-17 wait user for migration to finish by owner
            fbs.database()
              .ref(`accounts/${maUid}/version`)
              .on('value', (s) => {
                if (codeAccountDataVersion === s.val()) {
                  Alert.alert(
                    strings.migrationDone,
                    strings.migrationCompletedByAccountOwner,
                    [
                      {
                        text: 'Confirm',
                        onPress: () => store.dispatch(restartAppAC()),
                      },
                    ],
                  )
                }
              })*/
          }

          if (a.type === DB_GET_ACCOUNT_ENCRYPTION_STATUS) {
            return { p: dbGetAccountEncryptionStatusPC() }
          }

          if (a.type === DB_GET_LIVE_ACCOUNT) {
            return { p: dbGetLiveAccountPC() }
          }

          if (a.type === DB_UPDATE_TRANSACTION) {
            return { p: dbUpdateTransactionPC(a.transaction) }
          }

          if (a.type === DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS) {
            return { s: dbLiveAccountPartsSC() }
          }

          if (a.type === DB_SUBSCRIBE_NEW_TRANSACTIONS) {
            return { s: dbNewTransactionsSC() }
          }

          const
            s = getModuleState(getAppState),
            { computed: { shouldGoOnline, shouldGoOffline }, isOnline } = s

          if (shouldGoOnline && !isOnline) {
            if (!isTestEnv && s.deps.platform !== 'web') {
              fbs.database()
                .goOnline();
            }
            return { a: dbIsOnlineAC() }
          }

          if (shouldGoOffline && isOnline) {
            if (s.deps.platform !== 'web') {
              fbs.database()
                .goOffline();
            }
            return { a: dbIsOfflineAC() }
          }

          if (a.type === DB_SUBSCRIBE_PERSONAL_DATA) {
            return { s: dbPersonalDataSC() }
          }

          return null
        }

    return fn
  }

export {
  makeDbModuleMiddlewareFn,
}
