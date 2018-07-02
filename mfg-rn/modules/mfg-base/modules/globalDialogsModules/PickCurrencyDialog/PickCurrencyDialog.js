/* @flow */

import React from 'react'
import { baseConnect } from '../../../baseConnect'
import { MyDialog } from '../../../ui/MyDialog'
import { RNText, RNTouchableHighlight, RNView } from '../../../ui/RNUI'
import { strings } from '../../../localization'
import {
  pickCurrencyDialogCurrencyPressedAC,
  pickCurrencyDialogImportantBPAC, pickCurrencyDialogSearchChangedAC, pickCurrencyDialogCanceledAC,
} from './pickCurrencyDialogAC'
import { pickCurrencyDialogModuleId } from './pickCurrencyDialogModuleId'
import { TextInput } from '../../../ui/TextInput'
import { ToggleIcon } from '../../../ui/ToggleIcon'
// import Emoji from 'react-native-emoji'
import { ListView } from '../../../ui/ListView'

import type { BaseVP } from '../../../base.flow'
import type { CurrencyRenderProps } from './pickCurrencyDialogReducer'
import type { PickCurrencyDialogState } from './pickCurrencyDialogReducer'

type Props = BaseVP<PickCurrencyDialogState>

class PickCurrencyDialogView extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    /* $FlowOk */
    this.renderCurrencyRow = this.renderCurrencyRow.bind(this)
  }

  renderCurrencyRow(currencyData: CurrencyRenderProps) {
    const { isEven, countryName, courseString, currencyCode, name, isMajor } = currencyData
    return (
      <RNTouchableHighlight
        onPress={() => this.props.dispatch(pickCurrencyDialogCurrencyPressedAC(currencyCode))}
        underlayColor="lightgray"
      >
        <RNView
          key={currencyCode}
          style={[{
            padding: 5,
            flexDirection: 'row',
          }, isEven && { backgroundColor: '#f6f6f6' },
          ]}
        >
          <RNView style={[{ flex: 1 }]}>
            <RNView>
              <RNText>{/* <Emoji name={currencyData.emoji} />*/} {countryName}</RNText>
            </RNView>
            <RNView style={{ flexDirection: 'row' }}>
              <RNText style={{ fontWeight: 'bold', fontSize: 17, width: 60 }}>
                {currencyCode}
              </RNText>
              <RNText
                style={{ fontSize: 14, flex: 1 }}
                onPress={
                  () => this.props.dispatch(pickCurrencyDialogCurrencyPressedAC(currencyCode))
                }/* TODO 2 dispatch what happend */
                numberOfLines={1}
              >
                {courseString}
              </RNText>
            </RNView>
            <RNView>
              <RNText style={{ fontSize: 14 }}>{name}</RNText>
            </RNView>
          </RNView>
          <RNView style={{ width: 30, flexDirection: 'column', alignItems: 'center' }}>
            <ToggleIcon
              /* TODO 2 dispatch what happend */
              onPress={() => this.props.dispatch(pickCurrencyDialogImportantBPAC(currencyCode))}
              active={isMajor}
              activeIcon="star"
              icon="star-border"
            />
          </RNView>
        </RNView>
      </RNTouchableHighlight>
    )
  }

  render() {
    const
      { state, dispatch } = this.props,
      { computed: { currencies }, opened } = state,
      listContainerStyle = {
        height: state.deps.windowHeight - 180,
        marginTop: 10,
        marginBottom: 10,
      }

    return (
      <MyDialog
        opened={opened}
        modalDidClose={() => this.props.dispatch(pickCurrencyDialogCanceledAC())}
      >
        <RNView>
          <TextInput
            icon="search"
            style={{ fontSize: 33, paddingLeft: 3, paddingRight: 3 }}
            onChangeText={(v) => dispatch(pickCurrencyDialogSearchChangedAC(v))}
            value={state.search}
            placeholder={strings.pickCurrencySearchFilter}
          />
          <RNView style={listContainerStyle}>
            <ListView
              data={currencies}
              renderRow={this.renderCurrencyRow}
            />
          </RNView>
        </RNView>
      </MyDialog>
    )
  }
}

const PickCurrencyDialog = baseConnect(
  (as): PickCurrencyDialogState => as[pickCurrencyDialogModuleId],
  PickCurrencyDialogView,
)

export {
  PickCurrencyDialog,
}
