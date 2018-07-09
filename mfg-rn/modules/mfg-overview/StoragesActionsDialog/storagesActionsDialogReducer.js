/* @flow */


import { __undef } from 'mfg-base/const'
import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeUpdateDepsReducer, pipe, updateChild, us } from 'mfg-base/utils/utils'
import type { OverviewModuleReducer } from '../overview.flow'
import { OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED } from '../overviewScreenAC'
import {
  OVERVIEW_STORAGES_ACTIONS_DIALOG_DONT_SHOW_IN_SECURE_MODE_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_EDIT_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_HIDE_STORAGE_BP,
  OVERVIEW_STORAGES_ACTIONS_DIALOG_SORT_STORAGE_BP,
  OVERVIEW_STORAGE_ACTIONS_DIALOG_CLOSED,
} from './storagesActionsDialogAC'

import type { Storages } from 'mfg-base/entities/account/live/flowTypes'
import type { StorageId } from 'mfg-base/const'

type Deps = {|
  storages: Storages,
  isAdmin: bool,
|}

export type StoragesActionsDialogState = {|
  storageId: StorageId,
  storageTitle: string,
  opened: bool,
  deps: Deps,
|}

const
  depsInitialState = {
    storages: getReducerInitialState(storagesReducer),
    isAdmin: getReducerInitialState(isAdminReducer),
  },
  initialState = {
    storageId: __undef,
    storageTitle: '',
    opened: false,
    deps: depsInitialState,
  },
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    isAdmin: isAdminReducer(s.isAdmin, a),
    storages: storagesReducer(s.storages, a),
  })),
  storagesActionsDialogReducer: OverviewModuleReducer<StoragesActionsDialogState> =
    (s = initialState, a) => {
      if (a.type === OVERVIEW_STORAGE_CURRENCY_BALANCE_LONG_PRESSED) {
        return us(s, a, (s, a) => {
          s.storageTitle = s.deps.storages[a.storageId].title
          s.storageId = a.storageId
          s.opened = true
        })
      }

      if (
        a.type === OVERVIEW_STORAGE_ACTIONS_DIALOG_CLOSED
        || a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_EDIT_STORAGE_BP
        || a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_HIDE_STORAGE_BP
        || a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_SORT_STORAGE_BP
        || a.type === OVERVIEW_STORAGES_ACTIONS_DIALOG_DONT_SHOW_IN_SECURE_MODE_STORAGE_BP
      ) {
        return us(s, a, s => s.opened = false)
      }

      return pipe(
        (s) => updateChild(s, a, 'deps', depsReducer),
      )(s)
    }

export {
  storagesActionsDialogReducer,
}
