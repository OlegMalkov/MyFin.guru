/* @flow */

import { dbModuleId } from './dbModuleId'
import { makeDbModuleMiddlewareFn } from './dbModuleMiddleware'
import { makeDbModulePromiseConfMap } from './dbModulePromiseConfMap'
import { dbModuleReducer } from './dbModuleReducer'
import { makeDbModuleSubscriptionsConfMap } from './dbModuleSubscriptionsConfMap'

'#if isTestEnv'
import { Mock } from 'firebase-nightlight';
'#else'
import { RNfirebase } from '../../rn/RN'
'#endif'

import type { AppConfig, BaseModule } from '../../base.flow'
import type { DbModuleState } from './dbModuleReducer'
import type { FbsApp } from './fbs.flow'

export type DbModule = BaseModule<DbModuleState>

const makeDbModule = (appConf: AppConfig): DbModule => {
  let fbsApp: FbsApp

  '#if isTestEnv'
  fbsApp = new Mock({
    database: { content: appConf.testDatabaseInitialState },
    identities: appConf.testDatabaseIdentities,
  }).initializeApp({})
  '#else'
  fbsApp = RNfirebase.app()
  '#endif'

  return {
    reducer: dbModuleReducer,
    middlewareFn: makeDbModuleMiddlewareFn(fbsApp),
    moduleId: dbModuleId,
    promiseConfMap: makeDbModulePromiseConfMap(fbsApp),
    subscriptionsConfMap: makeDbModuleSubscriptionsConfMap(fbsApp),
  }
}

export {
  makeDbModule,
}
