/* @flow */
import memoize from 'memoizee';

const
  memo = <FN>(fn: FN): FN => memoize(fn, { maxAge: 180000 }),
  makeMemoMaxOne = (length: number) => <FN>(fn: FN): FN => {
    return memoize(fn, { max: 1, length });
  },
  memoMaxOneArgs1 = makeMemoMaxOne(1),
  memoMaxOneArgs2 = makeMemoMaxOne(2),
  memoMaxOneArgs3 = makeMemoMaxOne(3),
  memoMaxOneArgs4 = makeMemoMaxOne(4)

export {
  memo,
  memoMaxOneArgs1,
  memoMaxOneArgs2,
  memoMaxOneArgs3,
  memoMaxOneArgs4,
}
