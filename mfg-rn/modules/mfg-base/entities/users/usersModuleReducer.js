/* @flow */

import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModule';
import { updateChild, pipe, filterObj } from '../../utils/utils';

import { strings } from '../../localization';
import { usersReducer } from '../account/live/parts/usersReducer';
import { personalDataReducer } from '../personalData/personalDataReducer'

import type { UID } from '../../const'
import type { Session } from '../../modules/sessionModule/flowTypes';
import type { Users } from '../account/live/flowTypes';
import type { PersonalData } from '../personalData/personalData.flow'
import type { BaseReducer } from '../../base.flow'

type Deps = {|
  users: Users,
  session: Session,
  personalData: PersonalData,
|}

export type State = {|
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    users: getReducerInitialState(usersReducer),
    session: getReducerInitialState(sessionModuleReducer),
    personalData: getReducerInitialState(personalDataReducer),
  },
  initialState: State = {
    deps: depsInitialState,
  }

const
  depsReducer: BaseReducer<Deps> = (s, a) => {
    return pipe(
      s => updateChild(s, a, 'users', usersReducer),
      s => updateChild(s, a, 'session', sessionModuleReducer),
      s => updateChild(s, a, 'personalData', personalDataReducer),
    )(s)
  },
  usersModuleReducer: BaseReducer<State> = (state = initialState, a) => {
    return pipe(
      s => updateChild(s, a, 'deps', depsReducer),
    )(state);
  },
  propsSelector = (s: State) => {
    const { deps: { users, session: { uid: sessionUid }, personalData: { name } } } = s;

    if (!sessionUid) {
      return {
        allUsers: {},
        allActiveUsers: {},
      };
    }

    if (sessionUid && users && name) {
      const allUsers = {
        ...users,
        [sessionUid]: { name },
      };

      return {
        allUsers,
        allActiveUsers: filterObj(
          (user) => user.isAnonymous === undefined ? false : true,
        )(allUsers),
      };
    }

    const allUsers = { [sessionUid]: { name: name || strings.me } }

    return {
      allUsers,
      allActiveUsers: allUsers,
    };
  },
  allUsersSelector = pipe(
    (s: State) => propsSelector(s),
    (s) => s.allUsers,
  ),
  userNameSelector = (uid: UID, s: State) => {
    const user = allUsersSelector(s)[uid]

    if (!user) {
      return 'user not found'
    }

    return user.name
  };

export {
  usersModuleReducer,
  allUsersSelector,
  userNameSelector,
};
