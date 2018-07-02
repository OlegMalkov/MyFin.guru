/* @flow */

import { INIT_FIRST_SCREEN_MOUNTED } from './initAC'
import { splashScreenHideAC } from '../splashScreenModule/splashScreenAC'
import { codeAccountDataVersion } from '../../version'
import { alertOpenAC } from '../alertModule/alertModuleAC'
import { APP_MOUNT } from '../coreModule/coreAC'
import {
  DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE,
  DB_GET_ACCOUNT_VERSION_DONE, DB_GET_LIVE_ACCOUNT_DONE,
  DB_GET_PERSONAL_DATA_DONE,
  dbGetAccountEncryptionStatusAC, dbGetAccountVersionAC, dbGetLiveAccountAC,
  dbGetPersonalDataAC, dbSubscribeLiveAccountPartsAC, dbSubscribeNewTransactionsAC,
  dbSubscribePersonalDataAC,
} from '../dbModule/dbAC'
import { isEmptyOrUndef } from '../../utils/utils'
import { strings } from '../../localization'
import {
  RN_PLATFORM, rnGetPlatformAC, rnGetWindowDimensionsAC, rnSetStatusBarBgColorAC,
  rnSetStatusBarStyle,
} from '../../rn/rnAC'
import { nowSubscribeAC } from '../nowModule/nowSubscriptionAC'
import {
  INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE,
  INIT_MIGRATION_NOT_REQUIRED,
  initAccountEncryptionCheckStepCompleteAC,
  initMigrationNotRequiredAC, initMigrationRequiredAC,
} from './initAC'
import { initModuleId } from './initModuleId'
import {
  APP_STATUS_JUST_OPENED,
} from './initModuleReducer'

import type { AnyBaseAction, BaseAppState, BaseMiddlewareFn } from '../../base.flow'

