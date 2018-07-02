/* @flow */

import {
  DB_DELETE_TRANSACTION_ACTION, DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED,
} from '../../../../modules/dbModule/dbAC'
import { assoc, dissoc } from '../../../../utils/utils';

import type { BaseReducer } from '../../../../base.flow'
import type { Transactions } from '../flowTypes';

const initialState = {};

/* TODO 3 MFG-8 rename to liveTransactions */
const transactionsReducer: BaseReducer<Transactions> = (s = initialState, a) => {
  if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
    return a.liveAccount.transactions || initialState;
  }

  if (a.type === DB_LIVE_ACCOUNT_TRANSACTION_ARRIVED) {
    const { transaction } = a;

    return assoc(transaction.id, transaction, s);
  }

  if (a.type === DB_DELETE_TRANSACTION_ACTION) {
    return dissoc((a.transactionId: any), s)
  }

  return s;
};

export {
  transactionsReducer,
}
