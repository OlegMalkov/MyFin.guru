/* @flow */

import type { MyDate, UID } from '../../../const'
import { uidIsDef, uidIsUndef } from './utils';
import type {
  Balance, Categories, CategoriesIdsTrueMap,
  Transaction, TransactionMatcher, Transactions,
  TransactionsFilterProps,
} from './flowTypes';
import { keys, pipe, T, values } from '../../../utils/utils';

const
  foldTransactionsToBalanceReducer = (result, transaction) => {
    if (result[transaction.currencyCode] !== undefined) {
      result[transaction.currencyCode] +=
        transaction.value // eslint-disable-line no-param-reassign
    } else {
      result[transaction.currencyCode] = transaction.value // eslint-disable-line no-param-reassign
    }
    return result
  },
  transactionsToBalance = (transactions: Array<Transaction>) =>
    transactions.reduce(foldTransactionsToBalanceReducer, {}),
  makeTransactionMatcher = (predicate: (t: Transaction) => bool) =>
    (item: Transaction,
     props: TransactionsFilterProps,
     relevantCategoriesIdsMap: CategoriesIdsTrueMap | null) => {
      const
        { fromTimestamp, toTimestamp, uid } = props,
        date: MyDate = item.date,
        typeMatches = predicate(item)

      if (typeMatches) {
        let
          fromMatches = false,
          toMatches = false,
          uidMatches = uidIsUndef(uid),
          categoryIdMatches = !relevantCategoriesIdsMap

        if (!fromTimestamp) {
          fromMatches = true
        } else {
          fromMatches = date >= fromTimestamp
        }
        if (!toTimestamp) {
          toMatches = true
        } else {
          toMatches = date <= toTimestamp
        }
        if (uidIsDef(uid)) {
          uidMatches = item.uid === uid
        }
        if (
          item.categoryId
          && relevantCategoriesIdsMap &&
          relevantCategoriesIdsMap[item.categoryId]
        ) {
          categoryIdMatches = true
        }

        return fromMatches && toMatches && uidMatches && categoryIdMatches
      }

      return false
    },
  simpleTransactionMatcher = makeTransactionMatcher(T),
  getAllChildCategoriesIds = (categories: Categories, parentCategoryId: string) => {
    const
      result: CategoriesIdsTrueMap = { [parentCategoryId]: true },
      addAllCategoryChildren = (catId) => {
        pipe(
          keys,
          categoryIds => categoryIds.filter(
            categoryId => categories[categoryId].parentId === catId
          ),
          relevantIds => relevantIds.forEach(categoryId => {
            result[categoryId] = true
            addAllCategoryChildren(categoryId)
          }),
        )(categories)
      }

    addAllCategoryChildren(parentCategoryId)
    return result
  },
  makeByCategoryTransactionsSelector = (transactionMatcher: TransactionMatcher) =>
    (categories: Categories, transactions: Transactions, props: TransactionsFilterProps) => {
      const relevantCategoriesIds = props.categoryId ?
        getAllChildCategoriesIds(categories, props.categoryId) : null

      return values(transactions)
        .filter((t) => transactionMatcher(t, props, relevantCategoriesIds))
    },
  makeTransactionsSelector = (transactionMatcher: TransactionMatcher) =>
    (transactions: Transactions, props: TransactionsFilterProps) => {
      return values(transactions)
        .filter((t) => transactionMatcher(t, props, null))
    },
  transactionsSelector = makeTransactionsSelector(simpleTransactionMatcher),
  byCategporyTransactionsSelector = makeByCategoryTransactionsSelector(simpleTransactionMatcher),

  sumBalance = (balance1: Balance, balance2: Balance): Balance => {
    const
      finalBalance = { ...balance1 }

    // $FlowFixMe todo
    Object.keys(balance2).forEach((currencyCode: CurrencyCode) => {
      if (finalBalance[currencyCode]) {
        finalBalance[currencyCode] += balance2[currencyCode]
      } else {
        finalBalance[currencyCode] = balance2[currencyCode]
      }
    })

    return finalBalance
  },
  getUserTransactionsCount = (transactions: Transactions, targetUid: UID) =>
    values(transactions).reduce((count, { uid }) => {
      if (uid === targetUid) {
        return count + 1
      }
      return count
    }, 0)

export {
  makeTransactionMatcher,
  transactionsToBalance,
  sumBalance,
  getUserTransactionsCount,
  transactionsSelector,
  byCategporyTransactionsSelector,
}
