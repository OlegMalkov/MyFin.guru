/* @flow */

import { navModuleId } from 'mfg-base/modules/navModule/navModuleId'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeUpdateDepsReducer, pipe, updateChild, us } from '../../utils/utils'
import { isRehydratedReducer } from '../asyncStorageModule/isRehydratedReducer'
import { DB_GET_LIVE_ACCOUNT_DONE } from '../dbModule/dbAC'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModuleReducer'
import { navigateAC } from './navAC'

import type { AnyBaseAction, BaseReducer } from '../../base.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'
import type { IsRehydratedState } from '../asyncStorageModule/isRehydratedReducer'
import type { Nav } from './flowTypes'

type Deps = {|
  session: Session,
  isRehydrated: IsRehydratedState,
|}

export type NavModuleState = {|
  deps: Deps,
  nav: Nav,
|}

type GetStateForAction = (a: AnyBaseAction, s?: Nav) => Nav
const
  depsInitialState: Deps = {
    session: getReducerInitialState(sessionModuleReducer),
    isRehydrated: getReducerInitialState(isRehydratedReducer),
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    session: sessionModuleReducer(s.session, a),
    isRehydrated: isRehydratedReducer(s.isRehydrated, a),
  })),
  makeNavReducer = (getStateForAction: GetStateForAction,
    initialRouteName: string = 'Overview'): BaseReducer<NavModuleState> => {
    const
      loginNavState = getStateForAction(navigateAC({ routeName: 'Login' })),
      afterLoginNavState = getStateForAction(navigateAC({ routeName: initialRouteName })),
      welcomeNavState = getStateForAction(navigateAC({ routeName: 'Welcome' })),
      initialState = {
        deps: depsInitialState,
        nav: welcomeNavState,
      }

    return makeModuleReducer({
      reducer: (s = initialState, a) => {
        return pipe(
          s => {
            const nextNav = getStateForAction(a, s.nav)

            if (nextNav && nextNav !== s.nav) {
              return us(s, a, s => s.nav = nextNav)
            }

            return s
          },
          s => updateChild(s, a, 'deps', depsReducer),
          cs => {
            const
              { isRehydrated: prevIsRehydrated } = s.deps,
              { session: { computed: { isAuthenticated } }, isRehydrated } = cs.deps,
              justRehydrated = isRehydrated && !prevIsRehydrated

            if (isRehydrated) {
              if (!isAuthenticated && justRehydrated) {
                return us(cs, a, s => s.nav = loginNavState)
              }

              if (isAuthenticated && a.type === DB_GET_LIVE_ACCOUNT_DONE) {
                return us(cs, a, s => s.nav = afterLoginNavState)
              }
            }

            return cs
          },
        )(s)
      },
      moduleId: navModuleId,
    });
  }

export const navDefaultState: NavModuleState = {
  deps: depsInitialState,
  nav: {
    index: 0,
    routes: [{ routeName: 'Welcome', key: 'Welcome' }],
  },
}

export {
  makeNavReducer,
}
