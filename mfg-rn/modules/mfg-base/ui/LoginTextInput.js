/* @flow */

import React from 'react'
import { TextInput } from './TextInput'

import type { TextInputProps } from './TextInput'

const textInputStyle = {
  fontSize: 20,
}

const LoginTextInput = (props: TextInputProps) => (
  <TextInput
    style={{ ...textInputStyle, ...(props.style || {}) }}
    placeholder={props.placeholder}
    icon={props.icon}
    autoCorrect={props.autoCorrect}
    keyboardType={props.keyboardType}
    value={props.value}
    defaultValue={props.defaultValue}
    onChangeText={props.onChangeText}
    returnKeyType={props.returnKeyType}
    testID={props.testID}
  />
)

export {
  LoginTextInput,
}
