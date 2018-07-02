/* @flow */

import { __undef, expenseCategoryType } from '../const'
import type {
  DbAccount, DbLiveAccount,
  FbsDatabaseState,
} from '../entities/account/live/account.flowTypes'

import type {
  Categories, Category, GeoPosition, Transactions,
  TransactionsSelectProps,
} from '../entities/account/live/flowTypes'
import type { PersonalData } from '../entities/personalData/personalData.flow'
import type { SessionPersistPart } from '../modules/sessionModule/flowTypes'
import { testDemoAdminLiveAccount } from './testDemoAdminLiveAccount'

export const
  testEmail = 'test@test.test',
  testPassword = 'P@ssw0rd',
  testMainUserUid = 'test-main-uid',
  testPersonalData: PersonalData = {
    name: 'Belka',
    maUid: __undef,
    backupEmail: 'backup-money-belka-test@gmail.com',
    preferences: {
      majorCurrencies: {},
      overviewCollapsedUids: {},
      planCollapsedCategoriesIds: {},
      overviewCategoriesUid: __undef,
      overviewTotalUsageMode: 'percent',
      analyticsSelectedUid: __undef,
      planSelectedUid: __undef,
    },
  },
  testSessionUserLoggedIn: SessionPersistPart = {
    email: testEmail,
    password: testPassword,
    uid: testMainUserUid,
    accountEncrypted: false,
    encryptionPassword: __undef,
  },
  testEmptyDbLiveAccount: DbLiveAccount = {
    mainCurrencyCode: 'RUB',
  },
  testEmptyDbAccount: DbAccount = {
    live: testEmptyDbLiveAccount,
    encrypted: false,
    version: 6,
  },
  testDemoDbLiveAccount: DbLiveAccount = {
    mainCurrencyCode: 'RUB',
  },
  testDemoDbAccount: DbAccount = {
    live: testDemoAdminLiveAccount,
    encrypted: false,
    version: 6,
  },
  emptyDatabase: FbsDatabaseState = {
    accounts: {},
    personalData: {},
  },
  testDbPersonalData = {
    [testMainUserUid]: testPersonalData,
  },
  databaseAfterUserRegistration: FbsDatabaseState = {
    accounts: { [testMainUserUid]: testEmptyDbAccount },
    personalData: testDbPersonalData,
  },
  databaseAfterUserFirstLogin: FbsDatabaseState = {
    accounts: { [testMainUserUid]: testEmptyDbAccount },
    personalData: testDbPersonalData,
  },
  demoDatabaseInitialState: FbsDatabaseState = {
    accounts: { [testMainUserUid]: testDemoDbAccount },
    personalData: testDbPersonalData,
  },
  testUserDbIdentity = {
    email: testEmail,
    password: testPassword,
    uid: testMainUserUid,
  },
  testDatabaseIdentities = [testUserDbIdentity],
  testFoodCategory: Category = {
    id: 'food-cat-id',
    type: expenseCategoryType,
    parentId: __undef,
    isHidden: false,
    title: 'Food',
  },
  testDemoCategories: Categories = {
    [testFoodCategory.id]: testFoodCategory,
  },
  testDemoTransactions: Transactions = {},
  testTransactionsSelectPropsExpense: TransactionsSelectProps = {
    uid: testMainUserUid,
    type: 'expense',
    fromTimestamp: '20000101T000000',
    toTimestamp: '20000201T000000',
  },
  testGeoPosition: GeoPosition = {
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    timestamp: 0,
  }
