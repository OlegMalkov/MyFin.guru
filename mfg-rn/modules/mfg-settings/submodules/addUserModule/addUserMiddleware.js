// @flow
/* eslint-disable */

/* TODO 4 MFG-63

import { NavigationActions } from 'react-navigation'
import {
  Alert,
} from 'react-native'
import * as selectors from '../../reducers/selectors'
import firebase from '../../firebase'
import type { MyStore, MyDispatch, AnyAction, UID } from '../../global.flow'
import type {
  UserRef,
} from '../../modules/account/live/flowTypes'
import {
  ADD_USER_ACCEPT_INVITATION,
  restartAppAC,
} from '../../modules/core/actionCreators'
import { assoc, pipe } from '../../utils';
import { getServerTimeStamp } from "./firebase";


  subscribeInvitations = ({ uid, store }) => {
    fbs.database()
      .ref(`invitations/${uid}`)
      .on('value', (snapshot) => {
        const
          invitationsMap: InvitationsMap = snapshot.val()

        if (!invitationsMap) {
          return
        }

        const invitationsUids = pipe(
          filterObj(({ accepted }) => !!accepted !== accepted),
          keys,
        )(invitationsMap)

        if (invitationsUids.length > 0) {
          const
            inviterUid: UID = invitationsUids[0],
            { inviterName } = invitationsMap[inviterUid]

          Alert.alert(
            strings.invitation,
            strings.formatString(strings.invitationDescription, inviterName),
            [
              {
                text: strings.accept,
                onPress: () => store.dispatch(addUserAcceptInvitation(inviterUid)),
              },
              {
                text: strings.reject,
                onPress: () => store.dispatch(addUserRejectInvitation(inviterUid)),
              },
            ],
          )
        }
      })
  },
  unsubscribeInvitations = ({ uid }) => fbs.database()
    .ref(`invitations/${uid}`)
    .off('value'),


export const AddUserMiddleware = (store: MyStore) => (next: MyDispatch) => (action: AnyAction) => {
  const
    { dispatch } = store,
    state = store.getState(),
    { maUid, uid } = selectors.uidAndMainAccountUidAndEmailSelector(state),
    isAuthenticated = selectors.isAuthenticatedSelector(state);

  if (action.type === 'ADD_USER_ID_READED') {
    const
      targetUserId = action.payload,
      invitationPath = `invitations/${targetUserId}/${uid}`,
      invitationRef = firebase.database().ref(invitationPath),
      onFinish = () => {
        store.dispatch(NavigationActions.back())
        store.dispatch({ type: 'ADD_USER_FINISH' })
        invitationRef.off('value')
      }

    invitationRef
      .set({
        initiatedDate: getServerTimeStamp(),
        accepted: null,
        inviterName: state.personalData.name,
      })

    invitationRef.on('value', (snapshot) => {
      const
        { accepted, name: targetUserName } = snapshot.val()
      if (accepted === true) {
        Alert.alert('Accepted', 'Your invitation was accepted')
        const
          readAccessLevel = {
            CREATE: false,
            READ: true,
            UPDATE: false,
            DELETE: false,
          },
          createReadAccessLevel = {
            CREATE: true,
            READ: true,
            UPDATE: false,
            DELETE: false,
          },
          userRef: UserRef = {
            name: targetUserName,
            permissions: {
              currencies: readAccessLevel,
              storages: readAccessLevel,
              transaction: createReadAccessLevel,
              plans: createReadAccessLevel,
            },
          }
        firebase.database()
          .ref(`accounts/${uid}/live/users/${targetUserId}`)
          .set(userRef)
          .then(onFinish)
      } else if (accepted === false) {
        Alert.alert('Rejected', 'Your invitation was rejected')
        onFinish()
      }
    })
  }

  if (action.type === ADD_USER_ACCEPT_INVITATION) {
    const { inviterUid } = action
    firebase.database()
      .ref(`personalData/${uid}/maUid`)
      .set(inviterUid)
      .then(() => {
        return firebase.database()
          .ref(`invitations/${uid}/${inviterUid}`)
          .transaction((req) => {
            return pipe(
              assoc('accepted', true),
              assoc('name', state.personalData.name),
            )(req)
          })
      })
      .then(() => {
        Alert.alert(
          'Done',
          'Your account has been connected. Restarting app.',
          [
            {
              text: 'Ok',
              onPress: () => store.dispatch(restartAppAC()),
            },
          ])
      })
  }

  if (action.type === 'ADD_USER_REJECT_INVITATION') {
    firebase.database()
      .ref(`invitations/${uid}/${action.inviterUid}/accepted`)
      .set(false)
  }


    if (a.type === DB_GET_PERSONAL_DATA_DONE) {
      if (a.personalData.maUid) {
        const { deps: { session: { uid } } } = getModuleState(store)
        unsubscribeInvitations({ uid })
      }
    }

  return next(action)
}*/
