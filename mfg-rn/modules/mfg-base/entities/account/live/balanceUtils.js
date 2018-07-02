/* @flow */

import type { CurrencyCode } from '../../../const'
import type { Balance } from './flowTypes'

const
  changeBalance = op => (balance: Balance, currencyCode: CurrencyCode, value: number) => {
    if (!balance[currencyCode]) {
      balance[currencyCode] = 0 // eslint-disable-line no-param-reassign
    }

    balance[currencyCode] = op(balance[currencyCode], value) // eslint-disable-line
    return balance
  },
  incBalance = changeBalance((balance, value) => balance + value),
  decBalance = changeBalance((balance, value) => balance - value)

export {
  incBalance,
  decBalance,
}
