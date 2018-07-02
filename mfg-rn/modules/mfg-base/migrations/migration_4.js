/* @flow */

import { assoc, evolve, mapObjIndexed, pipe } from '../utils/utils';

type AccountV2 = Object;
type AccountV3 = Object;
export const migration4 = (account: AccountV2): AccountV3 => {
  return pipe(
    evolve({
      live: {
        plans: mapObjIndexed(mapObjIndexed((plansByPeriod) => {
          const
            keys = Object.keys(plansByPeriod),
            newPlans = keys.reduce((a, key) => {
              a[key.replace('T120000', '')] = plansByPeriod[key];
              return a;
            }, {})

          return newPlans;
        })),
      },
    }),
    assoc('version', 4),
  )(account);
};
