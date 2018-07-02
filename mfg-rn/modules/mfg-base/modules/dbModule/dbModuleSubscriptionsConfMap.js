/* @flow */

import type { BaseModuleSubscriptionMaker } from '../../base.flow'
import {
  dbArchivedTransactionsBalanceArrivedAC,
  dbCategoriesArrivedAC,
  dbCategoriesSortArrivedAC,
  dbTransactionArrivedAC,
  dbMainCurrencyCodeArrivedAC,
  dbPlannedTransactionsArrivedAC,
  dbPlansArrivedAC,
  dbStoragesArrivedAC,
  dbStoragesSortArrivedAC,
  dbUsersArrivedAC, dbPersonalDataArrivedAC,
} from './dbAC'
import type { FbsApp } from './fbs.flow'
import { getDbModuleState } from './getDbModuleState'

export const
  DB_LIVE_ACCOUNT_PARTS_SUBSCRIPTION: 'DB_LIVE_ACCOUNT_PARTS_SUBSCRIPTION' =
    'DB_LIVE_ACCOUNT_PARTS_SUBSCRIPTION',
  DB_LIVE_ACCOUNT_NEW_TRANSACTIONS_SUBSCRIPTION: 'DB_LIVE_ACCOUNT_NEW_TRANSACTIONS_SUBSCRIPTION' =
    'DB_LIVE_ACCOUNT_NEW_TRANSACTIONS_SUBSCRIPTION',
  DB_PERSONAL_DATA_SUBSCRIPTION: 'DB_PERSONAL_DATA_SUBSCRIPTION' =
    'DB_PERSONAL_DATA_SUBSCRIPTION'

type LiveAccountPartsSubscriptionProps = {|
  type: typeof DB_LIVE_ACCOUNT_PARTS_SUBSCRIPTION,
|}

type LiveAccountSubscriptionsMakerProps =
  {| type: typeof DB_LIVE_ACCOUNT_NEW_TRANSACTIONS_SUBSCRIPTION |}

type PersonalDataSubscriptionsMakerProps =
  {| type: typeof DB_PERSONAL_DATA_SUBSCRIPTION |}

export type AnyDbSubscriptionsMakerProps =
  | LiveAccountPartsSubscriptionProps
  | LiveAccountSubscriptionsMakerProps
  | PersonalDataSubscriptionsMakerProps

export const
  dbLiveAccountPartsSC = (): LiveAccountPartsSubscriptionProps =>
    ({ type: DB_LIVE_ACCOUNT_PARTS_SUBSCRIPTION }),
  dbNewTransactionsSC = (): LiveAccountSubscriptionsMakerProps =>
    ({ type: DB_LIVE_ACCOUNT_NEW_TRANSACTIONS_SUBSCRIPTION }),
  dbPersonalDataSC = (): PersonalDataSubscriptionsMakerProps =>
    ({ type: DB_PERSONAL_DATA_SUBSCRIPTION })


type LiveAccountPartsSubscriptionMaker =
  BaseModuleSubscriptionMaker<LiveAccountPartsSubscriptionProps>

type LiveAccountTransactionsSubscriptionMaker =
  BaseModuleSubscriptionMaker<LiveAccountSubscriptionsMakerProps>

type PersonalDataTransactionsSubscriptionMaker =
  BaseModuleSubscriptionMaker<PersonalDataSubscriptionsMakerProps>

const
  liveAccountSubsConfs = [
    ['categories', dbCategoriesArrivedAC],
    ['mainCurrencyCode', dbMainCurrencyCodeArrivedAC],
    ['storages', dbStoragesArrivedAC],
    ['users', dbUsersArrivedAC],
    ['plans', dbPlansArrivedAC],
    ['storagesSort', dbStoragesSortArrivedAC],
    ['categoriesSort', dbCategoriesSortArrivedAC],
    ['archivedTransactionsBalance', dbArchivedTransactionsBalanceArrivedAC],
    ['plannedTransactions', dbPlannedTransactionsArrivedAC],
  ],
  makeDbModuleSubscriptionsConfMap = (fbs: FbsApp) => {
    const
      liveAccountPartsSubscriptionMaker: LiveAccountPartsSubscriptionMaker =
        (p, getAppState) => {
          const
            { deps: { maUid } } = getDbModuleState(getAppState)

          let liveAccountSubsOffArr

          return (resolve) => {
            liveAccountSubsOffArr = liveAccountSubsConfs.map(([partKey, actionCreator]) => {
              let firstTime = true
              const
                ref = fbs.database()
                  .ref(`accounts/${maUid}/live/${partKey}`),
                cb = (snapshot) => {
                  if (firstTime) {
                    firstTime = false
                    return
                  }
                  const value: any = snapshot.val()
                  resolve(actionCreator(value))
                }

              ref.on('value', cb)

              return () => ref.off('value', cb)
            })

            return () => liveAccountSubsOffArr.forEach(off => off())
          }
        },
      liveAccountNewTransactionsSubscriptionMaker: PersonalDataTransactionsSubscriptionMaker =
        (p, getAppState) => {
          const
            { deps: { uid } } = getDbModuleState(getAppState)

          return (resolve) => {
            const
              ref = fbs.database()
                .ref(`personalData/${uid}`),
              cb = (snapshot) => {
                const
                  personalData = snapshot.val()
                if (personalData) {
                  resolve(dbPersonalDataArrivedAC(personalData))
                }
              }

            ref.on('value', cb)

            return () => ref.off('value', cb)
          }
        },
      personalDataSubscriptionMaker: LiveAccountTransactionsSubscriptionMaker =
        (p, getAppState) => {
          const
            { deps: { maUid, liveTransactions } } = getDbModuleState(getAppState)

          return (resolve) => {
            const
              ref = fbs.database()
                .ref(`accounts/${maUid}/live/transactions`),
              cb = (snapshot) => {
                if (liveTransactions[snapshot.key]) return

                const newTransaction = snapshot.val()
                resolve(dbTransactionArrivedAC(newTransaction))
              }

            ref.on('child_added', cb)

            return () => ref.off('child_added', cb)
          }
        }

    return {
      [DB_LIVE_ACCOUNT_PARTS_SUBSCRIPTION]: liveAccountPartsSubscriptionMaker,
      [DB_LIVE_ACCOUNT_NEW_TRANSACTIONS_SUBSCRIPTION]: liveAccountNewTransactionsSubscriptionMaker,
      [DB_PERSONAL_DATA_SUBSCRIPTION]: personalDataSubscriptionMaker,
    }
  }

export {
  makeDbModuleSubscriptionsConfMap,
}
