/* @flow */

import React from 'react'
import { MyScreen } from '../../ui/MyScreen.js'
import { TitleText } from '../../ui/RNUI'
import { strings } from '../../localization'

const WelcomeScreen = () => {
  return (
    <MyScreen alignCenter routeName="Welcome">
      <TitleText>{strings.appName}</TitleText>
    </MyScreen>
  )
}

export {
  WelcomeScreen,
}
