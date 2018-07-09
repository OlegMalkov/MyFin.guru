/* @flow */

import React from 'react'
import { MyScreen } from 'mfg-base/ui/MyScreen'
import { RNText } from 'mfg-base/ui/RNUI'
import { strings } from 'mfg-base/localization'
import { settingsModuleConnect } from '../../settingsScreenUtils'
import { restoreFromBackupProgressScreenModuleId } from './restoreFromBackupProgressScreenModuleId'

import type { SettingsModuleVP } from '../../settings.flow'
import type { RestoreFromBackupProgressScreenState } from './restoreFromBackupProgressScreenReducer'

const
  progressStyle = {
    paddingTop: 100,
    fontSize: 30,
    textAlign: 'center',
    width: '100%',
    color: 'black',
  },
  statusStyle = { fontSize: 30, textAlign: 'center', width: '100%', color: 'black' },
  RestoreFromBackupScreenView = (props: SettingsModuleVP<RestoreFromBackupProgressScreenState>) => {
    return (
      <MyScreen routeName="RestoreFromBackup">
        <RNText
          style={progressStyle}
        >
          {strings.restoreInProgress}
        </RNText>
        <RNText style={statusStyle}>{props.state.status}</RNText>
      </MyScreen>
    )
  },
  RestoreFromBackupScreen = settingsModuleConnect(
    (as): RestoreFromBackupProgressScreenState => as[restoreFromBackupProgressScreenModuleId],
    RestoreFromBackupScreenView
  )

export {
  RestoreFromBackupScreen,
}
