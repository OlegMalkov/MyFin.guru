/* @flow */

import { rnDismissKeyboardAC } from '../../../rn/rnAC'
import {
  OPEN_PICK_CURRENCY_DIALOG, PICK_CURRENCY_DIALOG_CURRENCY_PRESSED,
  pickCurrencyDialogDoneAC,
} from './pickCurrencyDialogAC'
import { pickCurrencyDialogModuleId } from './pickCurrencyDialogModuleId'

import type { BaseAppState, BaseMiddlewareFn } from '../../../base.flow'

const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[pickCurrencyDialogModuleId],
  pickCurrencyDialogModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === PICK_CURRENCY_DIALOG_CURRENCY_PRESSED) {
      const { callerId } = getModuleState(getAppState)
      return { a: pickCurrencyDialogDoneAC(a.currencyCode, callerId) }
    }

    if (a.type === OPEN_PICK_CURRENCY_DIALOG) {
      return { a: rnDismissKeyboardAC() }
    }
    return null
  }

export {
  pickCurrencyDialogModuleMiddlewareFn,
}
