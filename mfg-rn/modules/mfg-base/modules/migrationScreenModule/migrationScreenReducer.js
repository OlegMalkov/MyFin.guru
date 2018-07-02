/* @flow */

import { maUidReducer } from '../../entities/personalData/maUidReducer'
import { uidReducer } from '../../entities/uidReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from '../../utils/utils'
import {
  MIGRATION_APPLYING_MIGRATION, MIGRATION_BACKUP_ACCOUNT, MIGRATION_BACKUP_ACCOUNT_FAILURE,
  MIGRATION_SAVING_MIGRATION,
} from './migrationScreenAC'
import { migrationScreenModuleId } from './migrationScreenModuleId'

import type { BaseReducer } from '../../base.flow'
import type { UID } from '../../const'

type Deps = {|
  uid: UID,
  maUid: UID,
|}

export type MigrationScreenState = {|
  status: 'idle' | 'backup' | 'applying' | 'saving' | 'fail',
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    uid: getReducerInitialState(uidReducer),
    maUid: getReducerInitialState(maUidReducer),
  },
  initialState: MigrationScreenState = {
    status: 'idle',
    deps: depsInitialState,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    uid: uidReducer(s.uid, a),
    maUid: maUidReducer(s.maUid, a),
  })),
  reducer: BaseReducer<MigrationScreenState> = (s = initialState, a) => {
    return pipe(
      s => {
        if (a.type === MIGRATION_BACKUP_ACCOUNT) {
          return us(s, a, s => s.status = 'backup')
        }

        if (a.type === MIGRATION_APPLYING_MIGRATION) {
          return us(s, a, s => s.status = 'applying')
        }

        if (a.type === MIGRATION_SAVING_MIGRATION) {
          return us(s, a, s => s.status = 'saving')
        }

        if (a.type === MIGRATION_BACKUP_ACCOUNT_FAILURE) {
          return us(s, a, s => s.status = 'fail')
        }
        return s
      },
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  migrationScreenReducer: BaseReducer<MigrationScreenState> =
    makeModuleReducer({ reducer, moduleId: migrationScreenModuleId })

export { migrationScreenReducer }
