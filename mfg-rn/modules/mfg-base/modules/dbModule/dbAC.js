/* @flow */

/* eslint-disable max-len */

import type { PersonalData, Preferences } from '../../entities/personalData/personalData.flow'
import { DbAuthKinds } from './auth/kind'

import type { DbLiveAccount } from '../../entities/account/live/account.flowTypes'
import type {
  ArchivedTransactionsBalance,
  AStorage, Categories, CategoriesSort, Category, CategoryPlan, PlannedTransaction,
  PlannedTransactionPeriodOverride, PlannedTransactions, Plans, Storages, StoragesSort,
  Transaction, Users,
} from '../../entities/account/live/flowTypes'
import type { Mutator } from '../../utils/utils'
import type { AccountDataVersion } from '../../version'

import type {
  CategoryId, CurrencyCode, EMAIL, MyDate, PlanPeriod, StorageId, TransactionId,
  UID,
} from '../../const'

export const
  DB_AUTH_EMAIL_PASSWORD: 'DB_AUTH_EMAIL_PASSWORD' = 'DB_AUTH_EMAIL_PASSWORD',
  DB_AUTH_STARTED: 'DB_AUTH_STARTED' = 'DB_AUTH_STARTED',
  DB_AUTH_SUCCESS: 'DB_AUTH_SUCCESS' = 'DB_AUTH_SUCCESS',
  DB_AUTH_FAIL: 'DB_AUTH_FAIL' = 'DB_AUTH_FAIL',
  DB_REGISTER_STARTED: 'DB_REGISTER_STARTED' = 'DB_REGISTER_STARTED',
  DB_REGISTER_SUCCESS: 'DB_REGISTER_SUCCESS' = 'DB_REGISTER_SUCCESS',
  DB_REGISTER_FAIL: 'DB_REGISTER_FAIL' = 'DB_REGISTER_FAIL',
  DB_REGISTER_EMAIL_PASSWORD: 'DB_REGISTER_EMAIL_PASSWORD' = 'DB_REGISTER_EMAIL_PASSWORD',
  DB_UPDATE_PREFERENCES: 'DB_UPDATE_PREFERENCES' = 'DB_UPDATE_PREFERENCES',
  DB_UPDATE_PREFERENCES_STARTED: 'DB_UPDATE_PREFERENCES_STARTED' = 'DB_UPDATE_PREFERENCES_STARTED',
  DB_UPDATE_PREFERENCES_DONE: 'DB_UPDATE_PREFERENCES_DONE' = 'DB_UPDATE_PREFERENCES_DONE',
  DB_DELETE_TRANSACTION_ACTION: 'DB_DELETE_TRANSACTION_ACTION' = 'DB_DELETE_TRANSACTION_ACTION',
  DB_DELETE_TRANSACTION_STARTED_ACTION: 'DB_DELETE_TRANSACTION_STARTED_ACTION' = 'DB_DELETE_TRANSACTION_STARTED_ACTION',
  DB_DELETE_TRANSACTION_DONE_ACTION: 'DB_DELETE_TRANSACTION_DONE_ACTION' = 'DB_DELETE_TRANSACTION_DONE_ACTION',
  DB_ARCHIVE_TRANSACTIONS: 'DB_ARCHIVE_TRANSACTIONS' = 'DB_ARCHIVE_TRANSACTIONS',
  DB_ARCHIVE_TRANSACTIONS_STARTED: 'DB_ARCHIVE_TRANSACTIONS_STARTED' = 'DB_ARCHIVE_TRANSACTIONS_STARTED',
  DB_ARCHIVE_TRANSACTIONS_DONE: 'DB_ARCHIVE_TRANSACTIONS_DONE' = 'DB_ARCHIVE_TRANSACTIONS_DONE',
  DB_ARCHIVE_TRANSACTIONS_FAIL: 'DB_ARCHIVE_TRANSACTIONS_FAIL' = 'DB_ARCHIVE_TRANSACTIONS_FAIL',
  DB_SEND_BACKUP: 'DB_SEND_BACKUP' = 'DB_SEND_BACKUP',
  DB_SEND_BACKUP_DONE: 'DB_SEND_BACKUP_DONE' = 'DB_SEND_BACKUP_DONE',
  DB_UPDATE_BACKUP_EMAIL: 'DB_UPDATE_BACKUP_EMAIL' = 'DB_UPDATE_BACKUP_EMAIL',
  DB_UPDATE_BACKUP_EMAIL_DONE: 'DB_UPDATE_BACKUP_EMAIL_DONE' = 'DB_UPDATE_BACKUP_EMAIL_DONE',
  DB_UPDATE_CATEGORY: 'DB_UPDATE_CATEGORY' = 'DB_UPDATE_CATEGORY',
  DB_UPDATE_CATEGORY_DONE: 'DB_UPDATE_CATEGORY_DONE' = 'DB_UPDATE_CATEGORY_DONE',
  DB_UPDATE_STORAGE: 'DB_UPDATE_STORAGE' = 'DB_UPDATE_STORAGE',
  DB_UPDATE_STORAGE_DONE: 'DB_UPDATE_STORAGE_DONE' = 'DB_UPDATE_STORAGE_DONE',
  DB_UPDATE_TRANSACTION: 'DB_UPDATE_TRANSACTION' = 'DB_UPDATE_TRANSACTION',
  DB_UPDATE_TRANSACTION_DONE: 'DB_UPDATE_TRANSACTION_DONE' = 'DB_UPDATE_TRANSACTION_DONE',
  DB_UPDATE_CURRENCY_CODE: 'DB_UPDATE_CURRENCY_CODE' = 'DB_UPDATE_CURRENCY_CODE',
  DB_UPDATE_CURRENCY_CODE_DONE: 'DB_UPDATE_CURRENCY_CODE_DONE' = 'DB_UPDATE_CURRENCY_CODE_DONE',
  DB_UPDATE_STORAGE_HIDDEN: 'DB_UPDATE_STORAGE_HIDDEN' = 'DB_UPDATE_STORAGE_HIDDEN',
  DB_UPDATE_STORAGE_HIDDEN_DONE: 'DB_UPDATE_STORAGE_HIDDEN_DONE' = 'DB_UPDATE_STORAGE_HIDDEN_DONE',
  DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE: 'DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE' = 'DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE',
  DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_DONE: 'DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_DONE' = 'DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_DONE',
  DB_UPDATE_PERSONAL_NAME: 'DB_UPDATE_PERSONAL_NAME' = 'DB_UPDATE_PERSONAL_NAME',
  DB_UPDATE_PERSONAL_NAME_DONE: 'DB_UPDATE_PERSONAL_NAME_DONE' = 'DB_UPDATE_PERSONAL_NAME_DONE',
  DB_UPDATE_SORT: 'DB_UPDATE_SORT' = 'DB_UPDATE_SORT',
  DB_UPDATE_SORT_DONE: 'DB_UPDATE_SORT_DONE' = 'DB_UPDATE_SORT_DONE',
  DB_DELETE_CATEGORY_PLAN: 'DB_DELETE_CATEGORY' = 'DB_DELETE_CATEGORY',
  DB_DELETE_CATEGORY_PLAN_DONE: 'DB_DELETE_CATEGORY_DONE' = 'DB_DELETE_CATEGORY_DONE',
  DB_UPDATE_CATEGORY_PLAN: 'DB_UPDATE_CATEGORY_PLAN' = 'DB_UPDATE_CATEGORY_PLAN',
  DB_UPDATE_CATEGORY_PLAN_DONE: 'DB_UPDATE_CATEGORY_PLAN_DONE' = 'DB_UPDATE_CATEGORY_PLAN_DONE',
  DB_UPDATE_PLANNED_TRANSACTION: 'DB_UPDATE_PLANNED_TRANSACTION' = 'DB_UPDATE_PLANNED_TRANSACTION',
  DB_UPDATE_PLANNED_TRANSACTION_DONE: 'DB_UPDATE_PLANNED_TRANSACTION_DONE' = 'DB_UPDATE_PLANNED_TRANSACTION_DONE',
  DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW: 'DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW' = 'DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW',
  DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE: 'DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE' = 'DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE',
  DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE: 'DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE' = 'DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE',
  DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE_DONE: 'DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE_DONE' = 'DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE_DONE',
  DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS: 'DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS' = 'DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS',
  DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_DONE: 'DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_DONE' = 'DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_DONE',
  DB_DELETE_PLANNED_TRANSACTION: 'DB_DELETE_PLANNED_TRANSACTION' = 'DB_DELETE_PLANNED_TRANSACTION',
  DB_DELETE_PLANNED_TRANSACTION_DONE: 'DB_DELETE_PLANNED_TRANSACTION_DONE' = 'DB_DELETE_PLANNED_TRANSACTION_DONE',
  DB_UPDATE_PLANNED_TRANSACTION_END_DATE: 'DB_UPDATE_PLANNED_TRANSACTION_END_DATE' = 'DB_UPDATE_PLANNED_TRANSACTION_END_DATE',
  DB_UPDATE_PLANNED_TRANSACTION_END_DATE_DONE: 'DB_UPDATE_PLANNED_TRANSACTION_END_DATE_DONE' = 'DB_UPDATE_PLANNED_TRANSACTION_END_DATE_DONE',
  DB_GET_PERSONAL_DATA: 'DB_GET_PERSONAL_DATA' = 'DB_GET_PERSONAL_DATA',
  DB_GET_PERSONAL_DATA_DONE: 'DB_GET_PERSONAL_DATA_DONE' = 'DB_GET_PERSONAL_DATA_DONE',
  DB_GET_ACCOUNT_VERSION: 'DB_GET_ACCOUNT_VERSION' = 'DB_GET_ACCOUNT_VERSION',
  DB_GET_ACCOUNT_VERSION_DONE: 'DB_GET_ACCOUNT_VERSION_DONE' = 'DB_GET_ACCOUNT_VERSION_DONE',
  DB_GET_ACCOUNT_ENCRYPTION_STATUS: 'DB_GET_ACCOUNT_ENCRYPTION_STATUS' = 'DB_GET_ACCOUNT_ENCRYPTION_STATUS',
  DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE: 'DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE' = 'DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE',
  DB_GET_LIVE_ACCOUNT: 'DB_GET_LIVE_ACCOUNT' = 'DB_GET_LIVE_ACCOUNT',
  DB_GET_LIVE_ACCOUNT_DONE: 'DB_GET_LIVE_ACCOUNT_DONE' = 'DB_GET_LIVE_ACCOUNT_DONE',
  DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS: 'DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS' = 'DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS',
  DB_SUBSCRIBE_NEW_TRANSACTIONS: 'DB_SUBSCRIBE_NEW_TRANSACTIONS' = 'DB_SUBSCRIBE_NEW_TRANSACTIONS',
  DB_IS_ONLINE: 'DB_IS_ONLINE' = 'DB_IS_ONLINE',
  DB_IS_OFFLINE: 'DB_IS_OFFLINE' = 'DB_IS_OFFLINE',
  DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED: 'DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED' = 'DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED',
  DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED: 'DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED' = 'DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED',
  DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED: 'DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED' = 'DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED',
  DB_LIVE_ACCOUNT_STORAGES_ARRIVED: 'DB_LIVE_ACCOUNT_STORAGES_ARRIVED' = 'DB_LIVE_ACCOUNT_STORAGES_ARRIVED',
  DB_LIVE_ACCOUNT_USERS_ARRIVED: 'DB_LIVE_ACCOUNT_USERS_ARRIVED' = 'DB_LIVE_ACCOUNT_USERS_ARRIVED',
  DB_LIVE_ACCOUNT_PLANS_ARRIVED: 'DB_LIVE_ACCOUNT_PLANS_ARRIVED' = 'DB_LIVE_ACCOUNT_PLANS_ARRIVED',
  DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED: 'DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED' = 'DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED',
  DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED: 'DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED' = 'DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED',
  DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED: 'DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED' = 'DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED',
  DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED: 'DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED' = 'DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED',
  DB_SUBSCRIBE_PERSONAL_DATA: 'DB_SUBSCRIBE_PERSONAL_DATA' = 'DB_SUBSCRIBE_PERSONAL_DATA',
  DB_PERSONAL_DATA_ARRIVED: 'DB_PERSONAL_DATA_ARRIVED' = 'DB_PERSONAL_DATA_ARRIVED'

