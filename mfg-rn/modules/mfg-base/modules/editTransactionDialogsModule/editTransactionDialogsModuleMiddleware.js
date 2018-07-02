/* @flow */

import { getStorageCurrencyBalance } from '../../entities/account/live/storagesSelectors'
import { strings } from '../../localization'
import { alertOpenAC } from '../alertModule/alertModuleAC'
import { dbUpdateTransactionAC } from '../dbModule/dbAC'
import {
  openPickCurrencyDialog,
} from '../globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { openPickDateDialog } from '../globalDialogsModules/PickDateDialog/pickDateDialogAC'
import { UTIL_GUID_GENERATED, utilGenerateGuidAC } from '../util/utilAC'
import {
  EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS,
  EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS,
  EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS,
  EDIT_TRANSACTION_DIALOG_CONFIRM_BP,
  EDIT_TRANSACTION_DIALOG_DATE_PRESSED, EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS,
  editTransactionEditTransactionSetAmountToAC,
} from './editTransactionDialogsAC'
import { editTransactionDialogsModuleId } from './editTransactionDialogsModuleId'
import {
  editTransactionsDialogCurrentTransactionTypeSelector,
} from './editTransactionDialogsReducer'
import { editTransactionExchangeCallerId } from './exchange/editExchangeDialogReducer'
import { editTransactionCallerId } from './transactionModalReducerFactory'

import type { BaseAppState, BaseMiddlewareFn } from '../../base.flow'
import type { TransactionId } from '../../const'
import type {
  Transaction, TransactionExchange, TransactionExpense, TransactionIncome,
  TransactionTransfer,
} from '../../entities/account/live/flowTypes'

