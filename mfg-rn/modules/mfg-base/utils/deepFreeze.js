/* @flow */

import { isTestEnv } from '../isTestEnv'

function _deepFreeze<T: any>(o: T,
  {
    onlyChildren,
  }: { onlyChildren: bool } = { onlyChildren: false }): T {
  if (typeof o !== 'object' || Object.isFrozen(o)) {
    return o
  }

  if (!onlyChildren) {
    Object.freeze(o)
  }

  Object.getOwnPropertyNames(o)
    .forEach((prop) => {
      if (o.hasOwnProperty(prop)
        && o[prop] !== null
        && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
        && !Object.isFrozen(o[prop])) {
        _deepFreeze(o[prop])
      }
    })

  return o
}

const deepFreeze = (isTestEnv || process.env.NODE_ENV !== 'production') ?
  _deepFreeze : <T>(i: T,
    c?: any): T => i // eslint-disable-line no-unused-vars

/* TODO 6 MFG-45 remove from prod build */
export {
  deepFreeze,
}
