/* @flow */

import React from 'react'
import { RNView } from 'mfg-base/ui/RNUI'
import { RNText } from 'mfg-base/ui/RNUI'
import { TextInput } from 'mfg-base/ui/TextInput'
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
import { strings } from 'mfg-base/localization'
import { PickCategoryDialog } from 'mfg-base/modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialog'
import { overviewModuleConnect } from '../../overviewModuleUtils'
import {
  editCategoryTitleChangedAC,
  editCategorySaveBPAC,
  editCategoryParentPressedAC,
} from './editCategoryScreenAC'
import { MyDivider } from 'mfg-base/ui/Divider'
import { MyButton } from 'mfg-base/ui/Button'
import { editCategoryScreenModuleId } from './editCategoryScreenModuleId'

import type { OverviewModuleVP } from '../../overview.flow'
import type { EditCategoryScreenState } from './editCategoryScreenReducer'

const
  EditCategory = ({ dispatch, state }: OverviewModuleVP<EditCategoryScreenState>) => (
    <RNView style={{ flex: 1 }}>
      <ScreenWithBackButton routeName="EditCategory" onBackButtonPress={() => {
        throw new Error('TODO 2')
      }}>
        <TextInput
          value={state.title}
          onChangeText={(v) => dispatch(editCategoryTitleChangedAC(v))}
          placeholder={strings.enterCategoryName}
        />
        <RNText style={{ fontSize: 25, paddingLeft: 20 }}>
          {strings.type}: {
          state.type === 'expense' ? strings.categoryTypeExpense : strings.categoryTypeIncome
        }
        </RNText>
        <MyDivider/>
        <RNText
          style={{ fontSize: 25, paddingLeft: 20 }}
          onPress={() => dispatch(editCategoryParentPressedAC())}
        >
          {strings.parent}: {state.computed.parentTitle}
        </RNText>
        <MyDivider/>
        <MyButton
          onPress={() => dispatch(editCategorySaveBPAC())}
          title={strings.done}
        />
      </ScreenWithBackButton>
      <PickCategoryDialog/>
    </RNView>
  ),
  EditCategoryScreen = overviewModuleConnect(
    (as): EditCategoryScreenState => as[editCategoryScreenModuleId],
    EditCategory,
  )

export { EditCategoryScreen }
