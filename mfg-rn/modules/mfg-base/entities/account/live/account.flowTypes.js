/* @flow */

import type { CurrencyCode, UID } from '../../../const'
import type { MapKV } from '../../../global.flow'
import type { PersonalData } from '../../personalData/personalData.flow'
import type {
  ArchivedTransactionsBalance,
  Categories, CategoriesSort, LiveAccount, PlannedTransactions, Plans, Storages, StoragesSort,
  Transactions,
  Users,
} from './flowTypes'

type MyAccountBase = {|
  encrypted: bool,
  version: 6,
|}

/* in firebase empty maps are removed */
export type DbLiveAccount = {
  users?: Users,
  storages?: Storages,
  transactions?: Transactions,
  mainCurrencyCode: CurrencyCode,
  categories?: Categories,
  categoriesSort?: CategoriesSort,
  storagesSort?: StoragesSort,
  archivedTransactionsBalance?: ArchivedTransactionsBalance,
  plans?: Plans,
  plannedTransactions?: PlannedTransactions,
}

export type DbAccount = {|
  live: DbLiveAccount,
  ...MyAccountBase,
|}

export type MyAccount = {|
  live: LiveAccount,
  archive: {
    transactions: Transactions
  },
  ...MyAccountBase,
|}

export type FbsDatabaseState = {|
  accounts: MapKV<UID, DbAccount>,
  personalData: MapKV<UID, PersonalData>,
|}
