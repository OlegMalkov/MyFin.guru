/* @flow */

import { baseConnect } from 'mfg-base/baseConnect'

import type { ComponentType } from 'react'
import type { NoPropsReact$StatelessFunctionalComponent } from 'mfg-base/global.flow'
import type { SettingsModuleAppState, SettingsModuleVP } from './settings.flow'

type PSC = <State>((as: SettingsModuleAppState) => State, ComponentType<SettingsModuleVP<State>>) =>
  NoPropsReact$StatelessFunctionalComponent

export const settingsModuleConnect: PSC = (baseConnect: any)
