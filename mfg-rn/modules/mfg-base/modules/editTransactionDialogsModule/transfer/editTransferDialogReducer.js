/* @flow */

import { __undef } from '../../../const'
import {
  OPEN_ADD_TRANSFER_TRANSACTION_DIALOG,
  OPEN_EDIT_TRANSFER_TRANSACTION_DIALOG,
} from '../editTransactionDialogsAC'
import { transactionDialogReducerFactory } from '../transactionModalReducerFactory'

import type { EditTransactionDialogState } from '../flowTypes'
import type { AnyBaseAction, BaseReducer } from '../../../base.flow'
import type { ExReducer } from '../../../global.flow'

type TransferInstanceState = {|
  targetStorageId: string,
  storage: string,
  targetStorage: string,
|}

export type TransferDialogState = EditTransactionDialogState<TransferInstanceState>

const
  transferReducer: ExReducer<TransferInstanceState, TransferDialogState, AnyBaseAction> =
    (s, a, cs) => {
      if (s === undefined) {
        return {
          targetStorageId: __undef,
          storage: '',
          targetStorage: '',
        }
      }

      if (a.type === OPEN_ADD_TRANSFER_TRANSACTION_DIALOG) {
        return {
          targetStorageId: a.targetStorageId,
          storage: cs.deps.storages[cs.selectedStorageId].title,
          targetStorage: cs.deps.storages[a.targetStorageId].title,
        }
      }

      return s
    },
  editTransferDialogReducer: BaseReducer<TransferDialogState> =
    /* $FlowFixMe ok */
    transactionDialogReducerFactory({
      instanceReducer: transferReducer,
      addActionType: OPEN_ADD_TRANSFER_TRANSACTION_DIALOG,
      editActionType: OPEN_EDIT_TRANSFER_TRANSACTION_DIALOG,
      transactionType: 'transfer',
    })

export {
  editTransferDialogReducer,
}
