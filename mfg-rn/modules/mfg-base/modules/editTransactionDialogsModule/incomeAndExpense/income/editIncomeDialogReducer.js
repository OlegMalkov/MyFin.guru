/* @flow */

import { editIncomeOrExpenseDialogReducerFactory } from '../editIncomeOrExpenseDialogReducerFactory'
import {
  OPEN_ADD_INCOME_TRANSACTION_DIALOG,
  OPEN_EDIT_INCOME_TRANSACTION_DIALOG,
} from '../../editTransactionDialogsAC'

import type { BaseReducer } from '../../../../base.flow'
import type { IncomeOrExpenseDialogState } from '../editIncomeOrExpenseDialogReducerFactory'

const
  editIncomeDialogReducer: BaseReducer<IncomeOrExpenseDialogState> =
    /* $FlowFixMe ok */
    editIncomeOrExpenseDialogReducerFactory(
      OPEN_ADD_INCOME_TRANSACTION_DIALOG,
      OPEN_EDIT_INCOME_TRANSACTION_DIALOG,
      'income',
    )

export {
  editIncomeDialogReducer,
}
