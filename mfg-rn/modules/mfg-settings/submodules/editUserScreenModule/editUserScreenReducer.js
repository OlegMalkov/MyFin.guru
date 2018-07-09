/* @flow */


import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule'
import { __undef } from 'mfg-base/const'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from 'mfg-base/utils/utils'
import { EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED } from './editUserScreenAC'
import { editUserScreenModuleId } from './editUserScreenModuleId'

import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { UID } from 'mfg-base/const'
import type { SettingsModuleReducer } from '../../settings.flow'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
  personalData: PersonalData,
|}

export type EditUserScreenState = {|
  moveTargetUserUid: UID,
  deps: Deps
|};

const
  depsInitialState = {
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
  },
  initialState: EditUserScreenState = ({
    moveTargetUserUid: __undef,
    deps: depsInitialState,
  }),
  depsReducer: SettingsModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    personalData: personalDataReducer(s.personalData, a),
    session: sessionModuleReducer(s.session, a),
  })),
  reducer: SettingsModuleReducer<EditUserScreenState> = (s = initialState, a) => {
    if (a.type === EDIT_USER_MOVE_TRANSACTIONS_TARGET_USER_ID_CHANGED) {
      return us(s, a, (s, a) => s.moveTargetUserUid = a.uid)
    }

    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(s);
  },
  editUserScreenReducer: SettingsModuleReducer<EditUserScreenState> =
    makeModuleReducer({ reducer, moduleId: editUserScreenModuleId })

export {
  editUserScreenReducer,
}
