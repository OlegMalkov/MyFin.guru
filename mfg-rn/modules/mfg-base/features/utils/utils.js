/* @flow */

/* eslint-disable max-len */

import moment from 'moment';
import { currencyReferenceMap } from '../../entities/currencies/currencyReferenceMap'
import { toZoneLessDateTime } from '../../utils/dateUtils'
import { calcMoneySeparatorsCount } from '../../utils/format'
import { keys } from '../../utils/utils'

import type { Balance } from '../../entities/account/live/flowTypes'
import type { ZoneLessDateTime } from '../../global.flow'

export const
  // ex: "1 000 AED & 50USD & 20RUB"
  parseBalanceStr = (balanceStr: string) => {
    const
      balance: Balance = balanceStr
        .split('&')
        .map(s => s.trim())
        .reduce((acc, str) => {
          const moneySeparatorsCount = calcMoneySeparatorsCount(str)
          if (moneySeparatorsCount > 1) {
            throw Error(`Failed to parse balance string: "${balanceStr}" more than one money separator found`)
          }

          const
            amount = parseFloat(str.substring(0, str.length - 3).replace(/ /g, '')),
            currencyCode = str.substring(str.length - 3)

          if (!currencyReferenceMap.hasOwnProperty(currencyCode)) {
            throw Error(`Failed to parse balance string: "${balanceStr}". Invalid currency code ${currencyCode}`)
          }

          acc[currencyCode] = parseInt(amount * 100)

          return acc
        }, {})

    return balance
  },
  parseAmountStr = (amountStr: string) => {
    const
      balance: Balance = parseBalanceStr(amountStr),
      currencyCodes = keys(balance)

    if (currencyCodes.length > 1) {
      throw Error(`Failed to parse amount string: "${amountStr}". Found more than one currency`)
    }
    if (currencyCodes.length === 0) {
      throw Error(`Failed to parse amount string: "${amountStr}". No currency found`)
    }

    const currencyCode = currencyCodes[0]

    return { amount: balance[currencyCode], currencyCode }
  },
  parseDateTimeStr = (dateTimeStr: string): ZoneLessDateTime => {
    const m = moment(dateTimeStr, 'DD.MM.YYYY hh:mm')
    if (m.toString === 'Invalid date') {
      throw new Error(`Failed to parse dateTimeStr: "${dateTimeStr}"`)
    }
    return toZoneLessDateTime(m.valueOf())
  },
  parseDateStr = (dateTimeStr: string): ZoneLessDateTime => {
    const m = moment(dateTimeStr, 'DD.MM.YYYY')
    if (m.toString === 'Invalid date') {
      throw new Error(`Failed to parse dateTimeStr: "${dateTimeStr}"`)
    }
    return toZoneLessDateTime(m.valueOf())
  }
