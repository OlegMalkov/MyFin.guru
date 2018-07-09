/* @flow */

import React from 'react';
import { Icon } from 'mfg-base/ui/Icon';
import { BackButton } from 'mfg-base/ui/BackButton';
import { MyScreen } from 'mfg-base/ui/MyScreen'
import { RNView, RNNoChildView } from 'mfg-base/ui/RNUI'
import { VersionText } from 'mfg-base/ui/VersionText'
import { getWindowDimensions } from 'mfg-base/utils/myDimensions'
import { rnCreateStylesheet } from 'mfg-base/rn/RN'
import { settingsScreenModuleId } from './settingsScreenModuleId';
import {
  settingsScreenArchiveBPAC, settingsScreenBackBPAC,
  settingsScreenBackupBtnPressedAC,
  settingsScreenCryptBtnPressedAC, settingsScreenLogoutBtnPressedAC,
  settingsScreenPersonalDataBPAC,
  settingsScreenUsersBtnPressedAC,
} from './settingsScreenAC';
import { settingsModuleConnect } from './settingsScreenUtils'

import type { SettingsModuleVP } from './settings.flow'
import type { SettingsScreenState } from './settingScreenReducer'

type CellProps = {| iconName: string, iconType?: string, onPress: () => any |}

type Props = SettingsModuleVP<SettingsScreenState>

const
  { width: deviceWidth } = getWindowDimensions(),
  styles = rnCreateStylesheet({
    content: {
      marginTop: 20,
      flexDirection: 'column',
      flex: 1,
    },
    grid: {
      width: '100%',
    },
    row: {
      height: deviceWidth / 3,
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  EmptyCell = () => (<RNNoChildView style={styles.cell}/>),
  Cell = ({ iconName, iconType, onPress }: CellProps) => (
    <RNView style={styles.cell}>
      <Icon
        type={iconType}
        name={iconName}
        size={deviceWidth / 3.5}
        onPress={onPress}
      />
    </RNView>
  ),
  SettingsScreenView = (props: Props) => {
    const
      cryptCell = (
        <Cell
          iconName="lock"
          onPress={() => props.dispatch(settingsScreenCryptBtnPressedAC())}
        />
      ),
      backupCell = (
        <Cell
          iconName="import-export"
          onPress={() => props.dispatch(settingsScreenBackupBtnPressedAC())}
        />
      ),
      logoutCell = (
        <Cell
          iconName="sign-out"
          iconType="font-awesome"
          onPress={() => props.dispatch(settingsScreenLogoutBtnPressedAC())}
        />
      ),
      personAddCell = (
        <Cell
          iconName="group"
          onPress={() => props.dispatch(settingsScreenUsersBtnPressedAC())}
        />
      ),
      personalDataCell = (
        <Cell
          iconName="person"
          onPress={() => props.dispatch(settingsScreenPersonalDataBPAC())}
        />
      ),
      archiveCell = (
        <Cell
          iconName="archive"
          onPress={() => props.dispatch(settingsScreenArchiveBPAC())}
        />
      ),
      adminView = ([
        <RNView key="row1" style={styles.row}>
          {cryptCell}
          {backupCell}
          {logoutCell}
        </RNView>,
        <RNView key="row2" style={styles.row}>
          {personAddCell}
          {personalDataCell}
          {archiveCell}
        </RNView>,
        <RNView key="row3" style={styles.row}>
          <EmptyCell/>
          <EmptyCell/>
          <EmptyCell/>
        </RNView>,
      ]),
      userView = [
        <RNView key="row1" style={styles.row}>
          {personalDataCell}
          {logoutCell}
        </RNView>,
      ],
      { state: { deps: { isAdmin } } } = props;

    return (
      <MyScreen routeName="Settings">
        <RNView style={styles.content}>
          <BackButton
            onPress={() => {
              props.dispatch(settingsScreenBackBPAC())
            }}
          />
          <RNView style={styles.grid}>
            {isAdmin ? adminView : userView}
          </RNView>
        </RNView>
        <VersionText/>
      </MyScreen>
    );
  },
  SettingsScreen = settingsModuleConnect(
    (as): SettingsScreenState => as[settingsScreenModuleId],
    SettingsScreenView,
  );

export {
  SettingsScreen,
}

