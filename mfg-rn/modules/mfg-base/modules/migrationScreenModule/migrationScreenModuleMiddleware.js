/* @flow */

import { alertOpenAC } from '../alertModule/alertModuleAC'
import {
  INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN,
  INIT_MIGRATION_REQUIRED, initMigrationNotAllowedForNonAdminAC,
} from '../initModule/initAC'
import { logoutAC } from '../logoutScreenModule/logoutScreenAC'
import { navigateAC } from '../navModule/navAC'
import { migrationScreenModuleId } from './migrationScreenModuleId'

import type { BaseAppState, BaseMiddlewareFn } from '../../base.flow'

const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[migrationScreenModuleId],
  migrationScreenModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === INIT_MIGRATION_REQUIRED) {
      const { deps: { uid, maUid } } = getModuleState(getAppState)
      if (uid !== maUid) {
        return { a: initMigrationNotAllowedForNonAdminAC() }
      }

      return {
        a: alertOpenAC({
          title: 'Not implemented',
          message: 'Migration required, but not implemented yet.',
          buttons: [{ text: 'Logout', onPressAction: logoutAC() }],
        }),
      }
      // TODO 1 MFG-13 migration process
      //        return { a: navigateAC({ routeName: 'Migration' }) }
      // migrate(store.dispatch, maUid)
    }

    if (a.type === INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN) {
      return { a: navigateAC({ routeName: 'WaitForMigration' }) }
    }
    return null
  }

export {
  migrationScreenModuleMiddlewareFn,
}
