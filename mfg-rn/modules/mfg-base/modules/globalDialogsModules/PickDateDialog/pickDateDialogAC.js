/* @flow */

import type { MyDate } from '../../../const'

export const
  OPEN_PICK_DATE_DIALOG: 'OPEN_PICK_DATE_DIALOG' = 'OPEN_PICK_DATE_DIALOG',
  PICK_DATE_DONE: 'PICK_DATE_DONE' = 'PICK_DATE_DONE',
  PICK_DATE_CANCEL: 'PICK_DATE_CANCEL' = 'PICK_DATE_CANCEL',
  PICK_DATE_DIALOG_DATE_CHANGED: 'PICK_DATE_DIALOG_DATE_CHANGED' = 'PICK_DATE_DIALOG_DATE_CHANGED'

type OpenPickDateAction = {| type: typeof OPEN_PICK_DATE_DIALOG, callerId: string |}
type DateChanged = {| type: typeof PICK_DATE_DIALOG_DATE_CHANGED, newDate: MyDate |}
export type
  AnyPickDateDialogActionType =
  OpenPickDateAction
  | {| type: typeof PICK_DATE_DONE, date: MyDate, callerId: string |}
  | DateChanged

type OpenPickDateDialogProps = { callerId: string }
export const
  openPickDateDialog =
    ({ callerId }: OpenPickDateDialogProps): OpenPickDateAction => ({
      type: OPEN_PICK_DATE_DIALOG,
      callerId,
    }),
  dateChangedAC = (newDate: MyDate): DateChanged =>
    ({ type: PICK_DATE_DIALOG_DATE_CHANGED, newDate }),
  pickDateDoneAC = (date: MyDate, callerId: string) => ({
    type: PICK_DATE_DONE,
    date,
    callerId,
  })
