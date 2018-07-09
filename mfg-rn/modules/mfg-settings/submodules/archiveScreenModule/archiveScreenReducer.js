/* @flow */

import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { transactionsReducer } from 'mfg-base/entities/account/live/parts/transactionsReducer'
import { nowReducer } from 'mfg-base/modules/nowModule/nowReducer'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModuleReducer'
import {
  DB_ARCHIVE_TRANSACTIONS_DONE, DB_ARCHIVE_TRANSACTIONS_FAIL,
  DB_ARCHIVE_TRANSACTIONS_STARTED,
} from 'mfg-base/modules/dbModule/dbAC'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from 'mfg-base/utils/utils'
import { archiveScreenModuleId } from './archiveScreenModuleId'

import type { Now } from 'mfg-base/modules/nowModule/nowReducer'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'
import type { Transactions } from 'mfg-base/entities/account/live/flowTypes'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { SettingsModuleReducer } from '../../settings.flow'

type Deps = {|
  personalData: PersonalData,
  session: Session,
  transactions: Transactions,
  now: Now,
|}
export const archiveScreenStatus = {
  idle: 'idle',
  inprogress: 'inprogress',
  done: 'done',
  fail: 'fail',
}

export type ArchiveScreenStatus = $Keys<typeof archiveScreenStatus>
export type ArchiveScreenState = {|
  status: ArchiveScreenStatus,
  deps: Deps,
|}

const
  initialDepsState: Deps = {
    personalData: getReducerInitialState(personalDataReducer),
    transactions: getReducerInitialState(transactionsReducer),
    session: getReducerInitialState(sessionModuleReducer),
    now: getReducerInitialState(nowReducer),
  },
  initialState: ArchiveScreenState = {
    status: 'idle',
    deps: initialDepsState,
  },
  depsReducer: SettingsModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => {
    return {
      personalData: personalDataReducer(s.personalData, a),
      transactions: transactionsReducer(s.transactions, a),
      session: sessionModuleReducer(s.session, a),
      now: nowReducer(s.now, a),
    }
  }),
  reducer: SettingsModuleReducer<ArchiveScreenState> =
    (s = initialState, a) => {
      if (a.type === DB_ARCHIVE_TRANSACTIONS_STARTED) {
        return us(s, a, s => s.status = 'inprogress')
      }
      if (a.type === DB_ARCHIVE_TRANSACTIONS_DONE) {
        return us(s, a, s => s.status = 'done')
      }
      if (a.type === DB_ARCHIVE_TRANSACTIONS_FAIL) {
        return us(s, a, s => s.status = 'fail')
      }
      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
      )(s)
    },
  archiveScreenReducer: SettingsModuleReducer<ArchiveScreenState> =
    makeModuleReducer({ reducer, moduleId: archiveScreenModuleId })

export {
  archiveScreenReducer,
}
