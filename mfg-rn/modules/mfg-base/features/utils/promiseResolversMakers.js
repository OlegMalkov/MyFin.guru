/* @flow */
/* eslint-disable max-len */

import assert from 'assert'
import type { BaseAppState } from '../../base.flow'
import type { StorageId, TransactionId, UID } from '../../const'
import type { DbLiveAccount } from '../../entities/account/live/account.flowTypes'
import type {
  AStorage, Category, GeoPosition,
  Transaction,
} from '../../entities/account/live/flowTypes'
import type { PersonalData, Preferences } from '../../entities/personalData/personalData.flow'
import type { RetrievedModulesState } from '../../modules/asyncStorageModule/asyncStorageAC'
import {
  rehydrateAC,
} from '../../modules/asyncStorageModule/asyncStorageAC'
import {
  ASYNC_STORAGE_RETRIEVE_PROMISE,
} from '../../modules/asyncStorageModule/makeAsyncStorageReducerAndMiddlewareAndPromises'
import {
  dbDeleteTransactionDoneAC,
  dbGetAccountEncryptionStatusDoneAC,
  dbGetAccountVersionDoneAC, dbGetLiveAccountDoneAC,
  dbGetPersonalDataDoneAC, dbUpdateCategoryDoneAC, dbUpdatePreferencesDoneAC, dbUpdateStorageDoneAC,
  dbUpdateTransactionDoneAC,
  updateStorageHiddenDoneAC,
} from '../../modules/dbModule/dbAC'
import {
  DB_DELETE_TRANSACTION_PROMISE,
  DB_UPDATE_CATEGORY_PROMISE, DB_UPDATE_PREFERENCES_PROMISE, DB_UPDATE_STORAGE_HIDDEN_PROMISE,
  DB_UPDATE_STORAGE_PROMISE, DB_UPDATE_TRANSACTION_PROMISE,
  dbGetAccountEncryptionStatusPC, dbGetAccountVersionPC, dbGetLiveAccountPC,
  dbGetPersonalDataPC,
} from '../../modules/dbModule/dbModulePromiseConfMap'
import { geoPositionRetrievedAC } from '../../modules/geoModule/geoAC'
import type { GeoPositionPromiseProps } from '../../modules/geoModule/geoModulePromiseConfMap'
import {
  GEO_GET_POSITION_PROMISE,
} from '../../modules/geoModule/geoModulePromiseConfMap'
import { utilGuidGeneratedAC } from '../../modules/util/utilAC'
import { UTIL_GENERATE_GUID_PROMISE } from '../../modules/util/utilPromiseConfMap'
import type { UtilGenerateGuidPromiseProps } from '../../modules/util/utilPromiseConfMap'
import type { Mutator } from '../../utils/utils'
import { codeAccountDataVersion } from '../../version'

import type {
  AsyncStorageRetrievePromiseProps,
} from '../../modules/asyncStorageModule/makeAsyncStorageReducerAndMiddlewareAndPromises'
import type {
  DbDeleteTransactionPromiseProps,
  DbGetAccountEncryptionStatusPromiseProps, DbGetAccountVersionPromiseProps,
  DbGetLiveAccountPromiseProps,
  DbGetPersonalDataPromiseProps, DbUpdateCategoryPromiseProps, DbUpdatePreferencesPromiseProps,
  DbUpdateStorageHiddenPromiseProps,
  DbUpdateStoragePromiseProps, DbUpdateTransactionPromiseProps,
} from '../../modules/dbModule/dbModulePromiseConfMap'
import type { PromiseResolveConf } from './TestWorld'

type MakePersonalDataPromiseResolve = ({| personalData: PersonalData, uid: UID |}) =>
  PromiseResolveConf<DbGetPersonalDataPromiseProps>

export const makePersonalDataPromiseResolve: MakePersonalDataPromiseResolve =
  ({ personalData, uid }) => ({
    expectedProps: dbGetPersonalDataPC(),
    action: dbGetPersonalDataDoneAC(personalData),
    assertAppState: (as: BaseAppState) => assert.equal(as.db.deps.uid, uid,
      'personalDataPromiseResolve - uid should match',
    ),
  })

type MakeDbGetVersionPromiseResolver = ({ maUid: UID }) =>
  PromiseResolveConf<DbGetAccountVersionPromiseProps>

export const makeDbGetVersionPromiseResolve: MakeDbGetVersionPromiseResolver =
  ({ maUid }) => ({
    expectedProps: dbGetAccountVersionPC(),
    action: dbGetAccountVersionDoneAC(codeAccountDataVersion),
    assertAppState: (as: BaseAppState) => {
      assert.equal(as.db.deps.maUid, maUid,
        'dbGetVersionPromiseResolve - maUid should match',
      )
    },
  })

type MakeDbGetAccountEncryptionPromiseResolveNotEncrypted = ({ maUid: UID }) =>
  PromiseResolveConf<DbGetAccountEncryptionStatusPromiseProps>

export const
  makeDbGetAccountEncryptionPromiseResolveNotEncrypted: MakeDbGetAccountEncryptionPromiseResolveNotEncrypted =
    ({ maUid }) => ({
      expectedProps: dbGetAccountEncryptionStatusPC(),
      action: dbGetAccountEncryptionStatusDoneAC(false),
      assertAppState: (as: BaseAppState) => assert.equal(as.db.deps.maUid, maUid,
        'dbGetAccountEncryptionPromiseResolveNotEncrypted - maUid should match',
      ),
    })

