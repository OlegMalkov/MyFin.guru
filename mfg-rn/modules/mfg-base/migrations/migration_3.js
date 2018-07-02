/* @flow */

import { assoc, pipe } from '../utils/utils'
type AccountV2 = Object;
type AccountV3 = Object;
export const migration3 = (account: AccountV2): AccountV3 => {
  return pipe(
    ({ encrypted, ...rest }) => ({ live: rest, encrypted }),
    assoc('version', 3),
  )(account);
};
