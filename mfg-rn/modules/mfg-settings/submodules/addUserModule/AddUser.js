// @flow

/* eslint-disable */
/* TODO 4 MFG-63 add user

// import QRCodeScanner from 'react-native-qrcode-scanner';
import { View } from 'react-native';
import React from 'react';
import { ScreenWithBackButton } from '../../screens/ScreenWithBackButton';
// import * as qrHeader from '../qrHeader';
import type { AppState } from '../../store/flowTypes';

const
  AddUser = (props) => {
    return (
      <ScreenWithBackButton>
        <View style={{ flex: 1 }} >
          {
          /!*  props.status === 'reading_id' && <QRCodeScanner
              onRead={(e) => {
                if (e.data.indexOf(qrHeader.addUser) !== -1) {
                  props.dispatch({
                  type: 'ADD_USER_ID_READED', payload: e.data.replace(qrHeader.addUser, '') });
                }
              }}
            />*!/
          }
        </View>
      </ScreenWithBackButton>
    );
  },
  mapStateToProps = (as: AppState) => {
    return {
      status: as.addUserScreen.status,
    };
  };

export const AddUser = myConnect(mapStateToProps)(AddUser);
*/
