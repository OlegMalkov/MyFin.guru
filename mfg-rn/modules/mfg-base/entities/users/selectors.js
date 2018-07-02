/* @flow */

import type { Users } from '../account/live/flowTypes';
import { mapObjIndexed } from '../../utils/utils';

const
  userNamesMapSelector = (users: Users) => mapObjIndexed(({ name }) => name)(users)

export {
  userNamesMapSelector,
}
