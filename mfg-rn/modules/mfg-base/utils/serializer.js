/* @flow */
import { keys } from './utils'

const refType = '@ref'

const serialize = (o: Object) => {
  const knownObjectsArr = [],
    refs = {}

  const getObjId = (o, path) => {
    const existingId = knownObjectsArr.indexOf(o)
    if (existingId !== -1) {
      return {id: existingId, copy: refs[existingId]}
    }

    const oCopy = {}
    keys(o).forEach(key => {
      const propValue = o[key]

      if (typeof propValue === 'object') {
        const { id, copy } = getObjId(propValue, [...path, key])
        refs[id] = copy
        oCopy[key] = { type: refType, id }
      } else {
        oCopy[key] = propValue
      }
    })

    return { id: knownObjectsArr.push(o) - 1, copy: oCopy }
  }

  const { copy } = getObjId(o, [])
  refs.main = copy
  return JSON.stringify(refs)
}


const deserialize = (input: string) => {
  const restoredObjects = {},
    refs = JSON.parse(input),
    mainO = refs.main

  const restoreRefs = (o) => {
    keys(o).forEach(key => {
      const propValue = o[key]
      if (propValue.type === refType) {
        if (restoredObjects[propValue.id]) {
          o[key] = restoredObjects[propValue.id]
        } else {
          o[key] = restoreRefs(refs[propValue.id])
          restoredObjects[propValue.id] = o[key]
        }
      }
    })
    return o
  }

  return restoreRefs(mainO)
}

export {
  serialize,
  deserialize,
}
