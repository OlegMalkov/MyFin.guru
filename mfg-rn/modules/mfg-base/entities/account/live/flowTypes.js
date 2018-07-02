/* @flow */

import {
  creditStorageType,
  debitStorageType,
  debtStorageType,
  exchangeTransactionType, expenseCategoryType,
  expenseTransactionType, incomeCategoryType, incomeTransactionType,
  transferTransactionType,
} from '../../../const'
import type {
  CategoryId, MyDate, StorageId, UID, CurrencyCode,
  TransactionId, MyDay,
} from '../../../const'

import type { MapKV, MapV } from '../../../global.flow'

export type Tags = Array<string>
export type IntervalProps = {| fromTimestamp?: MyDate, toTimestamp?: MyDate, uid: UID |};
export type TransactionsSelectProps = {| ...IntervalProps, type: CategoryTypes |};

export type InvitationsMap = MapKV<UID, { accepted: bool, inviterName: string }>

export type Balance = {
  [currencyCode: CurrencyCode]: number;
}

export type DebtStorage = {|
  type: 'debt',
  ...StorageBase,
  until: MyDate,
  isReliable: bool,
|}

export type DebitStorage = {|
  type: 'debit',
  ...StorageBase,
|}

export type CreditStorage = {|
  type: 'credit',
  ...StorageBase,
  initialBalance: Balance,
  limitBalance: Balance,
|}

export type AStorage = DebtStorage | DebitStorage | CreditStorage

export type AStorageType = 'debt' | 'debit' | 'credit'

export type ExpenseTransactionType = typeof expenseTransactionType
export type IncomeTransactionType = typeof incomeTransactionType
export type TransferTransactionType = typeof transferTransactionType
export type ExchangeTransactionType = typeof exchangeTransactionType
export type ExpenseCategoryType = typeof expenseCategoryType
export type IncomeCategoryType = typeof incomeCategoryType
export type CategoryTypes = 'income' | 'expense'
export type DebtStorageType = typeof debtStorageType
export type DebitStorageType = typeof debitStorageType
export type CreditStorageType = typeof creditStorageType

type StorageBase = {|
  id: StorageId,
  title: string,
  hidden: bool,
  showInSecureMode: bool,
  initialBalance: Balance,
  uid: UID,
  encrypted?: true,
|}

export type TransactionType = ExpenseTransactionType |
  IncomeTransactionType |
  TransferTransactionType |
  ExchangeTransactionType

export type GeoPosition = {
  coords: {
    accuracy: number,
    altitude: number,
    altitudeAccuracy: number,
    heading: number,
    latitude: number,
    longitude: number,
    speed: number,
  },
  timestamp: number,
}

type TransactionBase = {|
  id: TransactionId,
  comment: string;
  currencyCode: CurrencyCode;
  value: number;
  date: MyDate;
  tags: Array<string>;
  uid: UID;
  position?: GeoPosition,
  encrypted?: true
|}

export type TransactionIncome = {|
  ...TransactionBase,
  type: IncomeTransactionType;
  storageIdTo: string;
  categoryId: CategoryId;
|}

export type TransactionExpense = {|
  ...TransactionBase,
  type: ExpenseTransactionType;
  storageIdFrom: string;
  categoryId: CategoryId;
|}

export type TransactionTransfer = {|
  ...TransactionBase,
  type: TransferTransactionType;
  storageIdFrom: string;
  storageIdTo: string;
|}

export type TransactionExchange = {|
  ...TransactionBase,
  type: ExchangeTransactionType;
  storageId: string;
  currencyCodeTo: CurrencyCode;
  valueTo: number;
|}

export type Transaction =
  TransactionIncome |
  TransactionExpense |
  TransactionTransfer |
  TransactionExchange

export type AccessLevel = {
  CREATE: boolean;
  READ: boolean;
  UPDATE: boolean;
  DELETE: boolean;
}

export type Permissions = {
  currencies: AccessLevel;
  storages: AccessLevel;
  transaction: AccessLevel;
  plans: AccessLevel;
}

export type Transactions = MapV<Transaction>;

export type Category = {|
  type: IncomeCategoryType | ExpenseCategoryType,
  id: CategoryId,
  isHidden: bool,
  parentId: CategoryId,
  title: string,
  encrypted?: true,
|}

export type Categories = MapKV<CategoryId, Category>

export type CategoryRef = {|
  ...Category,
  children?: Array<CategoryRef>,
  balance: Balance,
|}

export type CategoryRefInternal = {|
  ...Category,
  children?: Array<CategoryRefInternal>,
  balance: Balance,
  temporary?: true,
|}

export type CategoryRefWithTotalBalance = {|
  type: CategoryTypes,
  id: string,
  isHidden: bool,
  parentId: ?string,
  title: string,
  children: Array<CategoryRefWithTotalBalance> | null,
  balance: Balance,
  totalBalance: Balance,
|}

export type CategoryPlan = {|
  repeatEveryMonth: bool,
  amount: number,
  currencyCode: CurrencyCode,
  encrypted?: true,
|}

export type UserRef = {|
  name: string,
  isAnonymous?: true,
  permissions: any,
|}

export type Users = {
  [uid: UID]: UserRef
}

export type Storages = MapKV<StorageId, AStorage>

export type Plans = {
  [categoryId: CategoryId]: {
    [uid: UID]: {
      [period: string]: CategoryPlan
    }
  }
}

export type PlannedTransactionPeriodOverride = {|
  amount?: number,
  day?: MyDay,
  comment?: string,
  tags?: Array<string>,
|}

export type PlannedTransaction = {|
  id: string,
  categoryId: CategoryId,
  uid: UID,
  startDate: string,
  endDate?: string,
  deletedPeriods?: {
    [period: string]: true,
  },
  overriddenPeriods?: {
    [period: string]: PlannedTransactionPeriodOverride
  },
  amount: number,
  day: MyDay,
  repeatEveryMonth: bool,
  comment: string,
  tags?: Array<string>,
  currencyCode: CurrencyCode,
  encrypted?: true,
|}

export type PlannedTransactions = { [transactionId: string]: PlannedTransaction }

export type StoragesSort = {
  [uid: UID]: {
    [ownerUid: UID]: {
      type: {
        [id: StorageId]: number,
      },
    },
  },
}

export type CategoriesSort = MapV<number>
export type ArchivedTransactionsBalance = MapV<Balance>

export type LiveAccount = {|
  users: Users,
  storages: Storages,
  transactions: Transactions,
  mainCurrencyCode: CurrencyCode,
  categories: Categories,
  categoriesSort: CategoriesSort,
  storagesSort: StoragesSort,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  plans: Plans,
  plannedTransactions: PlannedTransactions,
|}

export type AccountParts = $Keys<LiveAccount>

export type TransactionsFilterProps = {|
  fromTimestamp?: MyDate,
  toTimestamp?: MyDate,
  uid: UID,
  categoryId?: string,
|}

export type CategoriesIdsTrueMap = MapKV<CategoryId, true>

export type TransactionMatcher =
  (t: Transaction,
   props: TransactionsFilterProps,
   relevantCategoriesIds: CategoriesIdsTrueMap | null) => bool
