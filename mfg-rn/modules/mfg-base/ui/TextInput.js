/* @flow */

import React from 'react'
import { isEmptyOrUndef } from '../utils/utils'
import { Icon } from './Icon'
import { RNStyleSheet, RNTextInput, RNView } from './RNUI'

const
  textInputStyle = {
    fontSize: 18,
    paddingLeft: 0,
    paddingRight: 0,
  },
  placeholderStyle = {
    fontSize: 18,
  },
  containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 1,
    paddingRight: 1,
    height: 50,
  }

export type TextInputProps = {|
  style?: RNStyleSheet,
  placeholder: string,
  icon?: string,
  autoCorrect?: true,
  keyboardType?: 'email-address' | 'numeric',
  value: string,
  defaultValue?: string,
  onChangeText: string => any,
  returnKeyType?: 'none',
  secureTextEntry?: bool,
  /* TODO 4 MFG-43 mandatory testID*/
  testID?: string,
|}

const TextInput = (props: TextInputProps) => {
  const {
      icon,
      autoCorrect = false,
      returnKeyType = 'done',
      keyboardType = 'default',
      onChangeText,
      value,
      ...rest // eslint-disable-line comma-dangle
    } = props,
    showPlaceholder = !value,
    renderValue = isEmptyOrUndef(value) ? '' : value

  return (
    <RNView style={containerStyle}>
      {
        icon && (
          <RNView style={{ width: 35, justifyContent: 'center', marginLeft: -10 }}>
            <Icon name={icon} size={30}/>
          </RNView>
        )
      }
      <RNView style={{ flex: 1 }}>
        <RNTextInput
          autoCorrect={autoCorrect}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          autoCapitalize="none"
          keyboardAppearance="dark"
          value={renderValue}
          style={
            showPlaceholder ?
              { ...textInputStyle, ...placeholderStyle } : textInputStyle}
          {...rest}
          onChangeText={onChangeText}
        />
      </RNView>
    </RNView>
  )
}

export {
  TextInput,
}
