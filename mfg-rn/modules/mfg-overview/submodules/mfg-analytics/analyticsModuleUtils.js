/* @flow */

import { baseConnect } from 'mfg-base/baseConnect'

import type { ComponentType } from 'react'
import type { NoPropsReact$StatelessFunctionalComponent } from 'mfg-base/global.flow'
import type { AnalyticsModuleAppState } from './analytics.flow'
import type {
  AnalyticsModuleVP,
} from './analytics.flow'

type ASC =
  <State>((as: AnalyticsModuleAppState) => State, ComponentType<AnalyticsModuleVP<State>>) =>
    NoPropsReact$StatelessFunctionalComponent

export const analyticsModuleConnect: ASC = (baseConnect: any)
