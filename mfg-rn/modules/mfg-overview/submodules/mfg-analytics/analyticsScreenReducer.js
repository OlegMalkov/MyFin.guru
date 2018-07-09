/* @flow */

import { __undef } from 'mfg-base/const'
import {
  transactionsSelector,
  transactionsToBalance,
} from 'mfg-base/entities/account/live/transactionsSelectors'
import { uidIsDef } from 'mfg-base/entities/account/live/utils'
import { balanceToMainCurrency } from 'mfg-base/entities/account/utils'
import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { strings } from 'mfg-base/localization'
import * as dateUtils from 'mfg-base/utils/dateUtils'
import { setBeginOfCurrentDay, setBeginOfNextDay, setBeginOfPrevDay } from 'mfg-base/utils/dateUtils'
import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer'
import {
  mainCurrencyCodeReducer,
} from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { transactionsReducer } from 'mfg-base/entities/account/live/parts/transactionsReducer'
import { usersReducer } from 'mfg-base/entities/account/live/parts/usersReducer'
import { currenciesModuleReducer } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import * as format from 'mfg-base/utils/format'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import {
  groupBy, isDefined, makeInitComputer,
  makeUpdateDepsReducer, mapObjIndexed, pipe, updateChild,
  us,
} from 'mfg-base/utils/utils'
import {
  DB_DELETE_TRANSACTION_ACTION,
} from 'mfg-base/modules/dbModule/dbAC'

import { nowReducer } from 'mfg-base/modules/nowModule/nowReducer'
import { NOW_SUBSCRIPTION_SYNC } from 'mfg-base/modules/nowModule/nowSubscriptionAC'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule'
import type { BaseComputer } from 'mfg-base/base.flow'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import { allUserNamesMapSelector } from 'mfg-base/selectors'
import type { AnalyticsModuleReducer } from './analytics.flow'
import {
  ANALYTICS_NEXT_PERIOD_BP, ANALYTICS_TRANSACTION_PRESS,
  ANALYTICS_PREVIOUS_PERIOD_BP,
} from './analyticsScreenAC'
import { analyticsScreenModuleId } from './analyticsScreenModuleId'
import { calcTransactionsListProps } from 'mfg-base/ui/TransactionsList/calcTransactionsListProps'

import type { CurrencyCode, MyDate, TransactionId, Undefined } from 'mfg-base/const'
import type {
  Categories, Storages, Transactions,
  Users,
} from 'mfg-base/entities/account/live/flowTypes'
import type { CurrenciesModule } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import type { Now } from 'mfg-base/modules/nowModule/nowReducer'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'
import type { TransactionsListProps } from 'mfg-base/ui/TransactionsList/calcTransactionsListProps'

type Deps = {|
  currenciesModule: CurrenciesModule,
  session: Session,
  personalData: PersonalData,
  isAdmin: bool,
  categories: Categories,
  transactions: Transactions,
  mainCurrencyCode: CurrencyCode,
  users: Users,
  storages: Storages,
  now: Now,
|}

type Computed = {|
  showDeleteTransactionBtn: bool,
  periodSelectorProps: {| day: number, month: number, year: number |},
  userName: string,
  transactionsBalanceByTypeOneCurrency: {
    expense?: string,
    income?: string,
  },
  transactionsCountByType: {
    expense?: number,
    income?: number,
  },
  isAdmin: bool,
  transactionsListProps: TransactionsListProps,
|}

export type AnalyticsScreenState = {|
  periodStartTimestamp: MyDate,
  selectedTransactionId: TransactionId | Undefined,
  deps: Deps,
  computed: Computed,
|}

