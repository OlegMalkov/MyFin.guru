/* @flow */

import type { CurrencyCode, MyDate, StorageId, UID } from '../../../const'
import { __undef, balanceForAllTimeProps, date0 } from '../../../const'
import type { MapKV, MapV } from '../../../global.flow'
import { memo } from '../../../utils/memo'
import { filterObj, keys, omit, pipe, toEditableBalance, values } from '../../../utils/utils'
import { decBalance, incBalance } from './balanceUtils'
import type {
  ArchivedTransactionsBalance, AStorage, AStorageType,
  Balance,
  IntervalProps,
  Storages, Transaction,
  Transactions,
} from './flowTypes'
import { sumBalance, transactionsSelector } from './transactionsSelectors'
import { uidIsDef } from './utils'

export type StorageTotalBalance = {|
  id: StorageId,
  title: string,
  type: AStorageType,
  balance: Balance,
  hidden: bool,
  uid: UID,
  showInSecureMode: bool,
  selectedCurrencyCode?: CurrencyCode,
  debtUntil: MyDate,
|}

const
  storagesBalancesSelector = memo((transactions: Transactions,
    storages: Storages,
    archivedTransactionsBalance: MapV<Balance> = {},
    props: IntervalProps): MapKV<StorageId, Balance> => {
    const
      { uid, fromTimestamp, toTimestamp } = props,
      filteredStorages = makeFilterStorageByUid(uid)(storages),
      storagesBalancesById = values(filteredStorages)
        .reduce((acc, { id, initialBalance }) => {
          const
            balance = { ...initialBalance },
            archivedBalance = archivedTransactionsBalance[id],
            finalBalance = archivedBalance ? sumBalance(archivedBalance, balance) : balance

          return {
            ...acc,
            [id]: finalBalance,
          }
        }, {}),
      filteredTransactions = transactionsSelector(transactions, {
        uid: __undef,
        fromTimestamp,
        toTimestamp,
      })

    if (filteredTransactions.length === 0) {
      return storagesBalancesById
    }

    filteredTransactions.forEach((transaction: Transaction) => {
      switch (transaction.type) {
        case 'income':
          if (storagesBalancesById[transaction.storageIdTo]) {
            incBalance(
              storagesBalancesById[transaction.storageIdTo],
              transaction.currencyCode,
              transaction.value,
            )
          }
          break
        case 'expense':
          if (storagesBalancesById[transaction.storageIdFrom]) {
            decBalance(
              storagesBalancesById[transaction.storageIdFrom],
              transaction.currencyCode,
              transaction.value,
            )
          }
          break
        case 'transfer':
          if (storagesBalancesById[transaction.storageIdFrom]) {
            decBalance(
              storagesBalancesById[transaction.storageIdFrom],
              transaction.currencyCode,
              transaction.value,
            )
          }
          if (storagesBalancesById[transaction.storageIdTo]) {
            incBalance(
              storagesBalancesById[transaction.storageIdTo],
              transaction.currencyCode,
              transaction.value,
            )
          }
          break
        case 'exchange':
          if (storagesBalancesById[transaction.storageId]) {
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
          break
        default:
          throw new Error(`unknown transaction type: ${transaction.type}`)
      }
    })
    return storagesBalancesById
  }),
  getStorageCurrencyBalance = ({
    transactions,
    storages,
    archivedTransactionsBalance,
    storageId,
    currencyCode,
  }: {
    transactions: Transactions,
    storages: Storages,
    archivedTransactionsBalance: ArchivedTransactionsBalance,
    storageId: StorageId,
    currencyCode: CurrencyCode
  }) => {
    const
      storagesBalances = storagesBalancesSelector(
        transactions,
        storages,
        archivedTransactionsBalance,
        balanceForAllTimeProps,
      ),
      // todo 5 MFG-10 remove any
      sb: any = storagesBalances[storageId]

    return toEditableBalance(sb)[currencyCode] || 0;
  },
  makeFilterStorageByUid = (targetUid) => filterObj(({ uid }) => {
    return uidIsDef(targetUid) ? uid === targetUid : true
  }),
  allRemainsSelector = (transactions: Transactions,
    storages: Storages,
    archivedTransactionsBalance: ArchivedTransactionsBalance,
    props: IntervalProps): Array<StorageTotalBalance> => {
    const
      storagesBalances = storagesBalancesSelector(
        transactions,
        storages,
        archivedTransactionsBalance,
        props,
      ),
      storagesArr: Array<AStorage> = values(storages),
      storageBalanceArr = storagesArr.map((storage: AStorage) => {
        const
          { id, title, type, hidden, uid, showInSecureMode } = storage,
          debtUntil = storage.type === 'debt' ? storage.until : date0

        return ({
          id,
          title,
          type,
          balance: storagesBalances[id],
          hidden,
          uid,
          showInSecureMode,
          debtUntil,
        })
      })

    return storageBalanceArr;
  },
  totalRemainsInStoragesSelector = (transactions: Transactions,
    storages: Storages,
    archivedTransactionsBalance: ArchivedTransactionsBalance,
    props: IntervalProps) => {
    const
      storagesBalances: Object = storagesBalancesSelector(
        transactions,
        storages,
        archivedTransactionsBalance,
        props,
      ),
      storagesArr: Array<AStorage> = values(storages),
      filteredStoragesArr: Array<AStorage> = storagesArr.filter(
        (s: AStorage) => s.type === 'debt' ? !s.isReliable : false,
      ),
      notReliableDebtStoragesIds = filteredStoragesArr.map(({ id }) => id)

    const output = pipe(
      o => omit(notReliableDebtStoragesIds, o),
      values,
      v => v.reduce((result, balance) => {
        keys(balance)
          .forEach((currencyCode) => {
            if (!result[currencyCode]) {
              result[currencyCode] = 0 // eslint-disable-line no-param-reassign
            }

            result[currencyCode] += balance[currencyCode] // eslint-disable-line no-param-reassign
          })

        return result
      }, {}),
    )(storagesBalances)

    return output
  },
  storageById = (storages: Storages, { storageId }: {| storageId: string |}): AStorage | null => {
    const storage = storages[storageId]
    if (!storage) {
      return null
    }
    return storages[storageId]
  },
  storageTitleByIdSelector = (storages: Storages, props: {| storageId: string |}) => {
    const storage = storageById(storages, props)

    if (storage) {
      return storage.title
    }

    return `storage ${props.storageId} not found`
  }

export {
  totalRemainsInStoragesSelector,
  storageById,
  getStorageCurrencyBalance,
  storageTitleByIdSelector,
  allRemainsSelector,
}
