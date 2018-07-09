/* @flow */

import { restartAppAC } from 'mfg-base/modules/coreModule/coreAC'
import { dbArchiveTransactionsAC } from 'mfg-base/modules/dbModule/dbAC'
import {
  ARCHIVE_SCREEN_ARCHIVE_TRANSACTIONS_BP,
  ARCHIVE_SCREEN_RESTART_APP_BP,
} from './archiveScreenAC'
import { archiveScreenModuleId } from './archiveScreenModuleId'
import { getArchiveBorderDate } from './getArchiveBorderDate'

import type { SettingsModuleAppState, SettingsModuleMiddlewareFn } from '../../settings.flow'

const
  getModuleState = (getAppState: () => SettingsModuleAppState) =>
    getAppState()[archiveScreenModuleId],
  archiveScreenMiddlewareFn: SettingsModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === ARCHIVE_SCREEN_ARCHIVE_TRANSACTIONS_BP) {
      const
        { deps: { now } } = getModuleState(getAppState),
        borderDate = getArchiveBorderDate(now)


      return {
        a: dbArchiveTransactionsAC(borderDate),
      }
    }

    if (a.type === ARCHIVE_SCREEN_RESTART_APP_BP) {
      return {
        a: restartAppAC(),
      }
    }

    return null
  }

export { archiveScreenMiddlewareFn }
