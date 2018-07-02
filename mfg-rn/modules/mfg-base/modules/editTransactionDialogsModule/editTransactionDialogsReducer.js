/* @flow */

import {
  __undef,
  exchangeTransactionType, expenseTransactionType, incomeTransactionType,
  transferTransactionType,
} from '../../const'
import {
  archivedTransactionsBalanceReducer,
} from '../../entities/account/live/parts/archivedTransactionsBalanceReducer'
import { storagesReducer } from '../../entities/account/live/parts/storagesReducer'
import { transactionsReducer } from '../../entities/account/live/parts/transactionsReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from '../../utils/utils'
import { geoReducer } from '../geoModule/geoModuleReducer'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'

import { editTransactionDialogsModuleId } from './editTransactionDialogsModuleId'
import { editExchangeDialogReducer } from './exchange/editExchangeDialogReducer'
import { editExpenseDialogReducer } from './incomeAndExpense/expense/editExpenseDialogReducer'
import { editIncomeDialogReducer } from './incomeAndExpense/income/editIncomeDialogReducer'
import { editTransferDialogReducer } from './transfer/editTransferDialogReducer'

import type { GeoModuleState } from '../geoModule/geoModuleReducer'
import type { BaseReducer } from '../../base.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'
import type {
  ArchivedTransactionsBalance, Storages,
  Transactions,
} from '../../entities/account/live/flowTypes'
import type { ExchangeDialogState } from './exchange/editExchangeDialogReducer'
import type {
  IncomeOrExpenseDialogState,
} from './incomeAndExpense/editIncomeOrExpenseDialogReducerFactory'
import type { TransferDialogState } from './transfer/editTransferDialogReducer'

type Deps = {|
  storages: Storages,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  transactions: Transactions,
  session: Session,
  geo: GeoModuleState,
|}

export type EditTransactionDialogsState = {
  deps: Deps,
  income: IncomeOrExpenseDialogState,
  expense: IncomeOrExpenseDialogState,
  transfer: TransferDialogState,
  exchange: ExchangeDialogState,
}

const
  depsInitialState: Deps = {
    storages: getReducerInitialState(storagesReducer),
    archivedTransactionsBalance: getReducerInitialState(archivedTransactionsBalanceReducer),
    transactions: getReducerInitialState(transactionsReducer),
    session: getReducerInitialState(sessionModuleReducer),
    geo: getReducerInitialState(geoReducer),
  },
  initialState = {
    deps: depsInitialState,
    income: getReducerInitialState(editIncomeDialogReducer),
    expense: getReducerInitialState(editExpenseDialogReducer),
    transfer: getReducerInitialState(editTransferDialogReducer),
    exchange: getReducerInitialState(editExchangeDialogReducer),
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    storages: storagesReducer(s.storages, a),
    archivedTransactionsBalance:
      archivedTransactionsBalanceReducer(s.archivedTransactionsBalance, a),
    transactions: transactionsReducer(s.transactions, a),
    session: sessionModuleReducer(s.session, a),
    geo: geoReducer(s.geo, a),
  })),
  reducer: BaseReducer<EditTransactionDialogsState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
      s => updateChild(s, a, 'income', editIncomeDialogReducer),
      s => updateChild(s, a, 'expense', editExpenseDialogReducer),
      s => updateChild(s, a, 'transfer', editTransferDialogReducer),
      s => updateChild(s, a, 'exchange', editExchangeDialogReducer),
    )(s)
  },
  editTransactionsDialogCurrentTransactionTypeSelector = (s: EditTransactionDialogsState) => {
    const {
      income: { opened: incomeOpened },
      expense: { opened: expenseOpened },
      transfer: { opened: transferOpened },
      exchange: { opened: exchangeOpened },
    } = s
    if (incomeOpened) {
      return incomeTransactionType
    } else if (expenseOpened) {
      return expenseTransactionType
    } else if (transferOpened) {
      return transferTransactionType
    } else if (exchangeOpened) {
      return exchangeTransactionType
    }
    return __undef
  },
  editTransactionDialogsReducer: BaseReducer<EditTransactionDialogsState> =
    makeModuleReducer({ reducer, moduleId: editTransactionDialogsModuleId })

export {
  editTransactionDialogsReducer,
  editTransactionsDialogCurrentTransactionTypeSelector,
}

