/* @flow */

import type { BaseMiddleware } from '../base.flow'
const middlewareName: BaseMiddleware<> = () => (next) => (action) => {
  return next(action);
};

export {
  middlewareName,
}
