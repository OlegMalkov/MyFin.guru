/* @flow */

import { undefinedCurrencyCode } from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import {
  storageById,
} from 'mfg-base/entities/account/live/storagesSelectors'
import { isDefined, u } from 'mfg-base/utils/utils'
import {
  dbUpdateMainCurrencyCodeAC, dbUpdatePreferencesAC,
  dbUpdateStorageHiddenAC, dbUpdateStorageShowInSecureModeAC,
} from 'mfg-base/modules/dbModule/dbAC'
import {
  openAddExchangeTransactionDialogAC,
  openAddExpenseTransactionDialogAC,
  openAddIncomeTransactionDialogAC, openAddTransferTransactionDialogAC,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsAC'
import {
  openPickCurrencyDialog,
  PICK_CURRENCY_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import {
  openPickUserDialogAC, PICK_USER_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickUserDialog/pickUserDialogAC'
import { navigateAC } from 'mfg-base/modules/navModule/navAC'
import { UTIL_GUID_GENERATED, utilGenerateGuidAC } from 'mfg-base/modules/util/utilAC'
import type { OverviewModuleAppState, OverviewModuleMiddlewareFn } from './overview.flow'
import {
  overviewScreenAddCategoryCallerId,
  overviewScreenAddStorageCallerId,
} from './overviewScreenConstants'
import { overviewScreenModuleId } from './overviewScreenModuleId'
import {
  OVERVIEW_ADD_TRANSACTION_BP,
  OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED,
  OVERVIEW_CATEGORY_LONG_PRESSED,
  overviewOpenCategoryActionsDialogAC,
  OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED,
  OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED,
  OVERVIEW_TOTAL_USAGE_LABEL_PRESSED,
  OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED, OVERVIEW_ADD_STORAGE_BP, OVERVIEW_ADD_CATEGORY_BP,
  OVERVIEW_SETTINGS_BP, OVERVIEW_ANALYTICS_BP, OVERVIEW_PLAN_BP,
} from './overviewScreenAC'
import {
  OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP,
  OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP,
  OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP,
} from './CategoriesActionsDialog/categoriesActionDialogAC'
import type { OverviewScreenState } from './overviewScreenReducer'
import {
  OVERVIEW_STORAGES_ACTIONS_DIALOG_ADD_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_DONT_SHOW_IN_SECURE_MODE_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_EDIT_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_HIDE_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_SHOW_HIDDEN_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_SORT_STORAGE_BP,
} from './StoragesActionsDialog/storagesActionsDialogAC'

import type {
  AStorage,
} from 'mfg-base/entities/account/live/flowTypes'
import {
  addCategoryAC,
  editCategoryAC,
} from './submodules/editCategoryScreenModule/editCategoryScreenAC'
import {
  addStorageAC,
  editStorageAC,
} from './submodules/editStorageScreenModule/editStorageScreenAC'

const selectedStorageIdSelector = (state) => state.storagesActionsDialog.storageId

const
  /*  makeLiveCategoriesPath = ({ maUid, childCategoryId }) =>
      `accounts/${maUid}/live/categories/${childCategoryId}/parentId`,*/
  getModuleState =
    (getAppState: () => OverviewModuleAppState) => getAppState()[overviewScreenModuleId],
  currentCategoryModeSelector = (s: OverviewScreenState) =>
    s.screen.categoriesScreenPart.showExpenseMode ? 'expense' : 'income',
  selectedCategoryIdSelector =
    (s: OverviewScreenState) => s.screen.categoriesScreenPart.selectedCategoryId,
  pickMainCurrencyCallerId = `${overviewScreenModuleId}_pick_main_currency`,
  overviewScreenMiddlewareFn: OverviewModuleMiddlewareFn<> = (a, getAppState) => {
    /* DELETE_CATEGORY START */
    /* TODO 2 MFG-54 FIX DELETE CATEGORY */
    /* if (a.type === OVERVIEW_DELETE_CATEGORY_PRESSED) {
      const
        {
          categoriesActionsDialog: {
            categoryId,
            categoryType,
            deps: { categories },
            computed: { selectedTitle },
          },
        } = getModuleState(getAppState),
        getLinkedTransactionIds = (transactions: Transactions) => {
          if (!transactions) {
            return []
          }

          return Object.keys(transactions)
            .filter(key => {
              const transaction = transactions[key]
              if (transaction.type === 'income' || transaction.type === 'expense') {
                return transaction.categoryId === categoryId
              }
              return false
            })
        },
        childCategoriesIds = Object.keys(categories)
          .filter(childCategoryId => categories[childCategoryId].parentId === categoryId)

      if (isDefined(categoryId) && categoryType) {
        store.dispatch(
          changeCategoryActionsDialogStatus({
            type: 'deleting_category_fetching_live_transactions',
          }),
        )
        const { deps: { personalData: { maUid } } } = getModuleState(getAppState)
        fbs.database()
          .ref(`accounts/${maUid}/live/transactions`)
          .transaction((liveTransactions: Transactions) => {
            const linkedLiveTransactionIds = getLinkedTransactionIds(liveTransactions)
            setTimeout(() => {
              store.dispatch(changeCategoryActionsDialogStatus({
                type: 'deleting_category_fetching_archive_transactions',
                linkedLiveTransactionIds,
              }))

              fbs.database()
                .ref(`accounts/${maUid}/archive/transactions`)
                .transaction((archiveTransactions: Transactions) => {
                  const linkedArchiveTransactionIds = getLinkedTransactionIds(archiveTransactions)
                  setTimeout(() => {
                    store.dispatch(changeCategoryActionsDialogStatus({
                      type: 'deleting_category_processing',
                      linkedLiveTransactionIds,
                      linkedArchiveTransactionIds,
                    }))
                    setTimeout(() => {
                      if (linkedLiveTransactionIds.length || linkedArchiveTransactionIds.length) {
                        const
                          totalTransactionsCount = linkedLiveTransactionIds.length +
                            linkedArchiveTransactionIds.length
                        store.dispatch(openPickCategoryDialog({
                          callerId: deleteCategoryCallerId,
                          title: strings.formatString(
                            strings.deleteCategoryWhereToTransfer,
                            totalTransactionsCount.toString(),
                            selectedTitle,
                          ),
                          categoryType: getModuleState(getAppState).screen.categoriesScreenPart
                            .showExpenseMode ? 'expense' : 'income',
                          includeNoParent: false,
                        }))
                      } else {
                        childCategoriesIds.forEach(childCategoryId => fbs.database()
                          .ref(makeLiveCategoriesPath({ maUid, childCategoryId }))
                          .set(null),
                        )
                        fbs.database()
                          .ref(`accounts/${maUid}/live/categories/${categoryId}`)
                          .set(null)
                        store.dispatch(deleteCategoryDone())
                      }
                    }, 1)
                  }, 1)
                  return archiveTransactions
                })
            }, 1)
            return liveTransactions
          })
      }
    }

    if (a.type === PICK_CATEGORY_DONE) {
      const { callerId, categoryId: newCategoryId } = a
      if (callerId === deleteCategoryCallerId) {
        const {
          categoriesActionsDialog: {
            status,
            categoryType,
            categoryId,
          },
        } = getModuleState(getAppState)
        if (status.type === 'deleting_category_processing' && categoryId && categoryType) {
          const
            { linkedLiveTransactionIds, linkedArchiveTransactionIds } = status,
            makeAccountTransformation = (linkedTransactionIds) => ({
              transactions: mapObjIndexed((t: Transaction, id) => {
                if (
                  linkedTransactionIds.indexOf(id) !== -1
                  && (t.type === 'income' || t.type === 'expense')
                ) {
                  return us(t, a, t => t.categoryId = newCategoryId)
                }
                return t
              }),
            }),
            liveAccountTransformation = makeAccountTransformation(linkedLiveTransactionIds),
            archiveAccountTransformation = makeAccountTransformation(linkedArchiveTransactionIds),
            { deps: { personalData: { maUid } } } = getModuleState(getAppState)

          fbs.database()
            .ref(`accounts/${maUid}`)
            .transaction(evolve({
              live: liveAccountTransformation,
              archive: archiveAccountTransformation,
            }))
            .then(() => {
              fbs.database()
                .ref(`accounts/${maUid}/live/categories/${categoryId}`)
                .set(null)
              store.dispatch(deleteCategoryDone())
              store.dispatch(resubscribeAccount())
            })
        }
      }
    }*/

    /* DELETE_CATEGORY END */
    if (a.type === OVERVIEW_ADMIN_CATEGORIES_USERNAME_PRESSED) {
      return { a: openPickUserDialogAC({ includeAll: true, callerId: overviewScreenModuleId }) }
    }
    /*

        if (a.type === OVERVIEW_TO_LEND_MONEY_DIALOG_CONFIRM_BP) {
          const {
              toLendMoneyDialog: {
                until,
                title,
                isReliable,

                amount,
                currencyCode,
                storageId,
              },
              deps: { session: { uid }, now },
            } = getModuleState(getAppState),

            debtStorageId = makeGuid(),
            debtStorage = {
              id: debtStorageId,
              title,
              description: '',
              type: 'debt',
              hidden: false,
              showInSecureMode: false,
              initialBalance: {},
              uid,
              until,
              isReliable,
            },
            debtTransactionId = makeGuid()

          if (amount && currencyCode && storageId && title) {
            const debtTransferTransaction: TransactionTransfer = {
              comment: `Debt until ${dayPeriodStr(until)}`,
              created: 0,
              currencyCode,
              date: now,
              id: debtTransactionId,
              storageIdFrom: storageId,
              storageIdTo: debtStorageId,
              tags: [],
              type: 'transfer',
              value: amount * 100,
              uid,
            }

            let
              storage,
              transaction

            const {
              deps: {
                session: { accountEncrypted, encryptionPassword },
                personalData: { maUid },
              },
            } = getModuleState(getAppState)
            if (accountEncrypted) {
              const
                { encryptTransaction, encryptStorage } = makeCrypt(encryptionPassword)

              transaction = encryptTransaction(debtTransferTransaction)
              storage = encryptStorage(debtStorage)
            } else {
              transaction = debtTransferTransaction
              storage = debtStorage
            }

            /!*
            TODO 2 MFG-55 fix to lend money process
            fbs.database()
              .ref(`accounts/${maUid}/live/storages/${debtStorageId}`)
              .set(storage)
            fbs.database()
              .ref(`accounts/${maUid}/live/transactions/${debtTransactionId}`)
              .set(transaction)*!/

            return { a: toLendMoneyDoneAC() }
          }
          if (!storageId) {
            return {
              a: alertOpenAC({
                title: strings.dataNotFulfilled,
                message: strings.missingStorage,
              }),
            }
          }
          if (!title) {
            return {
              a: alertOpenAC({
                title: strings.dataNotFulfilled,
                message: strings.missingDebt,
              }),
            }
          }
          if (!currencyCode) {
            return {
              a: alertOpenAC({
                title: strings.dataNotFulfilled,
                message: strings.missingCurrency,
              }),
            }
          }
          if (!amount) {
            return {
              a: alertOpenAC({
                title: strings.dataNotFulfilled,
                message: strings.missingAmount,
              }),
            }
          }
        }
    */

    if (a.type === OVERVIEW_ADD_STORAGE_BP
      || a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_ADD_STORAGE_BP) {
      return { a: utilGenerateGuidAC(overviewScreenAddStorageCallerId) }
    }

    if (a.type === UTIL_GUID_GENERATED && a.callerId === overviewScreenAddStorageCallerId) {
      return { a: addStorageAC(a.guid) }
    }

    if (a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_SHOW_HIDDEN_BP) {
      return { a: navigateAC({ routeName: 'ShowHiddenStorages' }) }
    }

    if (a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_EDIT_STORAGE_BP) {
      return { a: editStorageAC(selectedStorageIdSelector(getModuleState(getAppState))) }
    }

    if (a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP) {
      const s = getModuleState(getAppState)

      return {
        a: editCategoryAC({ categoryId: selectedCategoryIdSelector(s) }),
      }
    }

    if (
      a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP
      || a.type === OVERVIEW_ADD_CATEGORY_BP
    ) {
      return { a: utilGenerateGuidAC(overviewScreenAddCategoryCallerId) }
    }

    if (a.type === UTIL_GUID_GENERATED && a.callerId === overviewScreenAddCategoryCallerId) {
      const s = getModuleState(getAppState)

      return {
        a: addCategoryAC({
          categoryId: a.guid,
          mode: currentCategoryModeSelector(s),
          parentCategoryId: selectedCategoryIdSelector(s),
        }),
      }
    }

    if (a.type === OVERVIEW_CATEGORY_LONG_PRESSED) {
      const
        { categoryId } = a,
        { screen: { categoriesScreenPart: { showExpenseMode } } } = getModuleState(getAppState),
        categoryType = showExpenseMode ? 'expense' : 'income'

      return { a: overviewOpenCategoryActionsDialogAC(categoryId, categoryType) }
    }

    if (a.type === OVERVIEW_TOTAL_BALANCE_CURRENCY_PRESSED) {
      const { deps: { isAdmin } } = getModuleState(getAppState)
      if (isAdmin) {
        return { a: openPickCurrencyDialog({ callerId: pickMainCurrencyCallerId }) }
      }
    }

    if (a.type === PICK_CURRENCY_DIALOG_DONE) {
      const { callerId, currencyCode } = a
      if (callerId === pickMainCurrencyCallerId) {
        return { a: dbUpdateMainCurrencyCodeAC(currencyCode) }
      }
    }

    if (a.type === OVERVIEW_STORAGES_OWNER_NAME_LABEL_PRESSED) {
      const
        { uid: uidToCollapse } = a,
        {
          deps: {
            personalData: { preferences: { overviewCollapsedUids } },
          },
        } = getModuleState(getAppState),
        updatedOverviewCollapsedUids = u(
          overviewCollapsedUids,
          o => o[uidToCollapse] = !o[uidToCollapse],
        )

      return {
        a: dbUpdatePreferencesAC(p => p.overviewCollapsedUids = updatedOverviewCollapsedUids),
      }
    }

    if (a.type === PICK_USER_DIALOG_DONE) {
      const { callerId, uid: pickedUid } = a

      if (callerId === overviewScreenModuleId) {
        return {
          a: dbUpdatePreferencesAC(p => p.overviewCategoriesUid = pickedUid),
        }
      }
    }

    if (a.type === OVERVIEW_TOTAL_USAGE_LABEL_PRESSED) {
      const
        {
          deps: {
            personalData: { preferences: { overviewTotalUsageMode } },
          },
        } = getModuleState(getAppState),
        newState = overviewTotalUsageMode === 'percent' ? 'number' : 'percent'

      return {
        a: dbUpdatePreferencesAC(p => p.overviewTotalUsageMode = newState),
      }
    }

    if (a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_SORT_STORAGE_BP) {
      const
        s = getModuleState(getAppState),
        selectedStorageId = selectedStorageIdSelector(s)

      if (selectedStorageId) {
        const
          { deps: { storages } } = s,
          storage: AStorage | null = storageById(storages, { storageId: selectedStorageId })

        if (storage) {
          return {
            a: navigateAC({
              routeName: 'StoragesSort',
              params: {
                ownerUid: storage.uid,
                type: storage.type,
              },
            }),
          }
        }
      }
    }

    if (a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_HIDE_STORAGE_BP) {
      const storageId = selectedStorageIdSelector(getModuleState(getAppState))
      if (isDefined(storageId)) {
        return { a: dbUpdateStorageHiddenAC({ storageId, hidden: true }) }
      }
    }

    if (a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_DONT_SHOW_IN_SECURE_MODE_STORAGE_BP) {
      const storageId = selectedStorageIdSelector(getModuleState(getAppState))
      if (isDefined(storageId)) {
        return {
          a: dbUpdateStorageShowInSecureModeAC({ storageId, showInSecureMode: false }),
        }
      }
    }

    if (a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP) {
      const
        s = getModuleState(getAppState),
        selectedCategoryId = s.categoriesActionsDialog.categoryId,
        { deps: { categories } } = s

      if (selectedCategoryId) {
        const
          category = categories[selectedCategoryId],
          { showExpenseMode } = s.screen.categoriesScreenPart

        if (category) {
          const { parentId } = category

          return {
            a: navigateAC({
              routeName: 'CategoriesSort',
              params: {
                parentId,
                type: showExpenseMode ? 'expense' : 'income',
              },
            }),
          }
        }
      }
    }

    if (a.type === OVERVIEW_ADD_TRANSACTION_BP) {
      const s = getModuleState(getAppState)

      if (s.screen.storagesScreenPart.selectedStorageCurrency) {
        const
          { currencyCode: selectedCurrencyCode, storageId } =
            s.screen.storagesScreenPart.selectedStorageCurrency,
          categoryId = s.screen.categoriesScreenPart.selectedCategoryId,
          currencyCode = selectedCurrencyCode === undefinedCurrencyCode ?
            s.deps.mainCurrencyCode : selectedCurrencyCode

        if (s.screen.categoriesScreenPart.showExpenseMode) {
          return {
            a: openAddExpenseTransactionDialogAC({
              currencyCode,
              storageId,
              categoryId,
            }),
          }
        }
        return {
          a: openAddIncomeTransactionDialogAC({
            currencyCode,
            storageId,
            categoryId,
          }),
        }
      }
    }

    if (a.type === OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED) {
      const s = getModuleState(getAppState)
      if (s.screen.isTransferMode && s.screen.storagesScreenPart.selectedStorageCurrency) {
        const
          { storageId, currencyCode } = s.screen.storagesScreenPart.selectedStorageCurrency,
          openProps = {
            targetStorageId: a.storageId,
            targetCurrencyCode: a.currencyCode,
            storageId,
            currencyCode,
          }
        if (
          s.screen.storagesScreenPart.selectedStorageCurrency.storageId === a.storageId
          || s.screen.storagesScreenPart.selectedStorageCurrency.currencyCode !== a.currencyCode
        ) {
          return { a: openAddExchangeTransactionDialogAC(openProps) }
        }
        return { a: openAddTransferTransactionDialogAC(openProps) }
      }
    }

    if (a.type === OVERVIEW_SETTINGS_BP) {
      return { a: navigateAC({ routeName: 'Settings' }) }
    }

    if (a.type === OVERVIEW_ANALYTICS_BP) {
      return { a: navigateAC({ routeName: 'Analytics' }) }
    }

    if (a.type === OVERVIEW_PLAN_BP) {
      return { a: navigateAC({ routeName: 'Plan' }) }
    }

    return null
  }

export {
  overviewScreenMiddlewareFn,
}
