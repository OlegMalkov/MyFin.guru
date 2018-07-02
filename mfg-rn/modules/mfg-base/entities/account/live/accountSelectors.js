/* @flow */

import { decBalance, incBalance } from './balanceUtils'

import type {
  Transaction,
  PlannedTransaction,
} from './flowTypes'
import { sumBalance } from './transactionsSelectors';

const
  foldPlannedTransactionsToBalanceReducer = (result, transaction) => {
    if (result[transaction.currencyCode] !== undefined) {
      result[transaction.currencyCode] +=
        transaction.amount // eslint-disable-line no-param-reassign
    } else {
      result[transaction.currencyCode] = transaction.amount // eslint-disable-line no-param-reassign
    }
    return result
  },
  plannedTransactionsToBalance = (transactions: Array<PlannedTransaction>) =>
    transactions.reduce(foldPlannedTransactionsToBalanceReducer, {}),

  transactionsBalanceSelector = (transactions: Array<Transaction>) => {
    const storagesBalancesById = {}
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        if (!storagesBalancesById[transaction.storageIdTo]) {
          storagesBalancesById[transaction.storageIdTo] = {}
        }
        incBalance(
          storagesBalancesById[transaction.storageIdTo],
          transaction.currencyCode,
          transaction.value,
        )
      } else if (transaction.type === 'expense') {
        const { storageIdFrom } = transaction
        if (!storagesBalancesById[storageIdFrom]) {
          storagesBalancesById[storageIdFrom] = {}
        }
        decBalance(
          storagesBalancesById[transaction.storageIdFrom],
          transaction.currencyCode,
          transaction.value,
        )
      } else if (transaction.type === 'transfer') {
        if (!storagesBalancesById[transaction.storageIdFrom]) {
          storagesBalancesById[transaction.storageIdFrom] = {}
        }
        decBalance(
          storagesBalancesById[transaction.storageIdFrom],
          transaction.currencyCode,
          transaction.value,
        )

        if (!storagesBalancesById[transaction.storageIdTo]) {
          storagesBalancesById[transaction.storageIdTo] = {}
        }
        incBalance(
          storagesBalancesById[transaction.storageIdTo],
          transaction.currencyCode,
          transaction.value,
        )
      } else if (transaction.type === 'exchange') {
        if (!storagesBalancesById[transaction.storageId]) {
          storagesBalancesById[transaction.storageId] = {}
        }
        decBalance(
          storagesBalancesById[transaction.storageId],
          transaction.currencyCode,
          transaction.value,
        )
        incBalance(
          storagesBalancesById[transaction.storageId],
          transaction.currencyCodeTo,
          transaction.valueTo,
        )
      }
    })

    return storagesBalancesById
  }

export {
  plannedTransactionsToBalance,
  sumBalance,
  transactionsBalanceSelector,
}

