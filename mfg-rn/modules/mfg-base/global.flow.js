/* @flow */

export type AnyValue = number | string | Object | Array<AnyValue> | null | void
export type ArrayOrObject = Object | Array<ArrayOrObject>

export type MapV<T> = {
  [key: string]: T,
}

export type MapKV<K, V> = {
  [key: K]: V,
}

export type Identity = {|
  id: string,
|}

export type Dimensions = {|
  width: number,
  height: number,
|}

export type IdTitle<ID: string> = {|
  id: ID,
  title: string
|}

export type ZoneLessDateTime = '19800101T000000'
  | '22900120T000000'

export type DispatchResult<A, PP = void, SP = void> = {|
  dispatchedActions: Array<A>,
  promises: Array<PP>,
  subscriptions: Array<SP>,
  error?: Error
|}

type ActionResult<A> = A | Array<A>
export type MiddlewareFnResult<A, PromiseProps, SubscriptionProps> = {|
  a: ActionResult<A>,
  p: PromiseProps,
  s: SubscriptionProps
|} | {|
  p: PromiseProps,
  s: SubscriptionProps
|} | {|
  a: ActionResult<A>,
  s: SubscriptionProps
|} | {|
  a: ActionResult<A>,
  p: PromiseProps,
|} | {|
  a: ActionResult<A>,
|} | {|
  p: PromiseProps,
|} | {|
  s: SubscriptionProps
|} | null

export type ExDispatch<A, PP = void, SP = void> = (action: A) =>
  DispatchResult<A, PP, SP>

export type XReducer<S, A> = (state: S, action: A) => S

export type ExStore<A, AS, PP, SP> = {
  getState: () => AS,
  dispatch: ExDispatch<A, PP, SP>
}

export type ExMiddleware<A, AS, PP, SP> =
  (store: ExStore<A, AS, PP, SP>) =>
    (next: ExDispatch<A, any, any>) =>
      (action: A) => DispatchResult<A, PP, SP>

export type AnyMiddleware = ExMiddleware<any, any, any, any>
export type MiddlewareFn<A, AS, PP = void, SP = void> =
  (a: A, getAppState: () => AS) =>
    MiddlewareFnResult<A, PP, SP>

type GetAppState<AS> = () => AS
export type ModulePromiseMaker<Props, AS, A> = (props: Props, getAppState: GetAppState<AS>) =>
  (resolve: A => any) => any

type OffFunc = () => any
export type ModuleSubscriptionMaker<Props, AS, A> = (props: Props, getAppState: GetAppState<AS>) =>
  (dispatch: (a: A) => any) => OffFunc

export type AnyModulePromisesMakersMap<AS, A> = MapV<ModulePromiseMaker<any, AS, A>>
export type AnyModuleSubscriptionsMakersMap<AS, A> = MapV<ModuleSubscriptionMaker<any, AS, A>>
export type NoPropsReact$StatelessFunctionalComponent = React$StatelessFunctionalComponent<{||}>

export type Module<S, A, AS> = {|
  moduleId: string,
  reducer?: XReducer<S, A>,
  screens?: MapKV<string, NoPropsReact$StatelessFunctionalComponent>,
  middleware?: ExMiddleware<A, AS, *, *>,
  middlewareFn?: MiddlewareFn<A, AS, *, *>,
  /* if true, state will be synchronized to AsyncStorage and restored on app load */
  persistent?: true,
  promiseConfMap?: AnyModulePromisesMakersMap<AS, A>,
  subscriptionsConfMap?: AnyModuleSubscriptionsMakersMap<AS, A>
|}

export type VP<S, A> = {| state: S, dispatch: ExDispatch<A> |}

/* CS - state of reducer that contains this reducer */
export type ExReducer<S, CS, A> = (state: S, action: A, cs: CS) => S
export type MyReducer<S, A> = ExReducer<S, A>
export type Compute<S, Computed> = (state: S) => Computed
export type Computer<S, A> = (S, A) => S => S

export type AnyModule = Module<any, any, any>

export type AnyModuleMap = MapKV<string, AnyModule>
export type AnyReducer = XReducer<any, any>
