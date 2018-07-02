/* @flow */

import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { currenciesDefaultRates } from './currenciesDefaultRates'
import { SET_CURRENCIES_RATES } from '../../modules/coreModule/coreAC';
import { mapObjIndexed, pipe, updateChild, us } from '../../utils/utils';
import { mainCurrencyCodeReducer } from '../account/live/parts/mainCurrencyCodeReducer';

import type { BaseReducer } from '../../base.flow'
import type { CurrencyCode } from '../../const'

type Deps = {|
  mainCurrencyCode: CurrencyCode,
|}

export type CurrenciesModule = {|
  rates: {|
    live: {
      [currencyCode: CurrencyCode]: number,
    }
  |},
  computed: {|
    liveRates: {
      [currencyCode: CurrencyCode]: number,
    }
  |},
  deps: Deps
|}

const initialState = {
    rates: {
      live: currenciesDefaultRates,
    },
    computed: {
      liveRates: currenciesDefaultRates,
    },
    deps: {
      mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    },
  },
  compute = (s: CurrenciesModule, a) => {
    const
      mainCurrencyCourse = s.rates.live[s.deps.mainCurrencyCode],
      ratesWithRespectToMainCurrency = mapObjIndexed(
        (value) => {
          return mainCurrencyCourse / value
        })(s.rates.live)

    return us(s, a, s => s.computed.liveRates = ratesWithRespectToMainCurrency)
  },
  depsReducer: BaseReducer<Deps> = (s, a) => {
    return pipe(
      s => updateChild(s, a, 'mainCurrencyCode', mainCurrencyCodeReducer),
    )(s)
  },
  currenciesModuleReducer: BaseReducer<CurrenciesModule> = (s = initialState, a) => {
    if (a.type === SET_CURRENCIES_RATES) {
      return us(s, a, (s, a) => s.rates.live = a.rates);
    }

    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
      ns => {
        if (ns !== s) {
          return compute(ns, a)
        }
        return s
      },
    )(s);
  };

export { currenciesModuleReducer };
