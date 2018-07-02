/* @flow */

import type { Dimensions } from '../global.flow'

const DimensionsMock = {
  get: (type: 'window'): Dimensions => {
    if (type === 'window') {
      return { width: 200, height: 500 }
    }
    throw new Error(`unknown dimensions type: ${type}`)
  },
}

export {
  DimensionsMock,
}
