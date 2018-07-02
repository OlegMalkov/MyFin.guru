/* @flow */

import React from 'react'
import { Icon } from './Icon'
import { RNView } from './RNUI'

type Props = {
  onDone?: () => any,
  onCancel?: () => any
}

const DoneCancelRow = ({ onDone, onCancel }: Props) => (
  <RNView style={{ flexDirection: 'row' }} >
    <RNView style={{ flex: 1 }} >
      <Icon
        name="close"
        onPress={onCancel}
        size={50}
      />
    </RNView>
    <RNView style={{ flex: 1 }} >
      <Icon
        name="done"
        onPress={onDone}
        size={50}
      />
    </RNView>
  </RNView>
)

export {
  DoneCancelRow,
}
