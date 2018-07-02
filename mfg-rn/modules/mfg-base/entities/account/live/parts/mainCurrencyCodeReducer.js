/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { CurrencyCode } from '../../../../const'

const
  undefinedCurrencyCode = 'UDF',
  initialState: CurrencyCode = undefinedCurrencyCode

const mainCurrencyCodeReducer: BaseReducer<CurrencyCode> =
  (s = initialState, a) => {
    if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
      return a.liveAccount.mainCurrencyCode || initialState
    }

    if (a.type === DB_LIVE_ACCOUNT_MAIN_CURRENCY_CODE_ARRIVED) {
      return a.value || initialState
    }

    return s
  }

export {
  mainCurrencyCodeReducer,
  undefinedCurrencyCode,
}
