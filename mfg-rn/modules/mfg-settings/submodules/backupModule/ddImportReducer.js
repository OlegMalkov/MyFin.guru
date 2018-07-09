// @flow

import { assoc } from 'mfg-base/utils/utils'
export type State = {|
  status: 'idle' | 'parsing' | 'encrypting' | 'importing_to_firebase',
|};

const
  makeInitialState = (): State => ({
    status: 'idle',
  });

function ddImportReducer(state: State = makeInitialState(), action: Object): State {
  if (action.type === 'DD_IMPORT_PARSING_START') {
    return assoc('status', 'parsing', state);
  }
  if (action.type === 'DD_IMPORT_ENCRYPTING_ACCOUNT') {
    return assoc('status', 'encrypting', state);
  }
  if (action.type === 'DD_IMPORT_SETTING_DATA_TO_FIREBASE') {
    return assoc('status', 'importing_to_firebase', state);
  }
  if (action.type === 'DD_IMPORT_SETTING_DATA_TO_FIREBASE_DONE') {
    return assoc('status', 'idle', state);
  }

  return state;
}

export {
  ddImportReducer as default,
  makeInitialState,
};
