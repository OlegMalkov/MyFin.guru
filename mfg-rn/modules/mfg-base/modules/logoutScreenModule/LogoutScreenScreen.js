/* @flow */

import React from 'react'
import { RNText } from '../../ui/RNUI'
import { MyScreen } from '../../ui/MyScreen'
import { strings } from '../../localization'
import { baseConnect } from '../../baseConnect'
import { logoutScreenModuleId } from './logoutScreenModuleId'

import type { LogoutScreenModuleState } from './logoutScreenModuleReducer'

const
  LogoutScreenView = () => {
    return (
      <MyScreen routeName="Logout">
        <RNText>{strings.logoutInProgress}</RNText>
      </MyScreen>
    )
  },

  LogoutScreenScreen = baseConnect(
    (as): LogoutScreenModuleState => as[logoutScreenModuleId],
    LogoutScreenView,
  )

export {
  LogoutScreenScreen,
}
