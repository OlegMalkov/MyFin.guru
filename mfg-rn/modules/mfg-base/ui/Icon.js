/* @flow */

import React from 'react'
import { RNEIcon } from './RNUI'

type Props = {|
  name: string,
  type?: string,
  onPress?: () => any,
  size?: number,
  color?: string,
  style?: Object,
  reverse?: true,
|}

const Icon = ({ name, type, onPress, size, color, style }: Props) => {
  return (
    <RNEIcon
      name={name}
      color={color}
      size={size}
      onPress={onPress}
      type={type}
      style={style}
    />
  )
}

export {
  Icon,
}
