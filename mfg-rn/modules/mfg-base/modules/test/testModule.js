/* @flow */

import { testModuleId } from './testModuleId'
import { testReducer } from './testModuleReducer'

import type { BaseModule } from '../../base.flow'
import type { TestModuleState } from './testModuleReducer'

export type TestModule = BaseModule<TestModuleState>

const testModule: TestModule = {
  reducer: testReducer,
  moduleId: testModuleId,
}

export {
  testModule,
}
