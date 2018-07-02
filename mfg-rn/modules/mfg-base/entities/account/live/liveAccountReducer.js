/* @flow */

import { combineReducers } from 'redux'
import {
  categoriesReducer as categories,
} from './parts/categoriesReducer'
import {
  mainCurrencyCodeReducer as mainCurrencyCode,
} from './parts/mainCurrencyCodeReducer'
import {
  archivedTransactionsBalanceReducer as archivedTransactionsBalance,
} from './parts/archivedTransactionsBalanceReducer'
import {
  categoriesSortReducer as categoriesSort,
} from './parts/categoriesSortReducer'
import {
  plannedTransactionsReducer as planedTransactions,
} from './parts/plannedTransactionsReducer'
import {
  plansReducer as plans,
} from './parts/plansReducer'
import {
  storagesReducer as storages,
} from './parts/storagesReducer'
import {
  transactionsReducer as transactions,
} from './parts/transactionsReducer'
import {
  usersReducer as users,
} from './parts/usersReducer'

const
  liveAccountReducer = combineReducers({
    categories,
    mainCurrencyCode,
    archivedTransactionsBalance,
    categoriesSort,
    planedTransactions,
    plans,
    storages,
    transactions,
    users,
  })

export {
  liveAccountReducer,
}
