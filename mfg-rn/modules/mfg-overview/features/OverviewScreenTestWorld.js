/* @flow */
/* eslint-disable max-len */
import assert from 'assert'
import { BaseTestWorld } from 'mfg-base/features/utils/TestWorld'
import { BaseDriver } from 'mfg-base/features/utils/TestWorld'
import {
  editTransactionDialogsModuleId,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsModuleId'
import { undefinedCurrencyCode } from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import { parseBalanceStr } from 'mfg-base/features/utils/utils'
import {
  editTransactionOnAddTransactionAmountChangedAC, editTransactionOnAddTransactionConfirmBPAC,
  editTransactionOnAddTransactionTagsTextChangedAC,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsAC'
import { keys, keysCount } from 'mfg-base/utils/utils'
import {
  categoriesActionDialogAddCategoryBPAC,
} from '../CategoriesActionsDialog/categoriesActionDialogAC'
import type { OverviewModuleDispatch } from '../overview.flow'
import {
  overviewAddCategoryBPAC, overviewAddStorageBPAC, overviewAddTransactionBPAC,
  overviewAnalyticsBPAC,
  overviewCategoryLongPressAC, overviewCategoryPressedAC, overviewPlanBPAC,
  overviewStorageCurrencyBalanceLongPressedAC,
  overviewStorageCurrencyBalancePressedAC,
} from '../overviewScreenAC'
import {
  overviewScreenModuleId,
} from '../overviewScreenModuleId'
import { overviewModuleRegistry } from '../overviewModulesRegistry'
import {
  overviewScreenStoragesActionsDialogShowHiddenStorageBPAC,
} from '../StoragesActionsDialog/storagesActionsDialogAC'
import {
  editCategorySaveBPAC,
  editCategoryTitleChangedAC,
} from '../submodules/editCategoryScreenModule/editCategoryScreenAC'
import {
  editStorageAddCurrencyBPAC, editStorageInitialBalanceChangedAC, editStorageSaveBPAC,
  editStorageTitleChangedAC,
} from '../submodules/editStorageScreenModule/editStorageScreenAC'
import {
  showHiddenStoragesScreenShowIconPressedAC,
} from '../submodules/showHiddenStoragesScreenModule/showHiddenStoragesAC'
import {
  showHiddenStoragesScreenModuleId,
} from '../submodules/showHiddenStoragesScreenModule/showHiddenStoragesModuleId'

import type {
  EditTransactionDialogsState,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsReducer'
import type {
  CategoryId, CurrencyCode, StorageId,
} from 'mfg-base/const'
import type {
  OverviewScreenState,
} from '../overviewScreenReducer'
import type {
  ShowHiddenStoragesScreenState,
} from '../submodules/showHiddenStoragesScreenModule/showHiddenStoragesModuleReducer'

class OverviewScreenDriver extends BaseDriver {
  _baseDispatch: OverviewModuleDispatch

  constructor(...args: Array<any>) {
    super(...args)
    /* $FlowFixMe super not work */
    this._baseDispatch = (this._dispatch: any)
  }

  async _getOverviewModuleState() {
    const
      s: OverviewScreenState = await super._getModuleState(overviewScreenModuleId)

    return s
  }

  async _getMainCurrencyCode() {
    const
      { deps: { mainCurrencyCode } } = await this._getOverviewModuleState()

    return mainCurrencyCode
  }

  async _getEditTransactionDialogState() {
    const
      editTransactionDialogsState: EditTransactionDialogsState = await super._getModuleState(
        editTransactionDialogsModuleId)

    return editTransactionDialogsState
  }

  async _getEditExpenseTransactionDialogState() {
    const
      { expense } = await this._getEditTransactionDialogState()

    return expense
  }

  async _getShowHiddenStoragesModuleState() {
    const
      s: ShowHiddenStoragesScreenState =
        await super._getModuleState(showHiddenStoragesScreenModuleId)

    return s
  }

  async overviewScreenPressAddStorageButton() {
    await this._baseDispatch(overviewAddStorageBPAC())
  }

  async overviewScreenPressAddCategoryButton() {
    await this._baseDispatch(overviewAddCategoryBPAC())
  }

  async overviewScreenLongPressOnCategory(categoryTitle: string) {
    const categoryId = await this.getCategoryIdByTitle(categoryTitle)
    await this._baseDispatch(overviewCategoryLongPressAC(categoryId))
  }

  async overviewScreenCategoriesDialogAddCategoryPress() {
    await this._baseDispatch(categoriesActionDialogAddCategoryBPAC())
  }

  async overviewScreenStoragesDialogShowHiddenPress() {
    await this._baseDispatch(overviewScreenStoragesActionsDialogShowHiddenStorageBPAC())
  }

  async overviewScreenPressStorage({ storageId, currencyCode = undefinedCurrencyCode }: { storageId: StorageId, currencyCode?: CurrencyCode }) {
    await this._baseDispatch(overviewStorageCurrencyBalancePressedAC({ storageId, currencyCode }))
  }

  async overviewScreenLongPressOnStorage({ storageId, currencyCode = undefinedCurrencyCode }: { storageId: StorageId, currencyCode?: CurrencyCode }) {
    await this._baseDispatch(overviewStorageCurrencyBalanceLongPressedAC({ storageId, currencyCode }))
  }

  async overviewScreenPressCategory(categoryId: CategoryId) {
    await this._baseDispatch(overviewCategoryPressedAC(categoryId))
  }

  async overviewScreenPressAddTransactionButton() {
    await this._baseDispatch(overviewAddTransactionBPAC())
  }

  async overviewScreenNavPressAnalyticsButton() {
    await this._baseDispatch(overviewAnalyticsBPAC())
  }

  async overviewScreenNavPressPlanButton() {
    await this._baseDispatch(overviewPlanBPAC())
  }

  async editTransactionChangeAmount(amount: number) {
    await this._baseDispatch(editTransactionOnAddTransactionAmountChangedAC(amount))
  }

  async editTransactionChangeComment(text: string) {
    await this._baseDispatch(editTransactionOnAddTransactionTagsTextChangedAC(text))
  }

  async editTransactionPressConfirmButton() {
    await this._baseDispatch(editTransactionOnAddTransactionConfirmBPAC())
  }

  async editStorageChangeTitle(title: string) {
    await this._baseDispatch(editStorageTitleChangedAC(title))
  }

  async editCategoryChangeTitle(title: string) {
    await this._baseDispatch(editCategoryTitleChangedAC(title))
  }

  async editStoragePressAddCurrency() {
    await this._baseDispatch(editStorageAddCurrencyBPAC())
  }

  async editStoragePressSaveButton() {
    await this._baseDispatch(editStorageSaveBPAC())
  }

  async editCategoryPressSaveButton() {
    await this._baseDispatch(editCategorySaveBPAC())
  }

  async editStorageChangeInitialCurrencyAmount(currencyCode: CurrencyCode, value: number) {
    await this._baseDispatch(editStorageInitialBalanceChangedAC({ currencyCode, value }))
  }


  async overviewScreenAssertStorageWithTitleExist(title: string, balanceStr: string) {
    await this.assertCurrentScreenName('Overview')
    const overviewScreenState: OverviewScreenState = await this._getOverviewModuleState()
    if (!overviewScreenState.screen.storagesScreenPart.computed) {
      throw new Error('overviewScreenState.screen.storagesScreenPart.computed should be defined')
    }
    const storageData = overviewScreenState.screen
      .storagesScreenPart.computed.data.find(d => d.title && d.title === title)

    if (!storageData) {
      throw new Error(`Storage with title "${title}" should exist on overview screen`)
    }

    const
      balance = parseBalanceStr(balanceStr),
      currencyCodes = keys(balance)

    if (storageData.type === 'label') {
      throw new Error(`storageData for ${title} should not be label type`)
    }
    assert.equal(keysCount(storageData.balance),
      currencyCodes.length,
      `Currencies count in balance should match for ${title}`)

    currencyCodes.forEach(currencyCode => {
      assert.equal(storageData.balance[currencyCode],
        balance[currencyCode],
        `Balance for ${currencyCode} in ${title} should match`)
    })
  }

  async overviewScreenAssertStorageBalance(title: string, storageBalanceStr: string) {
    await this.assertCurrentScreenName('Overview')
    const
      overviewScreenState: OverviewScreenState = await this._getOverviewModuleState(),
      balance = parseBalanceStr(storageBalanceStr)
    if (!overviewScreenState.screen.storagesScreenPart.computed) {
      throw new Error('overviewScreenState.screen.storagesScreenPart.computed should be defined')
    }

    const storage = overviewScreenState.screen.storagesScreenPart.computed.data.find(
      d => d.title === title)
    if (!storage) {
      throw Error(`Storage ${title} not found on Overview screen`)
    }

    if (storage.type === 'label') {
      throw Error('Storage type record should not be label')
    }

    assert.deepEqual(
      storage.balance,
      balance,
      `Expected different balance for storage ${title}`,
    )
  }

  async overviewScreenAssertAccountBalance(totalAccountBalanceStr: string) {
    await this.assertCurrentScreenName('Overview')
    const
      overviewScreenState: OverviewScreenState = await this._getOverviewModuleState(),
      balance = parseBalanceStr(totalAccountBalanceStr)

    if (!overviewScreenState.screen.storagesScreenPart.computed) {
      throw new Error('overviewScreenState.screen.storagesScreenPart.computed should be defined')
    }

    const { totalRemains } = overviewScreenState.screen.storagesScreenPart.computed

    assert.deepEqual(
      totalRemains,
      balance,
      'Expected different total account balance',
    )
  }

  async overviewScreenAssertCategoryVisible(title: string, parentTitle?: string) {
    await this.assertCurrentScreenName('Overview')
    const overviewScreenState: OverviewScreenState = await this._getOverviewModuleState()
    if (!overviewScreenState.screen.categoriesScreenPart.computed) {
      throw new Error('overviewScreenState.screen.categoriesScreenPart.computed should be defined')
    }

    if (parentTitle) {
      const parent = overviewScreenState.screen.categoriesScreenPart.computed.categoriesData
        .find(c => c.title === parentTitle)

      if (!parent) {
        throw Error(`Parent category with title "${parentTitle}" should exist on overview screen`)
      }

      const category = parent.children.some(c => c.title === title)

      assert(
        category,
        `Category with title "${title}" and parent "${parentTitle}" should exist on overview screen`,
      )
    } else {
      assert(
        overviewScreenState.screen.categoriesScreenPart.computed.categoriesData
          .some(c => c.title === title),
        `Category with title "${title}" without parent should exist on overview screen`,
      )
    }
  }

  async addTransactionDialogAssertSelectedCurrencyCodeIsDefaultAccountCurrencyCode() {
    const
      mainCurrencyCode = await this._getMainCurrencyCode(),
      { currencyCode } = await this._getEditExpenseTransactionDialogState()

    assert.equal(currencyCode, mainCurrencyCode, 'currency code should be main currency code')
  }


  async showHiddenStoragesScreenPressShowIconOnRowWithTitle(title: string) {
    const storageId = await this.getStorageIdByTitle(title)
    await this._baseDispatch(showHiddenStoragesScreenShowIconPressedAC(storageId))
  }

  async showHiddenStoragesScreenAssertOnlyOneStorageWithTitle(expectedTitle: string) {
    await this.assertCurrentScreenName('ShowHiddenStorages')
    const
      s: ShowHiddenStoragesScreenState = await this._getShowHiddenStoragesModuleState(),
      { computed: { listData, shouldShowNoStoragesLabel } } = s

    if (listData.length !== 1) {
      throw new Error(`There should be only one hidden storage, but got ${listData.length}`)
    }

    if (shouldShowNoStoragesLabel) {
      throw new Error('shouldShowNoStoragesLabel should be false')
    }

    const { title } = listData[0]

    assert.equal(
      title,
      expectedTitle,
      'Expected different storage title',
    )
  }

  async showHiddenStoragesScreenAssertNoneOfStoragesAreHiddenLabel() {
    await this.assertCurrentScreenName('ShowHiddenStorages')
    const
      s: ShowHiddenStoragesScreenState = await this._getShowHiddenStoragesModuleState(),
      { computed: { listData, shouldShowNoStoragesLabel } } = s

    if (listData.length !== 0) {
      throw new Error(`There should be 0  hidden storages, but got ${listData.length}`)
    }

    assert.equal(
      shouldShowNoStoragesLabel,
      true,
      'shouldShowNoStoragesLabel should be true',
    )
  }
}

export class OverviewScreenTestWorld extends BaseTestWorld {
  driver: OverviewScreenDriver

  constructor(ctx: any) {
    super(ctx, OverviewScreenDriver, overviewModuleRegistry)
  }
}
