/* @flow */

import { RNSafeAreaView, RNView } from './RNUI'
import React from 'react'
import { currentRouteNameSelector } from '../modules/navModule/selectors'
import { connect } from 'react-redux'
import { rnCreateStylesheet } from '../rn/RN'

import type { BaseAppState } from '../base.flow'
import type { ComponentType } from 'react'

type Props = {|
  children: any,
  alignCenter?: true,
  style?: StyleSheet,
  routeName: string,
|}

type InternalProps = {|
  ...Props,
  shouldRender: bool,
  windowHeight: number,
|}

const
  styles = rnCreateStylesheet({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      height: '100%',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusBarShadow: {
      width: '100%',
      height: 20,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })

class InternalMyScreen extends React.Component<InternalProps> {
  shouldComponentUpdate({ shouldRender }) {
    return shouldRender
  }

  render() {
    const style = [
      styles.container,
      this.props.alignCenter && styles.center,
      this.props.style,
    ]
    return (
      <RNView>
        <RNSafeAreaView style={style}>
          {this.props.children}
        </RNSafeAreaView>
        <RNView style={styles.statusBarShadow}/>
      </RNView>
    )
  }
}

const
  mapStateToProps = (as: BaseAppState, { routeName }) => ({
    shouldRender: currentRouteNameSelector(as.nav) === routeName,
    windowHeight: as.windowDimensions.height,
  }),
  MyScreen: ComponentType<Props> = connect(mapStateToProps)(InternalMyScreen)

export {
  MyScreen,
}
