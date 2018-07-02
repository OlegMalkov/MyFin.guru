/* @flow */

import React from 'react'
import { RNView, RNText } from './RNUI'
// import { Icon } from 'react-native-elements'

type Props = {|
  title: string,
  checked: bool,
  onPress?: () => any,
|}
export const CheckBox = ({
  title,
  checked,
  onPress,
}: Props) => {
  return (
    <RNView
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <RNText onPress={onPress}>{checked ? 'X' : 'O'}</RNText>
      <RNText onPress={onPress}>{title}</RNText>
    </RNView>
  )
  /*
  return (
    <Icon
      name={name}
      color={color}
      size={size}
      onPress={onPress}
      type={type}
      style={style}
    />
  )
  */
}
