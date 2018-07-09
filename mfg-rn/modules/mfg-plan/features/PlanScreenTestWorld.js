/* @flow */

import { BaseTestWorld } from 'mfg-base/features/utils/TestWorld'
import { BaseDriver } from 'mfg-base/features/utils/TestWorld'
import { planModuleRegistry } from '../planModuleRegistry'

import type { PlanModuleDispatch } from '../plan.flow'

class PlanScreenDriver extends BaseDriver {
  _baseDispatch: PlanModuleDispatch

  constructor(...args: Array<any>) {
    super(...args)
    /* $FlowFixMe super not works */
    this._baseDispatch = (this._dispatch: any)
  }
}

export class PlanScreenTestWorld extends BaseTestWorld {
  driver: PlanScreenDriver

  constructor(ctx: any) {
    super(ctx, PlanScreenDriver, planModuleRegistry, 'Analytics')
  }
}
