/* @flow */

import React from 'react'
import { baseConnect } from '../../baseConnect'
import { RNNavigation, RNStackNavigator, RNCreateReduxBoundAddListener } from '../../rn/RN';
import {
  filterArray, mapObjIndexed, merge, pipe,
} from '../../utils/utils'
import { navModuleId } from './navModuleId'

import type { AnyModule } from '../../global.flow'
import type { NavModuleState } from './makeNavReducer'

const
  makeMyNavigator = (modules: Array<AnyModule>) => {
    const
      modulesScreens = pipe(
        filterArray(x => !!x.screens),
        arr => arr.reduce(
          (acc, { screens = {} }) =>
            merge(acc, mapObjIndexed((view) => ({ screen: view }))(screens)),
          {},
        ),
      )(modules),
      AppNavigator = RNStackNavigator(
        { ...modulesScreens },
        { headerMode: 'none', animationEnabled: false },
      ),
      addListener = RNCreateReduxBoundAddListener('root'),
      NavigationView = ({ dispatch, state }) => {
        return (
          <AppNavigator
            navigation={RNNavigation.addNavigationHelpers({
              dispatch,
              state: state.nav,
              addListener,
            })}
          />
        );
      },
      MyNavigator = baseConnect((as): NavModuleState => as[navModuleId], NavigationView),

      router = AppNavigator.router

    return {
      MyNavigator, router,
    }
  }

export {
  makeMyNavigator,
}
