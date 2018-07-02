/* @flow */

import { darkGray } from 'mfg-base/variables'
import { Icon } from './Icon'
import React from 'react'
import { RNView } from './RNUI'
type Props = {|
  up: bool,
  style?: Object,
  color?: string,
  onPress?: () => any
|}

const
  ArrowButton = ({ up, style, color, onPress }: Props) => (
    <RNView style={{ width: 20, alignItems: 'center', ...(style || {}) }}>
      <Icon
        name={up ? 'arrow-drop-up' : 'arrow-drop-down'}
        size={15}
        color={color || darkGray}
        onPress={onPress}
      />
    </RNView>
  )

export {
  ArrowButton,
}
