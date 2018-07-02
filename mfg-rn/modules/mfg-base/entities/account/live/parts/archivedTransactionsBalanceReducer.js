/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { ArchivedTransactionsBalance } from '../flowTypes';

const initialState = {};

const
  archivedTransactionsBalanceReducer: BaseReducer<ArchivedTransactionsBalance> =
    (s = initialState, a) => {
      if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
        return a.liveAccount.archivedTransactionsBalance || initialState;
      }

      if (a.type === DB_LIVE_ACCOUNT_ARCHIVED_TRANSACTIONS_BALANCE_ARRIVED) {
        return a.value || initialState;
      }

      return s;
    };

export {
  archivedTransactionsBalanceReducer,
}
