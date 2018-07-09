/* @flow */


import { __undef, date0 } from 'mfg-base/const'
import { undefinedCurrencyCode } from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { setEndOfCurrentMonth, toDate12OClock } from 'mfg-base/utils/dateUtils'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeUpdateDepsReducer, pipe, updateChild, us } from 'mfg-base/utils/utils'
import { nowReducer } from 'mfg-base/modules/nowModule/nowReducer'
import {
  editTransactionCallerId,
} from 'mfg-base/modules/editTransactionDialogsModule/transactionModalReducerFactory'
import {
  PICK_CURRENCY_DIALOG_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import {
  PICK_DATE_DONE,
} from 'mfg-base/modules/globalDialogsModules/PickDateDialog/pickDateDialogAC'
import type { OverviewModuleReducer } from '../overview.flow'
import {
  OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED,
  OVERVIEW_TO_LEND_MONEY_BP,
} from '../overviewScreenAC'
import {
  OVERVIEW_TO_LEND_MONEY_CLOSE_DIALOG,
  OVERVIEW_TO_LEND_MONEY_DIALOG_AMOUNT_CHANGED, OVERVIEW_TO_LEND_MONEY_DIALOG_CANCEL_BP,
  OVERVIEW_TO_LEND_MONEY_DIALOG_IS_RELIABLE_PRESSED,
  OVERVIEW_TO_LEND_MONEY_STORAGE_TITLE_CHANGED, TO_LEND_MONEY_DONE,
} from './toLendMoneyDialogAC'

import type { Now } from 'mfg-base/modules/nowModule/nowReducer'
import type { CurrencyCode, MyDate, StorageId } from 'mfg-base/const'
import type { Storages } from 'mfg-base/entities/account/live/flowTypes'

type Deps = {|
  storages: Storages,
  now: Now,
|}

export type ToLendMoneyDialogState = {
  storageId: StorageId,
  amount: number,
  currencyCode: CurrencyCode,
  until: MyDate,
  title: string,
  isReliable: bool,
  opened: bool,
  deps: Deps,
  computed: {
    storageTitle: string,
  },
}

const
  depsInitialState: Deps = {
    storages: getReducerInitialState(storagesReducer),
    now: getReducerInitialState(nowReducer),
  },
  initialState = {
    amount: 0,
    until: date0,
    title: '',
    isReliable: false,

    currencyCode: undefinedCurrencyCode,

    storageId: __undef,
    opened: false,
    deps: depsInitialState,
    computed: {
      storageTitle: '',
    },
  },
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    storages: storagesReducer(s.storages, a),
    now: nowReducer(s.now, a),
  })),
  toLendMoneyDialogReducer: OverviewModuleReducer<ToLendMoneyDialogState> =
    (s = initialState, a) => {
      if (a.type === OVERVIEW_STORAGE_CURRENCY_BALANCE_PRESSED) {
        return us(s, a, (s, a) => {
          s.computed.storageTitle = s.deps.storages[a.storageId].title
          s.storageId = a.storageId
          s.currencyCode = a.currencyCode
        })
      }

      if (a.type === OVERVIEW_TO_LEND_MONEY_BP) {
        return us(s, a, s => {
          s.amount = initialState.amount
          s.until = setEndOfCurrentMonth(s.deps.now)
          s.title = initialState.title
          s.isReliable = initialState.isReliable
          s.opened = true
        })
      }

      if (a.type === OVERVIEW_TO_LEND_MONEY_STORAGE_TITLE_CHANGED) {
        return us(s, a, (s, a) => s.title = a.newTitle)
      }

      if (a.type === OVERVIEW_TO_LEND_MONEY_DIALOG_AMOUNT_CHANGED) {
        return us(s, a, (s, a) => s.amount = a.newAmount)
      }

      if (a.type === OVERVIEW_TO_LEND_MONEY_DIALOG_IS_RELIABLE_PRESSED) {
        return us(s, a, s => s.isReliable = !s.isReliable)
      }

      if (a.type === PICK_DATE_DONE) {
        const { callerId } = a
        if (callerId === editTransactionCallerId) {
          return us(s, a, (s, a) => s.until = toDate12OClock(a.date))
        }
      }

      if (a.type === PICK_CURRENCY_DIALOG_DONE) {
        const { callerId } = a
        if (callerId === editTransactionCallerId) {
          return us(s, a, (s, a) => s.currencyCode = a.currencyCode)
        }
      }

      if (
        a.type === OVERVIEW_TO_LEND_MONEY_CLOSE_DIALOG
        || a.type === OVERVIEW_TO_LEND_MONEY_DIALOG_CANCEL_BP
        || a.type === TO_LEND_MONEY_DONE
      ) {
        return us(s, a, s => s.opened = false)
      }

      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
      )(s)
    }

export {
  toLendMoneyDialogReducer,
}
