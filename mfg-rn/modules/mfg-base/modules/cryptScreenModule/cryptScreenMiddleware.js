/* @flow */

import CryptoJS from 'crypto-js'
import { memoMaxOneArgs1 } from '../../utils/memo'
import { evolve, I, mapObjIndexed } from '../../utils/utils'
import { cryptScreenModuleId } from './cryptScreenModuleId'

import type { BaseMiddlewareFn } from '../../base.flow'
import type { AStorage } from '../../entities/account/live/flowTypes'

const
  makeCrypt = memoMaxOneArgs1((password: string) => {
    const
      encryptNumber = (num) => {
        try {
          return CryptoJS.AES.encrypt(num.toString(), password)
            .toString()
        } catch (e) {
          throw new Error(`number "${num}" encrypt fail: ${e.message}`)
        }
      },
      encryptString = (str) => {
        try {
          return CryptoJS.AES.encrypt(str, password)
            .toString()
        } catch (e) {
          throw new Error(`string "${str}" encrypt fail: ${e.message}`)
        }
      },
      decryptNumber = (encodedNum) => {
        try {
          return parseInt(CryptoJS.AES.decrypt(encodedNum, password)
            .toString(CryptoJS.enc.Utf8))
        } catch (e) {
          throw new Error(`number "${encodedNum}" decrypt fail: ${e.message}`)
        }
      },
      decryptString = (encodedStr) => {
        try {
          return CryptoJS.AES.decrypt(encodedStr, password)
            .toString(CryptoJS.enc.Utf8)
        } catch (e) {
          throw new Error(`string "${encodedStr}" decrypt fail: ${e.message}`)
        }
      },
      cryptAccountFactory = (cryptNumber, cryptString) => {
        const
          cryptCategory = evolve({ title: cryptString }),
          cryptCategories = mapObjIndexed(cryptCategory),
          cryptBalance = mapObjIndexed(cryptNumber),
          cryptStringArray = arr => arr.map(cryptString),
          cryptTransaction = evolve({
            comment: cryptString,
            value: cryptNumber,
            valueTo: cryptNumber,
            tags: cryptStringArray,
          }),
          cryptPlannedTransactionPeriodOverride = evolve({
            comment: cryptString,
            amount: cryptNumber,
            tags: cryptStringArray,
          }),
          cryptPlannedTransaction = evolve({
            comment: cryptString,
            amount: cryptNumber,
            tags: cryptStringArray,
            overriddenPeriods: mapObjIndexed(cryptPlannedTransactionPeriodOverride),
          }),
          cryptPlan = evolve({
            amount: cryptNumber,
          }),
          cryptStorage = (storage: AStorage) => evolve(
            { title: cryptString, initialBalance: cryptBalance },
          )(storage),
          cryptStorages = mapObjIndexed(cryptStorage),
          cryptTransactions = mapObjIndexed(cryptTransaction),
          cryptPlannedTransactions = mapObjIndexed(cryptPlannedTransaction),
          cryptPlans = mapObjIndexed(mapObjIndexed(mapObjIndexed(cryptPlan))),
          cryptLiveAccount = evolve({
            categories: cryptCategories,
            storages: cryptStorages,
            transactions: cryptTransactions,
            plannedTransactions: cryptPlannedTransactions,
            plans: cryptPlans,
          }),
          cryptAccount = evolve({
            live: cryptLiveAccount,
            archive: {
              transactions: cryptTransactions,
            },
          })

        return {
          cryptCategories,
          cryptStorages,
          cryptTransaction,
          cryptTransactions,
          cryptPlannedTransactions,
          cryptAccount,
          cryptLiveAccount,
          cryptCategory,
          cryptStorage,
          cryptPlans,
          cryptStringArray,
        }
      },
      {
        cryptAccount: encryptAccount,
        cryptTransaction: encryptTransaction,
        cryptCategories: encryptCategories,
        cryptStorages: encryptStorages,
        cryptCategory: encryptCategory,
        cryptStorage: encryptStorage,
        cryptPlans: encryptPlans,
        cryptStringArray: encryptStringArray,
      } = cryptAccountFactory(encryptNumber, encryptString),
      {
        cryptAccount: decryptAccount,
        cryptLiveAccount: decryptLiveAccount,
        cryptTransactions: decryptTransactions,
        cryptPlannedTransactions: decryptPlannedTransactions,
        cryptTransaction: decryptTransaction,
        cryptCategories: decryptCategories,
        cryptStorages: decryptStorages,
        cryptCategory: decryptCategory,
        cryptStorage: decryptStorage,
        cryptPlans: decryptPlans,
        cryptStringArray: decryptStringArray,
      } = cryptAccountFactory(decryptNumber, decryptString),
      decryptEntityMap = {
        categories: decryptCategories,
        storages: decryptStorages,
        transactions: decryptTransactions,
        plannedTransactions: decryptPlannedTransactions,
        plans: decryptPlans,
        mainCurrencyCode: I,
        users: I,
        storagesSort: I,
        categoriesSort: I,
        archivedTransactionsBalance: I,
      },
      getAccountPartDecryptor = (key): Function => decryptEntityMap[key]

    return {
      encryptAccount,
      decryptAccount,
      encryptTransaction,
      decryptTransaction,
      encryptCategories,
      encryptStorages,
      encryptCategory,
      encryptStorage,
      encryptPlans,
      decryptCategories,
      decryptStorages,
      decryptCategory,
      decryptStorage,
      encryptNumber,
      encryptString,
      decryptLiveAccount,
      getAccountPartDecryptor,
      encryptStringArray,
      decryptStringArray,
    }
  }),
  getModuleState = store => store.getState()[cryptScreenModuleId],
  makeCryptAccount = ({
    cryptorKey,
    readingActionType,
    encryptingActionType,
    savingActionType,
    encrypted,
    message,
  }) =>
    (store, password) => {
      /* const readingAction: any = { type: readingActionType }
      store.dispatch(readingAction)
      const { deps: { session: { uid } } } = getModuleState(store)
      // unsubscribe({ uid, maUid })
      fbs.database()
        .ref(`accounts/${uid}`)
        .transaction((account) => {
          const encryptingAction: any = { type: encryptingActionType }
          store.dispatch(encryptingAction)

          try {
            const
              crypt = makeCrypt(password),
              cryptedAccount = assoc('encrypted', encrypted, crypt[cryptorKey](account))

            Alert.alert(
              'Success',
              message,
              [
                {
                  text: 'Ok',
                  onPress: () => store.dispatch(restartAppAC()),
                },
              ])
            const savingAction: any = { type: savingActionType }
            store.dispatch(savingAction)
            return cryptedAccount
          } catch (e) {
            console.log('crypt failure', e)
            reportException(e)
            Alert.alert(
              'Fail',
              `Crypt failure: ${e.message}`,
              [
                {
                  text: 'Ok',
                  onPress: () => store.dispatch(restartAppAC()),
                },
              ])
            return account
          }
        })*/
    },
  doEncryptAccount = makeCryptAccount({
    cryptorKey: 'encryptAccount',
    readingActionType: 'ENCRYPTION_READING_ACCOUNT',
    encryptingActionType: 'ENCRYPTION_ENCRYPTING_ACCOUNT',
    savingActionType: 'ENCRYPTION_SAVING_ACCOUNT',
    encrypted: true,
    message: 'Account is encrypted now. Restarting app.',
  }),
  doDecryptAccount = makeCryptAccount({
    cryptorKey: 'decryptAccount',
    readingActionType: 'DECRYPTION_READING_ACCOUNT',
    encryptingActionType: 'DECRYPTION_ENCRYPTING_ACCOUNT',
    savingActionType: 'DECRYPTION_SAVING_ACCOUNT',
    encrypted: false,
    message: 'Account is decrypted now. Restarting app.',
  }),
  cryptScreenMiddlewareFn: BaseMiddlewareFn<> = a => {
    /* if (a.type === CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP) {
      let firstPassword
      /!* TODO 1 MFG-5 Fix enter encryption password functionalify *!/

      AlertIOS.prompt(
        'Enter password',
        'Enter password to encrypt your data. ' +
        'This password is only the way to decrypt your data. Be sure that you remember it. ' +
        'Please take a backup of your data before encryption',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'OK',
            onPress: password => {
              firstPassword = password
              AlertIOS.prompt(
                'Confirm password',
                'Enter password once again',
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  {
                    text: 'OK',
                    onPress: secondPassword => {
                      if (secondPassword !== firstPassword) {
                        Alert.alert(
                          'Error',
                          'Entered passwords not match.',
                        )
                      } else {
                        console.log('encrypting data ...')

                        store.dispatch(cryptScreenEncryptionPasswordProvidedAC(password))
                        doEncryptAccount(store, secondPassword)
                      }
                    },
                  },
                ],
                'secure-text',
              )
            },
          },
        ],
        'secure-text',
      )
    }

    if (a.type === CRYPT_SCREEN_DECRYPT_ACCOUNT_BP) {
      AlertIOS.prompt(
        'Enter password',
        'Enter password to decrypt your data. ',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'OK',
            onPress: password => {
              const { session: { encryptionPassword } } = store.getState()
              if (encryptionPassword !== password) {
                Alert.alert(
                  'Error',
                  'Incorrect password.',
                )
              } else {
                console.log('decrypting data ...')

                doDecryptAccount(store, password)
              }
            },
          },
        ],
        'secure-text',
      )
    }

    return next(a) */
    return null;
  }

export {
  makeCrypt,
  cryptScreenMiddlewareFn,
}
