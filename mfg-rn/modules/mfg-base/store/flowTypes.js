/* @flow */

import { MiddlewareExceptionKind, ReducerExceptionKind } from './middleware/makeCatchMiddleware'

import type { ExStore, XReducer, MapV } from '../global.flow'

export type ExceptionKind = typeof ReducerExceptionKind | typeof MiddlewareExceptionKind
export type ExceptionReport = {
  id: string,
  email: string,
  state: Object,
  action: Object,
  codeAccountDataVersion: number,
  codeVersion: string,
  exceptionKind: ExceptionKind,
}

export type $R = {| // eslint-disable-line no-unused-vars
  store: ExStore<any, any, any, any>,
  rootReducer: XReducer<any, any>,
  serialize: (o: Object) => string,
  deserialize: (json: string) => Object,
  reproduceEx: (recordId: string) => void,
  exReports: MapV<ExceptionReport>,
|}
