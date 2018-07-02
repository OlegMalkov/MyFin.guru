import type { AnyBaseAction } from 'mfg-base/base.flow'

// @flow
import { currentRouteNameSelector } from 'mfg-base/modules/navModule/selectors'
/* @flow */
import _mapObjIndexed from 'ramda/src/mapObjIndexed'
import _evolve from 'ramda/src/evolve'
import _pipe from 'ramda/src/pipe'
import _range from 'ramda/src/range'
import _groupBy from 'ramda/src/groupBy'
import _assoc from 'ramda/src/assoc'
import _sort from 'ramda/src/sort'
import _omit from 'ramda/src/omit'
import _pick from 'ramda/src/pick'
import _is from 'ramda/src/is'
import _filter from 'ramda/src/filter'
import _flatten from 'ramda/src/flatten'
import _split from 'ramda/src/split'
import _last from 'ramda/src/last'
import _tail from 'ramda/src/tail'
import _head from 'ramda/src/head'
import _trim from 'ramda/src/trim'
import _equals from 'ramda/src/equals'
import _assocPath from 'ramda/src/assocPath'
import _path from 'ramda/src/path'
import _values from 'ramda/src/values'
import _all from 'ramda/src/all'
import _clone from 'ramda/src/clone'
import _keys from 'ramda/src/keys'
import _when from 'ramda/src/when'
import _merge from 'ramda/src/merge'
import _invertObj from 'ramda/src/invertObj'
import _defaultTo from 'ramda/src/defaultTo'
import _dropLast from 'ramda/src/dropLast'
import _dissoc from 'ramda/src/dissoc'
import _deepClone from 'clone'
import { __undef } from '../const'
/* TODO 2 MFG-46 don't deep clone deps and computed */
import { deepFreeze } from './deepFreeze'
import { FORCE_RECOMPUTE } from './utilsAC'

import type { Balance } from '../entities/account/live/flowTypes'
import type {
  ArrayOrObject, MapKV, MapV, Compute, Computer, AnyModule,
  AnyModuleMap, XReducer,
} from '../global.flow'

export function randomString(length: number, chars: string) {
  let mask = ''
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz01234567890'
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (chars.indexOf('#') > -1) mask += '0123456789'
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:"\'<>?,./|\\'
  let result = ''
  for (let i = length; i > 0; i -= 1) result += mask[Math.round(Math.random() * (mask.length - 1))]

  return result
}

type ModulesArrayToMap = (arr: Array<AnyModule>) => AnyModuleMap

/* eslint-disable no-undef */
type UnaryFn<A, RES> = (a: A) => RES
type Pipe =
  (<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, K>,
  kl: UnaryFn<K, L>,
  lm: UnaryFn<L, M>,
  mn: UnaryFn<M, N>,
  no: UnaryFn<N, O>,
  op: UnaryFn<O, P>,
  ...rest: Array<void>) => UnaryFn<A, P>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, K>,
  kl: UnaryFn<K, L>,
  lm: UnaryFn<L, M>,
  mn: UnaryFn<M, N>,
  no: UnaryFn<N, O>,
  ...rest: Array<void>) => UnaryFn<A, O>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, K>,
  kl: UnaryFn<K, L>,
  lm: UnaryFn<L, M>,
  mn: UnaryFn<M, N>,
  ...rest: Array<void>) => UnaryFn<A, N>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I, J, K, L, M>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, K>,
  kl: UnaryFn<K, L>,
  lm: UnaryFn<L, M>,
  ...rest: Array<void>) => UnaryFn<A, M>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I, J, K, L>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, K>,
  kl: UnaryFn<K, L>,
  ...rest: Array<void>) => UnaryFn<A, L>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I, J, K>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, K>,
  ...rest: Array<void>) => UnaryFn<A, K>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I, J>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  ...rest: Array<void>) => UnaryFn<A, J>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H, I>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ...rest: Array<void>) => UnaryFn<A, I>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G, H>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  ...rest: Array<void>) => UnaryFn<A, H>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F, G>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  ...rest: Array<void>) => UnaryFn<A, G>) // eslint-disable-line max-len
  & (<A, B, C, D, E, F>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  ...rest: Array<void>) => UnaryFn<A, F>) // eslint-disable-line max-len
  & (<A, B, C, D, E>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ...rest: Array<void>) => UnaryFn<A, E>) // eslint-disable-line max-len
  & (<A, B, C, D>(ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  ...rest: Array<void>) => UnaryFn<A, D>) // eslint-disable-line max-len
  & (<A, B, C>(ab: UnaryFn<A, B>, bc: UnaryFn<B, C>, ...rest: Array<void>) => UnaryFn<A, C>)
  & (<A, B>(ab: UnaryFn<A, B>, ...rest: Array<void>) => UnaryFn<A, B>)

