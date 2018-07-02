/* @flow */

import { isTestEnv } from '../isTestEnv'

'#if isTestEnv'
import { DimensionsMock } from '../mocks/dimensionsMock'
'#endif'
import type { Dimensions } from '../global.flow'
import { rnDimensions } from '../rn/RN'

const
  _dimensions = isTestEnv ? DimensionsMock : rnDimensions,
  getWindowDimensions = (): Dimensions => {
    return _dimensions.get('window')
  }

export {
  getWindowDimensions,
}
