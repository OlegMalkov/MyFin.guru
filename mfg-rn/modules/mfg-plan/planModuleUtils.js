/* @flow */

import { baseConnect } from 'mfg-base/baseConnect'

import type { ComponentType } from 'react'
import type { NoPropsReact$StatelessFunctionalComponent } from 'mfg-base/global.flow'
import type { PlanModuleAppState, PlanModuleVP } from './plan.flow'

type PMC = <State>((as: PlanModuleAppState) => State, ComponentType<PlanModuleVP<State>>) =>
  NoPropsReact$StatelessFunctionalComponent

export const planModuleConnect: PMC = (baseConnect: any)
