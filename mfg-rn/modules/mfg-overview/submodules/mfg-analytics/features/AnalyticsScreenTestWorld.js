/* @flow */

import assert from 'assert'
import { BaseTestWorld } from 'mfg-base/features/utils/TestWorld'
import { BaseDriver } from 'mfg-base/features/utils/TestWorld'
import { expenseTransactionType } from 'mfg-base/const'
import { parseAmountStr } from 'mfg-base/features/utils/utils'
import type { AnalyticsModuleDispatch } from '../analytics.flow'
import {
  analyticsScreenDeleteTransactionBPAC,
  analyticsScreenNextPeriodBPAC,
  analyticsScreenPreviousPeriodBPAC, analyticsScreenTransactionPressAC,
  analyticsScreenUserNamePressAC,
} from '../analyticsScreenAC'
import { analyticsScreenModuleId } from '../analyticsScreenModuleId'
import { analyticsModuleRegistry } from '../analyticsModuleRegistry'

import type { AnalyticsScreenState } from '../analyticsScreenReducer'

class AnalyticsScreenDriver extends BaseDriver {
  _baseDispatch: AnalyticsModuleDispatch

  constructor(...args: Array<any>) {
    super(...args)
    /* $FlowFixMe super not works */
    this._baseDispatch = (this._dispatch: any)
  }

  async _getAnalyticsScreenModuleState() {
    const s: AnalyticsScreenState = await super._getModuleState(analyticsScreenModuleId)

    return s
  }

  async analyticsScreenPressPrevPeriodButton() {
    await this._baseDispatch(analyticsScreenPreviousPeriodBPAC())
  }

  async analyticsScreenPressNextPeriodButton() {
    await this._baseDispatch(analyticsScreenNextPeriodBPAC())
  }

  async analyticsScreenPressUserName() {
    await this._baseDispatch(analyticsScreenUserNamePressAC())
  }

  async analyticsScreenPressTransaction(transactionName: string) {
    const
      { computed: { transactionsListProps } } = await this._getAnalyticsScreenModuleState(),
      transactionProps = transactionsListProps.find(({ comment }) => comment === transactionName)

    if (!transactionProps) {
      throw new Error(`Transaction ${transactionName} not found on analytics screen`)
    }
    await this._baseDispatch(analyticsScreenTransactionPressAC(transactionProps.id))
    return transactionProps.id
  }

  async analyticsScreenPressDeleteTransactionButton() {
    await this._baseDispatch(analyticsScreenDeleteTransactionBPAC())
  }

  async analyticsScreenAssertExpenseTransactionVisibleWithFollowingValues({
    transactionTitle,
    storageTitle,
    categoryTitle,
    amountStr,
    dateTimeStr,
    byName,
  }: {|
    transactionTitle: string,
    storageTitle: string,
    categoryTitle: string,
    amountStr: string,
    dateTimeStr: string,
    byName: string
  |}) {
    const
      { computed: { transactionsListProps } } = await this._getAnalyticsScreenModuleState(),
      transaction = transactionsListProps.find(({ comment }) => comment === transactionTitle)

    if (!transaction) {
      throw new Error(`Transaction "${transactionTitle}" not found on analytics screen`)
    }

    assert.equal(transaction.value1Storage, storageTitle, 'Storage should match')
    assert.equal(transaction.value1Type, expenseTransactionType, 'Transaction should be expense')
    assert.equal(transaction.title, categoryTitle, 'Category should match')

    const { amount, currencyCode } = parseAmountStr(amountStr)
    assert.equal(transaction.value1, -amount, 'Amount should match')
    assert.equal(transaction.value1CurrencyCode, currencyCode, 'Amount should match')

    const [date, time] = dateTimeStr.split(' ')
    assert.equal(transaction.date, date, 'Date should match')
    assert.equal(transaction.time, time, 'Time should match')
    assert.equal(transaction.author, byName, 'Author should match')
  }

  async analyticsScreenAssertNoTransactionVisible() {
    const
      { computed: { transactionsListProps } } = await this._getAnalyticsScreenModuleState()

    assert.equal(
      transactionsListProps.length, 0, 'No transactions should be visible on analytics screen',
    )
  }

  async analyticsScreenAssertCurrentDatePeriod(dateStr: string) {
    const
      { computed: { periodSelectorProps: { day, month, year } } } =
        await this._getAnalyticsScreenModuleState(),
      currentDateStr = `${day}.${month}.${year}`

    assert.equal(currentDateStr, dateStr, 'Current date period should match')
  }

  async analyticsScreenAssertUserNameFilter(expectedUserName: string) {
    const
      { computed: { userName } } = await this._getAnalyticsScreenModuleState()

    assert.equal(userName, expectedUserName, 'User name should match')
  }
}

export class AnalyticsScreenTestWorld extends BaseTestWorld {
  driver: AnalyticsScreenDriver

  constructor(ctx: any) {
    super(ctx, AnalyticsScreenDriver, analyticsModuleRegistry, 'Analytics')
  }
}
