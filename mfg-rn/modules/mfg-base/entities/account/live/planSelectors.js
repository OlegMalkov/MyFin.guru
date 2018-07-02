/* @flow */

import type { MapV } from 'mfg-base/global.flow'
import { __undef } from '../../../const'
import type { CategoryId, CurrencyCode, MyDate, PeriodType, UID, Undefined } from '../../../const'
import { setBeginOfCurrentYear, setBeginOfNextMonth } from '../../../utils/dateUtils'
import type { CurrenciesModule } from '../../currencies/currenciesModuleReducer'
import type {
  Categories, PlannedTransaction, PlannedTransactions,
  Plans,
} from './flowTypes'
import { year } from './periodKinds'
import { uidIsDef, uidIsUndef } from './utils'
import {
  groupBy, ifDefined, isEmptyOrUndef, keys, last, mapObjIndexed, pipe, range,
  values,
} from '../../../utils/utils'
import { changeCurrency } from '../utils'
import { _categoriesChildrenMapSelector } from './categoriesSelectors'
import { memoMaxOneArgs1 } from '../../../utils/memo'

type GetPlanFilterProps = {|
  period: string,
  uid: UID,
  currencyCode: CurrencyCode,
  periodType: PeriodType
|}

export type EffectiveSince = MyDate | Undefined

type CurrentPeriodPlan = {
  [categoryId: CategoryId]: {
    [uid: UID]: {
      amount: number,
      effectiveSince: EffectiveSince,
    }
  }
}

type CurrentPeriodPlanYear = {
  [categoryId: CategoryId]: {
    [uid: UID]: {
      amount: number,
      effectiveSince: EffectiveSince,
    }
  }
}

