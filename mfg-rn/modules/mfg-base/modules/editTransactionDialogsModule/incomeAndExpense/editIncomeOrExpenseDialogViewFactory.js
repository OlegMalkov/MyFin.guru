/* @flow */

import React from 'react'
import { RNView } from '../../../ui/RNUI'
import { RNText } from '../../../ui/RNUI'
import { balanceToMainCurrency } from '../../../entities/account/utils'
import { toMoneyFloat } from '../../../utils/format'
import { renderStorageWithBalance } from '../renderStorageWithBalance'
import { transactionDialogViewFactory } from '../transactionModalViewFactory'

const
  editIncomeOrExpenseDialogViewFactory =
    (transactionType: 'income' | 'expense') =>
      transactionDialogViewFactory({
        DirectionComponent: ({ state }) => {
          let inMainCurrencyRow = null
          if (state.currencyCode !== state.deps.mainCurrencyCode) {
            const inMainCurrency = balanceToMainCurrency(
              { [state.currencyCode]: state.transactionAmount },
              state.deps.currenciesModule,
            )
            if (inMainCurrency > 0) {
              inMainCurrencyRow = (
                <RNText style={{ fontSize: 16, textAlign: 'right', marginTop: -15 }}>
                  = {toMoneyFloat(inMainCurrency)}{state.deps.mainCurrencyCode}
                </RNText>
              )
            }
          }

          const
            {
              deps: {
                transactions,
                storages,
                archivedTransactionsBalance,
              },
            } = state,
            storageViewPart = renderStorageWithBalance({
              transactions,
              storages,
              archivedTransactionsBalance,
              key: 'storage',
              title: state.instance.storage,
              storageId: state.selectedStorageId,
              currencyCode: state.currencyCode,
            }),
            dividerViewPart = <RNText key="divider"> {'->'} </RNText>,
            categoryViewPart = (
              <RNText key="category" style={{ fontSize: 14 }}>
                {state.instance.toCategory}
              </RNText>
            ),
            viewParts = transactionType === 'expense' ? [
              storageViewPart,
              dividerViewPart,
              categoryViewPart,
            ] : [
              categoryViewPart,
              dividerViewPart,
              storageViewPart,
            ]

          return (
            <RNView>
              {inMainCurrencyRow}
              <RNView>
                {viewParts}
              </RNView>
            </RNView>
          )
        },
        transactionType,
      })

export {
  editIncomeOrExpenseDialogViewFactory,
}
