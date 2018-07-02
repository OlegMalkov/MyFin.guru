/* @flow */

import {
  editIncomeOrExpenseDialogReducerFactory,
} from '../editIncomeOrExpenseDialogReducerFactory'
import {
  OPEN_ADD_EXPENSE_TRANSACTION_DIALOG,
  OPEN_EDIT_EXPENSE_TRANSACTION_DIALOG,
} from '../../editTransactionDialogsAC'

import type { BaseReducer } from '../../../../base.flow'
import type { IncomeOrExpenseDialogState } from '../editIncomeOrExpenseDialogReducerFactory'

const
  editExpenseDialogReducer: BaseReducer<IncomeOrExpenseDialogState> =
    /* $FlowFixMe ok */
    editIncomeOrExpenseDialogReducerFactory(
      OPEN_ADD_EXPENSE_TRANSACTION_DIALOG,
      OPEN_EDIT_EXPENSE_TRANSACTION_DIALOG,
      'expense',
    )

export {
  editExpenseDialogReducer,
}
