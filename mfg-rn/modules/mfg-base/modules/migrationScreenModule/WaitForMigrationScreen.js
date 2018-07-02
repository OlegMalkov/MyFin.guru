/* @flow */

import React from 'react';
import { MyScreen } from '../../ui/MyScreen'
import { RNText } from '../../ui/RNUI'
import { strings } from '../../localization';

const
  WaitForMigrationScreen = () => (
    <MyScreen routeName="WaitForMigration">
      <RNText style={{ paddingTop: 100, fontSize: 20, textAlign: 'center', width: '100%' }} >
        {strings.migrationAllowedOnlyByAccountOwner} : {strings.waitingForMigration}
      </RNText >
    </MyScreen >
  )

export {
  WaitForMigrationScreen,
}
