/* @flow */

import React from 'react'
import { MyButton } from 'mfg-base/ui/Button'
import { MyDialog } from 'mfg-base/ui/MyDialog';
import { MyDivider } from 'mfg-base/ui/Divider'
import { RNView } from 'mfg-base/ui/RNUI'
import { RNText } from 'mfg-base/ui/RNUI'
import type { OverviewModuleDispatch } from '../overview.flow'
import {
  overviewScreenStoragesActionsDialogAddStoragePressBPAC,
  overviewScreenStoragesActionsDialogDontShowInSecureModeStorageBPAC,
  overviewScreenStoragesActionsDialogEditStorageBPAC,
  overviewScreenStoragesActionsDialogHideStorageBPAC,
  overviewScreenStoragesActionsDialogShowHiddenStorageBPAC,
  overviewScreenStoragesActionsDialogSortStorageBPAC,
} from './storagesActionsDialogAC'
import { strings } from 'mfg-base/localization'

import type { StoragesActionsDialogState } from './storagesActionsDialogReducer'

type Props = {|
  state: StoragesActionsDialogState,
  dispatch: OverviewModuleDispatch,
|}

const
  StoragesActionsDialog = ({ state, dispatch }: Props) => {
    const {
      deps: { isAdmin }, storageTitle,
    } = state
    return (
      <MyDialog opened={state.opened} disableOnBackPress>
        <RNView>
          <MyDivider/>
          <RNText style={{ textAlign: 'center', fontSize: 20 }}>
            {storageTitle}
          </RNText>
          <MyDivider/>
          <MyButton
            icon={{ name: 'edit' }}
            title="Редактировать"
            onPress={() => dispatch(overviewScreenStoragesActionsDialogEditStorageBPAC())}
          />
          <MyDivider/>
          <MyButton
            icon={{ name: 'eye-slash', type: 'font-awesome' }}
            title="Выключить"
            onPress={() => dispatch(overviewScreenStoragesActionsDialogHideStorageBPAC())}
          />
          <MyDivider/>
          <MyButton
            icon={{ name: 'user-secret', type: 'font-awesome' }}
            title="Спрятать"
            onPress={
              () => dispatch(overviewScreenStoragesActionsDialogDontShowInSecureModeStorageBPAC())
            }
          />
          <MyDivider/>
          <MyButton
            icon={{ name: 'swap-vert' }}
            title="Сортировать"
            onPress={() => dispatch(overviewScreenStoragesActionsDialogSortStorageBPAC())}
          />
          <MyDivider/>
          {
            isAdmin && (
              <RNView>
                <MyButton
                  icon={{ name: 'add' }}
                  title={strings.create}
                  onPress={() => dispatch(overviewScreenStoragesActionsDialogAddStoragePressBPAC())}
                />
                <MyDivider/>
              </RNView>
            )
          }
          <MyButton
            icon={{ name: 'eye', type: 'font-awesome' }}
            title="Показать выключенные"
            onPress={() => dispatch(overviewScreenStoragesActionsDialogShowHiddenStorageBPAC())}
          />
          <MyDivider/>
        </RNView>
      </MyDialog>
    )
  }

export {
  StoragesActionsDialog,
}
