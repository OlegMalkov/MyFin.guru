/* eslint-disable prefer-arrow-callback */
/* @flow */

import {
  getCucumber,
} from './_hooks'
import { BaseTestWorld } from './TestWorld'

import type { AnyValue } from '../../global.flow'

type TestFn<W> = (regex: RegExp, (world: W, ...Array<string>) => Promise<AnyValue>) => void
type Callback<W> = ({ Given: TestFn<W>, When: TestFn<W>, Then: TestFn<W> }) => void
const myDefineSupportCode = <W: BaseTestWorld>(World: W, callback: Callback<W>) => {
  const
    {
      Given: OriginalGiven,
      When: OriginalWhen,
      Then: OriginalThen,
      setDefaultTimeout,
      setWorldConstructor,
    } = getCucumber(),
    f = (method) => (matcher, fn) => {
      const wrapper = async function defineSupportCodeWrapper(...args) {
        const
          world: BaseTestWorld = new Proxy(this, {
            get(world: BaseTestWorld, key: string) {
              const
                /* $FlowFixMe ok */
                worldMethod = world[key]

              if (!worldMethod) {
                throw new Error(`Method ${key} not found world`)
              }
              return worldMethod
            },
            set() {
              throw new Error('You can not set anything to the world')
            },
          })

        const
          printError = (e, index) => {
            console.log(`===== ERROR[${index}] =====`)
            console.log(e.message)

            if (e.operator === 'deepEqual' || e.operator === '==') {
              console.log('actual', e.actual)
              console.log('expected', e.expected)
            }
          },
          checkErrors = () => {
            if (this.errors.length > 0) {
              if (this.errors.length > 1) {
                console.log(`${this.errors.length} errors happened:`)
                this.errors.forEach((e, i) => printError(e, i))
              }
              printError(this.errors[0], 0)
              throw new Error(this.errors[0])
            }
          }

        let result
        try {
          result = await fn.call(undefined, world, ...args)
        } catch (e) {
          printError(e, 0)
          throw e
        }
        checkErrors()

        if (world.driver.shouldWaitAsyncOpDone()) {
          await world.driver.waitAsyncOpDone()
          checkErrors()
        }

        world.driver.onStepEnd()
        checkErrors()

        return result
      }
      Object.defineProperty(wrapper, 'length', { value: fn.length - 1 })

      return method(matcher, wrapper)
    },
    Given = f(OriginalGiven),
    When = f(OriginalWhen),
    Then = f(OriginalThen)

  setWorldConstructor(World)
  setDefaultTimeout(120 * 1000)

  callback({ Given, When, Then })
}

export {
  myDefineSupportCode,
}
