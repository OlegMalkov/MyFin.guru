/* @flow */

import { baseConnect } from 'mfg-base/baseConnect'

import type { ComponentType } from 'react'
import type { NoPropsReact$StatelessFunctionalComponent } from 'mfg-base/global.flow'
import type { OverviewModuleAppState, OverviewModuleVP } from './overview.flow'

type OMC = <State>((as: OverviewModuleAppState) => State, ComponentType<OverviewModuleVP<State>>) =>
  NoPropsReact$StatelessFunctionalComponent

export const overviewModuleConnect: OMC = (baseConnect: any)
