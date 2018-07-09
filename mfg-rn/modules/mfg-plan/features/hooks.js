/* @flow */

const {
  BeforeAll,
  Before,
  After,
  AfterAll,
  Given,
  When,
  Then,
  setDefaultTimeout,
  setWorldConstructor,
} = require('cucumber')

require('mfg-base/features/utils/_hooks')
  .init({
    BeforeAll,
    Before,
    After,
    AfterAll,
    Given,
    When,
    Then,
    setDefaultTimeout,
    setWorldConstructor,
  })
