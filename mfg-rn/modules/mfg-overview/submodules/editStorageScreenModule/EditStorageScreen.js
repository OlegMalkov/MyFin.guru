/* @flow */

import React from 'react'
import { MyButton } from 'mfg-base/ui/Button'
import { RNText, RNView } from 'mfg-base/ui/RNUI'
import { TextInput } from 'mfg-base/ui/TextInput'
import { MoneyInputRow } from 'mfg-base/ui/MoneyInputRow'
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
import { strings } from 'mfg-base/localization'
import { PickCurrencyDialog } from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/PickCurrencyDialog'
import { PickUserDialog } from 'mfg-base/modules/globalDialogsModules/PickUserDialog/PickUserDialog'
import { mapObjIndexed, pipe, values } from 'mfg-base/utils/utils'
import { overviewModuleConnect } from '../../overviewModuleUtils'
import {
  editStorageAddCurrencyBPAC,
  editStorageInitialBalanceChangedAC,
  editStorageLimitBalanceChangedAC,
  editStorageSaveBPAC,
  editStorageTypePressedAC,
  editStorageUserPressedAC,
  editStorageTitleChangedAC,
} from './editStorageScreenAC'
import { editStorageScreenModuleId } from './editStorageScreenModuleId';

import type { OverviewModuleVP } from '../../overview.flow'
import type { EditStorageScreenState } from './editStorageScreenReducer';

const
  BalanceEditor = (props) => {
    const
      { dispatch } = props,
      renderLimitInput = (currencyCode) => {
        return (
          <RNView style={{ flex: 1 }}>
            <MoneyInputRow
              onChange={
                (value) => dispatch(editStorageLimitBalanceChangedAC({ currencyCode, value }))
              }
              amount={props.state.limitBalance[currencyCode]}
              currencyCode={currencyCode}
              autoFocus={false}
              placeholder={strings.limit}
            />
          </RNView>
        )
      },
      rows = pipe(
        mapObjIndexed((amount, currencyCode) => {
          return (
            <RNView key={currencyCode} style={{ flexDirection: 'row' }}>
              <RNView style={{ flex: 1 }}>
                <MoneyInputRow
                  onChange={(value) => dispatch(editStorageInitialBalanceChangedAC({
                    currencyCode,
                    value,
                  }))}
                  amount={amount}
                  currencyCode={currencyCode}
                  autoFocus={false}
                  showCurrencyCode={props.state.type !== 'credit'}
                  placeholder={strings.balance}
                />
              </RNView>

              {props.type === 'credit' && renderLimitInput(currencyCode)}
            </RNView>
          )
        }),
        values,
      )(props.state.initialBalance)

    return (
      <RNView>
        {rows}
        <MyButton
          onPress={() => dispatch(editStorageAddCurrencyBPAC())}
          title={strings.addCurrency}
        />
      </RNView>
    )
  },
  EditStorageScreenView = (props: OverviewModuleVP<EditStorageScreenState>) => (
    <RNView style={{ flex: 1 }}>{/* TODO 3 check is this wrapper required? */}
      <ScreenWithBackButton routeName="EditStorage" onBackButtonPress={() => { throw new Error('TODO 2')}}>
        <MyButton onPress={() => props.dispatch(editStorageSaveBPAC())} title={strings.save}/>
        <TextInput
          placeholder={strings.enterStorageName}
          value={props.state.title}
          onChangeText={(v) => props.dispatch(editStorageTitleChangedAC(v))}
        />
        <RNText style={{ fontSize: 20 }} onPress={() => props.dispatch(editStorageTypePressedAC())}>
          Тип: {props.state.type}
        </RNText>
        <RNText
          style={{ fontSize: 20 }}
          onPress={() => props.dispatch(editStorageUserPressedAC())}
        >
          {strings.owner}: {props.state.computed.userName}
        </RNText>
        <BalanceEditor {...props} />
      </ScreenWithBackButton>
      <PickCurrencyDialog/>
      <PickUserDialog/>
    </RNView>
  ),
  EditStorageScreen = overviewModuleConnect(
    (as): EditStorageScreenState => as[editStorageScreenModuleId],
    EditStorageScreenView,
  )

export {
  EditStorageScreen,
}
