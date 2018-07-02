/* @flow */

import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from '../../utils/utils'
import { GEO_POSITION_RETRIEVED } from './geoAC'
import { geoModuleId } from './geoModuleId'

import type { BaseReducer } from '../../base.flow'
import type { GeoPosition } from '../../entities/account/live/flowTypes'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
|}

export type GeoModuleState = {|
  deps: Deps,
  position: ?GeoPosition,
|}

const
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
  },
  initialState: GeoModuleState = {
    deps: depsInitialState,
    position: null,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => {
    return {
      session: sessionModuleReducer(s.session, a),
    }
  }),
  reducer: BaseReducer<GeoModuleState> = (s = initialState, a) => {
    if (a.type === GEO_POSITION_RETRIEVED) {
      return us(s, a, (s, a) => s.position = a.position)
    }
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  geoReducer: BaseReducer<GeoModuleState> =
    makeModuleReducer({ reducer, moduleId: geoModuleId })

export {
  geoReducer,
}
