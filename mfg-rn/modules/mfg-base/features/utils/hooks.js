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

require('./_hooks')
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
