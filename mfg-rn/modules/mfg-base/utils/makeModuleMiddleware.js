/* @flow */

import type { DispatchResult, ExDispatch, ExMiddleware, MiddlewareFnResult } from '../global.flow'
export type MakeMiddlewareFnResult<PromiseProps, SubscriptionProps> =
  MiddlewareFnResult<any, PromiseProps, SubscriptionProps>

export type MakeMiddlewareFn<A, AS, PromiseProps = void, SubscriptionProps = void> =
  (a: A, getAppState: AS) =>
    MakeMiddlewareFnResult<PromiseProps, SubscriptionProps>

type MakeModuleMiddlewareProps = {|
  moduleId: string,
  fn: MakeMiddlewareFn<any, any, any, any>
|}

type AnyMiddleware = ExMiddleware<any, any, any, any>

const
  dispatchA = <A, PP, SP>(a: A, dispatch: ExDispatch<A, PP, SP>): DispatchResult<A, PP, SP> => {
    if (Array.isArray(a)) {
      const result = {
        dispatchedActions: [],
        promises: [],
        subscriptions: [],
        error: undefined,
      }

      a.forEach(a => {
        const { dispatchedActions, promises, subscriptions, error } = dispatch(a)
        dispatchedActions.forEach(da => result.dispatchedActions.push(da))
        promises.forEach(p => result.promises.push(p))
        subscriptions.forEach(s => result.subscriptions.push(s))
        result.error = result.error || error
      })

      return result
    }

    return dispatch(a)
  },
  makeModuleMiddleware =
    ({ moduleId, fn }: MakeModuleMiddlewareProps): AnyMiddleware => {
      const myMiddleware: AnyMiddleware = (store) => (next) => (a) => {
        const
          nextResult = next(a),
          {
            dispatchedActions: nextDispatchedActions,
            promises: nextPromises,
            subscriptions: nextSubscriptions,
          } = nextResult,
          fnResult = fn(a, store.getState)

        if (fnResult) {
          if (!fnResult.a && !fnResult.p && !fnResult.s) {
            throw new Error('Middleware fn result should have at lease one of (a,p,s)')
          }
          const
            { dispatchedActions, promises, subscriptions, error } =
              fnResult.a ?
                dispatchA(fnResult.a, store.dispatch) : {
                  dispatchedActions: [],
                  promises: [],
                  subscriptions: [],
                  error: undefined,
                },
            extraP = fnResult.p ? [{ props: fnResult.p, moduleId }] : [],
            extraS = fnResult.s ? [{ props: fnResult.s, moduleId }] : []

          return {
            dispatchedActions: [...nextDispatchedActions, ...dispatchedActions],
            promises: [...nextPromises, ...extraP, ...promises],
            subscriptions: [...nextSubscriptions, ...extraS, ...subscriptions],
            error: nextResult.error || error,
          }
        }

        return nextResult
      }

      myMiddleware._name = moduleId
      return myMiddleware
    }

export {
  makeModuleMiddleware,
}
