/* @flow */

import { connect } from 'react-redux'

import type { ComponentType } from 'react'
import type { AnyBaseAction, BaseAppState, BaseDispatch, BaseVP } from './base.flow'
import type { NoPropsReact$StatelessFunctionalComponent } from './global.flow'

type ViewResult = any
const
  baseConnect = <State>(moduleStateSelector: (as: BaseAppState) => State,
    comp: ComponentType<BaseVP<State>>): NoPropsReact$StatelessFunctionalComponent => {
    if (!comp) {
      throw new Error('trying connect undefined')
    }
    return connect((as: BaseAppState) => ({ state: moduleStateSelector(as) }))(comp)
  },
  baseInjectDispatch =
    (view: (props: {| dispatch: BaseDispatch<AnyBaseAction> |}) => ViewResult) => {
      return connect()(view)
    },
  deprecatedConnect: (moduleStateSelector?: (as: BaseAppState) => any) => any = connect

export {
  baseConnect,
  baseInjectDispatch,
  deprecatedConnect,
}
