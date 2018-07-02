/* @flow */

import type { XReducer } from '../global.flow'

const getReducerInitialState = <S>(reducer: XReducer<S, any>): S => {
  const undf: any = undefined;
  return reducer(undf, { type: '@@INIT' });
}

export {
  getReducerInitialState,
}