type AssocPath<T, S> = (key: Array<string>, val: T) => (src: S) => S

export type UnaryPredicateFn<T> = (x: T) => boolean

export type Mutator<S> = (S) => any
export type MutatorA<S, A> = (s: S, a: A) => any
type GroupBy = <T, K: string>((val: T) => K) => (arr: Array<T>) => { [key: K]: Array<T> }
type Range = (start: number, end: number) => Array<number>
type MapObjIndexed =
  <StateFrom, StateTo, K>(fn: (val: StateFrom, key: K, o: MapKV<K, StateFrom>) => StateTo) =>
    (o: MapKV<K, StateFrom>) => MapKV<K, StateTo>
/* | (start: number) => (end: number) => Array<number> */

export const
  mapObjIndexed: MapObjIndexed = _mapObjIndexed,
  evolve: <T>(transform: Object) => (o: T) => T = _evolve,
  pipe: Pipe = _pipe,
  range: Range = _range,
  groupBy: GroupBy = _groupBy,
  assoc: any = _assoc,
  // todo MFG-47 replace any
  sort: <T>((t1: T, t2: T) => number, arr: Array<T>) => Array<T> = _sort,
  omit: <I: Object, O: Object>(keysToOmit: Array<string>, I) => O = _omit,
  pick: <I: Object, O: Object>(keysToOmit: Array<string>, I) => O = _pick,
  isNumber: (v: any) => bool =
    (v) => v === v && _is(Number), // eslint-disable-line no-self-compare
  T: () => true = () => true,
  F: () => false = () => false,
  filterObj: <K, V>(pred: (v: V) => bool) => (obj: { [key: K]: V }) => { [key: K]: V } = _filter,
  filterArray: <T>(pred: (v: T) => bool) => (arr: Array<T>) => Array<T> = _filter,
  // todo MFG-47 replace any
  flatten: any = _flatten,
  // todo MFG-47 replace any
  split: any = _split,
  // todo MFG-47 replace any
  last: any = _last,
  // todo MFG-47 replace any
  tail: any = _tail,
  // todo MFG-47 replace any
  head: any = _head,
  // todo MFG-47 replace any
  trim: any = _trim,
  equals: <T>(p1: T, p2: T) => bool = _equals,
  assocPath: AssocPath<*, *> = _assocPath,
  // todo MFG-47 replace any
  path: any = _path,
  values: <K, V>(MapKV<K, V>) => Array<V> = _values,
  all: <T>(fn: UnaryPredicateFn<T>, xs: Array<T>) => boolean = _all,
  clone: <T>(val: T) => T = _clone,
  keys: <K>(obj: MapKV<K, any>) => Array<K> = _keys,
  keysCount = (obj: MapV<any>): number => keys(obj).length,
  hasKeys = (obj: MapV<any>): bool => keys(obj).length > 0,
  I = <T>(val: T): T => val,
  inc = (i: number) => i + 1,
  dec = (i: number) => i - 1,
  when: <T, V>(pred: UnaryPredicateFn<T>, fn: (x: T) => V) => (x: T) => T | V = _when,
  merge: <A, B>(o1: A, o2: B) => A & B = _merge,
  invertObj: <K, V>(o: { [k: K]: V }) => { [k: V ]: K } = _invertObj,
  defaultTo: <T, V>(d: T) => (x: ?V) => V | T = _defaultTo,
  pathDefaultToNull = (path: Array<string>, val: ArrayOrObject) =>
    pipe(_path(path), _defaultTo(null))(val), // eslint-disable-line
  updateChild = <CS, RS, A>(containerState: CS,
    action: A,
    key: $Keys<CS>,
    reducer: XReducer<RS, A>): CS => {
    const
      k: any = key,
      cs: any = containerState,
      prevState = cs[k],
      newState = reducer(prevState, action)

    return newState === prevState ? containerState : assoc(key, newState, containerState)
  },
  makeUpdateDepsReducer = <S: Object, A: Object>(reducer: XReducer<S, A>): XReducer<S, A> =>
    (s, a) => {
      const
        possiblyNewS = reducer(s, a),
        depsChanged = keys(s)
          .some(k => s[k] !== possiblyNewS[k])

      if (depsChanged) {
        return possiblyNewS
      }

      return s
    },
  toEditableBalance: (b: Balance) => Balance = mapObjIndexed((value) => value / 100),
  toSaveBalance: (b: Balance) => Balance = mapObjIndexed((value) => value * 100),
  /* TODO 1.9 MFG-46 deep clone should never clone properties deps and computed */
  deepClone: <T>(val: T) => T = _deepClone,
  is: (type: any, val: any) => bool = _is,
  isString: (val: any) => bool = _is(String),
  us = <S, A>(s: S, a: A, mutator: MutatorA<S, A>): S => {
    const _s = deepClone(s)
    mutator(_s, a)
    deepFreeze(_s)
    return _s
  },
  updateStateIfChanged = <S, A>(originalState: S, s: S, a: A, mutator: MutatorA<S, A>): S => {
    if (originalState === s) {
      return s
    }
    const _s = deepClone(s)
    mutator(_s, a)
    deepFreeze(_s)
    return _s
  },
  makeInitComputer = <Computed, S: { computed: Computed }, A>(compute: Compute<S, Computed>,
    routeName?: string): Computer<S, A> => // eslint-disable-line max-len
    <A>(originalState: S, a: A) =>
      (s: S) => {
        if (
          originalState === s
          /* $FlowFixMe ok */
          && a.type !== FORCE_RECOMPUTE
        ) {
          return s
        }

        const routeNotMatch = routeName
          /* $FlowOk*/
          && s.deps
          && s.deps.nav
          /* $FlowOk*/
          && currentRouteNameSelector(s.deps.nav) !== routeName

        if (routeNotMatch) {
          return s
        }

        deepFreeze(s)

        const _s = { ...s, computed: compute(s) }

        deepFreeze(_s)
        return _s
      },
  u = <S>(s: S, mutator: Mutator<S>): S => {
    const _s = deepClone(s)
    mutator(_s)
    deepFreeze(_s)
    return _s
  },
  isEmptyOrUndef = (s: string): bool /* :: %checks */ => {
    return !s || s === __undef
  },
  isDefinedAndNotEmpty = (s: string) => {
    return !isEmptyOrUndef(s)
  },
  isDefined = (s: ?string): bool /* :: %checks */ => {
    return !!(s && s !== __undef)
  },
  ifDefined = <T: ?string>(s: T, fallback: T): T => {
    if (isDefined(s)) {
      return s
    }

    return fallback
  },
  arrToMap = <K: string, V: $Exact<any>>({
    keySelector, throwOnKeyDuplicate,
  }: {
    keySelector: (V) => K, throwOnKeyDuplicate?: false
  }) => (arr: Array<V>): MapKV<K, V> => {
    return arr.reduce((acc, v) => {
      const key = keySelector(v)
      if (throwOnKeyDuplicate && acc[key]) {
        throw new Error(`Arr to map convert fail. Duplicate key '${key}'.`)
      }
      acc[keySelector(v)] = v
      return acc
    }, {})
  },
  capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0)
      .toUpperCase() + s.slice(1);
  },
  dropLastOne: <T>(Array<T>) => Array<T> = _dropLast(1),
  findInMap = <K, V>(m: MapKV<K, V>, predicate: (V) => bool): V | null => {
    const matchKey = keys(m)
      .find(k => predicate(m[k]))
    return matchKey ? m[matchKey] : null
  },
  dissoc = <T: Object>(p: $Keys<T>, o: T): T => _dissoc(p, o),
  isEven = (n: number): bool /* :: %checks */ => {
    return n === 0 || !!(n && !(n % 2));
  },
  isOdd = (n: number): bool /* :: %checks */ => {
    return isEven(n + 1);
  },
  isPrototype = (value: any) => {
    const Ctor = value && value.constructor
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype

    return value === proto
  },
  MAX_SAFE_INTEGER = 9007199254740991,
  isLength = (value: any): bool => {
    return typeof value === 'number' &&
      value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
  },
  isArrayLike = (value: any): bool => {
    return value != null && typeof value !== 'function' && isLength(value.length)
  },
  isEmpty = (value: any): bool => {
    if (value == null) {
      return true
    }
    if (isArrayLike(value) &&
      (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function')) {
      return !value.length
    }
    if (isPrototype(value)) {
      return !Object.keys(value).length
    }
    // noinspection LoopStatementThatDoesntLoopJS
    for (const key of value) { // eslint-disable-line no-unused-vars
      return false
    }
    return true
  },
  throttle = (func: Function,
    wait: number,
    options?: {| leading?: boolean, trailing?: boolean |}) => {
    let
      context,
      args,
      result,
      timeout = null,
      previous = 0

    if (!options) options = { leading: true, trailing: false };
    const
      leadingFalse = options.leading === false,
      trailingNotFalse = options.trailing !== false,
      later = function () {
        previous = leadingFalse ? 0 : Date.now();
        timeout = null;
        /* $FlowOk */
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    return function () {
      const now = Date.now()
      if (!previous && leadingFalse) previous = now;
      const remaining = wait - (now - previous)
      context = this;
      args = arguments; // eslint-disable-line
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && trailingNotFalse) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },
  tba = (a: { type: string }): AnyBaseAction => (a: any),

  /* $FlowFixMe it's ok */
  modulesArrayToMap: ModulesArrayToMap = arrToMap({ keySelector: (m: AnyModule) => m.moduleId })
