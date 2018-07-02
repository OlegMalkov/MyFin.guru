/* @flow */

import { rnCreateStylesheet } from '../rn/RN'
import React from 'react'
import { Icon } from './Icon'
import { RNView } from './RNUI'
import { topBarHeight } from './styleUtils'

const
  styles = rnCreateStylesheet({
    container: {
      width: topBarHeight,
      height: topBarHeight,
    },
  }),
  BackButton = ({ onPress }: ({ onPress: () => any })) => {
    return (
      <RNView style={styles.container}>
        <Icon
          size={topBarHeight}
          name="arrow-back"
          onPress={onPress}
        />
      </RNView>
    )
  }

export {
  BackButton,
}
