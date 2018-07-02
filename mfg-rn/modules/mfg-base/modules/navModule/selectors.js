/* @flow */

import type { NavModuleState } from './makeNavReducer'
const
  currentRouteSelector = (navModule: NavModuleState) => {
    const { nav: { index, routes } } = navModule

    return routes[index]
  },
  currentRouteNameSelector = (navModule: NavModuleState) => {
    return currentRouteSelector(navModule).routeName
  }

export {
  currentRouteSelector,
  currentRouteNameSelector,
}
