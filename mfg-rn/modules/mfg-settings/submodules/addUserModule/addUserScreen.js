// @flow

/* eslint-disable */

/* TODO 4 MFG-63 add user

import { evolve } from '../../utils';

export type State = {|
  status: 'reading_id' | 'waiting_user_reply',
  userId: ?string
|};

const
  makeInitialState = (): State => ({
    status: 'reading_id',
    userId: null,
  });

function addUserReducer(state: State = makeInitialState(), action: Object): State {
  if (action.type === 'ADD_USER_ID_READED') {
    return evolve({
      status: () => 'waiting_user_reply',
      userId: () => action.payload,
    })(state);
  }

  if (action.type === 'ADD_USER_FINISH') {
    return makeInitialState();
  }
  return state;
}

export { addUserReducer }
*/
