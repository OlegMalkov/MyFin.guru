/* @flow */

import { ASYNC_STORAGE_PERSISTING_DONE } from '../asyncStorageModule/asyncStorageAC'
import { restartAppAC } from '../coreModule/coreAC'
import { logoutScreenModuleId } from './logoutScreenModuleId'

import type { BaseAppState, BaseMiddlewareFn } from '../../base.flow'

const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[logoutScreenModuleId],
  logoutScreenModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (
      a.type === ASYNC_STORAGE_PERSISTING_DONE
      && getModuleState(getAppState).isLogoutInProgress
    ) {
      return { a: restartAppAC() }
    }
    return null
  }

export {
  logoutScreenModuleMiddlewareFn,
}
