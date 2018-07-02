/* @flow */

import type { BaseReducer } from '../../base.flow'
import { __undef, date0 } from '../../const'
import {
  archivedTransactionsBalanceReducer,
} from '../../entities/account/live/parts/archivedTransactionsBalanceReducer'
import { categoriesReducer } from '../../entities/account/live/parts/categoriesReducer'
import {
  mainCurrencyCodeReducer,
  undefinedCurrencyCode,
} from '../../entities/account/live/parts/mainCurrencyCodeReducer'
import { storagesReducer } from '../../entities/account/live/parts/storagesReducer'
import { transactionsReducer } from '../../entities/account/live/parts/transactionsReducer'
import { currenciesModuleReducer } from '../../entities/currencies/currenciesModuleReducer'
import { toDate12OClock } from '../../utils/dateUtils'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeUpdateDepsReducer, pipe, updateChild, us } from '../../utils/utils'
import { DB_UPDATE_TRANSACTION_DONE } from '../dbModule/dbAC'
import {
  PICK_CURRENCY_DIALOG_DONE,
} from '../globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { PICK_DATE_DONE } from '../globalDialogsModules/PickDateDialog/pickDateDialogAC'
import { nowReducer } from '../../modules/nowModule/nowReducer'
import {
  EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED, EDIT_TRANSACTION_DIALOG_CANCEL_BP,
  EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO, EDIT_TRANSACTION_DIALOG_TAGS_CHANGED,
  EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED,
} from './editTransactionDialogsAC'

import { editTransactionDialogsModuleId } from './editTransactionDialogsModuleId'

import type {
  EditTransactionDialogDeps, EditTransactionDialogState,
  TransactionDialogReducerFactoryProps,
} from './flowTypes'

const
  editTransactionCallerId = `${editTransactionDialogsModuleId}_edit_transaction`,
  transactionDialogReducerFactory = <CS>(props: TransactionDialogReducerFactoryProps<CS, *, *>) => {
    const
      {
        instanceReducer,
        addActionType,
        editActionType,
      } = props,
      depsInitialState: EditTransactionDialogDeps = {
        categories: getReducerInitialState(categoriesReducer),
        storages: getReducerInitialState(storagesReducer),
        currenciesModule: getReducerInitialState(currenciesModuleReducer),
        mainCurrencyCode: getReducerInitialState(mainCurrencyCodeReducer),
        transactions: getReducerInitialState(transactionsReducer),
        archivedTransactionsBalance: getReducerInitialState(archivedTransactionsBalanceReducer),
        now: getReducerInitialState(nowReducer),
      },
      initialState = {
        date: date0,
        transactionAmount: 0,
        currencyCode: undefinedCurrencyCode,
        tags: [],
        comment: '',
        instance: getReducerInitialState(instanceReducer),
        selectedCategoryId: __undef,
        selectedStorageId: __undef,

        id: __undef,
        isEdit: false,
        opened: false,

        deps: depsInitialState,
      },

      depsReducer: BaseReducer<EditTransactionDialogDeps> = makeUpdateDepsReducer((s, a) => ({
        currenciesModule: currenciesModuleReducer(s.currenciesModule, a),
        categories: categoriesReducer(s.categories, a),
        mainCurrencyCode: mainCurrencyCodeReducer(s.mainCurrencyCode, a),
        storages: storagesReducer(s.storages, a),
        transactions: transactionsReducer(s.transactions, a),
        archivedTransactionsBalance:
          archivedTransactionsBalanceReducer(s.archivedTransactionsBalance, a),
        now: nowReducer(s.now, a),
      })),
      reducer: BaseReducer<EditTransactionDialogState<CS>> = (s = initialState, a) => {
        return pipe(
          (s) => {
            if (a.type === addActionType) {
              const {
                currencyCode,
                storageId,
                categoryId,
              } = a

              return us(s, a, s => {
                s.id = __undef
                s.isEdit = false

                s.currencyCode = currencyCode
                s.selectedStorageId = storageId
                s.selectedCategoryId = categoryId

                s.date = s.deps.now
                s.tags = initialState.tags
                s.comment = initialState.comment
                s.transactionAmount = initialState.transactionAmount
                s.opened = true
              })
            }

            if (a.type === editActionType) {
              const { transactionId } = a
              return us(s, a, s => {
                s.id = transactionId
                s.isEdit = true
                s.opened = true

                // todo fill data for edit mode
              })
            }

            if (a.type === PICK_CURRENCY_DIALOG_DONE) {
              const { callerId } = a

              if (callerId === editTransactionCallerId) {
                return us(s, a, (s, a) => s.currencyCode = a.currencyCode)
              }
            }

            if (a.type === PICK_DATE_DONE) {
              const { callerId } = a
              if (callerId === editTransactionCallerId) {
                return us(s, a, (s, a) => s.date = toDate12OClock(a.date))
              }
            }

            if (a.type === EDIT_TRANSACTION_DIALOG_AMOUNT_CHANGED) {
              return us(s, a, (s, a) => s.transactionAmount = a.payload)
            }
            if (a.type === EDIT_TRANSACTION_DIALOG_TAGS_CHANGED) {
              return us(s, a, (s, a) => s.tags = a.tags)
            }
            if (a.type === EDIT_TRANSACTION_DIALOG_TAGS_TEXT_CHANGED) {
              return us(s, a, (s, a) => s.comment = a.tagsText)
            }
            if (a.type === EDIT_TRANSACTION_DIALOG_SET_AMOUNT_TO) {
              return us(s, a, (s, a) => s.transactionAmount = a.amount)
            }
            if (
              a.type === EDIT_TRANSACTION_DIALOG_CANCEL_BP
              || a.type === DB_UPDATE_TRANSACTION_DONE
            ) {
              return us(s, a, s => s.opened = false)
            }
            return s
          },
          (s) => {
            const newInstance = instanceReducer(s.instance, a, s)
            if (newInstance !== s.instance) {
              return us(s, a, s => s.instance = newInstance)
            }
            return s
          },
          (s) => updateChild(s, a, 'deps', depsReducer),
        )(s)
      }

    return reducer
  }

export {
  transactionDialogReducerFactory,
  editTransactionCallerId,
}
