/* @flow */

import { personalDataReducer } from '../../entities/personalData/personalDataReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from '../../utils/utils'
import {
  DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE,
  DB_GET_ACCOUNT_VERSION, DB_GET_ACCOUNT_VERSION_DONE, DB_GET_LIVE_ACCOUNT,
  DB_GET_LIVE_ACCOUNT_DONE, DB_GET_PERSONAL_DATA,
} from '../dbModule/dbAC'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModule'
import { initModuleId } from './initModuleId'

import type { BaseReducer } from '../../base.flow'
import type { PersonalData } from '../../entities/personalData/personalData.flow'
import type { AccountDataVersion } from '../../version'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  personalData: PersonalData,
  session: Session,
|}

export const
  APP_STATUS_JUST_OPENED: 'APP_STATUS_JUST_OPENED' = 'APP_STATUS_JUST_OPENED',
  // Because we need main account uid to fetch account data
  APP_STATUS_LOADING_PERSONAL_DATA: 'APP_STATUS_LOADING_PERSONAL_DATA' =
    'APP_STATUS_LOADING_PERSONAL_DATA',
  APP_STATUS_LOADING_ACCOUNT_VERSION: 'APP_STATUS_LOADING_ACCOUNT_VERSION' =
    'APP_STATUS_LOADING_ACCOUNT_VERSION',
  APP_STATUS_LOADING_LIVE_ACCOUNT: 'APP_STATUS_LOADING_LIVE_ACCOUNT' =
    'APP_STATUS_LOADING_LIVE_ACCOUNT',
  READY_TO_WORK: 'READY_TO_WORK' = 'READY_TO_WORK'

export type AppStatus =
  typeof APP_STATUS_JUST_OPENED
  | typeof APP_STATUS_LOADING_PERSONAL_DATA
  | typeof APP_STATUS_LOADING_ACCOUNT_VERSION
  | typeof APP_STATUS_LOADING_LIVE_ACCOUNT
  | typeof READY_TO_WORK

export type InitModuleState = {|
  status: AppStatus,
  accountDataVersion: AccountDataVersion,
  accountEncrypted: bool,
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    personalData: getReducerInitialState(personalDataReducer),
    session: getReducerInitialState(sessionModuleReducer),
  },
  initialState: InitModuleState = {
    status: APP_STATUS_JUST_OPENED,
    accountEncrypted: false,
    accountDataVersion: -1,
    deps: depsInitialState,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    personalData: personalDataReducer(s.personalData, a),
    session: sessionModuleReducer(s.session, a),
  })),
  reducer: BaseReducer<InitModuleState> = (s = initialState, a) => {
    if (a.type === DB_GET_PERSONAL_DATA) {
      return us(s, a, s => s.status = APP_STATUS_LOADING_PERSONAL_DATA)
    }

    if (a.type === DB_GET_ACCOUNT_VERSION) {
      return us(s, a, s => s.status = APP_STATUS_LOADING_ACCOUNT_VERSION)
    }

    if (a.type === DB_GET_ACCOUNT_VERSION_DONE) {
      return us(s, a, (s, a) => {
        s.accountDataVersion = a.accountDataVersion
      })
    }

    if (a.type === DB_GET_ACCOUNT_ENCRYPTION_STATUS_DONE) {
      return us(s, a, (s, a) => {
        s.accountEncrypted = a.encrypted
      })
    }

    if (a.type === DB_GET_LIVE_ACCOUNT) {
      return us(s, a, s => s.status = APP_STATUS_LOADING_LIVE_ACCOUNT)
    }

    if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
      return us(s, a, s => s.status = READY_TO_WORK)
    }

    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  initModuleReducer: BaseReducer<InitModuleState> =
    makeModuleReducer({ reducer, moduleId: initModuleId })

export {
  initModuleReducer,
}
