/* @flow */

import {
  byCategporyTransactionsSelector,
} from 'mfg-base/entities/account/live/transactionsSelectors'
import { alertOpenAC } from 'mfg-base/modules/alertModule/alertModuleAC'
import {
  dbDeletePlannedTransactionAC,
  dbEndPrevPlannedTransactionAndCreateNewAC,
  dbUpdatePlannedTransactionAC, dbUpdatePlannedTransactionDeletedPeriodsAC,
  dbUpdatePlannedTransactionEndDateAC,
  dbUpdatePlannedTransactionsPeriodOverrideAC, dbUpdatePreferencesAC,
  deleteCategoryPlanAC,
  updateCategoryPlanAC,
} from 'mfg-base/modules/dbModule/dbAC'
import { makeCrypt } from 'mfg-base/modules/cryptScreenModule/cryptScreenMiddleware'
import { navigateBackAC } from 'mfg-base/modules/navModule/navAC'
import {
  NO_ACTION,
} from './PlanCategoryDialog/EditPlannedTransactionDialog/editPlannedTransactionDialogReducer'
import { planScreenModuleId } from './planScreenModuleId'
import {
  openPickUserDialogAC,
  PICK_USER_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickUserDialog/pickUserDialogAC'
import {
  PLAN_SCREEN_CATEGORY_DIALOG_ADD_PLANNED_TRANSACTION,
  PLAN_SCREEN_CATEGORY_DIALOG_CONFIRM_BP,
  PLAN_SCREEN_CATEGORY_DIALOG_CURRENCY_PRESSED,
  PLAN_SCREEN_CATEGORY_DIALOG_DELETE_PRESSED,
} from './PlanCategoryDialog/planCategoryDialogAC'
import {
  EDIT_PLANNED_DAY_PRESSED,
  EDIT_PLANNED_TRANSACTION_DIALOG_CONFIRM_BP, EDIT_PLANNED_TRANSACTION_DIALOG_CURRENCY_PRESS,
  EDIT_PLANNED_TRANSACTION_DIALOG_REPEAT_EVERY_MONTH_PRESSED,
  openEditPlannedTransactionDialogAC,
} from './PlanCategoryDialog/EditPlannedTransactionDialog/editPlannedTransactionDialogAC'
import { makeGuid } from 'mfg-base/utils/makeGuid'
import {
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_ALL_FOLLOWING,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_THIS,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING,
  EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS,
} from './PlanCategoryDialog/EditPlannedTransactionActionsDialog/editPlannedTransactionActionsDialogAC' // eslint-disable-line max-len
import { equals, filterObj, ifDefined, isNumber, keys, pipe, u } from 'mfg-base/utils/utils'
import {
  PLAN_SCREEN_BACK_BUTTON_PRESSED,
  PLAN_SCREEN_CATEGORY_FACT_PRESSED, PLAN_SCREEN_CATEGORY_TITLE_PRESSED,
  PLAN_SCREEN_CURRENCY_CODE_PRESSED, PLAN_SCREEN_USER_NAME_PRESSED,
} from './planScreenAC'
import { showTransactionsDialogAC } from './ShowTransactionsDialog/showTransactionsDialogAC'
import { setBeginOfXMonth, setEndOfXMonth } from 'mfg-base/utils/dateUtils'
import {
  planScreenModuleEditPlannedTransactionSubmoduleId,
}
  from './PlanCategoryDialog/EditPlannedTransactionDialog/submoduleId'
import {
  openPickCurrencyDialog,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { planScreenModulePlanCategorySubmoduleId } from './PlanCategoryDialog/submoduleId'
import { strings } from 'mfg-base/localization'
import {
  openPickDayDialogAC,
} from 'mfg-base/modules/globalDialogsModules/PickDayDialog/pickDayDialogAC';

import type {
  PlannedTransaction,
  PlannedTransactionPeriodOverride,
} from 'mfg-base/entities/account/live/flowTypes'
import type { PlanModuleAppState, PlanModuleMiddlewareFn } from './plan.flow'
import type { AnyPlanScreenAction } from './planScreenAC'

const
  makeTransactionId = () => {
    const guid = makeGuid()
    return `${guid.substring(0, guid.length - 4)}0000`
  },
  getModuleState = (getAppState: () => PlanModuleAppState) => getAppState()[planScreenModuleId],
  planScreenMiddlewareFn: PlanModuleMiddlewareFn<AnyPlanScreenAction> = (a, getAppState) => {
    if (a.type === PICK_USER_DIALOG_DONE) {
      const { callerId, uid: pickedUid } = a
      if (callerId === planScreenModuleId) {
        return { a: dbUpdatePreferencesAC(p => p.planSelectedUid = pickedUid) }
      }
    }

    if (a.type === PLAN_SCREEN_CATEGORY_FACT_PRESSED) {
      const
        { deps: { categories, transactions } } = getModuleState(getAppState),
        { categoryId, periodIndex } = a,
        { periodStartTimestamp, computed: { selectedUid } } = getModuleState(getAppState),
        fromTimestamp = setBeginOfXMonth(periodIndex)(periodStartTimestamp),
        toTimestamp = setEndOfXMonth(periodIndex)(periodStartTimestamp),
        props = { categoryId, uid: selectedUid, fromTimestamp, toTimestamp },
        filteredTransactions = byCategporyTransactionsSelector(categories, transactions, props)

      return { a: showTransactionsDialogAC(filteredTransactions) }
    }

    if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_CONFIRM_BP) {
      const {
        deps: {
          planCategoryDialog: {
            amount,
            categoryId,
            currencyCode,
            repeatEveryMonth,
            selectedPeriodComponent: { computed: { selectedPeriod } },
            computed: {
              selectedUid,
            },
          },
          session: {
            accountEncrypted,
            encryptionPassword,
          },
        },
      } = getModuleState(getAppState)

      if (selectedUid) {
        if (isNumber(amount)) {
          let finalAmount
          const amountInCents = amount * 100
          if (accountEncrypted) {
            const
              { encryptNumber } = makeCrypt(encryptionPassword)

            finalAmount = encryptNumber(amountInCents)
          } else {
            finalAmount = amountInCents
          }

          return {
            a: updateCategoryPlanAC({
              categoryId,
              uid: selectedUid,
              period: selectedPeriod,
              plan: { amount: finalAmount, currencyCode, repeatEveryMonth },
            }),
          }
        }
        return {
          a: alertOpenAC({
            title: strings.dataNotFulfilled,
            message: strings.missingAmount,
          }),
        }
      }
      return {
        a: alertOpenAC({
          title: strings.dataNotFulfilled,
          message: strings.missingUser,
        }),
      }
    }

    if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_DELETE_PRESSED) {
      const {
          deps: {
            planCategoryDialog: {
              deps: {
                categories,
              },
              selectedPeriodComponent: { computed: { selectedPeriod } },
              computed: {
                selectedUid,
              },
              categoryId,
            },
          },
        } = getModuleState(getAppState),
        categoryTitle = categories[categoryId].title


      if (selectedUid) {
        const okAction =
          deleteCategoryPlanAC({ categoryId, uid: selectedUid, period: selectedPeriod })

        return {
          a: alertOpenAC({
            title: strings.deleteForeverTitle,
            message: strings.formatString(strings.deleteForeverMessage, categoryTitle),
            buttons: [
              {
                text: 'Ok',
                onPressAction: okAction,
              },
              {
                text: strings.no,
              },
            ],
          }),
        }
      }
    }

    if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_CONFIRM_BP) {
      const
        state = getModuleState(getAppState),
        {
          deps: {
            planCategoryDialog: {
              categoryId,
              computed: {
                selectedUid,
              },
              selectedPeriodComponent: { computed: { selectedPeriod } },
              deps: {
                editPlannedTransactionDialog: {
                  transactionId,
                  repeatEveryMonth,
                  amount,
                  comment,
                  tags,
                  repeatDay,
                  currencyCode,
                  pickedAction,
                  deps: {
                    plannedTransactions,
                  },
                },
              },
            },
            session: { accountEncrypted, encryptionPassword },
          },
        } = state

      if (selectedUid) {
        let
          finalAmount,
          finalTags,
          finalComment

        const amountInCents = amount * 100
        if (accountEncrypted) {
          const
            { encryptNumber, encryptString, encryptStringArray } = makeCrypt(encryptionPassword)

          finalAmount = encryptNumber(amountInCents)
          finalComment = encryptString(comment)
          finalTags = encryptStringArray(tags)
        } else {
          finalAmount = amountInCents
          finalComment = comment
          finalTags = tags
        }

        if (isNumber(amountInCents) && amountInCents > 0) {
          const
            plannedTransaction: PlannedTransaction = {
              id: transactionId,
              categoryId,
              uid: selectedUid,
              startDate: selectedPeriod,
              amount: finalAmount,
              day: repeatDay,
              repeatEveryMonth,
              comment: finalComment,
              tags: finalTags,
              currencyCode,
            }

          if (pickedAction === NO_ACTION) {
            return {
              a: dbUpdatePlannedTransactionAC(plannedTransaction),
            }
          } else if (pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS) {
            const
              originalTransaction = plannedTransactions[transactionId]

            if (originalTransaction.amount === amount
              && originalTransaction.day === repeatDay
              && originalTransaction.comment === comment
              && equals(originalTransaction.tags, tags)) {
              return {
                a: alertOpenAC({
                  title: strings.notAble,
                  message: strings.overrideForPlannedTransactionIsSameAsOriginalTransaction,
                }),
              }
            }
            const periodOverride: PlannedTransactionPeriodOverride = {
              amount: finalAmount,
              day: repeatDay,
              comment: finalComment,
              tags: finalTags,
            }

            return {
              a: dbUpdatePlannedTransactionsPeriodOverrideAC({
                transactionId,
                period: selectedPeriod,
                periodOverride,
              }),
            }
          } else if (pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING) {
            plannedTransaction.id = makeTransactionId()
            plannedTransaction.startDate =
              state.deps.planCategoryDialog.selectedPeriodComponent.computed.selectedPeriod

            return {
              a: dbEndPrevPlannedTransactionAndCreateNewAC({
                endPrevProps: { transactionId, period: selectedPeriod },
                plannedTransaction,
              }),
            }
          }
        } else {
          return {
            a: alertOpenAC({
              title: strings.dataNotFulfilled,
              message: strings.missingAmount,
            }),
          }
        }
      } else {
        return {
          a: alertOpenAC({
            title: strings.dataNotFulfilled,
            message: strings.missingUser,
          }),
        }
      }
    }

    if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_REPEAT_EVERY_MONTH_PRESSED) {
      const { pickedAction } = getModuleState(getAppState)
        .deps.planCategoryDialog
        .deps.editPlannedTransactionDialog

      if (pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS) {
        return {
          a: alertOpenAC({
            title: strings.blocked,
            message: strings.cantSetRepeatForPlannedTransaction,
          }),
        }
      }

      if (pickedAction === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING) {
        return {
          a: alertOpenAC({
            title: strings.blocked,
            message: strings.cantUnsetRepeatForPlannedTransaction,
          }),
        }
      }
    }

    if (
      a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_THIS ||
      a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_EDIT_ALL_FOLLOWING
    ) {
      const
        { transactionId } = getModuleState(getAppState)
          .deps.planCategoryDialog
          .deps.editPlannedTransactionActionsDialog

      return { a: openEditPlannedTransactionDialogAC(transactionId) }
    }

    if (
      a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_THIS ||
      a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_ALL_FOLLOWING
    ) {
      const
        {
          transactionId,
          deps: { plannedTransactions },
        } = getModuleState(getAppState)
          .deps.planCategoryDialog
          .deps.editPlannedTransactionActionsDialog,
        {
          selectedPeriodComponent: { computed: { selectedPeriod } },
        } = getModuleState(getAppState).deps.planCategoryDialog,
        transaction = plannedTransactions[transactionId],
        { comment, tags = [], startDate } = transaction,
        label = ifDefined(comment, tags[0])


      if (a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_THIS) {
        return {
          a: dbUpdatePlannedTransactionDeletedPeriodsAC({ transactionId, period: selectedPeriod }),
        }
      }

      if (a.type === EDIT_PLANNED_TRANSACTION_ACTIONS_DIALOG_DELETE_ALL_FOLLOWING) {
        if (startDate === selectedPeriod) {
          return {
            a: alertOpenAC({
              title: strings.deleteForeverTitle,
              message: strings.formatString(strings.deleteForeverMessage, label),
              buttons: [
                {
                  text: strings.yes,
                  onPressAction: dbDeletePlannedTransactionAC(transactionId),
                },
                { text: strings.no },
              ],
            }),
          }
        }
        return {
          a: dbUpdatePlannedTransactionEndDateAC({ transactionId, endDate: selectedPeriod }),
        }
      }
    }

    if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_ADD_PLANNED_TRANSACTION) {
      return { a: openEditPlannedTransactionDialogAC(makeTransactionId()) }
    }

    if (a.type === EDIT_PLANNED_TRANSACTION_DIALOG_CURRENCY_PRESS) {
      return {
        a: openPickCurrencyDialog({ callerId: planScreenModuleEditPlannedTransactionSubmoduleId }),
      }
    }

    if (a.type === PLAN_SCREEN_CATEGORY_DIALOG_CURRENCY_PRESSED) {
      return { a: openPickCurrencyDialog({ callerId: planScreenModulePlanCategorySubmoduleId }) }
    }

    if (a.type === PLAN_SCREEN_CATEGORY_TITLE_PRESSED) {
      const
        { deps: { categories, personalData: { preferences } } } =
          getModuleState(getAppState),
        { categoryId } = a,
        currentVal = preferences.planCollapsedCategoriesIds[categoryId],
        childrenCount = pipe(
          filterObj(({ parentId }) => parentId === categoryId),
          keys,
          keys => keys.length,
        )(categories)

      if (childrenCount || currentVal) {
        const newPlanCollapsedCategoriesIds = u(
          preferences.planCollapsedCategoriesIds,
          p => {
            if (currentVal) {
              delete p[categoryId]
            } else {
              p[categoryId] = true
            }
          },
        )
        return {
          a: dbUpdatePreferencesAC(
            p => p.planCollapsedCategoriesIds = newPlanCollapsedCategoriesIds,
          ),
        }
      }
    }

    if (a.type === PLAN_SCREEN_CURRENCY_CODE_PRESSED) {
      return { a: openPickCurrencyDialog({ callerId: planScreenModuleId }) }
    }

    if (a.type === PLAN_SCREEN_USER_NAME_PRESSED) {
      return {
        a: openPickUserDialogAC({
          callerId: planScreenModuleId,
          includeAll: true,
        }),
      }
    }

    if (a.type === EDIT_PLANNED_DAY_PRESSED) {
      return { a: openPickDayDialogAC({ callerId: planScreenModuleId }) }
    }

    if (a.type === PLAN_SCREEN_BACK_BUTTON_PRESSED) {
      return { a: navigateBackAC() }
    }

    return null
  }

export {
  planScreenMiddlewareFn,
}
