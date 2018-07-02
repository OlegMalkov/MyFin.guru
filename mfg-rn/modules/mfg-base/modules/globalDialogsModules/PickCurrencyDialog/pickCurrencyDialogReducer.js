/* @flow */

import { __undef, date0 } from '../../../const'
import {
  archivedTransactionsBalanceReducer,
} from '../../../entities/account/live/parts/archivedTransactionsBalanceReducer'
import {
  mainCurrencyCodeReducer,
} from '../../../entities/account/live/parts/mainCurrencyCodeReducer'
import { storagesReducer } from '../../../entities/account/live/parts/storagesReducer'
import { transactionsReducer } from '../../../entities/account/live/parts/transactionsReducer'
import { totalRemainsInStoragesSelector } from '../../../entities/account/live/storagesSelectors'
import { changeCurrency } from '../../../entities/account/utils'
import { currenciesModuleReducer } from '../../../entities/currencies/currenciesModuleReducer'
import { currenciesSearch } from '../../../entities/currencies/currenciesSearch'
import { currencyReferenceMap } from '../../../entities/currencies/currencyReferenceMap'
import { personalDataReducer } from '../../../entities/personalData/personalDataReducer'
import { windowHeightReducer } from '../../../rn/windowDimensionsReducer'
import { getReducerInitialState } from '../../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../../utils/makeReducer'
import {
  isEven,
  keys, makeInitComputer, makeUpdateDepsReducer, mapObjIndexed, pipe, sort, updateChild,
  us,
} from '../../../utils/utils'
import { nowReducer } from '../../../modules/nowModule/nowReducer'
import {
  OPEN_PICK_CURRENCY_DIALOG,
  PICK_CURRENCY_DIALOG_CANCEL,
  PICK_CURRENCY_DIALOG_DONE, PICK_CURRENCY_DIALOG_CURRENCY_PRESSED,
  PICK_CURRENCY_DIALOG_SEARCH_CHANGED,
} from './pickCurrencyDialogAC'
import { pickCurrencyDialogModuleId } from './pickCurrencyDialogModuleId'

import type { BaseComputer, BaseReducer } from '../../../base.flow'
import type { PersonalData } from '../../../entities/personalData/personalData.flow'
import type { Now } from '../../nowModule/nowReducer'
import type { CurrenciesModule } from '../../../entities/currencies/currenciesModuleReducer'
import type { SearchRecord } from '../../../entities/currencies/currenciesSearch'
import type { CurrencyCode } from '../../../const'
import type {
  ArchivedTransactionsBalance, Storages, Transactions,
} from '../../../entities/account/live/flowTypes'
import type { CurrencyData } from './flowTypes'

type Deps = {|
  mainCurrencyCode: CurrencyCode,
  storages: Storages,
  archivedTransactionsBalance: ArchivedTransactionsBalance,
  personalData: PersonalData,
  currencies: CurrenciesModule,
  transactions: Transactions,
  now: Now,
  windowHeight: number,
|}

export type CurrencyRenderProps = {|
  courseString: string,
  isEven: bool,
  countryName: string,
  currencyCode: CurrencyCode,
  name: string,
  isMajor: bool,
|}

type Computed = {|
  currencies: Array<CurrencyRenderProps>,
|}

export type PickCurrencyDialogState = {|
  callerId: string,
  blacklist: Array<CurrencyCode>,
  search: string,
  computed: Computed,
  invertedRates: { [currencyCode: CurrencyCode]: bool },
  deps: Deps,
  opened: bool,
|}

