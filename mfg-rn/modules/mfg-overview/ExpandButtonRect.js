/* @flow */

import React from 'react'
import { RNTouchableHighlight, RNView } from 'mfg-base/ui/RNUI'
import { ArrowButton } from 'mfg-base/ui/ArrowButton'
import { lightGrayColor } from 'mfg-base/variables'

const ExpandButtonRect = ({ onPress, up }: { onPress: () => any, up: bool }) => (
  <RNTouchableHighlight onPress={onPress}>
    <RNView
      style={{
        width: '100%',
        height: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: lightGrayColor,
        borderBottomWidth: 1,
      }}
    >
      <ArrowButton up={up}/>
    </RNView>
  </RNTouchableHighlight>
)

export {
  ExpandButtonRect,
}
