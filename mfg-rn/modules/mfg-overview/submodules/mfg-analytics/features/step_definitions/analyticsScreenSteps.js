/* eslint-disable */
/* @flow */

import { myDefineSupportCode } from 'mfg-base/features/utils/myDefineSupportCode'
import {
  makeDbDeleteTransactionPromiseResolve,
  makeDbUpdatePreferencesPromiseResolve,
} from 'mfg-base/features/utils/promiseResolversMakers'
import { AnalyticsScreenTestWorld } from '../AnalyticsScreenTestWorld'

const World: AnalyticsScreenTestWorld = (AnalyticsScreenTestWorld: any)

myDefineSupportCode(
  World,
  ({ Given, When, Then }) => {
    Given(/^I am on Analytics screen$/, async (world) => {
    })

    When(/^I open Analytics screen$/, async (world) => {
    })

    When(/^I press prev period button$/, async (world) => {
      await world.driver.analyticsScreenPressPrevPeriodButton()
    })

    When(/^I press next period button$/, async (world) => {
      await world.driver.analyticsScreenPressNextPeriodButton()
    })

    When(/^I press on current user name$/, async (world) => {
      await world.driver.analyticsScreenPressUserName()
    })

    When(/^I am picking "([^"]*)" as a user filter$/, async (world, option) => {
      await world.driver.analyticsScreenPressUserName()
      const uid = await world.driver.getUidByName(option)
      world.driver.addPromiseResolveConf(
        makeDbUpdatePreferencesPromiseResolve(p => p.analyticsSelectedUid = uid),
      )
      await world.driver.pickUserDialogSelectOption(option)
    })

    When(/^I delete transaction "([^"]*)"$/, async (world, transactionName) => {
      const transactionId = await world.driver.analyticsScreenPressTransaction(transactionName)
      world.driver.addPromiseResolveConf(makeDbDeleteTransactionPromiseResolve(transactionId))
      await world.driver.analyticsScreenPressDeleteTransactionButton()
    })

    Then(
      /^I should see transaction "([^"]*)" from storage "([^"]*)" to category "([^"]*)" with "([^"]*)" from "([^"]*)" by "([^"]*)"$/,
      async (world,
        transactionTitle,
        storageTitle,
        categoryTitle,
        amountStr,
        dateTimeStr,
        byName) => {
        await world.driver.analyticsScreenAssertExpenseTransactionVisibleWithFollowingValues({
          transactionTitle,
          storageTitle,
          categoryTitle,
          amountStr,
          dateTimeStr,
          byName,
        })
      },
    )

    Then(/^I should see current date period is "([^"]*)"$/,
      async (world, dateStr) => {
        await world.driver.analyticsScreenAssertCurrentDatePeriod(dateStr)
      },
    )


    Then(/^I should see that current user filter is "([^"]*)"$/,
      async (world, userName) => {
        await world.driver.analyticsScreenAssertUserNameFilter(userName)
      },
    )

    Then(/^I should not see any transactions$/,
      async (world) => {
        await world.driver.analyticsScreenAssertNoTransactionVisible()
      },
    )
  })
