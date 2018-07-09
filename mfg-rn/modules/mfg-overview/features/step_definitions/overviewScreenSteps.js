/* eslint-disable */
/* @flow */

import { testMainUserUid } from 'mfg-base/test/testData'
import { myDefineSupportCode } from 'mfg-base/features/utils/myDefineSupportCode'
import { __undef } from 'mfg-base/const'
import type {
  AStorage, Category,
  TransactionExpense,
} from 'mfg-base/entities/account/live/flowTypes'
import {
  makeDbUpdateCategoryPromiseResolve,
  makeDbUpdateStorageDonePromiseResolve, makeDbUpdateTransactionPromiseResolve,
  makeUpdateStorageHiddenPromiseResolve,
  makeUtilGenerateGuidPromiseResolve,
} from 'mfg-base/features/utils/promiseResolversMakers'
import { parseAmountStr, parseBalanceStr } from 'mfg-base/features/utils/utils'
import { editTransactionDialogAddTransactionCallerId } from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsModuleMiddleware'
import { testGeoPosition } from 'mfg-base/test/testData'
import {
  overviewScreenAddCategoryCallerId,
  overviewScreenAddStorageCallerId,
} from '../../overviewScreenConstants'
import { OverviewScreenTestWorld } from '../OverviewScreenTestWorld'

const World: OverviewScreenTestWorld = (OverviewScreenTestWorld: any)

