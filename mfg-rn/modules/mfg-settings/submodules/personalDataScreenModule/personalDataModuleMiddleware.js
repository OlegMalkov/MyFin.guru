/* @flow */

import {
  dbUpdatePersonalNameAC,
  dbUpdatePreferencesAC,
} from 'mfg-base/modules/dbModule/dbAC'
import {
  PICK_CURRENCY_DIALOG_IMPORTANT_BP,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import { u } from 'mfg-base/utils/utils'
import {
  PERSONAL_USER_NAME_INPUT_CHANGED,
} from './personalDataScreenAC';
import { personalDataScreenModuleId } from './personalDataScreenModuleId'

import type { SettingsModuleAppState, SettingsModuleMiddlewareFn } from '../../settings.flow'

const
  getModuleState = (getAppState: () => SettingsModuleAppState) =>
    getAppState()[personalDataScreenModuleId],
  personalDataScreenModuleMiddlewareFn: SettingsModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === PICK_CURRENCY_DIALOG_IMPORTANT_BP) {
      const
        { deps: { personalData } } = getModuleState(getAppState),
        { currencyCode } = a,
        currentVal = personalData.preferences.majorCurrencies[currencyCode],
        newVal = currentVal === true ? Date.now() : true,
        newMajorCurrencies = u(
          personalData.preferences.majorCurrencies,
          m => m[currencyCode] = newVal,
        )

      return {
        a: dbUpdatePreferencesAC(p => p.majorCurrencies = newMajorCurrencies),
      }
    }

    /*
    TODO 3 MFG-66 DISCONNECT_FROM_MAIN_ACCOUNT
    if (a.type === DISCONNECT_FROM_MAIN_ACCOUNT) {
      const
        { deps: { session: { uid } } } = getModuleState(getAppState)

      fbs.database()
        .ref(`personalData/${uid}/maUid`)
        .set(null)
        .then(() => {
          Alert.alert(
            'Done',
            'Your account has been disconnected. Restarting app.',
            [
              {
                text: 'Ok',
                onPress: () => store.dispatch(restartAppAC()),
              },
            ]);
        });
    }*/

    if (a.type === PERSONAL_USER_NAME_INPUT_CHANGED) {
      return { a: dbUpdatePersonalNameAC(a.userName) }
    }

    return null
  }

export {
  personalDataScreenModuleMiddlewareFn,
}
