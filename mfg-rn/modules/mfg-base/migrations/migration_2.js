/* @flow */

import type { UID } from '../const'
import { assoc, evolve, mapObjIndexed, pipe, when } from '../utils/utils';

type AccountV1 = Object;
type AccountV2 = Object;
export const migration2 = (account: AccountV1, uid: UID): AccountV2 => {
  return pipe(
    evolve({
      storages: mapObjIndexed(
        when(x => x.uid === undefined, assoc('uid', uid)),
      ),
    }),
    assoc('version', 2),
  )(account);
};
