/* @flow */

import React from 'react';
import { baseConnect } from '../../../baseConnect'
import { PickerDialog } from '../../../ui/PickerDialog'
import { pickUserCancelBPAC, pickUserDoneBPAC } from './pickUserDialogAC';
import { pickUserDialogModuleId } from './pickUserDialogModuleId';

import type { BaseVP } from '../../../base.flow'
import type { PickUserDialogState } from './pickUserDialogReducer'

const View = (props: BaseVP<PickUserDialogState>) => {
    const { dispatch, state: { opened, computed: { values } } } = props

    return (
      <PickerDialog
        opened={opened}
        values={values}
        onDone={(uid) => dispatch(pickUserDoneBPAC(uid))}
        onCancel={() => dispatch(pickUserCancelBPAC())}
      />
    )
  },
  PickUserDialog = baseConnect((as): PickUserDialogState => as[pickUserDialogModuleId], View)

export {
  PickUserDialog,
}
