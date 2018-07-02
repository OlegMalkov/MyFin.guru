/* @flow */

import React from 'react'
import { RNView } from '../../ui/RNUI'
import { RNText } from '../../ui/RNUI'
import { renderStorageWithBalance } from './renderStorageWithBalance'

import type { CurrencyCode, StorageId } from '../../const'
import type {
  ArchivedTransactionsBalance, Storages,
  Transactions,
} from '../../entities/account/live/flowTypes'

type Props = {|
  transactions: Transactions,
  storages: Storages,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  fromStorageId: StorageId,
  fromCurrencyCode: CurrencyCode,
  fromStorageTitle: string,
  toStorageId: StorageId,
  toCurrencyCode: CurrencyCode,
  toStorageTitle: string,
  onFromPress: () => any,
|}

const
  renderTransferDirection = ({
                               transactions,
                               storages,
                               archivedTransactionsBalance,
                               fromStorageId,
                               fromCurrencyCode,
                               fromStorageTitle,
                               toStorageId,
                               toCurrencyCode,
                               toStorageTitle,
                               onFromPress,
                             }: Props) => {
    return (
      <RNView>
        {
          renderStorageWithBalance({
            transactions,
            storages,
            archivedTransactionsBalance,
            title: fromStorageTitle,
            storageId: fromStorageId,
            currencyCode: fromCurrencyCode,
            onPress: onFromPress,
          })
        }
        <RNText> {'->'} </RNText>
        {
          renderStorageWithBalance({
            transactions,
            storages,
            archivedTransactionsBalance,
            title: toStorageTitle,
            storageId: toStorageId,
            currencyCode: toCurrencyCode,
          })
        }
      </RNView>
    )
  }

export {
  renderTransferDirection,
}
