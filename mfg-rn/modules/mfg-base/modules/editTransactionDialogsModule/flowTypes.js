/* @flow */

import type { AnyBaseAction, BaseDispatch } from '../../base.flow'
import type { CurrencyCode, MyDate } from '../../const'
import type {
  ArchivedTransactionsBalance, Categories, Storages, Transactions,
  TransactionType,
} from '../../entities/account/live/flowTypes'
import type { CurrenciesModule } from '../../entities/currencies/currenciesModuleReducer'
import type { Now } from '../../modules/nowModule/nowReducer'
import type { ExReducer } from '../../global.flow'

export type EditTransactionDialogDeps = {|
  categories: Categories,
  storages: Storages,
  currenciesModule: CurrenciesModule,
  mainCurrencyCode: CurrencyCode,
  transactions: Transactions,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  now: Now,
|}

export type EditTransactionDialogState<CS> = {|
  // Shared
  date: MyDate,
  transactionAmount: number,
  currencyCode: CurrencyCode,
  tags: Array<string>,
  comment: string,
  instance: CS,
  selectedStorageId: string,
  selectedCategoryId: string,

  // Edit
  id: string,
  isEdit: bool,
  opened: bool,

  deps: EditTransactionDialogDeps,
|}

export type TransactionDialogViewFactoryProps<CS> = {
  DirectionComponent: React$StatelessFunctionalComponent<{|
    state: EditTransactionDialogState<CS>,
    dispatch: BaseDispatch<>
  |}>,
  inputIcon?: string,
  transactionType: TransactionType
}

export type TransactionDialogReducerFactoryProps<CS, AAT, EAT> = {
  instanceReducer: ExReducer<CS, *, AnyBaseAction>,
  addActionType: AAT,
  editActionType: EAT,
  transactionType: TransactionType
}
