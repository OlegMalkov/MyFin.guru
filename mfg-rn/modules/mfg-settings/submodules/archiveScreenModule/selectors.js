/* @flow */

import { transactionsSelector } from 'mfg-base/entities/account/live/transactionsSelectors'
import { __undef, date0 } from 'mfg-base/const'
import { setBeginOfPrevMonth } from 'mfg-base/utils/dateUtils'

import type { Transactions } from 'mfg-base/entities/account/live/flowTypes'
import type { Now } from 'mfg-base/modules/nowModule/nowReducer'

export const
  getTransactionIdsToArchive = (transactions: Transactions, now: Now) => {
    const
      fromBeginTillStartOfPrevMonthIntervalProps = {
        fromTimestamp: date0,
        toTimestamp: setBeginOfPrevMonth(now),
        uid: __undef,
      }

    return transactionsSelector(
      transactions,
      fromBeginTillStartOfPrevMonthIntervalProps,
    )
  }
