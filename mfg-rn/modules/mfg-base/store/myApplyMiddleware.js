// @flow
import type { AnyBaseAction, BaseMiddleware } from '../base.flow'

export function myApplyMiddleware(...middlewares: Array<BaseMiddleware<any, any>>) {
  return (createStore: any) => (...args: Array<any>) => {
    const store = createStore(...args)
    let dispatch = (a: AnyBaseAction) => { // eslint-disable-line no-unused-vars
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.',
      )
    }
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (a: AnyBaseAction) => dispatch(a),
    }

    chain = middlewares.map(middleware => {
      const x = middleware(middlewareAPI)
      x._name = middleware._name || middleware.name
      return x
    })
    dispatch = (a: AnyBaseAction) => {
      let
        chainIndex = 0,
        currentDispatchResult

      function loop(a) {
        if (chainIndex + 1 > chain.length) {
          // console.time('reducer ' + a.type)
          store.dispatch(a)
          // console.timeEnd('reducer ' + a.type)

          const storeDispatchResult = {
            dispatchedActions: [a],
            promises: [],
            subscriptions: [],
          }
          currentDispatchResult = storeDispatchResult
          return storeDispatchResult
        }
        const
          currentIndex = chainIndex,
          middleware = chain[currentIndex]

        const dispatch = middleware((a: AnyBaseAction) => {
          // middleware execution done
          chainIndex++
          return loop(a)
        })
        const dispatchResult = dispatch(a);
        if (!currentDispatchResult) {
          // error happened, so redux reducer was not executed
          // and we dont have currentDispatchResult
        } else if (currentDispatchResult.error && !dispatchResult.error) {
          throw new Error(`Middleware [${currentIndex}][${middleware._name}] suppressed error`)
        }
        currentDispatchResult = dispatchResult
        if (dispatchResult === undefined) {
          throw new Error(`Middleware [${currentIndex}][${middleware._name}] returned undefined`)
        }
        return dispatchResult;
      }

      return loop(a)
    }

    return {
      ...store,
      dispatch,
    }
  }
}
