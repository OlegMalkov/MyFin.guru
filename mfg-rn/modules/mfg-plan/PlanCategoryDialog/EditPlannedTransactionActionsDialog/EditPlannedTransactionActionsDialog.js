/* @flow */

import React from 'react'
import { MyButton } from 'mfg-base/ui/Button'
import { MyDivider } from 'mfg-base/ui/Divider'
import { MyDialog } from 'mfg-base/ui/MyDialog';
import { RNView } from 'mfg-base/ui/RNUI'
import type { PlanModuleDispatch } from '../../plan.flow'
import {
  deleteAllFollowingPressAC,
  deleteThisPressAC,
  editAllFollowingPressAC,
  editThisPressAC,
} from './editPlannedTransactionActionsDialogAC'
import { strings } from 'mfg-base/localization'

import type {
  EditPlannedTransactionActionsDialogState,
} from './editPlannedTransactionActionsDialogReducer'

type Props = {|
  state: EditPlannedTransactionActionsDialogState,
  dispatch: PlanModuleDispatch,
|}

const
  EditPlannedTransactionActionsDialog = ({
    state: { opened, computed: { isRepeating } },
    dispatch,
  }: Props) => {
    return (
      <MyDialog opened={opened} disableOnBackPress>
        <RNView>
          <MyDivider/>
          {
            (isRepeating) && (
              <RNView>
                <MyButton
                  icon={{ name: 'edit' }}
                  title={strings.editThis}
                  onPress={() => dispatch(editThisPressAC())}
                />
                <MyDivider/>
                <MyButton
                  icon={{ name: 'edit' }}
                  title={strings.editAllFollowing}
                  onPress={() => dispatch(editAllFollowingPressAC())}
                />
                <MyDivider/>
                <MyButton
                  icon={{ name: 'delete-forever' }}
                  title={strings.deleteThis}
                  onPress={() => dispatch(deleteThisPressAC())}
                />
                <MyDivider/>
                <MyButton
                  icon={{ name: 'delete-forever' }}
                  title={strings.deleteAllFollowing}
                  onPress={() => dispatch(deleteAllFollowingPressAC())}
                />
              </RNView>
            )
          }
          {
            !isRepeating && (
              <RNView>
                <MyButton
                  icon={{ name: 'edit' }}
                  title={strings.edit}
                  onPress={() => dispatch(editThisPressAC())}
                />
                <MyDivider/>
                <MyButton
                  icon={{ name: 'delete-forever' }}
                  title={strings.deleteLabel}
                  onPress={() => dispatch(deleteThisPressAC())}
                />
              </RNView>
            )
          }
          <MyDivider/>
        </RNView>
      </MyDialog>
    )
  }

export {
  EditPlannedTransactionActionsDialog,
}