export type EmailPasswordProps = {|
  email: EMAIL,
  password: string,
|}

type DbAuthEmailPasswordAction = {|
  type: typeof DB_AUTH_EMAIL_PASSWORD,
  kind: typeof DbAuthKinds.EmailPassword,
  ...EmailPasswordProps,
|}

type DbRegisterEmailPasswordAction = {|
  type: typeof DB_REGISTER_EMAIL_PASSWORD,
  kind: typeof DbAuthKinds.EmailPassword,
  ...EmailPasswordProps,
|}
type AuthStartedAction = {| type: typeof DB_AUTH_STARTED |}
type AuthSuccessAction = {| type: typeof DB_AUTH_SUCCESS, uid: UID |}
type AuthFailAction = {| type: typeof DB_AUTH_FAIL, message: string |}
type DbRegisterStartedAction = {| type: typeof DB_REGISTER_STARTED |}
type DbRegisterSuccessAction = {| type: typeof DB_REGISTER_SUCCESS |}
type DbRegisterFailAction = {| type: typeof DB_REGISTER_FAIL, message: string |}
type UpdatePreferencesAction = {|
  type: typeof DB_UPDATE_PREFERENCES,
  preferencesToUpdate: Preferences,
|}
type UpdatePreferencesStartedAction = {| type: typeof DB_UPDATE_PREFERENCES_STARTED |}
type UpdatePreferencesStartedDoneAction = {| type: typeof DB_UPDATE_PREFERENCES_DONE |}
type DeleteTransactionAction = {|
  type: typeof DB_DELETE_TRANSACTION_ACTION,
  transactionId: TransactionId,
|}
type DeleteTransactionStartedAction = {| type: typeof DB_DELETE_TRANSACTION_STARTED_ACTION |}
type DeleteTransactionDoneAction = {| type: typeof DB_DELETE_TRANSACTION_DONE_ACTION |}
type ArchiveTransactionsAction = {| type: typeof DB_ARCHIVE_TRANSACTIONS, borderDate: MyDate |}
type ArchiveTransactionsStartedAction = {| type: typeof DB_ARCHIVE_TRANSACTIONS_STARTED |}
type ArchiveTransactionsDoneAction = {| type: typeof DB_ARCHIVE_TRANSACTIONS_DONE |}
type ArchiveTransactionsFailAction = {| type: typeof DB_ARCHIVE_TRANSACTIONS_FAIL |}
type SendBackupAction = {| type: typeof DB_SEND_BACKUP, backupEmail: EMAIL |}
type SendBackupDoneAction = {| type: typeof DB_SEND_BACKUP_DONE |}
type UpdateBackupEmailAction = {| type: typeof DB_UPDATE_BACKUP_EMAIL, backupEmail: EMAIL |}
type UpdateBackupEmailDoneAction = {| type: typeof DB_UPDATE_BACKUP_EMAIL_DONE |}

