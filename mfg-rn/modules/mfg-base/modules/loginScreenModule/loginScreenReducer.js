/* @flow */

import { personalDataReducer } from '../../entities/personalData/personalDataReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import {
  makeUpdateDepsReducer, pipe, updateChild, updateStateIfChanged, us,
} from '../../utils/utils'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModule'
import { LOGIN_SCREEN_EMAIL_CHANGED, LOGIN_SCREEN_PASSWORD_CHANGED } from './loginScreenAC'
import { loginScreenModuleId } from './loginScreenModuleId'

import type { BaseReducer } from '../../base.flow'
import type { PersonalData } from '../../entities/personalData/personalData.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
  personalData: PersonalData,
|}

type Computed = {|
  email: string,
  password: string,
|}

export type LoginScreenState = {|
  deps: Deps,
  email: string,
  password: string,
  computed: Computed
|}

const
  computedInitialState: Computed = {
    email: '',
    password: '',
  },
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
  },
  initialState: LoginScreenState = ({
    deps: depsInitialState,
    email: '',
    password: '',
    computed: computedInitialState,
  }),
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
  })),
  reducer: BaseReducer<LoginScreenState> =
    (s = initialState, a) => {
      return pipe(
        s => {
          if (a.type === LOGIN_SCREEN_EMAIL_CHANGED) {
            return us(s, a, (s, a) => s.email = a.email)
          }
          if (a.type === LOGIN_SCREEN_PASSWORD_CHANGED) {
            return us(s, a, (s, a) => s.password = a.password)
          }
          return s
        },
        s => updateChild(s, a, 'deps', depsReducer),
        cs => updateStateIfChanged(s, cs, a, s => {
          s.computed.password = s.password || s.deps.session.password
          s.computed.email = s.email || s.deps.session.email
        }),
      )(s)
    },
  loginScreenModuleReducer: BaseReducer<LoginScreenState> =
    makeModuleReducer({ reducer, moduleId: loginScreenModuleId })

export {
  loginScreenModuleReducer,
}
