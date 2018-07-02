/* @flow */

import type { BaseReducer } from '../../../base.flow'
import type { UID } from '../../../const'
import { __undef } from '../../../const'
import { usersReducer } from '../../../entities/account/live/parts/usersReducer'
import type { PersonalData } from '../../../entities/personalData/personalData.flow'
import { personalDataReducer } from '../../../entities/personalData/personalDataReducer'
import { strings } from '../../../localization'
import { allUserNamesMapSelector } from '../../../selectors'
import { getReducerInitialState } from '../../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../../utils/makeReducer'
import {
  makeUpdateDepsReducer,
  mapObjIndexed, pipe, updateChild, updateStateIfChanged, us,
  values,
} from '../../../utils/utils'
import type { Session } from '../../sessionModule/flowTypes'
import { sessionModuleReducer } from '../../sessionModule/sessionModuleReducer'
import {
  OPEN_PICK_USER_DIALOG, PICK_USER_DIALOG_CANCEL, PICK_USER_DIALOG_DONE,
} from './pickUserDialogAC'
import { pickUserDialogModuleId } from './pickUserDialogModuleId'

import type { Values } from '../../../ui/PickerDialog'
import type { Users } from '../../../entities/account/live/flowTypes'

type Deps = {|
  session: Session,
  personalData: PersonalData,
  users: Users,
|}

export type PickUserDialogState = {|
  opened: bool,
  includeAll: bool,
  callerId: string,
  deps: Deps,
  computed: {|
    values: Values<UID>,
  |}
|}

const
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
    users: getReducerInitialState(usersReducer),
  },
  initialState: PickUserDialogState = {
    opened: false,
    includeAll: false,
    callerId: __undef,
    deps: depsInitialState,
    computed: {
      values: [],
    },
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
    users: usersReducer(s.users, a),
  })),
  reducer: BaseReducer<PickUserDialogState> = (s = initialState, a) => {
    return pipe(
      s => {
        if (a.type === OPEN_PICK_USER_DIALOG) {
          return us(s, a, (s, a) => {
            const { includeAll, callerId } = a

            s.opened = true
            s.includeAll = includeAll
            s.callerId = callerId
          })
        }

        if (a.type === PICK_USER_DIALOG_DONE || a.type === PICK_USER_DIALOG_CANCEL) {
          return us(s, a, s => s.opened = false)
        }

        return s
      },
      s => updateChild(s, a, 'deps', depsReducer),
      cs => updateStateIfChanged(s, cs, a, s => {
        const { deps: { session, personalData, users } } = s
        s.computed.values = pipe(
          mapObjIndexed((name, uid) => ({ label: name, value: uid })),
          values,
        )(allUserNamesMapSelector({ session, personalData, users }))
        if (s.includeAll) {
          s.computed.values.push({ label: strings.allUsers, value: __undef })
        }
      }),
    )(s)
  },
  pickUserDialogReducer: BaseReducer<PickUserDialogState> =
    makeModuleReducer({ reducer, moduleId: pickUserDialogModuleId })

export {
  pickUserDialogReducer,
}
