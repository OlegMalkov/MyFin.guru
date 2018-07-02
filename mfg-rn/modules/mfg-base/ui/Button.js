/* @flow */

import React from 'react'
import { RNEButton } from './RNUI'
type Props = {|
  icon?: { name: string, type?: string },
  iconRight?: true,
  title: string,
  onPress: () => any,
  testID?: string,
|}

const
  MyButton = ({ title, onPress, iconRight, icon, testID }: Props) => (
    <RNEButton
      title={title}
      onPress={onPress}
      iconRight={iconRight}
      icon={icon}
      testID={testID}
    />
  )

export {
  MyButton,
}
