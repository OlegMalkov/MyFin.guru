/* @flow */

import type { CurrencyCode } from '../../const'
import type { CurrenciesModule } from '../currencies/currenciesModuleReducer';
import type { Balance } from './live/flowTypes';
import { keys } from '../../utils/utils';

export const
  changeCurrency = (fromCurrency: CurrencyCode,
                    toCurrency: CurrencyCode,
                    value: number,
                    currencies: CurrenciesModule) => {
    return (value * currencies.computed.liveRates[fromCurrency])
      / currencies.computed.liveRates[toCurrency]
  },
  balanceToAnotherCurrencyBalance = (targetCurrencyCode: CurrencyCode,
                                     balance: Balance,
                                     currencies: CurrenciesModule) => {
    const
      finalBalance = { [targetCurrencyCode]: 0 }

    keys(balance).forEach((currencyCode: CurrencyCode) => {
      finalBalance[targetCurrencyCode] +=
        changeCurrency(currencyCode, targetCurrencyCode, balance[currencyCode], currencies)
    })

    return finalBalance;
  },
  balanceToMainCurrencyBalance = (balance: Balance, currencies: CurrenciesModule) => {
    return balanceToAnotherCurrencyBalance(currencies.deps.mainCurrencyCode, balance, currencies);
  },
  balanceToMainCurrency = (balance: Balance, currencies: CurrenciesModule) =>
    balanceToMainCurrencyBalance(balance, currencies)[currencies.deps.mainCurrencyCode],
  balanceToAnotherCurrency = (targetCurrencyCode: CurrencyCode,
                              balance: Balance,
                              currencies: CurrenciesModule) =>
    balanceToAnotherCurrencyBalance(targetCurrencyCode, balance, currencies)[targetCurrencyCode]
