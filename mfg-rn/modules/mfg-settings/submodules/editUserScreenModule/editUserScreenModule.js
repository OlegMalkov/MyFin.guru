/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { editUserScreenModuleId } from './editUserScreenModuleId';
import { editUserScreenReducer } from './editUserScreenReducer'

import type { SettingsModuleMiddlewareFn, SettingsModuleType } from '../../settings.flow'
import type { EditUserScreenState } from './editUserScreenReducer'

const
  middlewareFn: SettingsModuleMiddlewareFn<> = () => {
    /* TODO 2 MFG-65 refactor edit user screen */
    /* if (a.type === TRANSFER_TRANSACTIONS_BETWEEN_USERS) {
      const
        { deps: { session: { uid }, personalData: { maUid } } } = getModuleState(getAppState),
        { fromUser, deleteUser, toUser } = a,
        finalToUser = uidIsUndef(toUser) ? uid : toUser,
        transactionsRef = fbs.database()
          .ref(`accounts/${maUid}/live/transactions`)

      transactionsRef
        .once('value', (transactions) => {
          return transactionsRef.set(
            mapObjIndexed(
              when(
                x => x.uid === fromUser,
                assoc('uid', finalToUser),
              ),
            )(transactions.val()))
        })
        .then(() => {
          if (deleteUser) {
            return fbs.database()
              .ref(`accounts/${maUid}/live/users/${fromUser}`)
              .set(null)
          }
          return Promise.resolve()
        })
        .then(() => {
          Alert.alert(
            'Done',
            'Transactions moved. Restarting app.',
            [
              {
                text: 'Ok',
                onPress: () => store.dispatch(restartAppAC()),
              },
            ])
        })
    }

    if (a.type === DELETE_USER) {
      const
        { uid } = a,
        { deps: { personalData: { maUid } } } = getModuleState(store)

      fbs.database()
        .ref(`accounts/${maUid}/live/users/${uid}`)
        .set(null)
        .then(() => store.dispatch(NavigationActions.back()))
    }


    if (a.type === USER_NAME_INPUT_CHANGED) {
      const
        { deps: { session: { uid }, personalData: { maUid } } } = getModuleState(store)

      fbs.database()
        .ref(`accounts/${maUid}/live/users/${uid}/name`)
        .set(a.text)
    }*/

    return null
  }

export type EditUserScreenModule = SettingsModuleType<EditUserScreenState>

const editUserScreenModule: EditUserScreenModule = {
  reducer: editUserScreenReducer,
  middlewareFn,
  moduleId: editUserScreenModuleId,
  screens: isTestEnv ? {} : {
    // EditUser: require('./EditUserScreen').EditUserScreen,
  },
}

export {
  editUserScreenModule,
}
