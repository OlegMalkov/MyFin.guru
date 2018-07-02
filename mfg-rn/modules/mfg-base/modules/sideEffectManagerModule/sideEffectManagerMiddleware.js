/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { onError as reportError } from '../../reportError'
import { makeGuid } from '../../utils/makeGuid'
import { asyncStorageModuleId } from '../asyncStorageModule/asyncStorageModuleId'
import { geoModuleId } from '../geoModule/geoModuleId'
import { utilModuleId } from '../util/utilModuleId'
import {
  sideEffectManagerOnNewPromisesAC, sideEffectManagerOnNewSubscriptionsAC,
  sideEffectManagerOnPromiseDoneAC, sideEffectPromiseResolveErrorAC,
  sideEffectSubscriptionDispatchErrorAC,
} from './sideEffectManagerAC'

import type { BaseMiddleware, BaseModuleSubscriptionMaker } from '../../base.flow'
import type { AnyBaseAction } from '../../base.flow'
import type { AnyModuleMap, MapKV } from '../../global.flow'

const
  moduleIdsSkippedFromPromiseExecInTests = [asyncStorageModuleId, utilModuleId, geoModuleId],
  makeSideEffectManagerModuleMiddleware =
    (moduleMap: AnyModuleMap, onError?: Error => any): BaseMiddleware<> => {
      const subscriptionOffsById: MapKV<string, () => any> = {}
      return (store) => (next) => (action) => {
        const nextResult = next(action);

        let
          sideEffectManagerOnNewPromisesAction,
          dispatchPromiseResultError

        if (nextResult.promises.length > 0) {
          const
            modulesPromisesDispatchResults =
              nextResult.promises.reduce(
                (acc, modulePromiseDispatchResult) => {
                  const promiseId = makeGuid()
                  acc[promiseId] = modulePromiseDispatchResult

                  const { promiseConfMap } = moduleMap[modulePromiseDispatchResult.moduleId]

                  if (!promiseConfMap) {
                    throw new Error(`PromiseDispatchResult returned from ${modulePromiseDispatchResult.moduleId}, but module not have promiseConfMap`) // eslint-disable-line max-len
                  }

                  const promiseMaker = promiseConfMap[modulePromiseDispatchResult.props.type]

                  if (!promiseMaker) {
                    throw new Error(`${modulePromiseDispatchResult.moduleId} missing ${modulePromiseDispatchResult.props.type} in promiseConfMap`) // eslint-disable-line max-len
                  }

                  if (isTestEnv) {
                    const
                      shouldSkipPromiseExecInTest = moduleIdsSkippedFromPromiseExecInTests
                        .indexOf(modulePromiseDispatchResult.moduleId) !== -1
                    if (shouldSkipPromiseExecInTest) {
                      return acc
                    }
                  }

                  // Execute promise
                  const promise = new Promise(
                    promiseMaker(modulePromiseDispatchResult.props, store.getState),
                  )

                  promise
                    .then((a: AnyBaseAction) => {
                      const { error } = store.dispatch(a)
                      if (error) {
                        reportError({
                          e: error,
                          description: `${modulePromiseDispatchResult.moduleId}, promise id: ${promiseId} type:${modulePromiseDispatchResult.props.type}, when dispatching ${a.type}, got error`, // eslint-disable-line max-len
                        })
                        store.dispatch(sideEffectPromiseResolveErrorAC({
                          error,
                          promiseId,
                          moduleId: modulePromiseDispatchResult.moduleId,
                          promiseProps: modulePromiseDispatchResult.props,
                        }))
                      }
                      store.dispatch(sideEffectManagerOnPromiseDoneAC(promiseId))
                    })
                    .catch((e) => {
                      reportError({
                        e,
                        description: `${modulePromiseDispatchResult.moduleId}, promise id: ${promiseId} type:${modulePromiseDispatchResult.props.type}, when executing promise, got error`, // eslint-disable-line max-len
                      })
                      if (onError) {
                        onError(e)
                      }
                    })

                  return acc
                }, {})

          sideEffectManagerOnNewPromisesAction =
            sideEffectManagerOnNewPromisesAC(modulesPromisesDispatchResults)
          dispatchPromiseResultError =
            store.dispatch(sideEffectManagerOnNewPromisesAction).error
        }

        if (nextResult.subscriptions.length > 0) {
          const
            modulesSubscriptionsDispatchResults =
              nextResult.subscriptions.reduce(
                (acc, moduleSubscriptionDispatchResult) => {
                  const subscriptionId = makeGuid()
                  acc[subscriptionId] = moduleSubscriptionDispatchResult

                  const
                    { subscriptionsConfMap } = moduleMap[moduleSubscriptionDispatchResult.moduleId]

                  if (!subscriptionsConfMap) {
                    throw new Error(`PromiseDispatchResult returned from ${moduleSubscriptionDispatchResult.moduleId}, but module not have subscriptionConfMap`) // eslint-disable-line max-len
                  }

                  const subscriptionConf: BaseModuleSubscriptionMaker<any> =
                    subscriptionsConfMap[moduleSubscriptionDispatchResult.props.type]

                  if (!subscriptionConf) {
                    throw new Error(`${moduleSubscriptionDispatchResult.moduleId} missing ${moduleSubscriptionDispatchResult.props.type} in subscriptionConfMap`) // eslint-disable-line max-len
                  }

                  // start subscription
                  const
                    on = subscriptionConf(
                      moduleSubscriptionDispatchResult.props,
                      store.getState,
                    ),
                    off = on((a: AnyBaseAction) => {
                      const { error } = store.dispatch(a)
                      if (error) {
                        reportError({
                          e: error,
                          description: `${moduleSubscriptionDispatchResult.moduleId}, subscription id: ${subscriptionId} type:${moduleSubscriptionDispatchResult.props.type}, when dispatching ${a.type}, got error`, // eslint-disable-line max-len
                        })
                        store.dispatch(sideEffectSubscriptionDispatchErrorAC({
                          error,
                          subscriptionId,
                          moduleId: moduleSubscriptionDispatchResult.moduleId,
                          subscriptionProps: moduleSubscriptionDispatchResult.props,
                        }))
                      }
                    });

                  subscriptionOffsById[subscriptionId] = off

                  return acc
                }, {})

          sideEffectManagerOnNewPromisesAction =
            sideEffectManagerOnNewSubscriptionsAC(modulesSubscriptionsDispatchResults)
          dispatchPromiseResultError =
            store.dispatch(sideEffectManagerOnNewPromisesAction).error
        }

        if (sideEffectManagerOnNewPromisesAction) {
          return {
            dispatchedActions: [
              ...nextResult.dispatchedActions,
              sideEffectManagerOnNewPromisesAction,
            ],
            promises: [],
            subscriptions: [],
            error: nextResult.error || dispatchPromiseResultError,
          }
        }

        return nextResult
      }
    }

export {
  makeSideEffectManagerModuleMiddleware,
}
