// @flow

import { createStore } from 'redux'
import { myApplyMiddleware } from './myApplyMiddleware'

const
  mWithReturn = () => (next) => (a) => {
    return next(a);
  },
  mWithoutReturn: any = () => (next) => (a) => {
    next(a);
  },
  mWithReturnError = () => (next) => (a) => {
    next(a)
    return {
      dispatchedActions: [a],
      promises: [],
      subscriptions: [],
      error: new Error('error'),
    }
  },
  mWithSupressError = () => (next) => (a) => {
    next(a)
    return {
      dispatchedActions: [a],
      promises: [],
      subscriptions: [],
    }
  },
  rootReducer = (s = 1, a) => {
    if (a.type === 'INC') {
      return s + 1
    }
    return s
  }

describe('myApplyMiddleware', () => {
  it('throws if middleware returned undefined', () => {
    const
      enhancer = myApplyMiddleware(mWithReturn, mWithoutReturn),
      store = createStore(rootReducer, 1, enhancer)

    expect(() => {
      store.dispatch({ type: 'INC' })
    })
      .toThrow('Middleware [1][mWithoutReturn] returned undefined')

    // TODO NOW console log middleware name
  })

  it('throws if middleware blocks error return', () => {
    const
      enhancer = myApplyMiddleware(mWithReturn, mWithSupressError, mWithReturn, mWithReturnError),
      store = createStore(rootReducer, 1, enhancer)

    expect(() => {
      store.dispatch({ type: 'INC' })
    })
      .toThrow('Middleware [1][mWithSupressError] suppressed error')
  })

  it('update store state on INC', () => {
    const
      enhancer = myApplyMiddleware(mWithReturn, mWithReturn, mWithReturn),
      store = createStore(rootReducer, 1, enhancer)
    store.dispatch({ type: 'INC' })
    expect(store.getState()).toBe(2)
  })
})