myDefineSupportCode(
  World,
  ({ Given, When, Then }) => {
    Given(/^I am on overview screen$/, async (world) => {
    })

    Given(/^"([^"]*)" storage is selected$/, async (world, storageTitle) => {
      const storageId = await world.driver.getStorageIdByTitle(storageTitle)
      await world.driver.overviewScreenPressStorage({ storageId })
    })

    Given(/^"([^"]*)" category is selected$/, async (world, categoryTitle) => {
      const categoryId = await world.driver.getCategoryIdByTitle(categoryTitle)
      await world.driver.overviewScreenPressCategory(categoryId)
    })

    When(/^I press navigate to Analytics screen button$/, async (world) => {
      await world.driver.overviewScreenNavPressAnalyticsButton()
    })

    When(
      /^I create debit storage "([^"]*)" with initial balance "([^"]*)"$/,
      async (world, storageTitle, initialBalanceStr) => {
        await world.driver.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()

        const
          newGuid = 'new-guid',
          newStorageGuidPromiseResolve = makeUtilGenerateGuidPromiseResolve({
            callerId: overviewScreenAddStorageCallerId,
            guid: newGuid,
          })

        world.driver.addPromiseResolveConf(newStorageGuidPromiseResolve)

        await world.driver.overviewScreenPressAddStorageButton()
        await world.driver.editStorageChangeTitle(storageTitle)

        const
          initialBalance = parseBalanceStr(initialBalanceStr),
          storage: AStorage = {
            id: newGuid,
            title: storageTitle,
            type: 'debit',
            hidden: false,
            initialBalance,
            showInSecureMode: true,
            uid: testMainUserUid,
          }
        world.driver.addPromiseResolveConf(makeDbUpdateStorageDonePromiseResolve({ storage }))
        for (const currencyCode in initialBalance) {
          await world.driver.editStoragePressAddCurrency()
          await world.driver.pickCurrencyDialogPressOnCurrency(currencyCode)
          await world.driver.editStorageChangeInitialCurrencyAmount(
            currencyCode,
            initialBalance[currencyCode] / 100,
          )
        }
        await world.driver.editStoragePressSaveButton()
      },
    )

    Then(
      /^I should see debit storage "([^"]*)" with balance "([^"]*)"$/,
      async (world, storageTitle, balanceStr) => {
        await world.driver.overviewScreenAssertStorageWithTitleExist(storageTitle, balanceStr)
      },
    )

    const
      prepareAddCategorySteps =
        async (world) => {
          await world.driver.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()

          const
            newGuid = 'new-guid',
            newCategoryGuidPromiseResolve = makeUtilGenerateGuidPromiseResolve({
              callerId: overviewScreenAddCategoryCallerId,
              guid: newGuid,
            })

          world.driver.addPromiseResolveConf(newCategoryGuidPromiseResolve)
          return { newGuid }
        },
      doAddCategoryScreenSteps =
        async (world, newGuid, categoryTitle, parentCategoryId = __undef) => {
          await world.driver.editCategoryChangeTitle(categoryTitle)

          const
            category: Category = {
              id: newGuid,
              type: 'expense',
              isHidden: false,
              parentId: parentCategoryId,
              title: categoryTitle,
            }
          world.driver.addPromiseResolveConf(makeDbUpdateCategoryPromiseResolve({ category }))
          await world.driver.editCategoryPressSaveButton()
        }

    When(
      /^I create category "([^"]*)" without parent$/,
      async (world, categoryTitle) => {
        const { newGuid } = await prepareAddCategorySteps(world)
        await world.driver.overviewScreenPressAddCategoryButton()
        await doAddCategoryScreenSteps(world, newGuid, categoryTitle)
      },
    )

    When(
      /^I opened Show hidden storages screen$/,
      async (world) => {
        await world.driver.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()
        const firstStorageId = await world.driver.getFirstStorageId()
        await world.driver.overviewScreenLongPressOnStorage({ storageId: firstStorageId })
        await world.driver.overviewScreenStoragesDialogShowHiddenPress()
      },
    )

    When(
      /^I create category "([^"]*)" with Parent "([^"]*)"$/,
      async (world, categoryTitle, parentTitle) => {
        const { newGuid } = await prepareAddCategorySteps(world)
        await world.driver.overviewScreenLongPressOnCategory(parentTitle)
        await world.driver.overviewScreenCategoriesDialogAddCategoryPress()
        const parentCategoryId = await world.driver.getCategoryIdByTitle(parentTitle)
        await doAddCategoryScreenSteps(world, newGuid, categoryTitle, parentCategoryId)
      },
    )

    When(
      /^I add expense transaction "([^"]*)" from "([^"]*)" to "([^"]*)" for "([^"]*)"$/,
      async (world, transactionTitle, storageTitle, categoryTitle, transactionAmountStr) => {
        const { amount, currencyCode } = parseAmountStr(transactionAmountStr)
        await world.driver.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()
        await world.driver.assertCurrentScreenName('Overview')
        const storageId = await world.driver.getStorageIdByTitle(storageTitle)
        const categoryId = await world.driver.getCategoryIdByTitle(categoryTitle)
        await world.driver.overviewScreenPressStorage({ storageId, currencyCode })
        await world.driver.overviewScreenPressCategory(categoryId)
        await world.driver.overviewScreenPressAddTransactionButton()
        await world.driver.editTransactionChangeAmount(amount / 100)
        await world.driver.editTransactionChangeComment(transactionTitle)
        const
          newGuid = 'new-guid',
          newStorageGuidPromiseResolve = makeUtilGenerateGuidPromiseResolve({
            callerId: editTransactionDialogAddTransactionCallerId,
            guid: newGuid,
          }),
          uid = await world.driver.getUid(),
          now = await world.driver.getNow(),
          newTransaction: TransactionExpense = {
            id: newGuid,
            comment: transactionTitle,
            currencyCode,
            value: amount,
            date: now,
            tags: [],
            uid,
            type: 'expense',
            storageIdFrom: storageId,
            categoryId,
            position: testGeoPosition,
          }

        world.driver.addPromiseResolveConf(newStorageGuidPromiseResolve)
        world.driver.addPromiseResolveConf(makeDbUpdateTransactionPromiseResolve({
          transaction: newTransaction,
        }))
        await world.driver.editTransactionPressConfirmButton()
      },
    )


    When(/^I add transfer transaction "([^"]*)" from "([^"]*)" to "([^"]*)" for "([^"]*)"$/,
      async (world, transactionName, storageNameFrom, storageNameTo, transactionAmountStr) => {
        const { amount, currencyCode } = parseAmountStr(transactionAmountStr)
        await world.driver.startAppAfterUserLoggedInInLastSessionIfStoreNotReady()
        await world.driver.assertCurrentScreenName('Overview')
        const storageIdFrom = await world.driver.getStorageIdByTitle(storageNameFrom)
        const storageIdTo = await world.driver.getStorageIdByTitle(storageNameTo)
        // TODO 1 it should be drag and drop
      })

    When(
      /^I press on show icon on row with title "([^"]*)"$/,
      async (world, storageTitle) => {
        world.driver.addPromiseResolveConf(
          makeUpdateStorageHiddenPromiseResolve({
            storageId: await world.driver.getStorageIdByTitle(storageTitle),
            hidden: false,
          }),
        )
        await world.driver.showHiddenStoragesScreenPressShowIconOnRowWithTitle(storageTitle)
      },
    )

    When(/^I open Analytics screen$/, async (world) => {
        await world.driver.overviewScreenNavPressAnalyticsButton()
      },
    )

    When(/^I press on add transaction button$/, async (world) => {
        await world.driver.overviewScreenPressAddTransactionButton()
      },
    )

    When(/^I open Plan screen$/, async (world) => {
      await world.driver.overviewScreenNavPressPlanButton()
    })

    /* ---- */
    /* THEN */
    /* ---- */

    Then(/^I should see category "([^"]*)" without parent$/, async (world, categoryTitle) => {
      await world.driver.overviewScreenAssertCategoryVisible(categoryTitle)
    },)

    Then(
      /^I should see category "([^"]*)" with "([^"]*)" parent$/,
      async (world, categoryTitle, parentTitle) => {
        await world.driver.overviewScreenAssertCategoryVisible(categoryTitle, parentTitle)
      },
    )

    Then(
      /^I should see "([^"]*)" balance is "([^"]*)"$/,
      async (world, storageTitle, storageBalanceStr) => {
        await world.driver.overviewScreenAssertStorageBalance(storageTitle, storageBalanceStr)
      },
    )

    Then(
      /^I should see total account balance "([^"]*)"$/,
      async (world, totalAccountBalanceStr) => {
        await world.driver.overviewScreenAssertAccountBalance(totalAccountBalanceStr)
      },
    )

    Then(
      /^I should see only one storage "([^"]*)" on show hidden storages screen$/,
      async (world, storageTitle) => {
        await world.driver.showHiddenStoragesScreenAssertOnlyOneStorageWithTitle(storageTitle)
      },
    )

    Then(
      /^I should see label "None of storages are hidden" on show hidden storages screen$/,
      async (world) => {
        await world.driver.showHiddenStoragesScreenAssertNoneOfStoragesAreHiddenLabel()
      },
    )

    Then(/^I should see default account currency is picked by default$/, async (world) => {
        await world.driver.addTransactionDialogAssertSelectedCurrencyCodeIsDefaultAccountCurrencyCode()
      },
    )

    Then(/^I should see storage "([^"]*)" balance is "([^"]*)"$/, async (world) => {
        // TODO 1
      },
    )
  })