export type UpdateCategoryProps = {|
  category: Category,
|}

type UpdateCategoryAction = {|
  type: typeof DB_UPDATE_CATEGORY,
  ...UpdateCategoryProps,
|}

type UpdateCategoryDoneAction = {| type: typeof DB_UPDATE_CATEGORY_DONE |}

type UpdateStorageAction = {|
  type: typeof DB_UPDATE_STORAGE,
  storage: AStorage,
|}

type UpdateStorageDoneAction = {| type: typeof DB_UPDATE_STORAGE_DONE |}

type UpdateTransactionAction = {| type: typeof DB_UPDATE_TRANSACTION, transaction: Transaction |}

type UpdateTransactionDoneAction = {| type: typeof DB_UPDATE_TRANSACTION_DONE |}

type UpdateMainCurrencyCodeAction = {|
  type: typeof DB_UPDATE_CURRENCY_CODE,
  currencyCode: CurrencyCode,
|}

type UpdateCurrencyCodeDoneAction = {| type: typeof DB_UPDATE_CURRENCY_CODE_DONE |}

export type UpdateStorageHiddenProps = {| storageId: StorageId, hidden: bool |}
type UpdateStorageHiddenAction = {|
  type: typeof DB_UPDATE_STORAGE_HIDDEN,
  ...UpdateStorageHiddenProps,
|}
type UpdateStorageHiddenDoneAction = {| type: typeof DB_UPDATE_STORAGE_HIDDEN_DONE |}

