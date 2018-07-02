// @flow
/* eslint-disable */

/* TODO 4 MFG-39
/!* *flow *!/

// import { Crashlytics, Answers } from 'react-native-fabric'
import type { MyStore, MyDispatch, AnyAction } from '../../global.flow';
import { USER_LOGGED_IN } from '../../modules/core/actionCreators';
import { filterObj, isNumber, isString } from '../../utils';
import { uidAndMainAccountUidAndEmailSelector } from '../../reducers/selectors';
import version from '../../version'

export const answersMiddleware (store: MyStore) => (next: MyDispatch) => (a: AnyAction) => {
  const
    as = store.getState(),
    { uid, email } = uidAndMainAccountUidAndEmailSelector(as)

  if (a.type === USER_LOGGED_IN) {
    const { email, uid } = a
    /!*Crashlytics.setUserEmail(email);
    Crashlytics.setUserIdentifier(uid);
    Answers.logLogin('Email', true, { email, uid, version });*!/
  }

  const
    { type, tagsText, text, comment, ...rest } = a,
    args = filterObj(v => isString(v) || isNumber(v), rest)

  // Answers.logCustom(a.type, { uid, email, version });

  return next(a);
};
*/
