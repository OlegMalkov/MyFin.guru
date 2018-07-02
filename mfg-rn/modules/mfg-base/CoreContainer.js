/* @flow */

import React from 'react';
import { RNView } from './ui/RNUI'
import { RNText } from './ui/RNUI'
import { strings } from './localization'
import { appMountAC } from './modules/coreModule/coreAC';
import { rnCreateStylesheet, rnNativeModules } from './rn/RN'
import { onError } from './reportError'
import { deprecatedConnect } from './baseConnect'

import type { BaseDispatch } from './base.flow'
import type { ComponentType } from 'react'

type Props = {
  dispatch: BaseDispatch<>,
  MyNavigator: ComponentType<any>
};

type State = {
  hasError: bool,
}

const { UIManager } = rnNativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const
  styles = rnCreateStylesheet({
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      marginTop: 30,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

class CoreContainerView extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  /**
   * On app mount, listen for changes to app & network state
   */
  componentDidMount() {
    this.props.dispatch(appMountAC())
  }

  props: Props;

  componentDidCatch(e, info) {
    this.setState({ hasError: true });

    onError({ e, description: `Root ui error. ${info}` })
  }

  render() {
    if (this.state.hasError) {
      return (
        <RNView style={styles.container}>
          <RNText>{strings.fatalUiError}</RNText>
        </RNView>
      )
    }

    const { MyNavigator } = this.props

    return <MyNavigator />;
  }
}

const CoreContainer = deprecatedConnect()(CoreContainerView)

export {
  CoreContainer,
}
