/* @flow */

import { rnDismissKeyboardAC } from '../../../rn/rnAC'
import {
  OPEN_PICK_USER_DIALOG,
  PICK_USER_DIALOG_CANCEL_BP, PICK_USER_DIALOG_DONE_BP, pickUserCancelAC,
  pickUserDoneAC,
} from './pickUserDialogAC'
import { pickUserDialogModuleId } from './pickUserDialogModuleId'

import type { BaseAppState, BaseMiddlewareFn } from '../../../base.flow'

const
  getModuleState = (getAppState: () => BaseAppState) => getAppState()[pickUserDialogModuleId],
  pickUserModuleMiddlewareFn: BaseMiddlewareFn<> = (a, getAppState) => {
    if (a.type === PICK_USER_DIALOG_DONE_BP) {
      const s = getModuleState(getAppState)
      return { a: pickUserDoneAC({ uid: a.uid, callerId: s.callerId }) }
    }

    if (a.type === PICK_USER_DIALOG_CANCEL_BP) {
      const s = getModuleState(getAppState)
      return { a: pickUserCancelAC(s.callerId) }
    }

    if (a.type === OPEN_PICK_USER_DIALOG) {
      return { a: rnDismissKeyboardAC() }
    }

    return null
  }

export {
  pickUserModuleMiddlewareFn,
}
