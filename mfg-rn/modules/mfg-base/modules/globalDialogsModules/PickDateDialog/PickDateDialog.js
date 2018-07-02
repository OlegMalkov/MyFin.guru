/* @flow */

import React from 'react'
import { baseConnect } from '../../../baseConnect'
import { RNCalendar } from '../../../rn/RN.js'
import { MyButton } from '../../../ui/Button'
import { MyDivider } from '../../../ui/Divider'
import { MyDialog } from '../../../ui/MyDialog'
import { RNView } from '../../../ui/RNUI'
import { strings } from '../../../localization'
import { dateChangedAC, pickDateDoneAC } from './pickDateDialogAC'
import { pickDateDialogModuleId } from './pickDateDialogModuleId'

import type { BaseVP } from '../../../base.flow'
import type { PickDateDialogState } from './pickDateDialogReducer'

const
  PickDateDialogView = ({ state, dispatch }: BaseVP<PickDateDialogState>) => {
    return (
      <MyDialog opened={state.opened} disableOnBackPress fullWidth justifyContent="flex-end">
        <RNView>
          <RNCalendar
            onDateSelect={(newDate: any) => dispatch(dateChangedAC(newDate))}
            showControls
          />
          <MyDivider />
          <MyButton
            icon={{ name: 'done' }}
            title={strings.done}
            onPress={() => dispatch(pickDateDoneAC(state.date, state.callerId))}
          />
        </RNView>
      </MyDialog>
    )
  },
  PickDateDialog = baseConnect(
    (as): PickDateDialogState => as[pickDateDialogModuleId], PickDateDialogView,
  )

export {
  PickDateDialog,
}