export type UpdateStorageShowInSecureModeProps = {| storageId: StorageId, showInSecureMode: bool |}

type UpdateStorageShowInSecureModeAction = {|
  type: typeof DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE,
  ...UpdateStorageShowInSecureModeProps,
|}

type UpdateStorageShowInSecureModeDoneAction =
  {| type: typeof DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_DONE |}

type UpdatePersonalNameAction = {| type: typeof DB_UPDATE_PERSONAL_NAME, name: string |}

type UpdatePersonalNameDoneAction =
  {| type: typeof DB_UPDATE_PERSONAL_NAME_DONE |}

export type UpdateSortProps = {|
  dbKey: string,
  sortSpecificPath: string,
  /* todo 4 MFG-16 replace sort: Object */
  sort: Object,
|}

type UpdateSortAction = {|
  type: typeof DB_UPDATE_SORT,
  ...UpdateSortProps,
|}

type UpdateSortDoneAction =
  {| type: typeof DB_UPDATE_SORT_DONE |}

type UpdateCategoryPlanBaseProps = {|
  categoryId: CategoryId,
  uid: UID,
  period: PlanPeriod,
|}

export type UpdateCategoryPlanProps = {|
  ...UpdateCategoryPlanBaseProps,
  plan: CategoryPlan,
|}

export type DeleteCategoryPlanProps = UpdateCategoryPlanBaseProps

type UpdateCategoryPlanAction = {|
  type: typeof DB_UPDATE_CATEGORY_PLAN,
  ...UpdateCategoryPlanProps,
|}

type UpdateCategoryPlanDoneAction = {|
  type: typeof DB_UPDATE_CATEGORY_PLAN_DONE,
|}

type DeleteCategoryPlanAction = {|
  type: typeof DB_DELETE_CATEGORY_PLAN,
  ...DeleteCategoryPlanProps,
|}

type DeleteCategoryPlanDoneAction = {|
  type: typeof DB_DELETE_CATEGORY_PLAN_DONE,
|}

type UpdatePlannedTransactionAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION,
  plannedTransaction: PlannedTransaction,
|}

type UpdatePlannedTransactionDoneAction = {| type: typeof DB_UPDATE_PLANNED_TRANSACTION_DONE |}

export type EndPrevPlannedTransactionAndCreateNewProps = {|
  plannedTransaction: PlannedTransaction,
  endPrevProps: { transactionId: TransactionId, period: PlanPeriod },
|}

type EndPrevPlannedTransactionAndCreateNewAction = {|
  type: typeof DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW,
  ...EndPrevPlannedTransactionAndCreateNewProps,
|}

type EndPrevPlannedTransactionAndCreateNewDoneAction = {|
  type: typeof DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE,
|}

export type UpdatePlannedTransactionsPeriodOverrideProps = {|
  transactionId: TransactionId,
  period: PlanPeriod,
  periodOverride: PlannedTransactionPeriodOverride,
|}

type UpdatePlannedTransactionsPeriodOverrideAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE,
  ...UpdatePlannedTransactionsPeriodOverrideProps
|}

type UpdatePlannedTransactionsPeriodOverrideDoneAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE_DONE,
|}

export type UpdatePlannedTransactionDeletedPeriodsProps = {|
  transactionId: TransactionId,
  period: PlanPeriod,
|}

type UpdatePlannedTransactionDeletedPeriodsAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS,
  ...UpdatePlannedTransactionDeletedPeriodsProps,
|}

type UpdatePlannedTransactionDeletedPeriodsDoneAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_DONE,
|}

type DeletePlannedTransactionAction = {|
  type: typeof DB_DELETE_PLANNED_TRANSACTION,
  transactionId: TransactionId,
|}
type DeletePlannedTransactionDoneAction = {|
  type: typeof DB_DELETE_PLANNED_TRANSACTION_DONE,
|}

