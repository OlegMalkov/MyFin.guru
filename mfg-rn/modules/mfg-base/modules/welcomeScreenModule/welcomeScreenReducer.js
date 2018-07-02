/* @flow */

import type { BaseReducer } from '../../base.flow'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from '../../utils/utils'
import { welcomeScreenModuleId } from './welcomeScreenModuleId'

import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
|}

export type WelcomeScreenModuleState = {|
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
  },
  initialState: WelcomeScreenModuleState = {
    deps: depsInitialState,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => {
    return {
      session: sessionModuleReducer(s.session, a),
    }
  }),
  reducer: BaseReducer<WelcomeScreenModuleState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  welcomeScreenReducer: BaseReducer<WelcomeScreenModuleState> =
    makeModuleReducer({ reducer, moduleId: welcomeScreenModuleId })

export {
  welcomeScreenReducer,
}
