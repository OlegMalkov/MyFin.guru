/* @flow */

import React from 'react'
import { CheckBox } from 'mfg-base/ui/CheckBox'
import { MyDialog } from 'mfg-base/ui/MyDialog'
import { RNText, RNView } from 'mfg-base/ui/RNUI'
import { TextInput } from 'mfg-base/ui/TextInput'
import { DoneCancelRow } from 'mfg-base/ui/DoneCancelRow'
import { strings } from 'mfg-base/localization'
import {
  editTransactionOnCurrencyPressAC,
  editTransactionOnDatePressAC,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsAC'
import { dayPeriodStr } from 'mfg-base/utils/dateUtils'
import {
  onLendToStorageTitleChangedAC,
  onToLendMoneyDialogAmountChangedAC,
  onToLendMoneyDialogCancelBtnPressAC,
  onToLendMoneyDialogConfirmBtnPressAC,
  toLendDialogIsReliablePressedAC,
} from './toLendMoneyDialogAC'
import { MoneyInputRow } from 'mfg-base/ui/MoneyInputRow'

import type { OverviewModuleDispatch } from '../overview.flow'
import type { ToLendMoneyDialogState } from './toLendMoneyDialogReducer'

type Props = {|
  state: ToLendMoneyDialogState,
  dispatch: OverviewModuleDispatch,
|}

const
  ToLendMoneyDialog = ({ state, dispatch }: Props) => {
    const
      { amount, currencyCode, until, title, isReliable, computed: { storageTitle } } = state,
      doneCancelProps = {
        onDone: () => dispatch(onToLendMoneyDialogConfirmBtnPressAC()),
        onCancel: () => dispatch(onToLendMoneyDialogCancelBtnPressAC()),
      }

    return (
      <MyDialog opened={state.opened} disableOnBackPress>
        <RNView>
          <RNText style={{ textAlign: 'center' }}>{strings.toLendMoney}</RNText>
          <MoneyInputRow
            onChange={(v) => dispatch(onToLendMoneyDialogAmountChangedAC(v))}
            amount={amount}
            onCurrencyPress={() => dispatch(editTransactionOnCurrencyPressAC())}
            currencyCode={currencyCode}
            placeholder={strings.enterAmount}
          />
          <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText onPress={() => dispatch(editTransactionOnDatePressAC())}>
              {strings.from} {storageTitle}
            </RNText>
            <RNText
              onPress={() => dispatch(editTransactionOnDatePressAC())}
            >
              {strings.before} {dayPeriodStr(until)}
            </RNText>
          </RNView>
          <TextInput
            style={{ fontSize: 33, paddingLeft: 3, paddingRight: 3 }}
            onChangeText={(v) => dispatch(onLendToStorageTitleChangedAC(v))}
            value={title}
            placeholder={strings.toLendDirection}
          />
          <CheckBox
            title={strings.isReliableDebt}
            checked={isReliable}
            onPress={() => dispatch(toLendDialogIsReliablePressedAC())}
          />
          <DoneCancelRow {...doneCancelProps} />
        </RNView>
      </MyDialog>
    )
  }

export {
  ToLendMoneyDialog,
}
