/* @flow */

// import QRCode from 'react-native-qrcode'
import React from 'react'
import { RNNoChildView, RNView } from 'mfg-base/ui/RNUI'
import { TextInput } from 'mfg-base/ui/TextInput'
import { uidIsDef } from 'mfg-base/entities/account/live/utils';
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
// import * as qrHeader from '../../qrHeader'
import { MyDivider } from 'mfg-base/ui/Divider'
import { MyButton } from 'mfg-base/ui/Button'
import { strings } from 'mfg-base/localization'
import type { SettingsModuleVP } from '../../settings.flow'
import { settingsModuleConnect } from '../../settingsScreenUtils'
import { disconnectFromMainAccountAC, personalUserNameInputChangedAC } from './personalDataScreenAC'

import { personalDataScreenModuleId } from './personalDataScreenModuleId';
import type { PersonalDataScreenState } from './personalDataScreenReducer'

const
  PersonalDataView = (props: SettingsModuleVP<PersonalDataScreenState>) => {
    const
      {
        deps: {
          personalData: { maUid, name },
        },
        editName,
      } = props.state,
      isConnected = uidIsDef(maUid)

    return (
      <ScreenWithBackButton
        routeName="PersonalData"
        onBackButtonPress={() => {
          throw new Error('TODO 2')
        }}
      >
        <RNView style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            defaultValue={name}
            value={editName || name}
            onChangeText={(text) => props.dispatch(personalUserNameInputChangedAC(text))}
            placeholder={strings.enterYourName}
          />
          <MyDivider styleName="line"/>
        </RNView>
        {isConnected && (
          <RNView>
            <MyButton
              icon={{ name: 'sync-disabled' }}
              title={strings.disconnectFromMainAccount}
              onPress={() => props.dispatch(disconnectFromMainAccountAC())}
            />
          </RNView>
        )}
        {(!!name && !isConnected) && (
          <RNView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <RNNoChildView/>
            {/* <QRCode
              value={`${qrHeader.addUser}${uid}`}
              size={Dimensions.get('window').width - 80}
              bgColor="black"
              fgColor="white"
            />*/}
          </RNView>
        )
        }
      </ScreenWithBackButton>
    )
  }

const PersonalDataScreen = settingsModuleConnect(
  (as): PersonalDataScreenState => as[personalDataScreenModuleId],
  PersonalDataView,
)

export {
  PersonalDataScreen,
}
