/* @flow */

import React from 'react';
import { baseConnect } from '../../../baseConnect'
import { Days } from '../../../const'
import { PickerDialog } from '../../../ui/PickerDialog'
import { keys } from '../../../utils/utils'
import { pickDayCancelAC, pickDayDoneAC } from './pickDayDialogAC';
import { strings } from '../../../localization';
import { pickDayDialogModuleId } from './pickDayDialogModuleId';

import type { BaseVP } from '../../../base.flow'
import type { PickDayDialogState } from './pickDayDialogReducer'
import type { PickerValue } from '../../../ui/PickerDialog'
import type { MyDay } from '../../../const'

const
  DaysArr = keys(Days),
  values: Array<PickerValue<MyDay>> = [
    { label: strings.noDate, value: 'no-day' },
    ...DaysArr.map((value) => ({ label: value.toString(), value })),
  ],
  PickDayDialogView = (props: BaseVP<PickDayDialogState>) => {
    const { state: { opened, callerId } } = props

    return (
      <PickerDialog
        opened={opened}
        values={values}
        onDone={(day) => props.dispatch(pickDayDoneAC({ callerId, day }))}
        onCancel={() => props.dispatch(pickDayCancelAC())}
      />
    )
  },
  PickDayDialog = baseConnect(
    (as): PickDayDialogState => as[pickDayDialogModuleId],
    PickDayDialogView
  )

export {
  PickDayDialog,
}
