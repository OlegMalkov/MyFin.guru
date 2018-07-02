/* @flow */

import React from 'react'

import { ifDefined } from '../utils/utils'
import { RNText, RNView } from './RNUI'
import { TextInput } from './TextInput'
import {
  toMoneyFloatRemoveZeros, toMoney, isMoneySeparator,
  calcMoneySeparatorsCount,
} from '../utils/format'
import { strings } from '../localization'

import type { CurrencyCode } from '../const'

type Props = {|
  onChange: (value: number) => any,
  amount: number,
  onCurrencyPress?: () => any,
  currencyCode: CurrencyCode,
  icon?: string,
  autoFocus?: false,
  showCurrencyCode?: bool,
  placeholder: string,
|}

type State = {|
  value: string
|}

const
  amountNumberToString = (amount: number) => {
    const
      amountStr = (`${amount}`),
      amountFormat = (amountStr.indexOf('.') === -1 && amountStr.indexOf(',') === -1) ?
        toMoney : toMoneyFloatRemoveZeros,
      value = `${(amount && amountFormat(amount)) || ''}`

    return value
  }

class MoneyInputRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { value: amountNumberToString(props.amount) };
    /* $FlowOk */
    this._onChangeText = this._onChangeText.bind(this)
  }

  _onChangeText(text) {
    const
      sanitizedText = calcMoneySeparatorsCount(text) > 1 ? text.slice(0, text.length - 1) : text,
      parser = (sanitizedText.indexOf('.') === -1 && sanitizedText.indexOf(',') === -1) ?
        (s) => parseInt(s, 10) : (s) => parseFloat(s),
      val = parser(sanitizedText.replace(/,/g, '.').replace(/ /g, '')),
      last1IsSeparator = isMoneySeparator(sanitizedText.slice(-1)),
      last2IsSeparator = isMoneySeparator(sanitizedText.slice(-2, -1)),
      last3IsSeparator = isMoneySeparator(sanitizedText.slice(-3, -2)),
      anyOfLast3IsSeparator = last1IsSeparator || last2IsSeparator || last3IsSeparator

    this.setState({ value: anyOfLast3IsSeparator ? sanitizedText : amountNumberToString(val) })
    this.props.onChange(val)
  }

  render() {
    const
      {
        onCurrencyPress,
        currencyCode,
        icon,
        showCurrencyCode = true,
        placeholder,
      } = this.props

    return (
      <RNView
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
        }}
      >
        <RNView
          style={{
            flex: 60,
            height: 60,
          }}
        >
          <TextInput
            icon={icon}
            onChangeText={this._onChangeText}
            keyboardType="numeric"
            value={this.state.value}
            placeholder={ifDefined(placeholder, strings.enterAmount)}
          />
        </RNView>
        {
          showCurrencyCode && (
            <RNView
              style={{ justifyContent: 'center', alignItems: 'center', marginLeft: -10 }}
            >
              <RNText
                style={{ fontSize: 18 }}
                onPress={onCurrencyPress}
              >{ifDefined(currencyCode, 'currency ...')}</RNText>
            </RNView>
          )
        }
      </RNView>
    );
  }
}

export {
  MoneyInputRow,
}
