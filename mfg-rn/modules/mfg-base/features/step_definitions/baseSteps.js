/* eslint-disable */
/* @flow */

import { testEmail, testMainUserUid, testPassword } from '../../test/testData'
import { dbAuthSuccessAC, dbRegisterSuccessAC } from '../../modules/dbModule/dbAC'
import {
  dbAuthEmailPasswordPC,
  dbRegisterEmailPasswordPC,
} from '../../modules/dbModule/dbModulePromiseConfMap'
import { myDefineSupportCode } from '../utils/myDefineSupportCode'
import { asyncStoragePersistSessionPromiseResolve } from '../utils/promiseResolvers'

import type {
  DbAuthEmailPasswordPromiseProps,
  DbRegisterEmailPasswordPromiseProps,
} from '../../modules/dbModule/dbModulePromiseConfMap'
import { BaseTestWorld } from '../utils/TestWorld'
import type { PromiseResolveConf } from '../utils/TestWorld'

const World: BaseTestWorld = (BaseTestWorld: any)
myDefineSupportCode(
  World,
  ({ Given, When, Then }) => {
    Given(/^App started after install$/, async (world) => {
      await world.driver.startAppAfterInstall()
    })

    Given(/^App started after logged in in last session$/, async (world) => {
      await world.driver.startAppAfterUserLoggedInInLastSession()
    })

    Given(/^Account has expense category "([^"]*)" without parent$/,
      async (world, categoryTitle) => {
        await world.driver.addInitialCategory(categoryTitle)
      })

    Given(
      /^Account has storage "([^"]*)" with initial balance "([^"]*)"$/,
      async (world, storageTitle: string, storageInitialBalanceStr: string) => {
        await world.driver.addInitialDebitStorage({ storageTitle, storageInitialBalanceStr })
      },
    )

    Given(
      /^Account has storage "([^"]*)" with initial balance "([^"]*)" which is hidden$/,
      async (world, storageTitle: string, storageInitialBalanceStr: string) => {
        await world.driver.addInitialDebitStorage({
          storageTitle,
          storageInitialBalanceStr,
          hidden: true,
        })
      },
    )

    Given(
      /^Account with expense transaction "([^"]*)" from storage "([^"]*)" to category "([^"]*)" for "([^"]*)" from "([^"]*)"$/,
      async (world, transactionTitle, storageTitle, categoryTitle, amountStr, dateTimeStr) => {
        world.driver.addInitialExpenseTransaction({
          transactionTitle,
          storageTitle,
          categoryTitle,
          amountStr,
          dateTimeStr,
        })
      })

    Given(/^Initial datetime is "([^"]*)"$/, async (world, dateTimeStr) => {
      await world.driver.setInitialDateTime(dateTimeStr)
    })

    When(/^I complete registration process with email and password$/, async (world) => {
      await world.driver.navigateToRegisterPage()

      const
        email = `e2e-${Math.random()}@mail.com`,
        password = testPassword,
        dbRegisterEmailPasswordPromiseResolve: PromiseResolveConf<DbRegisterEmailPasswordPromiseProps> = {
          expectedProps: dbRegisterEmailPasswordPC({ email, password }),
          action: dbRegisterSuccessAC(),
        }

      await world.driver.registerScreenEnterEmail(email)
      await world.driver.registerScreenEnterPassword(password)
      await world.driver.registerScreenEnterRepeatPassword(password)
      world.driver.addPromiseResolveConf(dbRegisterEmailPasswordPromiseResolve)
      await world.driver.registerScreenPressRegisterButton()
    })

    const completeLoginProcess = async (world) => {
      const
        email = testEmail,
        password = testPassword

      await world.driver.loginScreenEnterEmail(testEmail)
      await world.driver.loginScreenEnterPassword(password)
      const dbAuthEmailPasswordPromiseResolve: PromiseResolveConf<DbAuthEmailPasswordPromiseProps> = {
        expectedProps: dbAuthEmailPasswordPC({ email, password }),
        action: dbAuthSuccessAC({ uid: testMainUserUid }),
      }
      world.driver.addPromiseResolveConf(dbAuthEmailPasswordPromiseResolve)
      world.driver.mockLoginPromisesToDefaults()

      world.driver.addPromiseResolveConf(asyncStoragePersistSessionPromiseResolve)
      await world.driver.loginScreenPressLoginButton()
    }
    When(/^I complete login process using email and password of newly created user$/,
      completeLoginProcess)
    When(/^I complete login process using email and password$/, completeLoginProcess)

    Then(/^I should see "([^"]*)" screen$/, async (world, routeName) => {
      await world.driver.assertCurrentScreenName(((routeName: any): string))
    })

    Then(/^I should see, that registration was successful$/, async (world) => {
      await world.driver.registerScreenAssertRegistrationSuccessful()
    })


    /* ---- */
    /* THEN */
    /* ---- */

    Then(
      /^I should see transaction "([^"]*)" from storage "([^"]*)" to category "([^"]*)" with "([^"]*)" amount on data level$/,
      async (world, transactionTitle, storageTitle, categoryTitle, amountStr) => {
        await world.driver.assertExpenseTransactionExistOnDbLayer({
          transactionTitle,
          storageTitle,
          categoryTitle,
          amountStr,
        })
      },
    )

    Then(/^I should see pick user dialog opened with "([^"]*)" and "([^"]*)" options$/,
      async (world, option1, option2) => {
        await world.driver.globalDialogsAssertUserDialogOpened({ options: [option1, option2] })
      },
    )
  })