type MakeDbGetLiveAccountPromiseResolveNewUser = ({ account: DbLiveAccount, maUid: UID }) =>
  PromiseResolveConf<DbGetLiveAccountPromiseProps>

export const makeDbGetLiveAccountPromiseResolveNewUser: MakeDbGetLiveAccountPromiseResolveNewUser =
  ({ account, maUid }) => ({
    expectedProps: dbGetLiveAccountPC(),
    action: dbGetLiveAccountDoneAC(account),
    assertAppState: (as: BaseAppState) => assert.equal(as.db.deps.maUid, maUid,
      'dbGetLiveAccountPromiseResolveNewUser - maUid should match',
    ),
  })

type MakeAsyncStorageRetrievePromiseResolve = ({ retrievedModulesState: RetrievedModulesState }) =>
  PromiseResolveConf<AsyncStorageRetrievePromiseProps>

export const makeAsyncStorageRetrievePromiseResolve: MakeAsyncStorageRetrievePromiseResolve =
  ({ retrievedModulesState }) => ({
    expectedProps: { type: ASYNC_STORAGE_RETRIEVE_PROMISE },
    action: rehydrateAC(retrievedModulesState),
    shouldDispatchActionInsteadOfExpect: true,
  })

type MakeDbUpdateStorageDonePromiseResolve = ({ storage: AStorage }) =>
  PromiseResolveConf<DbUpdateStoragePromiseProps>

export const makeDbUpdateStorageDonePromiseResolve: MakeDbUpdateStorageDonePromiseResolve =
  ({ storage }) => ({
    expectedProps: { type: DB_UPDATE_STORAGE_PROMISE, storage },
    action: dbUpdateStorageDoneAC(),
  })

type MakeDbUpdateCategoryPromiseResolve = ({ category: Category }) =>
  PromiseResolveConf<DbUpdateCategoryPromiseProps>

export const makeDbUpdateCategoryPromiseResolve: MakeDbUpdateCategoryPromiseResolve =
  ({ category }) => ({
    expectedProps: { type: DB_UPDATE_CATEGORY_PROMISE, category },
    action: dbUpdateCategoryDoneAC(),
  })

type MakeDbUpdateTransactionPromiseResolve = ({ transaction: Transaction }) =>
  PromiseResolveConf<DbUpdateTransactionPromiseProps>

export const makeDbUpdateTransactionPromiseResolve: MakeDbUpdateTransactionPromiseResolve =
  ({ transaction }) => ({
    expectedProps: { type: DB_UPDATE_TRANSACTION_PROMISE, transaction },
    action: dbUpdateTransactionDoneAC(),
  })

export const makeDbDeleteTransactionPromiseResolve =
  (transactionId: TransactionId): PromiseResolveConf<DbDeleteTransactionPromiseProps> => ({
    expectedProps: { type: DB_DELETE_TRANSACTION_PROMISE, transactionId },
    action: dbDeleteTransactionDoneAC(),
  })

type MakeDbUpdatePreferencesPromiseResolve = (mutator: Mutator<Preferences>) =>
  PromiseResolveConf<DbUpdatePreferencesPromiseProps>

export const makeDbUpdatePreferencesPromiseResolve: MakeDbUpdatePreferencesPromiseResolve =
  (mutator) => {
    const pref = ({}: any)
    mutator(pref)
    return ({
      expectedProps: {
        type: DB_UPDATE_PREFERENCES_PROMISE,
        preferencesToUpdate: pref,
      },
      action: dbUpdatePreferencesDoneAC(),
    })
  }

type MakeUpdateStorageHiddenPromiseResolve = ({ storageId: StorageId, hidden: bool, }) =>
  PromiseResolveConf<DbUpdateStorageHiddenPromiseProps>

export const makeUpdateStorageHiddenPromiseResolve: MakeUpdateStorageHiddenPromiseResolve =
  ({ storageId, hidden }) => ({
    expectedProps: { type: DB_UPDATE_STORAGE_HIDDEN_PROMISE, storageId, hidden },
    action: updateStorageHiddenDoneAC(),
  })

type MakeUtilGenerateGuidPromiseResolve = ({ callerId: string, guid: string }) =>
  PromiseResolveConf<UtilGenerateGuidPromiseProps>

export const makeUtilGenerateGuidPromiseResolve: MakeUtilGenerateGuidPromiseResolve =
  ({ callerId, guid }) => ({
    expectedProps: { type: UTIL_GENERATE_GUID_PROMISE, callerId },
    action: utilGuidGeneratedAC({ callerId, guid }),
    shouldDispatchActionInsteadOfExpect: true,
  })

type MakeGeoPositionPromiseResolve = (position: GeoPosition) =>
  PromiseResolveConf<GeoPositionPromiseProps>

export const makeGeoPositionPromiseResolve: MakeGeoPositionPromiseResolve =
  (position) => ({
    expectedProps: { type: GEO_GET_POSITION_PROMISE },
    action: geoPositionRetrievedAC(position),
    shouldDispatchActionInsteadOfExpect: true,
  })