/* TODO 2 MFG-22 edit transaction, should not directly edit transaction, but instead should append updates array of that transaction */
/* TODO 3 MFG-23 Audit, recently changed transactions (interested in transactions that changed their date */
const
  editTransactionDialogAddTransactionCallerId = `${editTransactionDialogsModuleId}_add_transaction`,
  getModuleState = (getAppState: () => BaseAppState) =>
    getAppState()[editTransactionDialogsModuleId],
  onAddTransaction = ({ s, newId }) => {
    const
      {
        deps: { session: { uid } },
      } = s,
      currentTransactionType = editTransactionsDialogCurrentTransactionTypeSelector(s),
      id: TransactionId = newId
    /* ,
          TODO 5 MFG-24 Write transaction position, just after transaction was added
          writeTransactionPosition = (position) => {
            fbs.database().ref(`${setPath}/position`).set(position)
          } */

    let transaction: Transaction | null = null

    if (currentTransactionType === 'income') {
      const
        {
          income: {
            currencyCode,
            date,
            selectedStorageId,
            tags,
            comment,
            transactionAmount,
            selectedCategoryId,
          },
        } = s

      if (selectedStorageId && selectedCategoryId && currencyCode && transactionAmount) {
        const incomeTransaction: TransactionIncome = {
          type: 'income',

          id,
          comment,

          currencyCode,
          date,
          storageIdTo: selectedStorageId,
          tags,
          value: transactionAmount * 100,
          categoryId: selectedCategoryId,
          uid,
        }
        transaction = incomeTransaction
      } else {
        if (!selectedStorageId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingStorage,
            }),
          }
        }
        if (!selectedCategoryId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingCategory,
            }),
          }
        }
        if (!currencyCode) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingCurrency,
            }),
          }
        }
        if (!transactionAmount) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingAmount,
            }),
          }
        }
      }
    } else if (currentTransactionType === 'expense') {
      const
        {
          expense: {
            currencyCode,
            date,
            selectedStorageId,
            tags,
            comment,
            transactionAmount,
            selectedCategoryId,
          },
        } = s

      if (selectedStorageId && selectedCategoryId && currencyCode && transactionAmount) {
        const expenseTransaction: TransactionExpense = {
          type: 'expense',

          id,
          comment,

          currencyCode,
          date,
          storageIdFrom: selectedStorageId,
          tags,
          value: transactionAmount * 100,
          categoryId: selectedCategoryId,
          uid,
        }
        transaction = expenseTransaction
      } else {
        if (!selectedStorageId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingStorage,
            }),
          }
        }
        if (!selectedCategoryId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingCategory,
            }),
          }
        }
        if (!currencyCode) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingCurrency,
            }),
          }
        }
        if (!transactionAmount) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingAmount,
            }),
          }
        }
      }
    } else if (currentTransactionType === 'transfer') {
      const
        {
          transfer: {
            currencyCode,
            date,
            selectedStorageId,
            tags,
            comment,
            transactionAmount,
            instance: { targetStorageId },
          },
        } = s

      if (selectedStorageId && currencyCode && targetStorageId && transactionAmount) {
        const transferTransaction: TransactionTransfer = {
          type: 'transfer',

          id,
          comment,

          currencyCode,
          date,
          storageIdFrom: selectedStorageId,
          storageIdTo: targetStorageId,
          tags,
          value: transactionAmount * 100,
          uid,
        }
        transaction = transferTransaction
      } else {
        if (!selectedStorageId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingStorage,
            }),
          }
        }
        if (!targetStorageId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingTargetStorage,
            }),
          }
        }
        if (!currencyCode) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingCurrency,
            }),
          }
        }
        if (!transactionAmount) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingAmount,
            }),
          }
        }
      }
    } else if (currentTransactionType === 'exchange') {
      const
        {
          exchange: {
            currencyCode,
            date,
            selectedStorageId,
            tags,
            comment,
            transactionAmount,
            instance: { targetCurrencyCode, targetAmount },
          },
        } = s

      if (
        selectedStorageId
        && currencyCode
        && transactionAmount
        && targetCurrencyCode
        && targetAmount
      ) {
        const transferExchange: TransactionExchange = {
          type: 'exchange',

          id,
          comment,

          date,
          tags,
          storageId: selectedStorageId,
          value: transactionAmount * 100,
          valueTo: targetAmount * 100,
          currencyCode,
          currencyCodeTo: targetCurrencyCode,
          uid,
        }
        transaction = transferExchange
      } else {
        if (!selectedStorageId) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingStorage,
            }),
          }
        }
        if (!targetCurrencyCode) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingTargetCurrency,
            }),
          }
        }
        if (!currencyCode) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingCurrency,
            }),
          }
        }
        if (!targetCurrencyCode) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingTargetCurrency,
            }),
          }
        }
        if (!transactionAmount) {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingAmount,
            }),
          }
        }
      }
    } else {
      throw new Error(`Wrong transaction type ${currentTransactionType}`)
    }

    if (transaction) {
      if (s.deps.geo.position) {
        transaction.position = s.deps.geo.position
      }

      return {
        a: dbUpdateTransactionAC(transaction),
      }
    }
    return null
  },
  editTransactionDialogsModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === EDIT_TRANSACTION_DIALOG_CURRENCY_PRESS) {
      return { a: openPickCurrencyDialog({ callerId: editTransactionCallerId }) }
    }

    if (a.type === EDIT_TRANSACTION_DIALOG_EXCHANGE_CURRENCY_PRESS) {
      return { a: openPickCurrencyDialog({ callerId: editTransactionExchangeCallerId }) }
    }

    if (a.type === EDIT_TRANSACTION_DIALOG_CONFIRM_BP) {
      return { a: utilGenerateGuidAC(editTransactionDialogAddTransactionCallerId) }
    }

    if (a.type === UTIL_GUID_GENERATED
      && a.callerId === editTransactionDialogAddTransactionCallerId) {
      return onAddTransaction({ s: getModuleState(getAppState), a, newId: a.guid })
    }

    if (a.type === EDIT_TRANSACTION_DIALOG_DATE_PRESSED) {
      return { a: openPickDateDialog({ callerId: editTransactionCallerId }) }
    }

    if (a.type === EDIT_TRANSACTION_DIALOG_EXCHANGE_FROM_STORAGE_PRESS) {
      const
        {
          exchange: { selectedStorageId, currencyCode },
          deps: {
            storages,
            archivedTransactionsBalance,
            transactions,
          },
        } = getModuleState(getAppState),
        balance = getStorageCurrencyBalance({
          transactions,
          storages,
          archivedTransactionsBalance,
          storageId: selectedStorageId,
          currencyCode,
        })

      return { a: editTransactionEditTransactionSetAmountToAC(balance) }
    }

    if (a.type === EDIT_TRANSACTION_TRANSFER_FROM_STORAGE_PRESS) {
      const
        {
          transfer: { selectedStorageId, currencyCode },
          deps: {
            storages,
            archivedTransactionsBalance,
            transactions,
          },
        } = getModuleState(getAppState),
        balance = getStorageCurrencyBalance({
          transactions,
          storages,
          archivedTransactionsBalance,
          storageId: selectedStorageId,
          currencyCode,
        })

      /* TODO 3 don't dispatch separate action to set amount, just pass it as part of open dialog */
      return { a: editTransactionEditTransactionSetAmountToAC(balance) }
    }
    return null
  }

export {
  editTransactionDialogsModuleMiddlewareFn,
  editTransactionDialogAddTransactionCallerId,
}
