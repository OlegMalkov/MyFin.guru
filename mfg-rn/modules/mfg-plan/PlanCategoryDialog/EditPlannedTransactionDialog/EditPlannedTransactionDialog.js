/* @flow */

import React from 'react'
import { CheckBox } from 'mfg-base/ui/CheckBox'
import { MyDialog } from 'mfg-base/ui/MyDialog';
import { MyTagsInput } from 'mfg-base/ui/MyTagsInput'
import { RNText, RNView } from 'mfg-base/ui/RNUI'
import { DoneCancelRow } from 'mfg-base/ui/DoneCancelRow'
import { MoneyInputRow } from 'mfg-base/ui/MoneyInputRow'
import { dayToString, strings } from 'mfg-base/localization'

import {
  onAmountChangedAC,
  onCurrencyPressAC,
  onDayPressAC,
  onDialogCancelBtnPressAC,
  onDialogConfirmBtnPressAC,
  onRepeatEveryMonthToggleAC,
  onTagsChangedAC,
  onTagsTextChangedAC,
} from './editPlannedTransactionDialogAC'

import type { PlanModuleDispatch } from '../../plan.flow'
import type {
  EditPlannedTransactionDialogState,
} from './editPlannedTransactionDialogReducer'

type Props = {|
  state: EditPlannedTransactionDialogState,
  dispatch: PlanModuleDispatch,
|}

const
  EditPlannedTransactionDialog = ({ state, dispatch }: Props) => {
    const
      doneCancelProps = {
        onDone: () => dispatch(onDialogConfirmBtnPressAC()),
        onCancel: () => dispatch(onDialogCancelBtnPressAC()),
      },
      { repeatEveryMonth, amount, currencyCode, tags, repeatDay, comment, opened } = state

    return (
      <MyDialog opened={opened} disableOnBackPress>
        <RNView>
          <MoneyInputRow
            onChange={(amount) => dispatch(onAmountChangedAC(amount))}
            onCurrencyPress={() => dispatch(onCurrencyPressAC())}
            amount={amount}
            currencyCode={currencyCode}
            autoFocus={false}
            placeholder={strings.enterAmount}
          />
          <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MyTagsInput
              tags={tags}
              comment={comment}
              onChange={(v) => dispatch(onTagsChangedAC(v))}
              onTextChange={(v) => dispatch(onTagsTextChangedAC(v))}
            />
          </RNView>
          <CheckBox
            title={strings.repeatEveryMonth}
            checked={repeatEveryMonth}
            onPress={() => dispatch(onRepeatEveryMonthToggleAC())}
          />
          <RNText onPress={() => dispatch(onDayPressAC())}>
            {dayToString(repeatDay)}
          </RNText>
          <DoneCancelRow {...doneCancelProps} />
        </RNView>
      </MyDialog>
    )
  }

export {
  EditPlannedTransactionDialog,
}
