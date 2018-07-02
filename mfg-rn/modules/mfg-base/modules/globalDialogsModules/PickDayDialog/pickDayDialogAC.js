/* @flow */

import type { MyDay } from '../../../const'

export const
  OPEN_PICK_DAY_DIALOG: 'OPEN_PICK_DAY_DIALOG' = 'OPEN_PICK_DAY_DIALOG',
  PICK_DAY_DONE: 'PICK_DAY_DONE' = 'PICK_DAY_DONE',
  PICK_DAY_CANCEL: 'PICK_DAY_CANCEL' = 'PICK_DAY_CANCEL'

export type
  AnyPickDayDialogActionType =
  {| type: typeof OPEN_PICK_DAY_DIALOG, callerId: string |}
  | {| type: typeof PICK_DAY_DONE, day: MyDay, callerId: string |}
  | {| type: typeof PICK_DAY_CANCEL |}

type OpenPickUserDialogProps = {
  includeAll?: true, callerId: string, blacklist?: Array<string>
}

export const
  openPickDayDialogAC =
    ({ callerId }: OpenPickUserDialogProps) => ({
      type: OPEN_PICK_DAY_DIALOG,
      callerId,
    }),
  pickDayDoneAC = ({ day, callerId }: { day: MyDay, callerId: string }) =>
    ({ type: PICK_DAY_DONE, day, callerId }),
  pickDayCancelAC = () => ({ type: PICK_DAY_CANCEL })
