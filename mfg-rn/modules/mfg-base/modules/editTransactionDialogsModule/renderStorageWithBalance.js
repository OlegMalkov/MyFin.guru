/* @flow */

import React from 'react'
import { RNTouchableHighlight } from '../../ui/RNUI'
import { RNView } from '../../ui/RNUI'
import { RNText } from '../../ui/RNUI'
import { renderBalance } from './renderBalance'

import type { CurrencyCode } from '../../const'
import type {
  ArchivedTransactionsBalance, Storages,
  Transactions,
} from '../../entities/account/live/flowTypes'

const
  renderStorageWithBalance = ({
                                transactions,
                                storages,
                                archivedTransactionsBalance,
                                key,
                                title,
                                storageId,
                                currencyCode,
                                onPress,
                              }: {|
    transactions: Transactions,
    storages: Storages,
    archivedTransactionsBalance: ArchivedTransactionsBalance,
    key?: string,
    title: string,
    storageId: string,
    currencyCode: CurrencyCode,
    onPress?: () => any,
  |}) => {
    return (
      <RNView key={key}>
        <RNTouchableHighlight
          onPress={onPress}
          underlayColor="lightgray"
        >
          <RNView style={{ flexDirection: 'row' }}>
            <RNText style={{ fontSize: 14 }}>{title}</RNText>
            {renderBalance({
              transactions,
              storages,
              archivedTransactionsBalance,
              storageId,
              currencyCode,
            })}
          </RNView>
        </RNTouchableHighlight>
      </RNView>
    )
  }

export {
  renderStorageWithBalance,
}
