/* @flow */

import React from 'react'
import { MyDialog } from 'mfg-base/ui/MyDialog'
import { RNText, RNNoChildView, RNTouchableHighlight, RNView } from 'mfg-base/ui/RNUI'
import { DoneCancelRow } from 'mfg-base/ui/DoneCancelRow'
import { ifDefined } from 'mfg-base/utils/utils'
import {
  planCategoryAddPlannedTransactionPressAC,
  planCategoryDeletePressedAC,
  planCategoryAmountChangedAC,
  planCategoryDialogCancelBPAC,
  planCategoryDialogConfirmBtnPressAC,
  planCategoryPlannedTransactionPressedAC,
  planCategoryRepeatEveryMonthPressedAC,
  planCategoryCurrencyPressedAC,
  planCategoryExtendedPlanPressedAC,
} from './planCategoryDialogAC'
import { monthPeriodStr } from 'mfg-base/utils/dateUtils'
import { MoneyInputRow } from 'mfg-base/ui/MoneyInputRow'
import { ToggleIcon } from 'mfg-base/ui/ToggleIcon'
import { MyButton } from 'mfg-base/ui/Button'
import { ListView } from 'mfg-base/ui/ListView'

import { toMoney } from 'mfg-base/utils/format'
import { planCategoryDialogModes } from './planCategoryDialogReducer'
import { dayToString, strings } from 'mfg-base/localization'

import type { PlanModuleDispatch } from '../plan.flow'
import type { PlannedTransactionWrapper } from './flowTypes'
import type { PlanCategoryDialogState } from './planCategoryDialogReducer'

type Props = {|
  state: PlanCategoryDialogState,
  dispatch: PlanModuleDispatch,
|}

export type PlannedTransactionRowProps = {|
  type: 'add-button'
|} | PlannedTransactionWrapper

const
  renderPlannedTransactionRow = ({ categoryType, dispatch }) => {
    return (props: PlannedTransactionRowProps) => {
      if (props.type === 'add-button') {
        const label = categoryType === 'expense' ?
          strings.addPlannedExpenseTransaction : strings.addPlannedIncomeTransaction
        return (
          <RNView>
            <MyButton
              icon={{ name: 'add' }}
              title={label}
              onPress={() => dispatch(planCategoryAddPlannedTransactionPressAC())}
            />
          </RNView>
        )
      }

      if (props.type === 'transaction') {
        const {
            transaction: {
              id,
              amount,
              day,
              repeatEveryMonth,
              comment,
              tags,
              currencyCode,
            },
          } = props,
          title = ifDefined(comment, (tags || [])[0])

        return (
          <RNTouchableHighlight
            onPress={() => dispatch(planCategoryPlannedTransactionPressedAC(id))}
            underlayColor="lightgray"
          >
            <RNView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
              }}
            >
              <RNText style={{ flex: 1 }} ellipsizeMode="tail">{title}</RNText>
              <RNText style={{ marginLeft: 5 }}>
                {toMoney(amount / 100)} {currencyCode}
              </RNText>
              <RNText
                style={{
                  marginLeft: 5,
                  width: 65,
                  textAlign: 'right',
                }}
              >
                {dayToString(day)}
              </RNText>
              <ToggleIcon active={repeatEveryMonth} icon={'repeat'}/>
            </RNView>
          </RNTouchableHighlight>
        )
      }

      return <RNNoChildView/>
    }
  },
  PlanCategoryDialog = ({ state, dispatch }: Props) => {
    const
      doneCancelProps = {
        onDone: () => dispatch(planCategoryDialogConfirmBtnPressAC()),
        onCancel: () => dispatch(planCategoryDialogCancelBPAC()),
      },
      {
        repeatEveryMonth,
        amount,
        currencyCode,
        effectiveSince,
        effectiveAmount,
        computed: { periodStr, title, mode, plannedTransactions, totalAmount },
        categoryId,
        deps: {
          categories,
          mainCurrencyCode,
        },
      } = state,
      categoryType = categories[categoryId] ? categories[categoryId].type : 'expense',

      data: Array<PlannedTransactionRowProps> = [
        ...plannedTransactions,
        { type: 'add-button' },
      ]

    return (
      <MyDialog opened={state.opened} disableOnBackPress>
        <RNView>
          <RNView style={{ flexDirection: 'row' }}>
            <RNView style={{ flex: 1 }}>
              <RNText>{periodStr}</RNText>
              <RNText>{title}</RNText>
              {
                (effectiveSince && mode === planCategoryDialogModes.simple) && (
                  <RNView style={{ flex: 1 }}>
                    <RNText>
                      {
                        strings.formatString(
                          strings.effectiveSince,
                          monthPeriodStr(effectiveSince),
                          toMoney(effectiveAmount / 100),
                          currencyCode,
                        )
                      }
                    </RNText>
                  </RNView>
                )
              }
            </RNView>
            {
              mode === planCategoryDialogModes.simple && (
                <RNView style={{ flexDirection: 'row', justifyContent: 'space-around', width: 80 }}>
                  {
                    state.computed.canDelete && (
                      <ToggleIcon
                        active
                        onPress={() => dispatch(planCategoryDeletePressedAC())}
                        icon="delete-forever"
                      />
                    )
                  }
                  <ToggleIcon
                    onPress={() => dispatch(planCategoryRepeatEveryMonthPressedAC())}
                    active={repeatEveryMonth}
                    icon={'repeat'}
                  />
                </RNView>
              )
            }
            {
              mode === planCategoryDialogModes.extended && (
                <RNView style={{ flexDirection: 'row', justifyContent: 'space-around', width: 30 }}>
                  <ToggleIcon
                    onPress={() => dispatch(planCategoryDialogCancelBPAC())}
                    active
                    icon={'close'}
                  />
                </RNView>
              )
            }
          </RNView>
          {
            mode === planCategoryDialogModes.simple && (
              <RNView>
                <MoneyInputRow
                  onChange={(amount) => dispatch(planCategoryAmountChangedAC(amount))}
                  onCurrencyPress={() => dispatch(planCategoryCurrencyPressedAC())}
                  amount={amount}
                  currencyCode={currencyCode}
                  autoFocus={false}
                  placeholder={strings.enterAmount}
                />
                <DoneCancelRow {...doneCancelProps} />
                <MyButton
                  icon={{ name: 'format-list-numbered' }}
                  title={strings.extended}
                  onPress={() => dispatch(planCategoryExtendedPlanPressedAC())}
                />
              </RNView>
            )
          }
          {
            mode === planCategoryDialogModes.extended && (
              <RNView>
                <RNText
                  style={{
                    margin: 10,
                    fontSize: 16,
                  }}
                >
                  {toMoney(totalAmount)} {mainCurrencyCode}
                </RNText>
                <RNText
                  style={{
                    margin: 10,
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  {strings.plannedTransactions}
                </RNText>
                <RNView style={{ height: state.deps.windowHeight - 250 }}>
                  <ListView
                    data={data}
                    renderRow={renderPlannedTransactionRow({ categoryType, dispatch })}
                  />
                </RNView>
              </RNView>
            )
          }
        </RNView>
      </MyDialog>
    )
  }

export {
  PlanCategoryDialog,
}
