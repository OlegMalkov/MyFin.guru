/* @flow */

import React from 'react'
import { RNText } from '../../ui/RNUI'
import type { CurrencyCode, StorageId } from '../../const'
import type {
  ArchivedTransactionsBalance, Storages,
  Transactions,
} from '../../entities/account/live/flowTypes'
import { getStorageCurrencyBalance } from '../../entities/account/live/storagesSelectors'
import { toMoneyFloat } from '../../utils/format'

const
  renderBalance = ({
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
    currencyCode: CurrencyCode,
  }) => {
    const balance = toMoneyFloat(
      getStorageCurrencyBalance({
        transactions,
        storages,
        archivedTransactionsBalance,
        storageId,
        currencyCode,
      }),
    )
    return (
      <RNText>{`(${balance} ${currencyCode})`}</RNText>
    )
  }

export {
  renderBalance,
}
