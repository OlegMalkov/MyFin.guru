/* @flow */

import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { DB_UPDATE_STORAGE_HIDDEN_DONE } from 'mfg-base/modules/dbModule/dbAC'
import { NAVIGATE } from 'mfg-base/modules/navModule/navAC'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us, values } from 'mfg-base/utils/utils'
import { showHiddenStoragesScreenModuleId } from './showHiddenStoragesModuleId'
import { showHiddenStoragesScreenRouteName } from './showHiddenStoragesScreenRouteName'

import type { StorageId } from 'mfg-base/const'
import type { OverviewModuleReducer } from '../../overview.flow'
import type { IdTitle } from 'mfg-base/global.flow'
import type { Storages } from 'mfg-base/entities/account/live/flowTypes'

type StorageIdTitle = IdTitle<StorageId>

type Computed = {|
  shouldShowNoStoragesLabel: bool,
  listData: Array<StorageIdTitle>
|}

type Deps = {|
  storages: Storages,
|}

export type ShowHiddenStoragesScreenState = {|
  deps: Deps,
  computed: Computed,
|}

const
  depsInitialState: Deps = {
    storages: getReducerInitialState(storagesReducer),
  },
  computedInitialState: Computed = {
    shouldShowNoStoragesLabel: true,
    listData: [],
  },
  initialState: ShowHiddenStoragesScreenState = {
    deps: depsInitialState,
    computed: computedInitialState,
  },
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => {
    return {
      storages: storagesReducer(s.storages, a),
    }
  }),
  computedReducer: OverviewModuleReducer<ShowHiddenStoragesScreenState> = (s, a) => {
    return us(s, a, s => {
      const listData = values(s.deps.storages)
        .filter(({ hidden }) => hidden)
        .map(({ id, title }) => ({ id, title }))
      s.computed = {
        shouldShowNoStoragesLabel: listData.length === 0,
        listData,
      }
    })
  },
  reducer: OverviewModuleReducer<ShowHiddenStoragesScreenState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
      s => {
        if (a.type === NAVIGATE && a.routeName === showHiddenStoragesScreenRouteName
          || a.type === DB_UPDATE_STORAGE_HIDDEN_DONE) {
          return computedReducer(s, a)
        }
        return s
      },
    )(s)
  },
  showHiddenStoragesScreenReducer: OverviewModuleReducer<ShowHiddenStoragesScreenState> =
    makeModuleReducer({ reducer, moduleId: showHiddenStoragesScreenModuleId })

export {
  showHiddenStoragesScreenReducer,
}
