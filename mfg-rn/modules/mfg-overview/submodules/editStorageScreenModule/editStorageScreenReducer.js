/* @flow */

import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { storagesSortReducer } from 'mfg-base/entities/account/live/parts/storagesSortReducer'
import { usersReducer } from 'mfg-base/entities/account/live/parts/usersReducer'
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { userNameSelector, usersModuleReducer } from 'mfg-base/entities/users/usersModuleReducer'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule'
import { __undef } from 'mfg-base/const'
import { PICK_CURRENCY_DIALOG_DONE } from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { PICK_USER_DIALOG_DONE } from 'mfg-base/modules/globalDialogsModules/PickUserDialog/pickUserDialogAC'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import {
  makeUpdateDepsReducer, pipe, toEditableBalance, updateChild, updateStateIfChanged,
  us,
} from 'mfg-base/utils/utils'
import { editStorageScreenModuleId } from './editStorageScreenModuleId'
import {
  ADD_STORAGE, EDIT_STORAGE,
  EDIT_STORAGE_TYPE_PRESSED,
  EDIT_STORAGE_INITIAL_BALANCE_CHANGED,
  EDIT_STORAGE_LIMIT_BALANCE_CHANGED, EDIT_STORAGE_TITLE_CHANGED,
} from './editStorageScreenAC'

import type {
  AStorage,
  Balance, Storages, StoragesSort,
  Users,
} from 'mfg-base/entities/account/live/flowTypes'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'
import type { StorageId, UID } from 'mfg-base/const'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { OverviewModuleReducer } from '../../overview.flow'
import type { AnyOverviewScreenAction } from '../../overviewScreenAC'
import type { State as UsersModule } from 'mfg-base/entities/users/usersModuleReducer'

type Deps = {|
  session: Session,
  users: Users,
  personalData: PersonalData,
  storagesSort: StoragesSort,
  storages: Storages,
  usersModule: UsersModule,
|}

export type EditStorageScreenState = {|
  id: StorageId,
  title: string,
  type: 'debit' | 'credit' | 'debt',
  uid: UID,
  initialBalance: Balance,
  limitBalance: Balance,
  hidden: bool,
  showInSecureMode: bool,
  // debt only
  until: ?string,
  deps: Deps,
  computed: {|
    userName: string,
  |},
|}

const
  depsInitialState: Deps = {
    usersModule: getReducerInitialState(usersModuleReducer),
    storages: getReducerInitialState(storagesReducer),
    session: getReducerInitialState(sessionModuleReducer),
    users: getReducerInitialState(usersReducer),
    personalData: getReducerInitialState(personalDataReducer),
    storagesSort: getReducerInitialState(storagesSortReducer),
  },
  editStorageInitialState: EditStorageScreenState = {
    id: __undef,
    title: '',
    type: 'debit',
    initialBalance: {},
    limitBalance: {},
    hidden: false,
    showInSecureMode: false,
    until: null,
    uid: __undef,
    deps: depsInitialState,
    computed: {
      userName: '',
    },
  },
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
    users: usersReducer(s.users, a),
    storages: storagesReducer(s.storages, a),
    storagesSort: storagesSortReducer(s.storagesSort, a),
    usersModule: usersModuleReducer(s.usersModule, a),
  })),
  reducer: OverviewModuleReducer<EditStorageScreenState> =
    (s = editStorageInitialState, a: AnyOverviewScreenAction) => {
      return pipe(
        s => {
          /* TODO 4 MFG-49 should be executed only when screen is active*/
          if (a.type === EDIT_STORAGE_TITLE_CHANGED) {
            return us(s, a, (s, a) => s.title = a.newTitle)
          }
          if (a.type === EDIT_STORAGE_TYPE_PRESSED) {
            const changeMap = {
              debit: 'credit',
              credit: 'debit',
              debt: 'debit',
            }
            return us(s, a, s => s.type = changeMap[s.type] || s.type)
          }

          if (a.type === ADD_STORAGE || a.type === EDIT_STORAGE) {
            return us(s, a, (s, a) => {
              const
                { deps: { storages } } = s,
                { until: defaultUntil } = editStorageInitialState,
                storage: AStorage = a.type === ADD_STORAGE ? {
                  // Dummy data for addStorage
                  id: a.newStorageId,
                  type: 'debit',
                  title: '',
                  initialBalance: {},
                  uid: s.deps.session.uid,
                  hidden: false,
                  showInSecureMode: true,
                } : storages[a.storageId],
                { id, type, title, initialBalance, uid, hidden, showInSecureMode } = storage,
                limitBalance =
                  storage.type === 'credit' ? toEditableBalance(storage.limitBalance) : {}

              s.id = id
              s.type = type
              s.title = title
              s.initialBalance = toEditableBalance(initialBalance)
              s.limitBalance = limitBalance
              /* TODO 2 MFG-50 add hidden edit in ui */
              s.hidden = hidden
              /* TODO 2 MFG-51 add showInSecureMode edit in ui */
              s.showInSecureMode = showInSecureMode
              s.uid = uid
              s.until = storage.type === 'debt' ? storage.until : defaultUntil
            })
          }

          if (a.type === EDIT_STORAGE_INITIAL_BALANCE_CHANGED) {
            return us(s, a, (s, a) => {
              s.initialBalance[a.currencyCode] =
                (s.type === 'credit' && a.value > 0) ? -a.value : a.value
            })
          }

          if (a.type === EDIT_STORAGE_LIMIT_BALANCE_CHANGED) {
            return us(s, a, (s, a) => s.limitBalance[a.currencyCode] = a.value)
          }

          if (a.type === PICK_CURRENCY_DIALOG_DONE) {
            const { callerId } = a
            if (callerId === editStorageScreenModuleId) {
              return us(s, a, (s, a) => {
                s.initialBalance[a.currencyCode] = 0
              })
            }
          }

          if (a.type === PICK_USER_DIALOG_DONE) {
            const { callerId } = a
            if (callerId === editStorageScreenModuleId) {
              return us(s, a, (s, a) => {
                s.uid = a.uid
              })
            }
          }

          return s
        },
        cs => updateStateIfChanged(s, cs, a, s => {
          s.computed.userName = userNameSelector(s.uid, s.deps.usersModule)
        }),
        s => updateChild(s, a, 'deps', depsReducer),
      )(s)
    },
  editStorageReducer: OverviewModuleReducer<EditStorageScreenState> =
    makeModuleReducer({ reducer, moduleId: editStorageScreenModuleId })

export {
  editStorageReducer,
}
