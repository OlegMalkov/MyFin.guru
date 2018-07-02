/* @flow */

import { isDefined } from '../../../utils/utils'
import { transactionDialogReducerFactory } from '../transactionModalReducerFactory'

import type { AnyBaseAction } from '../../../base.flow'
import type { ExReducer } from '../../../global.flow'
import type { EditTransactionDialogState } from '../flowTypes'

type IncomeOrExpenseInstanceState = {|
  storage: string,
  toCategory: string,
|}

export type IncomeOrExpenseDialogState = EditTransactionDialogState<IncomeOrExpenseInstanceState>
type R = ExReducer<IncomeOrExpenseInstanceState, IncomeOrExpenseDialogState, AnyBaseAction>
const
  makeIncomeOrExpenseInstanceReducer =
    (addActionType,
     editActionType): R =>
      (s, a, cs) => {
        if (s === undefined) {
          return {
            storage: '',
            toCategory: '',
          }
        }

        const { deps: { storages, categories }, selectedStorageId, selectedCategoryId } = cs
        if (
          a.type === addActionType
          && isDefined(selectedStorageId)
          && isDefined(selectedCategoryId)
        ) {
          return {
            storage: storages[selectedStorageId].title,
            toCategory: categories[selectedCategoryId].title,
          }
        }

        return s
      },

  editIncomeOrExpenseDialogReducerFactory =
    (addActionType: *, editActionType: *, transactionType: *) =>
      transactionDialogReducerFactory({
        instanceReducer: makeIncomeOrExpenseInstanceReducer(addActionType, editActionType),
        addActionType,
        editActionType,
        transactionType,
      })

export {
  editIncomeOrExpenseDialogReducerFactory,
}
