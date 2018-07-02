/* @flow */

import { __undef } from '../../../const'
import { undefinedCurrencyCode } from '../../../entities/account/live/parts/mainCurrencyCodeReducer'
import { pipe, us } from '../../../utils/utils'
import {
  PICK_CURRENCY_DIALOG_DONE,
} from '../../globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import {
  EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED, OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG,
  OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG,
} from '../editTransactionDialogsAC'
import { editTransactionDialogsModuleId } from '../editTransactionDialogsModuleId'

import type { AnyBaseAction, BaseReducer } from '../../../base.flow'
import type { ExReducer } from '../../../global.flow'
import type { CurrencyCode } from '../../../const'
import type { EditTransactionDialogState } from '../flowTypes'
import { transactionDialogReducerFactory } from '../transactionModalReducerFactory'

type ExchangeInstanceState = {|
  targetCurrencyCode: CurrencyCode,
  targetStorageId: string,
  targetAmount: number,
  exchangeRateMarketStr: string,
  exchangeRateActualStr: string,
|}

export type ExchangeDialogState = EditTransactionDialogState<ExchangeInstanceState>

const
  editTransactionExchangeCallerId = `${editTransactionDialogsModuleId}_edit_transaction_exchange`,
  invalidRate = '-',
  roundDecimal3 = (decimal) => {
    const result = Math.round(decimal * 1000) / 1000

    if (result !== result || result === Infinity || result === 0) { // eslint-disable-line
      return '-'
    }

    return result
  },
  exchangeReducer: ExReducer<ExchangeInstanceState, ExchangeDialogState, AnyBaseAction> =
    (s, a, cs) => {
      if (s === undefined) {
        return {
          targetAmount: 0,
          targetCurrencyCode: undefinedCurrencyCode,
          targetStorageId: __undef,
          exchangeRateMarketStr: invalidRate,
          exchangeRateActualStr: invalidRate,
        }
      }

      return pipe(
        s => {
          if (a.type === OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG) {
            return us(s, a, (s, a) => {
              const { targetStorageId, targetCurrencyCode } = a
              s.targetStorageId = targetStorageId
              s.targetCurrencyCode = targetCurrencyCode
            })
          }

          if (a.type === EDIT_TRANSACTION_DIALOG_EXCHANGE_DIALOG_AMOUNT_CHANGED) {
            return us(s, a, (s, a) => s.targetAmount = a.payload)
          }

          if (a.type === PICK_CURRENCY_DIALOG_DONE) {
            const { callerId } = a
            if (callerId === editTransactionExchangeCallerId) {
              return us(s, a, (s, a) => s.targetCurrencyCode = a.currencyCode)
            }
          }
          return s
        },
        s => {
          return s;
          // TODO 1 MFG-73 Add exchange transaction should have computer,
          // but calculates values for every action
          /* const
            { deps: { currenciesModule }, currencyCode, transactionAmount } = cs,
            { targetCurrencyCode, targetAmount } = s

          if (targetCurrencyCode && currencyCode) {
            const
              currencyFromRate = currenciesModule.computed.liveRates[currencyCode],
              currencyToRate = currenciesModule.computed.liveRates[targetCurrencyCode],
              actualRateTo = roundDecimal3(targetAmount / transactionAmount),
              actualRateBack = roundDecimal3(transactionAmount / targetAmount)

            return us(s, a, s => {
              const
                from = roundDecimal3(currencyFromRate / currencyToRate),
                to = roundDecimal3(currencyToRate / currencyFromRate)

              s.exchangeRateMarketStr = `${from}/${to}`
              s.exchangeRateActualStr = `${actualRateTo}/${actualRateBack}`
            })
          }

          return s*/
        },
      )(s)
    },
  editExchangeDialogReducer: BaseReducer<ExchangeDialogState> =
    /* $FlowOk */
    transactionDialogReducerFactory({
      instanceReducer: exchangeReducer,
      addActionType: OPEN_ADD_EXCHANGE_TRANSACTION_DIALOG,
      editActionType: OPEN_EDIT_EXCHANGE_TRANSACTION_DIALOG,
      transactionType: 'exchange',
    })

export {
  editExchangeDialogReducer,
  editTransactionExchangeCallerId,
}
