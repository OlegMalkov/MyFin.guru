/* @flow */

import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from '../../utils/utils'
import { moduleNameModuleId } from './moduleNameModuleId'

import type { BaseReducer } from '../../base.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
|}

export type ModuleNameModuleState = {|
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
  },
  initialState: ModuleNameModuleState = {
    deps: depsInitialState,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => {
    return {
      session: sessionModuleReducer(s.session, a),
    }
  }),
  reducer: BaseReducer<ModuleNameModuleState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  moduleNameReducer: BaseReducer<ModuleNameModuleState> =
    makeModuleReducer({ reducer, moduleId: moduleNameModuleId})

export {
  moduleNameReducer,
}
