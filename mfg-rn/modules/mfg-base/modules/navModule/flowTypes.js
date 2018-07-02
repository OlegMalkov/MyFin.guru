/* @flow */

type Route = {
  routeName: string,
  key: string,
}

export type Nav = {
  index: number,
  routes: Array<Route>,
}
