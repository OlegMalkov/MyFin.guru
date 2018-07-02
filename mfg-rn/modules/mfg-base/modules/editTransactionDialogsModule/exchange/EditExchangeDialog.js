/* @flow */

import React from 'react'
import { MoneyInputRow } from '../../../ui/MoneyInputRow'
import { RNView } from '../../../ui/RNUI'
import { RNText } from '../../../ui/RNUI'
import { strings } from '../../../localization'
import {
  editTransactionOnAddTransactionExchangeAmountChangedAC,
  editTransactionOnAddTransactionExchangeCurrencyPressAC,
  editTransactionOnExchangeFromStoragePressAC,
  OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG,
  OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG,
} from '../editTransactionDialogsAC'
import { renderTransferDirection } from '../renderTransferDirection'
import { transactionDialogViewFactory } from '../transactionModalViewFactory'

const
  EditExchangeDialog = transactionDialogViewFactory({
    DirectionComponent: ({ state, dispatch }) => {
      const
        {
          selectedStorageId,
          currencyCode,
          instance: {
            targetAmount,
            targetCurrencyCode,
            targetStorageId,
            exchangeRateMarketStr,
            exchangeRateActualStr,
          },
          deps: {
            transactions,
            storages,
            archivedTransactionsBalance,
          },
        } = state,
        fromStorageTitle = storages[selectedStorageId].title,
        toStorageTitle = storages[targetStorageId].title

      return (
        <RNView>
          <RNText style={{ textAlign: 'right', fontSize: 20 }}>
            {exchangeRateActualStr}
          </RNText>
          <RNText
            style={{
              textAlign: 'right',
              fontSize: 12,
              paddingBottom: 5,
            }}
          >
            {strings.global} {exchangeRateMarketStr}
          </RNText>
          <MoneyInputRow
            onChange={v => dispatch(editTransactionOnAddTransactionExchangeAmountChangedAC(v))}
            amount={targetAmount}
            onCurrencyPress={
              () => dispatch(editTransactionOnAddTransactionExchangeCurrencyPressAC())
            }
            currencyCode={targetCurrencyCode}
            icon="add"
            autoFocus={false}
            placeholder={strings.enterAmount}
          />
          {
            renderTransferDirection({
              transactions,
              storages,
              archivedTransactionsBalance,
              fromStorageId: selectedStorageId,
              fromCurrencyCode: currencyCode,
              fromStorageTitle,
              toStorageId: targetStorageId,
              toCurrencyCode: targetCurrencyCode,
              toStorageTitle,
              onFromPress: () => dispatch(editTransactionOnExchangeFromStoragePressAC()),
            })
          }
        </RNView>
      )
    },
    inputIcon: 'remove',
    addActionType: OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG,
    editActionType: OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG,
    transactionType: 'exchange',
  })

export {
  EditExchangeDialog,
}
