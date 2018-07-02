/* @flow */

import type { UID } from '../../../const'

export const
  OPEN_PICK_USER_DIALOG: 'OPEN_PICK_USER_DIALOG' = 'OPEN_PICK_USER_DIALOG',
  PICK_USER_DIALOG_DONE_BP: 'PICK_USER_DIALOG_DONE_BP' = 'PICK_USER_DIALOG_DONE_BP',
  PICK_USER_DIALOG_DONE: 'PICK_USER_DIALOG_DONE' = 'PICK_USER_DIALOG_DONE',
  PICK_USER_DIALOG_CANCEL_BP: 'PICK_USER_DIALOG_CANCEL_BP' = 'PICK_USER_DIALOG_CANCEL_BP',
  PICK_USER_DIALOG_CANCEL: 'PICK_USER_DIALOG_CANCEL' = 'PICK_USER_DIALOG_CANCEL'

type DoneBPAction = {| type: typeof PICK_USER_DIALOG_DONE_BP, uid: UID |}
type OpenPickUserDialogProps = {|
  includeAll?: true,
  callerId: string,
  blacklist?: Array<string>,
|}

type OpenAction = {|
  type: typeof OPEN_PICK_USER_DIALOG,
  includeAll: bool,
  callerId: string,
  blacklist?: Array<string>,
|}
type DoneAction = {| type: typeof PICK_USER_DIALOG_DONE, uid: UID, callerId: string |}
type CancelBPAction = {| type: typeof PICK_USER_DIALOG_CANCEL_BP |}
type CancelAction = {| type: typeof PICK_USER_DIALOG_CANCEL, callerId: string |}

export type
  AnyPickUserDialogActionType =
  | DoneBPAction
  | OpenAction
  | DoneAction
  | CancelAction

export const
  openPickUserDialogAC =
    ({ includeAll = false, callerId, blacklist = [] }: OpenPickUserDialogProps): OpenAction => ({
      type: OPEN_PICK_USER_DIALOG,
      includeAll,
      callerId,
      blacklist,
    }),
  pickUserDoneBPAC = (uid: UID): DoneBPAction => ({ type: PICK_USER_DIALOG_DONE_BP, uid }),
  pickUserDoneAC = ({ uid, callerId }: { uid: UID, callerId: string }): DoneAction =>
    ({ type: PICK_USER_DIALOG_DONE, uid, callerId }),
  pickUserCancelBPAC = (): CancelBPAction => ({ type: PICK_USER_DIALOG_CANCEL_BP }),
  pickUserCancelAC = (callerId: string): CancelAction =>
    ({ type: PICK_USER_DIALOG_CANCEL, callerId })
