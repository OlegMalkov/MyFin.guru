/* @flow */

import React from 'react'
import { baseConnect } from '../../baseConnect'
import { strings } from '../../localization'
import { MyScreen } from '../../ui/MyScreen'
import { RNText } from '../../ui/RNUI'
import { migrationScreenModuleId } from './migrationScreenModuleId'

import type { BaseVP } from '../../base.flow'
import type { MigrationScreenState } from './migrationScreenReducer'

const
  statusToMessage = {
    idle: '',
    backup: strings.backingUpToOnlineDatabase,
    applying: strings.applyingMigration,
    saving: strings.savingToOnlineDatabase,
    fail: strings.fail,
  },
  MigrationScreenView = ({ state: { status } }: BaseVP<MigrationScreenState>) => (
    <MyScreen routeName="Migration">
      <RNText style={{ paddingTop: 100, fontSize: 40, textAlign: 'center', width: '100%' }}>
        {strings.dataMigrationInProgress}
      </RNText>
      <RNText
        style={{ paddingTop: 20, fontSize: 30, textAlign: 'center', width: '100%' }}
      >
        {statusToMessage[status]}
      </RNText>
    </MyScreen>
  ),
  MigrationScreen = baseConnect(
    (as): MigrationScreenState => as[migrationScreenModuleId],
    MigrationScreenView,
  )

export {
  MigrationScreen,
}
