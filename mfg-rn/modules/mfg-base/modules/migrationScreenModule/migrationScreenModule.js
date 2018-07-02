/* @flow */

import { isTestEnv } from '../../isTestEnv'
import { migrationScreenModuleId } from './migrationScreenModuleId'
import { migrationScreenModuleMiddlewareFn } from './migrationScreenModuleMiddleware'
import { migrationScreenReducer } from './migrationScreenReducer'

import type { BaseModule } from '../../base.flow'
import type { MigrationScreenState } from './migrationScreenReducer'

export type MigrationScreenModule = BaseModule<MigrationScreenState>

const
  migrationScreenModule: MigrationScreenModule = {
    reducer: migrationScreenReducer,
    middlewareFn: migrationScreenModuleMiddlewareFn,
    screens: isTestEnv ? {} : {
      Migration: require('./MigrationScreen').MigrationScreen,
      WaitForMigration: require('./WaitForMigrationScreen').WaitForMigrationScreen,
    },
    moduleId: migrationScreenModuleId,
  }

export {
  migrationScreenModule,
}