const
  _makePlannedTransactionFilterPredicate = (period: string, userId: UID) =>
    (t: PlannedTransaction) => {
      const
        { startDate, repeatEveryMonth, endDate, deletedPeriods, uid } = t,
        periodIsDeleted = (deletedPeriods && deletedPeriods[period])

      if (periodIsDeleted) {
        return false
      }

      return (
        (uidIsUndef(userId) || userId === uid) &&
        (
          startDate === period ||
          (
            startDate < period && repeatEveryMonth
            && (!endDate || endDate > period)
          )
        )
      )
    },
  _makeApplyEffectivePlanTransactionOverridePeriods = (period: string) =>
    (t: PlannedTransaction) => {
      if (t.overriddenPeriods && t.overriddenPeriods[period]) {
        const overrideRecord = t.overriddenPeriods[period]
        return {
          ...t,
          amount: overrideRecord.amount || t.amount,
          comment: ifDefined(overrideRecord.comment, t.comment),
          tags: overrideRecord.tags || t.tags,
          day: overrideRecord.day || t.day,
        }
      }
      return t
    },
  getEffectivePlanTransactionsByUid = ({ plannedTransactions, period }) => {
    const
      filterPredicate = _makePlannedTransactionFilterPredicate(period, __undef),
      mapper = _makeApplyEffectivePlanTransactionOverridePeriods(period),
      effectivePlanTransactions = plannedTransactions.filter(filterPredicate)
        .map(mapper)

    return groupBy(({ uid }) => uid)(effectivePlanTransactions)
  },
  getEffectivePlanData = ({ planPeriods, period, userPlan }) => {
    let
      effectivePlanEntry,
      effectivePlanPeriod

    for (let i = planPeriods.length - 1; i >= 0; i -= 1) {
      const
        currentPeriod = planPeriods[i]

      if (currentPeriod < period) {
        const
          currentPeriodEntry = userPlan[currentPeriod]

        if (currentPeriodEntry.repeatEveryMonth) {
          effectivePlanEntry = currentPeriodEntry
          effectivePlanPeriod = currentPeriod
          break
        }
      }
    }

    return {
      effectivePlanPeriod,
      effectivePlanEntry,
    }
  },
  getEffectivePlanTransactionsDataByUid = ({
    plannedTransactionsByCategoryId,
    period,
    categoryId,
    currencyCode,
    currencies,
  }): MapV<{ amount: number, effectiveSince: string | null, type: 'detailed' }> => {
    if (!plannedTransactionsByCategoryId[categoryId]) {
      return {}
    }

    const
      plannedTransactions = plannedTransactionsByCategoryId[categoryId] || [],

      effectivePlanTransactionsByUid = getEffectivePlanTransactionsByUid({
        plannedTransactions,
        period,
      })

    return mapObjIndexed(
      (effectivePlanTransactions) => effectivePlanTransactions.reduce(
        ({ amount, effectiveSince, type }, t) => {
          const diff = changeCurrency(t.currencyCode, currencyCode, t.amount, currencies)
          return {
            amount: amount + diff,
            /* TODO 2 MFG-9 effectiveSince does not make sense in context of sum of planned
            * transactions */
            effectiveSince,
            type,
          }
        }, {
          amount: 0,
          effectiveSince: null,
          type: 'detailed',
        }))(effectivePlanTransactionsByUid)
  },
  getPlanForMonthPeriod = ({
    categories,
    plannedTransactionsByCategoryId,
    currencies,
    plans,
    currencyCode,
    period,
  }) => {
    return Object.keys(categories)
      .reduce(
        (catMap, categoryId) => {
          if (!plans[categoryId] && !plannedTransactionsByCategoryId[categoryId]) {
            return catMap
          }

          const
            categoryPlan = plans[categoryId] || {},
            effectivePlanTransactionsDataByUid = getEffectivePlanTransactionsDataByUid({
              plannedTransactionsByCategoryId,
              period,
              categoryId,
              currencyCode,
              currencies,
            })


          catMap[categoryId] = Object.keys(categoryPlan)
            .reduce(
              (userMap, userId) => { // eslint-disable-line no-param-reassign
                const
                  userPlan = categoryPlan[userId],
                  planPeriods = Object.keys(userPlan),
                  {
                    effectivePlanPeriod,
                    effectivePlanEntry: epe,
                  } = getEffectivePlanData({ planPeriods, userPlan, period }),
                  effectivePlanTransactionsDataAmount = effectivePlanTransactionsDataByUid[userId] ?
                    effectivePlanTransactionsDataByUid[userId].amount : 0,
                  effectivePlanEntry = userPlan[period] || epe

                if (effectivePlanEntry && !effectivePlanTransactionsDataAmount) {
                  userMap[userId] = {
                    amount: changeCurrency(
                      effectivePlanEntry.currencyCode,
                      currencyCode,
                      effectivePlanEntry.amount,
                      currencies,
                    ),
                    effectiveSince: userPlan[period] ? period : effectivePlanPeriod,
                    type: 'basic',
                  }
                }

                return userMap
              }, effectivePlanTransactionsDataByUid)

          return catMap
        },
        {},
      )
  },
  getPeriodPlan = (categories: Categories,
    plans: Plans = {},
    plannedTransactions: PlannedTransactions = {},
    currencies: CurrenciesModule,
    { period, periodType, currencyCode }): CurrentPeriodPlan => {
    const
      plannedTransactionsByCategoryId =
        _plannedTransactionsByCategorySelector(plannedTransactions)

    if (periodType === year) {
      const
        beginOfTheYearPeriod = setBeginOfCurrentYear(period),
        allPeriods = range(0, 11)
          .reduce((acc) => {
            return [...acc, setBeginOfNextMonth(last(acc))]
          }, [beginOfTheYearPeriod]),
        allPeriodsPlans = allPeriods.map(p => {
          return getPlanForMonthPeriod({
            categories,
            plannedTransactionsByCategoryId,
            currencies,
            plans,
            currencyCode,
            period: p,
          })
        }),
        totalPlan = allPeriodsPlans.reduce(
          (acc: CurrentPeriodPlanYear, plan: CurrentPeriodPlan) => {
            keys(plan)
              .forEach(categoryId => {
                if (!acc[categoryId]) {
                  acc[categoryId] = {}
                }
                keys(plan[categoryId])
                  .forEach(uid => {
                    if (!acc[categoryId][uid]) {
                      acc[categoryId][uid] = { amount: 0, effectiveSince: __undef }
                    }
                    acc[categoryId][uid].amount += plan[categoryId][uid].amount
                  })
              })
            return acc
          }, {})
      return totalPlan
    }

    return getPlanForMonthPeriod({
      categories,
      plannedTransactionsByCategoryId,
      currencies,
      plans,
      currencyCode,
      period,
    })
  },

  _getPlan = (categories: Categories,
    plans: Plans,
    plannedTransactions: PlannedTransactions,
    currencies: CurrenciesModule,
    { period, uid, currencyCode, periodType }: GetPlanFilterProps) => {
    const
      currentPeriodPlan = getPeriodPlan(categories, plans, plannedTransactions, currencies, {
        period,
        periodType,
        currencyCode,
      }),
      categoriesChildrenMap = _categoriesChildrenMapSelector(categories)

    return pipe(
      mapObjIndexed(categoryUsersPlan => {
        if (uidIsDef(uid)) {
          return categoryUsersPlan[uid] || { amount: 0, effectiveSince: __undef }
        }
        return Object.keys(categoryUsersPlan)
          .reduce((acc, userId) => {
            acc.amount += categoryUsersPlan[userId].amount || 0
            acc.effectiveSince = isEmptyOrUndef(acc.effectiveSince) ?
              categoryUsersPlan[userId].effectiveSince || __undef : acc.effectiveSince

            return acc
          }, { amount: 0, effectiveSince: __undef })
      }),
      mapObjIndexed((planSum, catId, allPlanSums) => {
        const
          childrenForCategory = categoriesChildrenMap[catId] || [],
          childrenSum = childrenForCategory.reduce((acc, childCatId) => {
            acc.amount += allPlanSums[childCatId].amount || 0
            acc.effectiveSince = isEmptyOrUndef(acc.effectiveSince) ?
              allPlanSums[childCatId].effectiveSince || __undef : acc.effectiveSince
            return acc
          }, { amount: 0, effectiveSince: __undef })

        if (childrenSum.amount > planSum.amount) {
          return childrenSum
        }

        return planSum
      }),
    )(currentPeriodPlan)
  }

type GetPlanProps = {|
  categories: Categories,
  plans: Plans,
  plannedTransactions: PlannedTransactions,
  currenciesModule: CurrenciesModule,
  props: GetPlanFilterProps
|}

const
  getPlan = ({
    categories,
    plans,
    plannedTransactions,
    currenciesModule,
    props,
  }: GetPlanProps) => {
    return _getPlan(
      categories,
      plans,
      plannedTransactions,
      currenciesModule,
      props,
    )
  },
  _plannedTransactionsByCategorySelector = memoMaxOneArgs1(
    (plannedTransactions: PlannedTransactions) => pipe(
      values,
      groupBy(({ categoryId }) => categoryId),
    )(plannedTransactions),
  )

export {
  getPlan,
  _getPlan,
  _plannedTransactionsByCategorySelector,
  _makePlannedTransactionFilterPredicate,
  _makeApplyEffectivePlanTransactionOverridePeriods,
}
