/* @flow */

import { toZoneLessDateTime } from '../utils/dateUtils';
import { assoc, evolve, mapObjIndexed, pipe } from '../utils/utils';

type AccountV0 = Object;
type AccountV1 = Object;
export const migration1 = (account: AccountV0): AccountV1 => {
  return pipe(
    evolve({
      transactions: mapObjIndexed(evolve({ date: toZoneLessDateTime })),
    }),
    assoc('version', 1),
  )(account);
};