export type UpdatePlannedTransactionEndDateProps = {|
  transactionId: TransactionId,
  endDate: PlanPeriod,
|}

type UpdatePlannedTransactionEndDateAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_END_DATE,
  ...UpdatePlannedTransactionEndDateProps,
|}

type UpdatePlannedTransactionEndDateDoneAction = {|
  type: typeof DB_UPDATE_PLANNED_TRANSACTION_END_DATE_DONE
|}

type GetPersonalDataAction = {|
  type: typeof DB_GET_PERSONAL_DATA
|}

type GetPersonalDataDoneAction = {|
  type: typeof DB_GET_PERSONAL_DATA_DONE,
  personalData: PersonalData,
|}

type PersonalDataArrivedAction = {|
  type: typeof DB_PERSONAL_DATA_ARRIVED,
  personalData: PersonalData,
|}

type GetAccountVersionAction = {|
  type: typeof DB_GET_ACCOUNT_VERSION,
|}

type GetAccountVersionDoneAction = {|
  type: typeof DB_GET_ACCOUNT_VERSION_DONE,
  accountDataVersion: AccountDataVersion,
|}

type GetAccountEncryptionStatusAction = {|
  type: typeof DB_GET_ACCOUNT_ENCRYPTION_STATUS,
|}

type GetAccountEncryptionStatusDoneAction = {|
  type: typeof DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE,
  encrypted: bool,
|}

type GetLiveAccountAction = {| type: typeof DB_GET_LIVE_ACCOUNT |}

type GetLiveAccountDoneAction = {|
  type: typeof DB_GET_LIVE_ACCOUNT_DONE,
  liveAccount: DbLiveAccount,
|}

type SubscribeLiveAccountPartsAction = {|
  type: typeof DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS,
|}

type SubscribeNewTransactionsAction = {|
  type: typeof DB_SUBSCRIBE_NEW_TRANSACTIONS,
|}

type IsOnlineAction = {| type: typeof DB_IS_ONLINE |}
type IsOfflineAction = {| type: typeof DB_IS_OFFLINE |}

type TransactionArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED, transaction: Transaction |}


type CategoriesArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED, value: Categories |}
type MainCurrencyCodeArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED, value: CurrencyCode |}
type StoragesArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_STORAGES_ARRIVED, value: Storages |}
type UsersArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_USERS_ARRIVED, value: Users |}
type PlansArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_PLANS_ARRIVED, value: Plans |}
type StoragesSortArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED, value: StoragesSort |}
type CategoriesSortArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED, value: CategoriesSort |}
type ArchivedTransactionsBalanceArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED, value: ArchivedTransactionsBalance |}
type PlannedTransactionsArrivedAction = {| type: typeof DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED, value: PlannedTransactions |}
type SubscribePersonalDataAction = {| type: typeof DB_SUBSCRIBE_PERSONAL_DATA |}

export type AnyDbModuleAction =
  | DbAuthEmailPasswordAction
  | AuthStartedAction
  | AuthSuccessAction
  | AuthFailAction
  | UpdatePreferencesAction
  | UpdatePreferencesStartedAction
  | UpdatePreferencesStartedDoneAction
  | DeleteTransactionAction
  | DeleteTransactionStartedAction
  | DeleteTransactionDoneAction
  | ArchiveTransactionsAction
  | ArchiveTransactionsStartedAction
  | ArchiveTransactionsDoneAction
  | SendBackupAction
  | SendBackupDoneAction
  | UpdateBackupEmailAction
  | UpdateBackupEmailDoneAction
  | UpdateStorageAction
  | UpdateStorageDoneAction
  | UpdateTransactionAction
  | UpdateTransactionDoneAction
  | ArchiveTransactionsFailAction
  | UpdateMainCurrencyCodeAction
  | UpdateCurrencyCodeDoneAction
  | UpdateStorageHiddenAction
  | UpdateStorageHiddenDoneAction
  | UpdateStorageShowInSecureModeAction
  | UpdateStorageShowInSecureModeDoneAction
  | UpdatePersonalNameAction
  | UpdatePersonalNameDoneAction
  | UpdateSortAction
  | DeleteCategoryPlanAction
  | DeleteCategoryPlanDoneAction
  | UpdatePlannedTransactionAction
  | UpdatePlannedTransactionDoneAction
  | EndPrevPlannedTransactionAndCreateNewAction
  | EndPrevPlannedTransactionAndCreateNewDoneAction
  | UpdatePlannedTransactionsPeriodOverrideAction
  | UpdatePlannedTransactionsPeriodOverrideDoneAction
  | UpdatePlannedTransactionDeletedPeriodsAction
  | UpdatePlannedTransactionDeletedPeriodsDoneAction
  | DeletePlannedTransactionAction
  | DeletePlannedTransactionDoneAction
  | UpdatePlannedTransactionEndDateAction
  | GetPersonalDataAction
  | GetPersonalDataDoneAction
  | GetAccountVersionAction
  | GetAccountVersionDoneAction
  | GetAccountEncryptionStatusAction
  | GetAccountEncryptionStatusDoneAction
  | GetLiveAccountAction
  | GetLiveAccountDoneAction
  | SubscribeLiveAccountPartsAction
  | SubscribeNewTransactionsAction
  | IsOnlineAction
  | IsOfflineAction
  | UpdateCategoryAction
  | TransactionArrivedAction
  | DbRegisterFailAction
  | DbRegisterEmailPasswordAction

  | CategoriesArrivedAction
  | MainCurrencyCodeArrivedAction
  | StoragesArrivedAction
  | UsersArrivedAction
  | PlansArrivedAction
  | StoragesSortArrivedAction
  | CategoriesSortArrivedAction
  | ArchivedTransactionsBalanceArrivedAction
  | PlannedTransactionsArrivedAction
  | SubscribePersonalDataAction
  | PersonalDataArrivedAction

