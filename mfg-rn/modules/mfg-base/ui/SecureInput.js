/* @flow */

import React from 'react'
import { Icon } from './Icon'
import { RNView } from './RNUI'
import { TextInput } from './TextInput'

import type { TextInputProps } from './TextInput'

type State = { visible: bool }

class SecureInput extends React.Component<TextInputProps, State> {
  constructor(props: Object) {
    super(props)
    this.state = { visible: false }
  }

  render() {
    return (
      <RNView style={{ flexDirection: 'row' }}>
        <RNView style={{ flex: 1 }}>
          <TextInput
            style={this.props.style}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            autoCorrect={this.props.autoCorrect}
            keyboardType={this.props.keyboardType}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            onChangeText={this.props.onChangeText}
            returnKeyType={this.props.returnKeyType}
            testID={this.props.testID}
            secureTextEntry={!this.state.visible}
          />
        </RNView>
        <Icon
          size={30}
          type="entypo"
          name={this.state.visible ? 'eye' : 'eye-with-line'}
          onPress={() => this.setState({ visible: !this.state.visible })}
        />
      </RNView>
    )
  }
}

export {
  SecureInput,
}
