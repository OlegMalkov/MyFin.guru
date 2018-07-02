/* @flow */

import { reportException } from '../../reportError'
import { toZoneLessDateTime } from '../../utils/dateUtils'
import { codeVersion, codeAccountDataVersion } from '../../version';

import type { BaseAppState, BaseMiddleware } from '../../base.flow'
import type { ExceptionKind, ExceptionReport } from '../flowTypes'

export const ReducerExceptionKind: 'reducer' = 'reducer'
export const MiddlewareExceptionKind: 'middleware' = 'middleware'

const
  prepareAppState = (state: BaseAppState) => {
    // If encrypted - sanitize sensetive data
    return state
  },
  makeCatchMiddleware =
    (kind: ExceptionKind, onError?: (Error) => any): BaseMiddleware<> => {
      const m = store => next => a => {
        let result

        try {
          result = next(a)
        } catch (e) {
          console.log('Fatal exeption in', kind, e)
          reportException(e)

          const
            reportId = toZoneLessDateTime(Date.now()),
            report: ExceptionReport = {
              id: reportId,
              email: 'todo',
              state: prepareAppState(store.getState()),
              action: a,
              codeAccountDataVersion,
              codeVersion,
              exceptionKind: kind,
            }

          if (global.$R) {
            global.$R.exReports[reportId] = report
            console.log(`To reproduce exception: $R.reproduceEx('${reportId}')`)
          }

          e.fromKind = kind
          if (onError) {
            onError(e)
          }
          return {
            dispatchedActions: [],
            promises: [],
            subscriptions: [],
            error: e,
          }
        }

        return result
      }
      m._name = `${kind}_catchMiddleware`
      return m
    }

export {
  makeCatchMiddleware,
};
