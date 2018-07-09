/* @flow */

import { isTestEnv } from 'mfg-base/isTestEnv'
import { planScreenMiddlewareFn } from './planScreenMiddleware';
import { makePlanScreenReducer } from './planScreenReducer'
import { planScreenModuleId } from './planScreenModuleId'

import type { PlanModuleType } from './plan.flow'
import type { PlanScreenState } from './planScreenReducer'

export type PlanScreenModule = PlanModuleType<PlanScreenState>

function makePlanScreenModule() {
  const planScreenModule: PlanModuleType<PlanScreenState> = {
    reducer: makePlanScreenReducer(),
    middlewareFn: planScreenMiddlewareFn,
    screens: isTestEnv ? {} : {
      Plan: require('./PlanScreen').PlanScreen,
    },
    moduleId: planScreenModuleId,
  }

  return planScreenModule
}

export {
  makePlanScreenModule,
}
