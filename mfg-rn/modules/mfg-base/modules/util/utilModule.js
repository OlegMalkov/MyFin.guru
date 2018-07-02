/* @flow */

import { utilModuleId } from './utilModuleId'
import { utilModuleMiddlewareFn } from './utilModuleMiddleware'
import { utilModulePromiseConfMap } from './utilPromiseConfMap'

import type { BaseModule } from '../../base.flow'

export type UtilModule = BaseModule<void>

const utilModule: UtilModule = {
  middlewareFn: utilModuleMiddlewareFn,
  moduleId: utilModuleId,
  promiseConfMap: utilModulePromiseConfMap,
}

export {
  utilModule,
}
