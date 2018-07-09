/* @flow */

import { usersReducer } from 'mfg-base/entities/account/live/parts/usersReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from 'mfg-base/utils/utils'
import { usersScreenModuleId } from './usersScreenModuleId'

import type { Users } from 'mfg-base/entities/account/live/flowTypes'
import type { SettingsModuleReducer } from '../../settings.flow'

type Deps = {|
  users: Users,
|}
export type UsersScreenState = {|
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    users: getReducerInitialState(usersReducer),
  },
  initialState: UsersScreenState = ({
    deps: depsInitialState,
  }),

  depsReducer: SettingsModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    users: usersReducer(s.users, a),
  })),
  reducer: SettingsModuleReducer<UsersScreenState> =
    (s = initialState, a) => {
      return pipe(
        (s) => updateChild(s, a, 'deps', depsReducer),
      )(s)
    },
  usersScreenReducer: SettingsModuleReducer<UsersScreenState> =
    makeModuleReducer({ reducer, moduleId: usersScreenModuleId })

export {
  usersScreenReducer,
}