export const
  dbAuthEmailPasswordAC =
    ({ email, password }: EmailPasswordProps): DbAuthEmailPasswordAction =>
      ({ type: DB_AUTH_EMAIL_PASSWORD, kind: DbAuthKinds.EmailPassword, email, password }),
  dbAuthSuccessAC =
    ({ uid }: { uid: UID }): AuthSuccessAction => ({ type: DB_AUTH_SUCCESS, uid }),
  dbAuthFailAC = (message: string): AuthFailAction => ({ type: DB_AUTH_FAIL, message }),
  dbAuthStartedAC = (): AuthStartedAction => ({ type: DB_AUTH_STARTED }),
  dbRegisterEmailPasswordAC =
    ({ email, password }: EmailPasswordProps): DbRegisterEmailPasswordAction =>
      ({ type: DB_REGISTER_EMAIL_PASSWORD, kind: DbAuthKinds.EmailPassword, email, password }),
  dbRegisterSuccessAC = (): DbRegisterSuccessAction => ({ type: DB_REGISTER_SUCCESS }),
  dbRegisterFailAC =
    (message: string): DbRegisterFailAction => ({ type: DB_REGISTER_FAIL, message }),
  dbRegisterStartedAC = (): DbRegisterStartedAction => ({ type: DB_REGISTER_STARTED }),
  dbUpdatePreferencesAC = (mutator: Mutator<Preferences>): UpdatePreferencesAction => {
    const pref = ({}: any)
    mutator(pref)
    return ({
      type: DB_UPDATE_PREFERENCES,
      preferencesToUpdate: pref,
    })
  },
  dbUpdatePreferencesStartedAC =
    (): UpdatePreferencesStartedAction => ({ type: DB_UPDATE_PREFERENCES_STARTED }),
  dbUpdatePreferencesDoneAC =
    (): UpdatePreferencesStartedDoneAction => ({ type: DB_UPDATE_PREFERENCES_DONE }),
  dbDeleteTransactionAC = (transactionId: TransactionId): DeleteTransactionAction =>
    ({ type: DB_DELETE_TRANSACTION_ACTION, transactionId }),
  dbDeleteTransactionStartedAC = (): DeleteTransactionStartedAction =>
    ({ type: DB_DELETE_TRANSACTION_STARTED_ACTION }),
  dbDeleteTransactionDoneAC = (): DeleteTransactionDoneAction =>
    ({ type: DB_DELETE_TRANSACTION_DONE_ACTION }),
  dbArchiveTransactionsAC = (borderDate: MyDate): ArchiveTransactionsAction => ({
    type: DB_ARCHIVE_TRANSACTIONS,
    borderDate,
  }),
  dbArchiveTransactionsStartedAC = (): ArchiveTransactionsStartedAction => ({
    type: DB_ARCHIVE_TRANSACTIONS_STARTED,
  }),
  dbArchiveTransactionsDoneAC = (): ArchiveTransactionsDoneAction => ({
    type: DB_ARCHIVE_TRANSACTIONS_DONE,
  }),
  dbArchiveTransactionsFailAC = (): ArchiveTransactionsFailAction => ({
    type: DB_ARCHIVE_TRANSACTIONS_FAIL,
  }),
  dbSendBackupAC = (backupEmail: EMAIL): SendBackupAction =>
    ({ type: DB_SEND_BACKUP, backupEmail }),
  dbSendBackupDoneAC = (): SendBackupDoneAction => ({ type: DB_SEND_BACKUP_DONE }),
  dbUpdateBackupEmailAC = (backupEmail: EMAIL): UpdateBackupEmailAction =>
    ({ type: DB_UPDATE_BACKUP_EMAIL, backupEmail }),
  dbUpdateBackupEmailDoneAC = (): UpdateBackupEmailDoneAction =>
    ({ type: DB_UPDATE_BACKUP_EMAIL_DONE }),
  dbUpdateCategoryAC = ({ category }: UpdateCategoryProps): UpdateCategoryAction =>
    ({
      type: DB_UPDATE_CATEGORY,
      category,
    }),
  dbUpdateCategoryDoneAC = (): UpdateCategoryDoneAction => ({ type: DB_UPDATE_CATEGORY_DONE }),
  dbUpdateStorageAC = (storage: AStorage): UpdateStorageAction =>
    ({ type: DB_UPDATE_STORAGE, storage }),
  dbUpdateStorageDoneAC = (): UpdateStorageDoneAction => ({ type: DB_UPDATE_STORAGE_DONE }),
  dbUpdateTransactionAC = (transaction: Transaction): UpdateTransactionAction =>
    ({ type: DB_UPDATE_TRANSACTION, transaction }),
  dbUpdateTransactionDoneAC = (): UpdateTransactionDoneAction =>
    ({ type: DB_UPDATE_TRANSACTION_DONE }),
  dbUpdateMainCurrencyCodeAC = (currencyCode: CurrencyCode): UpdateMainCurrencyCodeAction => ({
    type: DB_UPDATE_CURRENCY_CODE,
    currencyCode,
  }),
  dbUpdateCurrencyCodeDoneAC = (): UpdateCurrencyCodeDoneAction =>
    ({ type: DB_UPDATE_CURRENCY_CODE_DONE }),
  dbUpdateStorageHiddenAC =
    ({ storageId, hidden }: UpdateStorageHiddenProps): UpdateStorageHiddenAction => ({
      type: DB_UPDATE_STORAGE_HIDDEN,
      storageId,
      hidden,
    }),
  updateStorageHiddenDoneAC = (): UpdateStorageHiddenDoneAction =>
    ({ type: DB_UPDATE_STORAGE_HIDDEN_DONE }),
  dbUpdateStorageShowInSecureModeAC =
    ({
      storageId, showInSecureMode,
    }: UpdateStorageShowInSecureModeProps): UpdateStorageShowInSecureModeAction =>
      ({
        type: DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE,
        storageId,
        showInSecureMode,
      }),
  dbUpdateStorageShowInSecureModeDoneAC = (): UpdateStorageShowInSecureModeDoneAction =>
    ({ type: DB_UPDATE_STORAGE_SHOW_IN_SECURE_MODE_DONE }),
  dbUpdatePersonalNameAC = (name: string): UpdatePersonalNameAction =>
    ({ type: DB_UPDATE_PERSONAL_NAME, name }),
  dbUpdatePersonalNameDoneAC = (): UpdatePersonalNameDoneAction =>
    ({ type: DB_UPDATE_PERSONAL_NAME_DONE }),
  dbUpdateSortAC = ({ dbKey, sortSpecificPath, sort }: UpdateSortProps): UpdateSortAction =>
    ({ type: DB_UPDATE_SORT, dbKey, sortSpecificPath, sort }),
  dbUpdateSortDoneAC = (): UpdateSortDoneAction => ({ type: DB_UPDATE_SORT_DONE }),
  deleteCategoryPlanAC = ({
    categoryId, uid, period,
  }: DeleteCategoryPlanProps): DeleteCategoryPlanAction =>
    ({ type: DB_DELETE_CATEGORY_PLAN, categoryId, uid, period }),
  deleteCategoryPlanDoneAC = (): DeleteCategoryPlanDoneAction =>
    ({ type: DB_DELETE_CATEGORY_PLAN_DONE }),
  updateCategoryPlanAC = ({
    categoryId,
    uid,
    period,
    plan,
  }: UpdateCategoryPlanProps): UpdateCategoryPlanAction =>
    ({
      type: DB_UPDATE_CATEGORY_PLAN,
      categoryId,
      uid,
      period,
      plan,
    }),
  updateCategoryPlanDoneAC = (): UpdateCategoryPlanDoneAction =>
    ({ type: DB_UPDATE_CATEGORY_PLAN_DONE }),
  dbUpdatePlannedTransactionAC =
    (plannedTransaction: PlannedTransaction): UpdatePlannedTransactionAction =>
      ({ type: DB_UPDATE_PLANNED_TRANSACTION, plannedTransaction }),
  dbUpdatePlannedTransactionDoneAC = (): UpdatePlannedTransactionDoneAction =>
    ({ type: DB_UPDATE_PLANNED_TRANSACTION_DONE }),
  dbEndPrevPlannedTransactionAndCreateNewAC =
    ({
      plannedTransaction,
      endPrevProps,
    }: EndPrevPlannedTransactionAndCreateNewProps): EndPrevPlannedTransactionAndCreateNewAction =>
      ({ type: DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW, plannedTransaction, endPrevProps }),
  dbEndPrevPlannedTransactionAndCreateNewDoneAC =
    (): EndPrevPlannedTransactionAndCreateNewDoneAction => ({
      type: DB_END_PREV_PLANNED_TRANSACTION_AND_CREATE_NEW_DONE,
    }),
  dbUpdatePlannedTransactionsPeriodOverrideAC =
    ({
      transactionId,
      period,
      periodOverride,
    }: UpdatePlannedTransactionsPeriodOverrideProps): UpdatePlannedTransactionsPeriodOverrideAction =>
      ({
        type: DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE,
        transactionId,
        period,
        periodOverride,
      }),
  dbUpdatePlannedTransactionsPeriodOverrideDoneAC =
    (): UpdatePlannedTransactionsPeriodOverrideDoneAction =>
      ({ type: DB_UPDATE_PLANNED_TRANSACTION_PERIOD_OVERRIDE_DONE }),
  dbUpdatePlannedTransactionDeletedPeriodsAC =
    ({ transactionId, period }: UpdatePlannedTransactionDeletedPeriodsProps): UpdatePlannedTransactionDeletedPeriodsAction =>
      ({ type: DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS, transactionId, period }),
  dbUpdatePlannedTransactionDeletedPeriodsDoneAC =
    (): UpdatePlannedTransactionDeletedPeriodsDoneAction =>
      ({ type: DB_UPDATE_PLANNED_TRANSACTION_DELETED_PERIODS_DONE }),
  dbDeletePlannedTransactionAC = (transactionId: TransactionId): DeletePlannedTransactionAction =>
    ({ type: DB_DELETE_PLANNED_TRANSACTION, transactionId }),
  dbDeletePlannedTransactionDoneAC = (): DeletePlannedTransactionDoneAction =>
    ({ type: DB_DELETE_PLANNED_TRANSACTION_DONE }),
  dbUpdatePlannedTransactionEndDateAC =
    ({
      transactionId,
      endDate,
    }: UpdatePlannedTransactionEndDateProps): UpdatePlannedTransactionEndDateAction =>
      ({
        type: DB_UPDATE_PLANNED_TRANSACTION_END_DATE,
        transactionId,
        endDate,
      }),
  dbUpdatePlannedTransactionEndDateDoneAC = (): UpdatePlannedTransactionEndDateDoneAction =>
    ({ type: DB_UPDATE_PLANNED_TRANSACTION_END_DATE_DONE }),
  dbGetPersonalDataAC = (): GetPersonalDataAction =>
    ({ type: DB_GET_PERSONAL_DATA }),
  dbGetPersonalDataDoneAC = (personalData: PersonalData): GetPersonalDataDoneAction =>
    ({ type: DB_GET_PERSONAL_DATA_DONE, personalData }),
  dbGetAccountVersionAC = (): GetAccountVersionAction =>
    ({ type: DB_GET_ACCOUNT_VERSION }),
  dbGetAccountVersionDoneAC = (accountDataVersion: AccountDataVersion): GetAccountVersionDoneAction =>
    ({ type: DB_GET_ACCOUNT_VERSION_DONE, accountDataVersion }),
  dbGetAccountEncryptionStatusAC = (): GetAccountEncryptionStatusAction =>
    ({ type: DB_GET_ACCOUNT_ENCRYPTION_STATUS }),
  dbGetAccountEncryptionStatusDoneAC = (encrypted: bool): GetAccountEncryptionStatusDoneAction =>
    ({ type: DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE, encrypted }),
  dbGetLiveAccountAC = (): GetLiveAccountAction => ({
    type: DB_GET_LIVE_ACCOUNT,
  }),
  dbGetLiveAccountDoneAC = (liveAccount: DbLiveAccount): GetLiveAccountDoneAction => ({
    type: DB_GET_LIVE_ACCOUNT_DONE,
    liveAccount,
  }),
  dbSubscribeLiveAccountPartsAC = (): SubscribeLiveAccountPartsAction => ({
    type: DB_SUBSCRIBE_LIVE_ACCOUNT_PARTS,
  }),
  dbSubscribeNewTransactionsAC = (): SubscribeNewTransactionsAction => ({
    type: DB_SUBSCRIBE_NEW_TRANSACTIONS,
  }),
  dbIsOnlineAC = (): IsOnlineAction => ({
    type: DB_IS_ONLINE,
  }),
  dbIsOfflineAC = (): IsOfflineAction => ({
    type: DB_IS_OFFLINE,
  }),
  dbTransactionArrivedAC = (transaction: Transaction): TransactionArrivedAction => ({
    type: DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED,
    transaction,
  }),
  dbCategoriesArrivedAC = (value: Categories): CategoriesArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED, value }),
  dbMainCurrencyCodeArrivedAC = (value: CurrencyCode): MainCurrencyCodeArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED, value }),
  dbStoragesArrivedAC = (value: Storages): StoragesArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_STORAGES_ARRIVED, value }),
  dbUsersArrivedAC = (value: Users): UsersArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_USERS_ARRIVED, value }),
  dbPlansArrivedAC = (value: Plans): PlansArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_PLANS_ARRIVED, value }),
  dbStoragesSortArrivedAC = (value: StoragesSort): StoragesSortArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_STORAGES_SORT_ARRIVED, value }),
  dbCategoriesSortArrivedAC = (value: CategoriesSort): CategoriesSortArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED, value }),
  dbArchivedTransactionsBalanceArrivedAC = (value: ArchivedTransactionsBalance): ArchivedTransactionsBalanceArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED, value }),
  dbPlannedTransactionsArrivedAC = (value: PlannedTransactions): PlannedTransactionsArrivedAction =>
    ({ type: DB_LIVE_ACCOUNT_PLANNED_TRANSACTIONS_ARRIVED, value }),
  dbSubscribePersonalDataAC = (): SubscribePersonalDataAction =>
    ({ type: DB_SUBSCRIBE_PERSONAL_DATA }),
  dbPersonalDataArrivedAC = (personalData: PersonalData): PersonalDataArrivedAction =>
    ({ type: DB_PERSONAL_DATA_ARRIVED, personalData })
