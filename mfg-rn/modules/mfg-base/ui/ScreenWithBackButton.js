/* @flow */

import React from 'react'
import { BackButton } from './BackButton'
import { MyScreen } from './MyScreen'
import { rnCreateStylesheet } from '../rn/RN'

import type { ComponentType } from 'react'

type Props = {| children: any, routeName: string, onBackButtonPress: () => any |}
const
  styles = rnCreateStylesheet({
    content: {
      marginTop: 20,
      flexDirection: 'column',
      flex: 1,
    },
  }),
  ScreenWithBackButton: ComponentType<Props> =
    ({ children, routeName, onBackButtonPress }: Props) => {
      return (
        <MyScreen style={styles.content} routeName={routeName}>
          <BackButton onPress={onBackButtonPress}/>
          {children}
        </MyScreen>
      )
    }

export { ScreenWithBackButton }