const
  UnreachableNumber = 1000000000000000,
  toCurrencyRow = (s: PickCurrencyDialogState, currencyData: CurrencyData): CurrencyRenderProps => {
    const
      { deps: { mainCurrencyCode }, invertedRates } = s,
      { currencyCode, name, course, index, isMajor } = currencyData,
      directCourse = Math.round(course * 10000) / 10000,
      reverseCourse = Math.round((1 / course) * 10000) / 10000,
      defaultCourseString = `1 ${currencyCode} = ${directCourse} ${mainCurrencyCode}`,
      invertedCourseString = `${reverseCourse} ${currencyCode} = 1 ${mainCurrencyCode}`,
      cond = directCourse < 1,
      finalCond = invertedRates[currencyCode] ? !cond : cond

    let finalCourseString = finalCond ? invertedCourseString : defaultCourseString

    if (directCourse === 1) {
      finalCourseString = ''
    }

    return {
      courseString: finalCourseString,
      isEven: isEven(index),
      countryName: currencyData.countryName ? currencyData.countryName : '',
      currencyCode,
      name,
      isMajor,
    }
  },
  compute = (s: PickCurrencyDialogState): Computed => {
    const
      {
        deps: {
          currencies: { computed: { liveRates } },
          personalData: { preferences: { majorCurrencies } },
          storages,
          archivedTransactionsBalance,
          currencies,
          mainCurrencyCode,
          transactions,
          now,
        },
      } = s,
      totalRemains = totalRemainsInStoragesSelector(
        transactions,
        storages,
        archivedTransactionsBalance,
        {
          fromTimestamp: date0,
          toTimestamp: now,
          uid: __undef,
        },
      ),
      currencyWeightMap = pipe(
        mapObjIndexed((currencyRef, currencyCode) => {
          let total = 0
          if (currencyCode === mainCurrencyCode) {
            total = UnreachableNumber - 1
          } else {
            const value = totalRemains[currencyCode] || 0
            total = changeCurrency(currencyCode, mainCurrencyCode, value, currencies)
          }
          if (majorCurrencies[currencyCode] === true) {
            total += UnreachableNumber
          }
          // last updated timestamp
          if (majorCurrencies[currencyCode] !== true && majorCurrencies[currencyCode] > 0) {
            total += majorCurrencies[currencyCode] / 1000000000
          }
          return total
        }),
      )(currencyReferenceMap),
      sortCurrencies = arr => sort((v1, v2) => {
        const
          v1Weight = currencyWeightMap[v1.currencyCode] || -UnreachableNumber,
          v2Weight = currencyWeightMap[v2.currencyCode] || -UnreachableNumber

        return v2Weight - v1Weight
      }, arr)

    let currenciesData
    if (s.search) {
      const existMap = {}
      currenciesData = pipe(
        arr => arr.map(
          (record: SearchRecord, index: number) => {
            const
              { currencyCode } = record,
              [, , name] = currencyReferenceMap[currencyCode],
              course = liveRates[currencyCode],
              isMajor = majorCurrencies[currencyCode] === true

            if (record.type === 'currency') {
              return { type: 'currency', currencyCode, name, course, index, isMajor }
            } else if (record.type === 'country') {
              const { countryName, emoji } = record
              return {
                type: 'country',
                currencyCode,
                name,
                course,
                countryName,
                emoji,
                index,
                isMajor,
              }
            }
            throw new Error(`unknown record type: ${record.type}`)
          },
        ),
        o => o.filter(({ currencyCode }) => {
          if (existMap[currencyCode]) {
            return false
          }
          existMap[currencyCode] = true
          return true
        }),
      )(currenciesSearch(s.search))
    } else {
      currenciesData = pipe(
        keys,
        k => k.map((currencyCode: CurrencyCode, index) => {
          const
            [, , name] = currencyReferenceMap[currencyCode],
            { deps: { currencies: { computed: { liveRates } } } } = s
          return {
            type: 'currency',
            currencyCode,
            name,
            course: liveRates[currencyCode],
            index,
            isMajor: majorCurrencies[currencyCode] === true,
          }
        }),
        sortCurrencies,
      )(currencyReferenceMap)
    }
    return { currencies: currenciesData.map(c => toCurrencyRow(s, c)) }
  },
  initComputer: BaseComputer<PickCurrencyDialogState> = makeInitComputer(compute),
  depsInitialState: Deps = {
    mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    archivedTransactionsBalance: getReducerInitialState(archivedTransactionsBalanceReducer),
    storages: getReducerInitialState(storagesReducer),
    personalData: getReducerInitialState(personalDataReducer),
    currencies: getReducerInitialState(currenciesModuleReducer),
    transactions: getReducerInitialState(transactionsReducer),
    now: getReducerInitialState(nowReducer),
    windowHeight: getReducerInitialState(windowHeightReducer),
  },
  initialState: PickCurrencyDialogState = {
    callerId: __undef,
    blacklist: [],
    search: '',
    invertedRates: {},
    computed: {
      currencies: [],
    },
    deps: depsInitialState,
    opened: false,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    mainCurrencyCode: mainCurrencyCodeReducer(s.mainCurrencyCode, a),
    archivedTransactionsBalance:
      archivedTransactionsBalanceReducer(s.archivedTransactionsBalance, a),
    storages: storagesReducer(s.storages, a),
    personalData: personalDataReducer(s.personalData, a),
    currencies: currenciesModuleReducer(s.currencies, a),
    transactions: transactionsReducer(s.transactions, a),
    now: nowReducer(s.now, a),
    windowHeight: windowHeightReducer(s.windowHeight, a),
  })),
  reducer: BaseReducer<PickCurrencyDialogState> = (s = initialState, a) => {
    return pipe(
      s => {
        if (a.type === OPEN_PICK_CURRENCY_DIALOG) {
          const
            { callerId, blacklist } = a,
            { search, computed, invertedRates } = initialState,
            { deps } = s

          return {
            callerId,
            blacklist,
            search,
            invertedRates,
            computed,
            deps,
            opened: true,
          }
        }

        if (a.type === PICK_CURRENCY_DIALOG_SEARCH_CHANGED) {
          return us(s, a, (s, a) => s.search = a.newText)
        }

        if (a.type === PICK_CURRENCY_DIALOG_CURRENCY_PRESSED) {
          const { currencyCode } = a
          return us(s, a, s => s.invertedRates[currencyCode] = !s.invertedRates[currencyCode])
        }

        if (
          a.type === PICK_CURRENCY_DIALOG_CANCEL
          || a.type === PICK_CURRENCY_DIALOG_DONE
        ) {
          return us(s, a, s => s.opened = false)
        }
        return s
      },
      initComputer(s, a),
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  pickCurrencyDialogReducer: BaseReducer<PickCurrencyDialogState> =
    makeModuleReducer({ reducer, moduleId: pickCurrencyDialogModuleId })

export {
  pickCurrencyDialogReducer,
}