const
  maxOffsetMs = 60000,
  /*  unsubscribeAccountPart = (partKey) => ({ maUid }) => fbs.database()
    .ref(`accounts/${maUid}/live/${partKey}`)
    .off('value'),
  subscribeNewTransactions = ({ maUid, store }) => {
    fbs.database()
      .ref(`accounts/${maUid}/live/transactions`)
      .orderByChild('created')
      .startAt(getServerTimeStamp() - maxOffsetMs)
      .on('child_added', (snapshot) => {
        onNewTransactionArrived(snapshot.key, snapshot.val(), store)
      })
  },
  unsubscribeNewTransactions = ({ maUid }) => fbs.database()
    .ref(`accounts/${maUid}/live/transactions`)
    .off('child_added'),

  subscribeCurrenciesRates = ({ store }) => {
    fbs.database()
      .ref('currencies/live')
      .on('value', (snapshot) => {
        const currenciesRates = snapshot.val()

        store.dispatch(setCurrenciesRates(currenciesRates))
      })
  },
  unsubscribeCurrenciesRates = () => fbs.database()
    .ref('currencies/live')
    .off('value'),
  subscribeEncrypted = ({ maUid, store }) => {
    fbs.database()
      .ref(`accounts/${maUid}/encrypted`)
      .on('value', (snapshot) => {
        const encrypted = snapshot.val()

        store.dispatch(accountEncryptionIdentifiedAC(encrypted))
      })
  },

  unssubscribeEncrypted = ({ maUid }) => fbs.database()
    .ref(`accounts/${maUid}/encrypted`)
    .off('value'),
  */
  /*  unsubscribe = ({ uid, maUid }: { uid: UID, maUid: string }) => {
      [
        unsubscribeAccountPart('categories'),
        unsubscribeAccountPart('mainCurrencyCode'),
        unsubscribeAccountPart('storages'),
        unsubscribeAccountPart('users'),
        unsubscribeAccountPart('plans'),
        unsubscribeAccountPart('storagesSort'),
        unsubscribeAccountPart('categoriesSort'),
        unsubscribeAccountPart('archivedTransactionsBalance'),
        unsubscribeAccountPart('plannedTransactions'),
        unsubscribeNewTransactions,
        unsubscribePersonalData,
        unsubscribeCurrenciesRates,
        unssubscribeEncrypted,
      ]
        .filter(x => x)
        .forEach(s => s({ uid, maUid }))
    },*/
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[initModuleId],
  initModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === APP_MOUNT) {
      const a: Array<AnyBaseAction> = [
        nowSubscribeAC(),
        rnGetPlatformAC(),
        rnGetWindowDimensionsAC(),
      ]
      return { a }
    }
    if (a.type === RN_PLATFORM) {
      if (a.platform === 'android') {
        return { a: rnSetStatusBarBgColorAC('#0279ba') }
      } else if (a.platform === 'ios') {
        return { a: rnSetStatusBarStyle('content') }
      } else if (a.platform === 'web') {
        return null
      }
      throw new Error(`Unknown platform ${a.platform}`)
    }

    const {
      status,
      deps: { session: { computed: { isAuthenticated } } },
    } = getModuleState(getAppState)

    if (isAuthenticated) {
      if (status === APP_STATUS_JUST_OPENED) {
        return { a: dbGetPersonalDataAC() }
      }

      /*
            setTimeout(() => {
              store.dispatch(initSubscriptionsStartedAC(
            })

            initSubscriptions({ uid, store, checkForMigration: true })*/

      /* TODO 2 MFG-29 sync time? */
      /* fbs.database().ref('/.info/serverTimeOffset').once('value', (timestampDiffSnapshot) => {
        serverTimestampDiff = timestampDiffSnapshot.val()
        if (Math.abs(serverTimestampDiff) > maxOffsetMs) {
          unsubscribe({ uid, maUid })
          initSubscriptions({uid, store, checkForMigration: false})
        }
      })*/
    }


    if (a.type === DB_GET_PERSONAL_DATA_DONE) {
      return { a: dbGetAccountVersionAC() }
    }

    if (a.type === DB_GET_ACCOUNT_VERSION_DONE) {
      const { accountDataVersion } = getModuleState(getAppState)
      if (accountDataVersion < codeAccountDataVersion) {
        return { a: initMigrationRequiredAC() }
      }

      if (accountDataVersion > codeAccountDataVersion) {
        return {
          a: alertOpenAC({
            title: strings.error,
            message: strings.codeDataVersionIsLessThanAccountDataVersion,
          }),
        }
      }

      return { a: initMigrationNotRequiredAC() }
    }

    if (a.type === DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE) {
      const
        {
          accountEncrypted,
          deps: { session: { encryptionPassword } },
        } = getModuleState(getAppState)

      if (isEmptyOrUndef(encryptionPassword) && accountEncrypted) {
        // if account encrypted, check for encryption password
        // if password is not there ask user for password and save it to session
      }
      return { a: initAccountEncryptionCheckStepCompleteAC() }
    }

    if (a.type === INIT_MIGRATION_NOT_REQUIRED) {
      return { a: dbGetAccountEncryptionStatusAC() }
    }

    if (a.type === INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE) {
      return { a: dbGetLiveAccountAC() }
    }

    if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
      return {
        a: ([
          dbSubscribeLiveAccountPartsAC(),
          dbSubscribeNewTransactionsAC(),
          dbSubscribePersonalDataAC(),
        ]: Array<AnyBaseAction>),
      }
    }

    if (a.type === INIT_FIRST_SCREEN_MOUNTED) {
      return {
        a: splashScreenHideAC(),
      }
    }

    /* TODO 2 MFG-29 when we comming back from background should we resync somehow? */
    /* if (a.type === NATIVE_APP_STATE_CHANGED && a.nativeAppState === 'active') {
      unsubscribe({ uid, maUid })
      initSubscriptions({ uid, store, checkForMigration: true })
    }*/

    return null
  }

export {
  maxOffsetMs,
  initModuleMiddlewareFn,
}
