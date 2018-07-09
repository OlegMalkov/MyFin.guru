/* @flow */

import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer';
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from 'mfg-base/utils/utils'
import { PERSONAL_USER_NAME_INPUT_CHANGED } from './personalDataScreenAC';
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule';
import { personalDataScreenModuleId } from './personalDataScreenModuleId'

import type { SettingsModuleReducer } from '../../settings.flow'
import type { Categories } from 'mfg-base/entities/account/live/flowTypes';
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes';

type Deps = {|
  categories: Categories,
  personalData: PersonalData,
  session: Session,
|}

export type PersonalDataScreenState = {|
  deps: Deps,
  editName: string,
|};

const
  depsInitialState: Deps = {
    categories: getReducerInitialState(categoriesReducer),
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
  },
  initialState: PersonalDataScreenState = ({
    deps: depsInitialState,
    editName: '',
  }),
  depsReducer: SettingsModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    categories: categoriesReducer(s.categories, a),
    personalData: personalDataReducer(s.personalData, a),
    session: sessionModuleReducer(s.session, a),
  })),
  reducer: SettingsModuleReducer<PersonalDataScreenState> =
    (s = initialState, a) => {
      if (a.type === PERSONAL_USER_NAME_INPUT_CHANGED) {
        return us(s, a, (s, a) => s.editName = a.userName)
      }

      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
      )(s);
    },
  personalDataScreenReducer: SettingsModuleReducer<PersonalDataScreenState> =
    makeModuleReducer({ reducer, moduleId: personalDataScreenModuleId })

export {
  personalDataScreenReducer,
}
