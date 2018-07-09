/* @flow */

import React from 'react'
import { RNNoChildView, RNView } from 'mfg-base/ui/RNUI'
import { TransactionsList } from 'mfg-base/ui/TransactionsList/TransactionsList'

import type { PlanModuleDispatch } from '../plan.flow'
import type { ShowTransactionsDialogState } from './showTransactionsDialogReducer'

type Props = {|
  state: ShowTransactionsDialogState,
  dispatch: PlanModuleDispatch,
|}

const
  ShowTransactionsDialog = ({ state: { computed: { transactionsListProps } } }: Props) => {
    if (!transactionsListProps) {
      return <RNNoChildView/>
    }
    return (
      <RNView>
        <TransactionsList transactionsProps={transactionsListProps}/>
      </RNView>
    )
  }

export {
  ShowTransactionsDialog,
}
