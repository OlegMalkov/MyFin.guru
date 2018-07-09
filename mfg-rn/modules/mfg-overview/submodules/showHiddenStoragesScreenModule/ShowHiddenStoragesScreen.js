/* @flow */

import React from 'react'
import { ListView } from 'mfg-base/ui/ListView'
import { RNView, RNEList, RNEListItem } from 'mfg-base/ui/RNUI'
import { RNText } from 'mfg-base/ui/RNUI'
import { ToggleIcon } from 'mfg-base/ui/ToggleIcon'
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
import { strings } from 'mfg-base/localization'
import { overviewModuleConnect } from '../../overviewModuleUtils'
import { showHiddenStoragesScreenShowIconPressedAC } from './showHiddenStoragesAC'
import { showHiddenStoragesScreenModuleId } from './showHiddenStoragesModuleId'

import type { OverviewModuleVP } from '../../overview.flow'
import type { ShowHiddenStoragesScreenState } from './showHiddenStoragesModuleReducer'

const
  renderStorageRow = ({ dispatch }) => ({ id, title, hidden }) => {
    const
      rightIcon = (
        <ToggleIcon
          onPress={() => dispatch(showHiddenStoragesScreenShowIconPressedAC(id))}
          active={hidden}
          icon="eye-slash"
          type="font-awesome"
        />
      );

    return (
      <RNEListItem
        key={id}
        title={title || 'FIXME: empty title'}
        rightIcon={rightIcon}
      />
    );
  },
  ShowHiddenStoragesScreenView = (props: OverviewModuleVP<ShowHiddenStoragesScreenState>) => {
    const content =
      props.state.computed.shouldShowNoStoragesLabel ? (
        <RNView><RNText>{strings.noHiddenStorages}</RNText></RNView>
      ) : (
        <RNEList>
          <ListView
            data={props.state.computed.listData}
            renderRow={renderStorageRow(props)}
          />
        </RNEList>
      )
    return (
      <ScreenWithBackButton routeName="ShowHiddenStorages" onBackButtonPress={() => { throw new Error('TODO 2')}}>
        {content}
      </ScreenWithBackButton>
    )
  },

  ShowHiddenStoragesScreenScreen = overviewModuleConnect(
    (as): ShowHiddenStoragesScreenState => as[showHiddenStoragesScreenModuleId],
    ShowHiddenStoragesScreenView,
  )

export {
  ShowHiddenStoragesScreenScreen,
}
