/* @flow */

import { categoriesReducer } from '../../entities/account/live/parts/categoriesReducer'
import { storagesReducer } from '../../entities/account/live/parts/storagesReducer'
import { usersReducer } from '../../entities/account/live/parts/usersReducer'
import { personalDataReducer } from '../../entities/personalData/personalDataReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from '../../utils/utils'
import { testModuleId } from './testModuleId'

import type { Categories, Storages, Users } from '../../entities/account/live/flowTypes'
import type { PersonalData } from '../../entities/personalData/personalData.flow'
import type { BaseReducer } from '../../base.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
  users: Users,
  personalData: PersonalData,
  session: Session,
  categories: Categories,
  storages: Storages,
|}

export type TestModuleState = {|
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
    users: getReducerInitialState(usersReducer),
    personalData: getReducerInitialState(personalDataReducer),
    session: getReducerInitialState(sessionModuleReducer),
    categories: getReducerInitialState(categoriesReducer),
    storages: getReducerInitialState(storagesReducer),
  },
  initialState: TestModuleState = {
    deps: depsInitialState,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => {
    return {
      session: sessionModuleReducer(s.session, a),
      users: usersReducer(s.users, a),
      personalData: personalDataReducer(s.personalData, a),
      session: sessionModuleReducer(s.session, a),
      categories: categoriesReducer(s.categories, a),
      storages: storagesReducer(s.storages, a),
    }
  }),
  reducer: BaseReducer<TestModuleState> = (s = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  testReducer: BaseReducer<TestModuleState> =
    makeModuleReducer({ reducer, moduleId: testModuleId})

export {
  testReducer,
}
