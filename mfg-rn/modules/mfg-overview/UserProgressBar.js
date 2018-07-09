/* @flow */

import { rnCreateStylesheet } from 'mfg-base/rn/RN'
import { range } from 'mfg-base/utils/utils'
import {
  expenseColor, headerHeight, incomeColor, red, lightGrayColor,
} from 'mfg-base/variables'
import React from 'react'
import { RNView } from 'mfg-base/ui/RNUI'

type Props = {|
  containerStyle?: StyleSheet,
  color: string,
  progress: number
|}

type UserProgressBarsProps = {|
  incomeProgress: number,
  expenseProgress: number
|}

const
  styles = rnCreateStylesheet({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 25,
      width: 4,
    },
    bar: {
      width: 4,
      height: 1.5,
      marginBottom: 1,
    },
    userProgressBarsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: headerHeight,
      width: 14,
    },
    twinBarContainerStyle: { width: '40%' },
  }),
  Bar = ({ color }) => (
    <RNView style={[{ backgroundColor: color }, styles.bar]}/>
  ),
  UserProgressBar = ({ containerStyle, color, progress }: Props) => {
    const progressOverflow = progress - 10

    return (
      <RNView style={[styles.container, containerStyle]}>
        {
          range(1, 11)
            .reverse()
            .map(i => {
              const c = progressOverflow > 0 ?
                (progressOverflow > i ? red : lightGrayColor) :
                (i > progress ? lightGrayColor : color)
              return <Bar key={i} color={c}/>
            })
        }
      </RNView>
    )
  },
  UserProgressBars = ({ incomeProgress, expenseProgress }: UserProgressBarsProps) => {
    return (
      <RNView style={styles.userProgressBarsContainer}>
        <UserProgressBar
          containerStyle={styles.twinBarContainerStyle}
          color={incomeColor}
          progress={incomeProgress}
        />
        <UserProgressBar
          containerStyle={styles.twinBarContainerStyle}
          color={expenseColor}
          progress={expenseProgress}
        />
      </RNView>
    )
  }

export {
  UserProgressBar,
  UserProgressBars,
}
