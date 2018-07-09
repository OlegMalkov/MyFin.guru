/* @flow */

import type { CreditStorage, DebitStorage, AStorage } from 'mfg-base/entities/account/live/flowTypes'
import { DB_UPDATE_STORAGE_DONE, dbUpdateStorageAC } from 'mfg-base/modules/dbModule/dbAC'
import { openPickCurrencyDialog } from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { openPickUserDialogAC } from 'mfg-base/modules/globalDialogsModules/PickUserDialog/pickUserDialogAC'
import { navigateAC, navigateBackAC } from 'mfg-base/modules/navModule/navAC'
import { keys, toSaveBalance } from 'mfg-base/utils/utils'
import type { OverviewModuleAppState, OverviewModuleMiddlewareFn } from '../../overview.flow'
import {
  ADD_STORAGE, EDIT_STORAGE,
  EDIT_STORAGE_ADD_CURRENCY_BP, EDIT_STORAGE_SAVE_BP,
  EDIT_STORAGE_USER_PRESSED,
} from './editStorageScreenAC'
import { editStorageScreenModuleId } from './editStorageScreenModuleId'

const
  getModuleState = (getAppState: () => OverviewModuleAppState) =>
    getAppState()[editStorageScreenModuleId],
  editStoragesMiddlewareFn: OverviewModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === ADD_STORAGE || a.type === EDIT_STORAGE) {
      return { a: navigateAC({ routeName: 'EditStorage' }) }
    }

    if (a.type === EDIT_STORAGE_ADD_CURRENCY_BP) {
      return {
        a: openPickCurrencyDialog({
          callerId: editStorageScreenModuleId,
          blacklist: keys(getModuleState(getAppState).initialBalance),
        }),
      }
    }

    if (a.type === EDIT_STORAGE_USER_PRESSED) {
      return { a: openPickUserDialogAC({ callerId: editStorageScreenModuleId }) }
    }

    if (a.type === EDIT_STORAGE_SAVE_BP) {
      const
        { type, title, uid, id, initialBalance, limitBalance, hidden, showInSecureMode }
          = getModuleState(getAppState)

      if (id && uid && title) {
        let finalStorage: AStorage
        if (type === 'debit') {
          const storage: DebitStorage = {
            type: 'debit',
            id,
            title,
            hidden,
            showInSecureMode,
            initialBalance: toSaveBalance(initialBalance),
            uid,
          }
          finalStorage = storage
        } else if (type === 'credit') {
          const storage: CreditStorage = {
            type: 'credit',
            id,
            title,
            hidden,
            showInSecureMode,
            initialBalance: toSaveBalance(initialBalance),
            limitBalance: toSaveBalance(limitBalance),
            uid,
          }
          finalStorage = storage
        } else {
          throw new Error(`Edit of ${type} storage is now implemented`)
        }

        return {
          a: dbUpdateStorageAC(finalStorage),
        }
      }
    }

    if (a.type === DB_UPDATE_STORAGE_DONE) {
      return {
        a: navigateBackAC(),
      }
    }

    return null
  }

export {
  editStoragesMiddlewareFn,
}