const
  nowInitialState = getReducerInitialState(nowReducer),
  depsInitialState: Deps = {
    currenciesModule: getReducerInitialState(currenciesModuleReducer),
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
    categories: getReducerInitialState(categoriesReducer),
    transactions: getReducerInitialState(transactionsReducer),
    mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
    users: getReducerInitialState(usersReducer),
    storages: getReducerInitialState(storagesReducer),
    isAdmin: getReducerInitialState(isAdminReducer),
    now: nowInitialState,
  },
  computedInitialState: Computed = {
    showDeleteTransactionBtn: false,
    periodSelectorProps: { day: 1, month: 1, year: 2000 },
    userName: __undef,
    transactionsBalanceByTypeOneCurrency: {
      expense: __undef,
      income: __undef,
    },
    transactionsCountByType: {
      expense: 0,
      income: 0,
    },
    isAdmin: false,
    transactionsListProps: [],
  },
  initialState: AnalyticsScreenState = {
    periodStartTimestamp: setBeginOfCurrentDay(nowInitialState),
    selectedTransactionId: __undef,
    deps: depsInitialState,
    computed: computedInitialState,
  },
  depsReducer: AnalyticsModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    currenciesModule: currenciesModuleReducer(s.currenciesModule, a),
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
    categories: categoriesReducer(s.categories, a),
    transactions: transactionsReducer(s.transactions, a),
    mainCurrencyCode: mainCurrencyCodeReducer(s.mainCurrencyCode, a),
    users: usersReducer(s.users, a),
    storages: storagesReducer(s.storages, a),
    isAdmin: isAdminReducer(s.isAdmin, a),
    now: nowReducer(s.now, a),
  })),
  initComputer: BaseComputer<AnalyticsScreenState> = makeInitComputer(
    (s: AnalyticsScreenState): Computed => {
      const
        {
          periodStartTimestamp,
          selectedTransactionId,
          deps: {
            currenciesModule,
            session,
            session: {
              uid,
            },
            personalData,
            personalData: {
              preferences: {
                analyticsSelectedUid,
              },
            },
            isAdmin,
            categories,
            storages,
            transactions,
            mainCurrencyCode,
            users,
          },
        } = s,
        selectedUid = isAdmin ? analyticsSelectedUid : uid,
        periodEndTimestamp = dateUtils.setEndOfCurrentDay(periodStartTimestamp),
        intervalProps = {
          fromTimestamp: periodStartTimestamp,
          toTimestamp: periodEndTimestamp,
          uid: selectedUid,
        },
        filteredTransactions = transactionsSelector(transactions, intervalProps),
        toOneCurrencyStr = (balance) => {
          const val = format.toMoneyFloat(balanceToMainCurrency(balance, currenciesModule) / 100)
          return `${val} ${mainCurrencyCode}`
        },
        transactionsByType = groupBy(({ type }) => type)(filteredTransactions),
        transactionsBalanceByType = mapObjIndexed(transactionsToBalance)(transactionsByType),
        transactionsCountByType = mapObjIndexed(({ length }) => length)(transactionsByType),
        transactionsBalanceByTypeOneCurrency =
          mapObjIndexed(toOneCurrencyStr)(transactionsBalanceByType),
        allUserNamesMap = allUserNamesMapSelector({
          users,
          personalData,
          session,
        })

      return {
        transactionsBalanceByTypeOneCurrency,
        transactionsCountByType,
        isAdmin,
        userName: uidIsDef(selectedUid) ? allUserNamesMap[selectedUid] : strings.allUsers,
        showDeleteTransactionBtn: isDefined(selectedTransactionId),
        periodSelectorProps: {
          day: dateUtils.getDate(periodStartTimestamp),
          month: dateUtils.getMonth(periodStartTimestamp),
          year: dateUtils.getYear(periodStartTimestamp),
        },
        transactionsListProps: calcTransactionsListProps({
          transactions: filteredTransactions,
          storages,
          categories,
          selectedTransactionId,
          selectedUid,
          users,
          personalData,
          session,
        }),
      }
    }),
  reducer: AnalyticsModuleReducer<AnalyticsScreenState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
      s => {
        if (a.type === ANALYTICS_PREVIOUS_PERIOD_BP) {
          return us(s, a,
            s => s.periodStartTimestamp = setBeginOfPrevDay(s.periodStartTimestamp),
          )
        }

        if (a.type === ANALYTICS_NEXT_PERIOD_BP) {
          return us(s, a,
            s => s.periodStartTimestamp = setBeginOfNextDay(s.periodStartTimestamp),
          )
        }

        if (a.type === ANALYTICS_TRANSACTION_PRESS) {
          return us(s, a, (s, a) => s.selectedTransactionId = a.transactionId)
        }

        if (a.type === DB_DELETE_TRANSACTION_ACTION) {
          return us(s, a, s => s.selectedTransactionId = __undef)
        }

        if (
          a.type === NOW_SUBSCRIPTION_SYNC
          && s.periodStartTimestamp === initialState.periodStartTimestamp
        ) {
          return us(s, a, s => s.periodStartTimestamp = setBeginOfCurrentDay(s.deps.now))
        }
        return s
      },
      initComputer(s, a),
    )(s)
  },
  analyticsScreenReducer: AnalyticsModuleReducer<AnalyticsScreenState> =
    makeModuleReducer({ reducer, moduleId: analyticsScreenModuleId })

export {
  analyticsScreenReducer,
}
