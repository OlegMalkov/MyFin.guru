/* @flow */

import type { BaseReducer } from '../../../base.flow'
import { __undef } from '../../../const'
import { makeModuleReducer } from '../../../utils/makeReducer'
import { us } from '../../../utils/utils'
import { OPEN_PICK_DAY_DIALOG, PICK_DAY_CANCEL, PICK_DAY_DONE } from './pickDayDialogAC'
import { pickDayDialogModuleId } from './pickDayDialogModuleId'

export type PickDayDialogState = {|
  opened: bool,
  callerId: string,
|}
const
  initialState: PickDayDialogState = {
    opened: false,
    callerId: __undef,
  },
  reducer: BaseReducer<PickDayDialogState> = (s = initialState, a) => {
    if (a.type === OPEN_PICK_DAY_DIALOG) {
      return us(s, a, (s, a) => {
        s.opened = true
        s.callerId = a.callerId
      })
    }

    if (a.type === PICK_DAY_DONE || a.type === PICK_DAY_CANCEL) {
      return us(s, a, s => s.opened = false)
    }

    return s
  },
  pickDayDialogReducer: BaseReducer<PickDayDialogState> =
    makeModuleReducer({ reducer, moduleId: pickDayDialogModuleId })

export {
  pickDayDialogReducer,
}
