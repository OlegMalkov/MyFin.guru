/* @flow */

import { dbUpdateStorageHiddenAC } from 'mfg-base/modules/dbModule/dbAC'
import { SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED } from './showHiddenStoragesAC'
import { showHiddenStoragesScreenModuleId } from './showHiddenStoragesModuleId'

import type { OverviewModuleAppState, OverviewModuleMiddlewareFn } from '../../overview.flow'

const
  getModuleState = (getAppState: () => OverviewModuleAppState) =>
    getAppState()[showHiddenStoragesScreenModuleId],
  showHiddenStoragesScreenModuleMiddlewareFn: OverviewModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED) {
      const
        { storageId } = a,
        { deps: { storages } } = getModuleState(getAppState),
        hidden = !storages[storageId].hidden

      return { a: dbUpdateStorageHiddenAC({ storageId, hidden }) }
    }
    return null
  }

export {
  showHiddenStoragesScreenModuleMiddlewareFn,
}
