/* @flow */

import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from 'mfg-base/utils/utils'
import { settingsScreenModuleId } from './settingsScreenModuleId'

import type { SettingsModuleReducer } from './settings.flow'

type Deps = {|
  isAdmin: bool,
|}
export type SettingsScreenState = {|
  deps: Deps,
|}

const
  initialState: SettingsScreenState = ({
    deps: {
      isAdmin: getReducerInitialState(isAdminReducer),
    },
  }),

  depsReducer: SettingsModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    isAdmin: isAdminReducer(s.isAdmin, a),
  })),
  reducer: SettingsModuleReducer<SettingsScreenState> =
    (s = initialState, a) => {
      return pipe(
        (s) => updateChild(s, a, 'deps', depsReducer),
      )(s)
    },
  settingsScreenReducer: SettingsModuleReducer<SettingsScreenState> =
    makeModuleReducer({ reducer, moduleId: settingsScreenModuleId })

export {
  settingsScreenReducer,
}
