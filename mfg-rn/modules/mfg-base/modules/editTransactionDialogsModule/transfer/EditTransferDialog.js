/* @flow */

import { editTransactionOnTransferFromStoragePressAC } from '../editTransactionDialogsAC'
import { renderTransferDirection } from '../renderTransferDirection'
import { transactionDialogViewFactory } from '../transactionModalViewFactory'

const
  EditTransferDialog = transactionDialogViewFactory({
    DirectionComponent: ({ state, dispatch }) => {
      const
        {
          selectedStorageId,
          currencyCode,
          instance: {
            targetStorageId,
          },
          deps: {
            transactions,
            storages,
            archivedTransactionsBalance,
          },
        } = state

      return renderTransferDirection({
        transactions,
        storages,
        archivedTransactionsBalance,
        fromStorageId: selectedStorageId,
        fromCurrencyCode: currencyCode,
        fromStorageTitle: state.instance.storage,
        toStorageId: targetStorageId,
        toCurrencyCode: currencyCode,
        toStorageTitle: state.instance.targetStorage,
        onFromPress: () => dispatch(editTransactionOnTransferFromStoragePressAC()),
      })
    },
    transactionType: 'transfer',
  })

export {
  EditTransferDialog,
}
