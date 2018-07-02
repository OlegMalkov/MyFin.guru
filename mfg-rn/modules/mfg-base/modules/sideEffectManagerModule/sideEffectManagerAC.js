/* @flow */

import type { MapV } from '../../global.flow'

export const
  SIDE_EFFECT_MANAGER_NEW_PROMISES: 'SIDE_EFFECT_MANAGER_NEW_PROMISES' =
    'SIDE_EFFECT_MANAGER_NEW_PROMISES',
  SIDE_EFFECT_MANAGER_NEW_SUBSCRIPTIONS: 'SIDE_EFFECT_MANAGER_NEW_SUBSCRIPTIONS' =
    'SIDE_EFFECT_MANAGER_NEW_SUBSCRIPTIONS',
  SIDE_EFFECT_MANAGER_SUBSCRIPTION_OFF: 'SIDE_EFFECT_MANAGER_SUBSCRIPTION_OFF' =
    'SIDE_EFFECT_MANAGER_SUBSCRIPTION_OFF',
  SIDE_EFFECT_MANAGER_PROMISE_DONE: 'SIDE_EFFECT_MANAGER_PROMISE_DONE' =
    'SIDE_EFFECT_MANAGER_PROMISE_DONE',
  SIDE_EFFECT_PROMISE_RESOLVE_ERROR: 'SIDE_EFFECT_PROMISE_RESOLVE_ERROR' =
    'SIDE_EFFECT_PROMISE_RESOLVE_ERROR',
  SIDE_EFFECT_SUBSCRIPTION_DISPATCH_ERROR: 'SIDE_EFFECT_SUBSCRIPTION_DISPATCH_ERROR' =
    'SIDE_EFFECT_SUBSCRIPTION_DISPATCH_ERROR'

type AnyProps = { type: string } & Object
export type AnyModulePromiseDispatchResult = {|
  moduleId: string,
  props: AnyProps
|}
export type AnyModuleSubscriptionDispatchResult = {|
  moduleId: string,
  props: AnyProps
|}

export type PromisesPropsMap = MapV<AnyModulePromiseDispatchResult>
export type SubscriptionsPropsMap = MapV<AnyModuleSubscriptionDispatchResult>
type OnNewPromises = {|
  type: typeof SIDE_EFFECT_MANAGER_NEW_PROMISES,
  propsMap: PromisesPropsMap,
|}

type OnNewSubscriptions = {|
  type: typeof SIDE_EFFECT_MANAGER_NEW_SUBSCRIPTIONS,
  propsMap: SubscriptionsPropsMap,
|}

type OnPromiseDone = {|
  type: typeof SIDE_EFFECT_MANAGER_PROMISE_DONE,
  id: string,
|}

type OnSubscriptionOff = {|
  type: typeof SIDE_EFFECT_MANAGER_SUBSCRIPTION_OFF,
  id: string,
|}

type SideEffectPromiseResolveErrorProps = {|
  error: Error,
  promiseId: string,
  moduleId: string,
  promiseProps: AnyProps
|}

type SideEffectSubscriptionDispatchErrorProps = {|
  error: Error,
  subscriptionId: string,
  moduleId: string,
  subscriptionProps: AnyProps
|}

type SideEffectPromiseResolveErrorAction = {|
  type: typeof SIDE_EFFECT_PROMISE_RESOLVE_ERROR,
  ...SideEffectPromiseResolveErrorProps,
|}

type SideEffectSubscriptionDispatchErrorAction = {|
  type: typeof SIDE_EFFECT_SUBSCRIPTION_DISPATCH_ERROR,
  ...SideEffectSubscriptionDispatchErrorProps,
|}

export type AnySideEffectManagerModuleAction =
  OnNewPromises
  | OnNewSubscriptions
  | OnSubscriptionOff
  | OnPromiseDone
  | SideEffectPromiseResolveErrorAction
  | SideEffectSubscriptionDispatchErrorAction

export const
  sideEffectManagerOnNewPromisesAC =
    (propsMap: PromisesPropsMap): OnNewPromises =>
      ({ type: SIDE_EFFECT_MANAGER_NEW_PROMISES, propsMap }),
  sideEffectManagerOnNewSubscriptionsAC =
    (propsMap: SubscriptionsPropsMap): OnNewSubscriptions =>
      ({ type: SIDE_EFFECT_MANAGER_NEW_SUBSCRIPTIONS, propsMap }),
  sideEffectManagerOnSubscriptionOffAC = (id: string): OnSubscriptionOff => ({
    type: SIDE_EFFECT_MANAGER_SUBSCRIPTION_OFF,
    id,
  }),
  sideEffectManagerOnPromiseDoneAC = (id: string): OnPromiseDone => ({
    type: SIDE_EFFECT_MANAGER_PROMISE_DONE,
    id,
  }),
  sideEffectPromiseResolveErrorAC =
    ({
      error,
      promiseId,
      moduleId,
      promiseProps,
    }: SideEffectPromiseResolveErrorProps): SideEffectPromiseResolveErrorAction =>
      ({
        type: SIDE_EFFECT_PROMISE_RESOLVE_ERROR,
        error,
        promiseId,
        moduleId,
        promiseProps,
      }),
  sideEffectSubscriptionDispatchErrorAC =
    ({
      error,
      subscriptionId,
      moduleId,
      subscriptionProps,
    }: SideEffectSubscriptionDispatchErrorProps): SideEffectSubscriptionDispatchErrorAction =>
      ({
        type: SIDE_EFFECT_SUBSCRIPTION_DISPATCH_ERROR,
        error,
        subscriptionId,
        moduleId,
        subscriptionProps,
      })
