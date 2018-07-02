/* @flow */

import React from 'react'
import { MyScreen } from '../../ui/MyScreen'
import { RNText } from '../../ui/RNUI'
import { baseConnect } from '../../baseConnect'
import { moduleNameModuleId } from './moduleNameModuleId'

import type { BaseVP } from '../../base.flow'
import type { ModuleNameModuleState } from './moduleNameModuleReducer'

const
  ModuleNameView = (props: BaseVP<ModuleNameModuleState>) => {
    return (
      <MyScreen routeName="ModuleName">
        <RNText>ModuleName</RNText>
      </MyScreen>
    )
  },

  ModuleNameScreen = baseConnect(
    /* $FlowFixMe TODO remove after scaffold */
    (as): ModuleNameModuleState => as[moduleNameModuleId],
    ModuleNameView,
  )

export {
  ModuleNameScreen,
}
