/* @flow */

import React from 'react'
import { RNText } from 'mfg-base/ui/RNUI'
import { TextInput } from 'mfg-base/ui/TextInput'
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
import { MyButton } from 'mfg-base/ui/Button'
import { MyDivider } from 'mfg-base/ui/Divider'
import { baseConnect } from 'mfg-base/baseConnect'
import { strings } from 'mfg-base/localization'
import type { SettingsModuleVP } from '../../settings.flow'
import { settingsModuleConnect } from '../../settingsScreenUtils'
import {
  backupEmailInputChangedAC,
  importFromDrebeDengiBtnPressedAC, restoreAccountFromBackupBtnPressedAC,
  sendBackupNowBtnPressedAC,
} from './backupAC';
import { backupModuleId } from './backupModuleId';

import type { BackupModuleState } from './backupModuleReducer'

const
  ImportExport = (props: SettingsModuleVP<BackupModuleState>) => {
    return (
      <ScreenWithBackButton
        routeName="ImportExport"
        onBackButtonPress={() => {
          throw new Error('TODO 1.9')
        }}
      >
        <TextInput
          onChangeText={(text) => props.dispatch(backupEmailInputChangedAC(text))}
          placeholder={strings.enterBackupEmail}
          value={props.state.editBackupEmail || props.state.deps.personalData.backupEmail}
        />
        <MyDivider styleName="line"/>
        <RNText style={{ textAlign: 'center' }}>
          receive every day backup to above email
        </RNText>
        <MyDivider/>
        <MyButton
          onPress={() => props.dispatch(sendBackupNowBtnPressedAC())}
          title={strings.sendBackupNow}
        />
        <MyDivider/>
        <MyButton
          onPress={() => props.dispatch(restoreAccountFromBackupBtnPressedAC())}
          title={strings.restoreFromBackup}
        />
        <MyDivider/>
        <MyButton
          onPress={() => props.dispatch(importFromDrebeDengiBtnPressedAC())}
          title={strings.importFromDrebedengi}
        />
      </ScreenWithBackButton>
    )
  },
  ImportExportScreen = settingsModuleConnect(
    (as): BackupModuleState => as[backupModuleId],
    ImportExport
  )

export {
  ImportExportScreen,
}
