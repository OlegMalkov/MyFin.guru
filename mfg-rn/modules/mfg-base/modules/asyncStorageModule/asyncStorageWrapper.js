/* @flow */

import { rnAsyncStorage } from '../../rn/RN'
import { isTestEnv } from '../../isTestEnv'

/* $FlowOk */
const indexedDBExists = false && this.window.indexedDB

function initialize(timeout) {
  const interf = {}
  const decorated = {}

  const withTimeout = fn => async (...args) =>
    await clocked(fn(...args), { timeout })

  if (indexedDBExists) {
    let idb
    try {
      idb = require('idb-keyval')
    } catch (error) {
      throw new Error('The idb-keyval package is missing.')
    }
    Object.assign(interf, {
      get: idb.get,
      set: idb.set,
      keys: idb.keys,
      remove: idb.delete,
    })
  } else {
    Object.assign(interf, {
      get: rnAsyncStorage.getItem,
      set: rnAsyncStorage.setItem,
      keys: rnAsyncStorage.getAllKeys,
      remove: (key) => rnAsyncStorage.setItem(key, null),
    })
  }

  for (const method in interf) { // eslint-disable-line
    decorated[method] = withTimeout(interf[method])
  }
  return decorated
}


function clocked(promise, options = {}) {
  const time = options.timeout

  return new Promise(async (resolve, reject) => {
    const onTimeout = () => {
      const error = new Error(options.rejectionMessage || 'Timeout')
      console.error(error)
      // reject(error)
    }

    const success = (result) => {
      clearTimeout(timeout)
      resolve(result)
    }

    const timeout = setTimeout(onTimeout, time)

    return promise
      .then(success)
      .catch(reject)
  })
}

const timeout = 5000
const storage = isTestEnv ? {} : initialize(timeout)

export async function asyncStorageKeys() {
  return await storage.keys()
}

export async function getFromAsyncStorage(path: string) {
  return await storage.get(path)
}

export async function setToAsyncStorage(nsp: string, value: string) {
  return await storage.set(nsp, value)
}

export async function removeFromAsyncStorage(key: string) {
  return await storage.remove(key)
}
