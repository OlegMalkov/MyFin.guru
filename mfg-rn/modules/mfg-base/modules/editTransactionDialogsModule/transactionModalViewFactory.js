/* @flow */

import React from 'react'
import { baseConnect } from '../../baseConnect'
import { DoneCancelRow } from '../../ui/DoneCancelRow'
import { MoneyInputRow } from '../../ui/MoneyInputRow'
import { MyDialog } from '../../ui/MyDialog'
import { MyTagsInput } from '../../ui/MyTagsInput'
import { RNView } from '../../ui/RNUI'
import { RNText } from '../../ui/RNUI'
import { strings } from '../../localization'
import { dayPeriodStr } from '../../utils/dateUtils'
import {
  editTransactionOnAddTransactionAmountChangedAC,
  editTransactionOnAddTransactionCancelBtnPressAC,
  editTransactionOnAddTransactionConfirmBPAC, editTransactionOnAddTransactionTagsChangedAC,
  editTransactionOnAddTransactionTagsTextChangedAC, editTransactionOnCurrencyPressAC,
  editTransactionOnDatePressAC,
} from './editTransactionDialogsAC'
import { editTransactionDialogsModuleId } from './editTransactionDialogsModuleId'

import type { BaseVP } from '../../base.flow'
import type { EditTransactionDialogState, TransactionDialogViewFactoryProps } from './flowTypes'

const
  transactionDialogViewFactory = <CS>(props: TransactionDialogViewFactoryProps<CS>) => {
    const
      {
        DirectionComponent,
        inputIcon,
        transactionType,
      } = props,

      Content = ({ state, dispatch }: BaseVP<EditTransactionDialogState<any>>) => {
        const {
            transactionAmount,
            currencyCode,
            tags,
            comment,
          } = state,
          doneCancelProps = {
            onDone: () => dispatch(editTransactionOnAddTransactionConfirmBPAC()),
            onCancel: () => dispatch(editTransactionOnAddTransactionCancelBtnPressAC()),
          }

        return (
          <MyDialog
            opened={state.opened}
            modalDidClose={() => dispatch(editTransactionOnAddTransactionCancelBtnPressAC())}
          >
            <RNView>
              <RNText
                style={{ textAlign: 'center' }}
                onPress={() => dispatch(editTransactionOnDatePressAC())}
              >
                {dayPeriodStr(state.date)}
              </RNText>
              <MoneyInputRow
                onChange={(v) => dispatch(editTransactionOnAddTransactionAmountChangedAC(v))}
                amount={transactionAmount}
                onCurrencyPress={() => dispatch(editTransactionOnCurrencyPressAC())}
                currencyCode={currencyCode}
                icon={inputIcon}
                placeholder={strings.enterAmount}
              />
              <DirectionComponent state={state} dispatch={dispatch}/>
              <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MyTagsInput
                  tags={tags}
                  comment={comment}
                  onChange={(v) => dispatch(editTransactionOnAddTransactionTagsChangedAC(v))}
                  onTextChange={
                    (v) => dispatch(editTransactionOnAddTransactionTagsTextChangedAC(v))
                  }
                />
              </RNView>
              <DoneCancelRow {...doneCancelProps} />
            </RNView>
          </MyDialog>
        )
      },
      view = baseConnect(
        (as): EditTransactionDialogState<any> => as[editTransactionDialogsModuleId][transactionType],
        Content,
      )

    return view
  }

export {
  transactionDialogViewFactory,
}
