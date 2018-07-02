/* @flow */

import React from 'react';
import { Icon } from './Icon';
import { RNView } from './RNUI'

type Props = {
  active: bool,
  onPress?: () => any,
  activeIcon?: string,
  icon: string,
  type?: string,
  size?: number,
  style?: any,
}

const
  normalColor = '#cbcbcb',
  activeColor = '#000000';

const ToggleIcon = ({ active, onPress, activeIcon, icon, type, size, style }: Props) => (
  <RNView style={style} >
    <Icon
      name={active ? activeIcon || icon : icon}
      color={active ? activeColor : normalColor}
      size={size || 25}
      onPress={onPress}
      type={type}
    />
  </RNView>
);

export {
  ToggleIcon,
}
