/* @flow */

export const
  isTestEnv = !!process.env.IS_TEST_ENV,
  isNotTestEnv = !isTestEnv
