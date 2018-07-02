/* @flow */

import { cryptScreenMiddlewareFn } from './cryptScreenMiddleware'
import { isTestEnv } from '../../isTestEnv'
import { cryptScreenModuleId } from './cryptScreenModuleId'
import { cryptScreenReducer } from './cryptScreenReducer'

import type { BaseModule } from '../../base.flow'
import type { CryptScreenState } from './cryptScreenReducer'

export type CryptScreenModule = BaseModule<CryptScreenState>
const cryptScreenModule: CryptScreenModule = {
  reducer: cryptScreenReducer,
  screens: isTestEnv ? {} : {
    Crypt: require('./CryptScreen').CryptScreen,
  },
  moduleId: cryptScreenModuleId,
  middlewareFn: cryptScreenMiddlewareFn,
}

export {
  cryptScreenModule,
}
