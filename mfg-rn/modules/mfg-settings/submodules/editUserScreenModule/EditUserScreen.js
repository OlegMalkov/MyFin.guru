/* @flow */
/*

import React from 'react';
import { View, Text, Picker } from 'react-native';
import { MyButton } from 'mfg-base/ui/Button';
import { TextInput } from 'mfg-base/ui/TextInput'
import { getUserTransactionsCount } from 'mfg-base/entities/account/live/transactionsSelectors';
import { getUsersList, uidToUserName } from 'mfg-base/entities/account/live/utils';
import { ScreenWithBackButton } from '../../screens/ScreenWithBackButton';
import type { AppState } from '../../store/flowTypes';
import { deprecatedConnect } from '../../store/myConnect'
import {
  deleteUserAC,
  moveTransactionsTargetUserIdChangedAC,
  transferTransactionsBetweenUsersAC, userNameInputChangedAC,
} from './editUserScreenAC';
import { path } from '../../utils/utils';
import { strings } from '../../localization';

const
  EditUserView = ({
                    uid,
                    userName,
                    isAnonymous,
                    transactionsCount,
                    moveTargetUsers,
                    moveTargetUserName,
                    moveTargetUserUid,
                    deleteBtnVisible,
                    moveTransactionsEnabled,
                    dispatch,
                  }) => {
    return (
      <ScreenWithBackButton routeName="EditUser">
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            <Text style={{ fontSize: 20 }}>
              {`${userName} has ${transactionsCount} transactions`}
            </Text>
          </View>
          <TextInput
            onChangeText={(text) => dispatch(userNameInputChangedAC(text))}
            value={userName}
            placeholder={strings.enterUserName}
          />
          {
            deleteBtnVisible && (
              <MyButton
                iconRight
                icon={{ name: 'delete-forever' }}
                title="Delete"
                onPress={() => dispatch(deleteUserAC(uid))}
              />
            )
          }
          {
            moveTransactionsEnabled && (
              <MyButton
                iconRight
                icon={{ name: 'move-to-inbox' }}
                title={`Move transactions to ${moveTargetUserName}`}
                onPress={() => dispatch(transferTransactionsBetweenUsersAC({
                  fromUser: uid,
                  deleteUser: isAnonymous,
                  toUser: moveTargetUserUid,
                }))}
              />
            )
          }
          {
            moveTransactionsEnabled && (
              <Picker
                selectedValue={moveTargetUserUid}
                onValueChange={(uid) => dispatch(moveTransactionsTargetUserIdChangedAC(uid))}
              >
                {moveTargetUsers.map(({ name, uid: userId }) => {
                  return (
                    <Picker.Item key={uid} label={name} value={userId}/>
                  );
                })}
              </Picker>
            )
          }
        </View>
      </ScreenWithBackButton>
    );
  },
  mapStateToProps = (as: AppState, props: any) => {
    /!* TODO 2 MFG-65 no logic in mapStateToProps *!/
    const
      { navigation: { state: { params: { uid } } } } = props,
      transactionsCount = getUserTransactionsCount(as.liveAccount.transactions, uid),
      moveTargetUserUid = as.editUserScreen.moveTargetUserUid,
      { users } = as.liveAccount,
      user = users[uid];

    return {
      transactionsCount,
      deleteBtnVisible: transactionsCount === 0,
      moveTransactionsEnabled: transactionsCount > 0,
      uid,
      userName: uidToUserName(users, uid),
      isAnonymous: path(['isAnonymous'], user),
      moveTargetUserName: uidToUserName(users, moveTargetUserUid),
      moveTargetUserUid,
      moveTargetUsers: getUsersList(users),
    };
  },
  EditUserScreen = deprecatedConnect(mapStateToProps)(EditUserView);

export {
  EditUserScreen,
}
*/
