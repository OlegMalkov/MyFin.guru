/* @flow */

import { transactionsReducer } from '../../entities/account/live/parts/transactionsReducer'
import { maUidReducer } from '../../entities/personalData/maUidReducer'
import { uidReducer } from '../../entities/uidReducer'
import { platformReducer } from '../../rn/platformReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import {
  makeUpdateDepsReducer, pipe, updateChild, updateStateIfChanged,
  us,
} from '../../utils/utils'
import { nativeAppStateReducer, NativeAppStates } from '../nativeAppState/nativeAppStateReducer'
import { networkIsConnectedReducer } from '../networkIsConnected/networkIsConnectedReducer'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'
import { DB_IS_OFFLINE, DB_IS_ONLINE } from './dbAC'
import { dbModuleId } from './dbModuleId'

import type { RNPlatform } from '../../rn/rnAC'
import type { Transactions } from '../../entities/account/live/flowTypes'
import type { BaseReducer } from '../../base.flow'
import type { UID } from '../../const'
import type { NativeAppState } from '../nativeAppState/nativeAppStateReducer'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  uid: UID,
  maUid: UID,
  session: Session,
  nativeAppState: NativeAppState,
  networkIsConnected: bool,
  liveTransactions: Transactions,
  platform: RNPlatform
|}

export type DbModuleState = {|
  isOnline: bool,
  deps: Deps,
  computed: {
    shouldGoOnline: bool,
    shouldGoOffline: bool
  },
|}

const
  depsInitialState: Deps = {
    uid: getReducerInitialState(uidReducer),
    maUid: getReducerInitialState(maUidReducer),
    session: getReducerInitialState(sessionModuleReducer),
    nativeAppState: getReducerInitialState(nativeAppStateReducer),
    networkIsConnected: getReducerInitialState(networkIsConnectedReducer),
    liveTransactions: getReducerInitialState(transactionsReducer),
    platform: getReducerInitialState(platformReducer),
  },
  initialState: DbModuleState = {
    isOnline: false,
    deps: depsInitialState,
    computed: {
      shouldGoOnline: false,
      shouldGoOffline: false,
    },
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    uid: uidReducer(s.uid, a),
    maUid: maUidReducer(s.maUid, a),
    session: sessionModuleReducer(s.session, a),
    nativeAppState: nativeAppStateReducer(s.nativeAppState, a),
    networkIsConnected: networkIsConnectedReducer(s.networkIsConnected, a),
    liveTransactions: transactionsReducer(s.liveTransactions, a),
    platform: platformReducer(s.platform, a),
  })),
  reducer: BaseReducer<DbModuleState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
      cs => updateStateIfChanged(s, cs, a, s => {
        /* TODO 5 MFG-21 optimize will be called on every new transaction */
        s.computed.shouldGoOnline =
          s.deps.nativeAppState === NativeAppStates.active && s.deps.networkIsConnected
        s.computed.shouldGoOffline = s.deps.nativeAppState === NativeAppStates.background
          || !s.deps.networkIsConnected
      }),
      s => {
        if (a.type === DB_IS_ONLINE) {
          return us(s, a, s => s.isOnline = true)
        }

        if (a.type === DB_IS_OFFLINE) {
          return us(s, a, s => s.isOnline = false)
        }

        return s
      },
    )(s)
  },
  dbModuleReducer: BaseReducer<DbModuleState> =
    makeModuleReducer({ reducer, moduleId: dbModuleId })

export {
  dbModuleReducer,
}
