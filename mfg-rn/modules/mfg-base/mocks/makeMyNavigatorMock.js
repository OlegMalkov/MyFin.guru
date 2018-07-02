/* @flow */

import { NAVIGATE, NAVIGATE_BACK } from '../modules/navModule/navAC'
import { dropLastOne } from '../utils/utils'

import type { AnyModule } from '../global.flow'
import type { AnyBaseAction } from '../base.flow'
import type { Nav } from '../modules/navModule/flowTypes'

const
  makeMyNavigatorMock = (modules: Array<AnyModule>) => { // eslint-disable-line no-unused-vars
    return {
      MyNavigator: () => null,
      router: {
        getStateForAction: (a: AnyBaseAction, s?: Nav): Nav => {
          const _s = s || { index: 0, routes: [] }
          if (a.type === NAVIGATE) {
            const
              { index, routes } = _s
            const
              cutRoutes = index < routes.length - 1 ?
                routes.slice(0, index) : routes,
              newRoutes = [...cutRoutes, {
                routeName: a.routeName,
                key: a.routeName,
              },
              ],
              newIndex = newRoutes.length - 1

            return {
              index: newIndex,
              routes: newRoutes,
            }
          }

          if (a.type === NAVIGATE_BACK && _s.index > 0) {
            return {
              index: _s.index - 1,
              routes: dropLastOne(_s.routes),
            }
          }

          return _s
        },
      },
    }
  }

export {
  makeMyNavigatorMock,
}
