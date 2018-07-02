/* @flow */

import type { BaseReducer } from '../../../base.flow'
import { __undef, date0 } from '../../../const'
import { makeModuleReducer } from '../../../utils/makeReducer'
import { us } from '../../../utils/utils'
import {
  OPEN_PICK_DATE_DIALOG, PICK_DATE_CANCEL, PICK_DATE_DONE,
  PICK_DATE_DIALOG_DATE_CHANGED,
} from './pickDateDialogAC'
import { pickDateDialogModuleId } from './pickDateDialogModuleId'

import type { MyDate } from '../../../const'

export type PickDateDialogState = {|
  date: MyDate,
  callerId: string,
  opened: boolean,
|}

const
  initialState: PickDateDialogState = {
    date: date0,
    callerId: __undef,
    opened: false,
  },
  reducer: BaseReducer<PickDateDialogState> = (s = initialState, a) => {
    if (a.type === OPEN_PICK_DATE_DIALOG) {
      return us(s, a, (s, a) => {
        s.callerId = a.callerId
        s.opened = true
      })
    }

    if (a.type === PICK_DATE_DIALOG_DATE_CHANGED) {
      return us(s, a, (s, a) => s.date = a.newDate)
    }

    if (a.type === PICK_DATE_CANCEL || a.type === PICK_DATE_DONE) {
      return us(s, a, s => s.opened = false)
    }
    return s
  },
  pickDateDialogReducer: BaseReducer<PickDateDialogState> =
    makeModuleReducer({ reducer, moduleId: pickDateDialogModuleId })

export {
  pickDateDialogReducer,
}
