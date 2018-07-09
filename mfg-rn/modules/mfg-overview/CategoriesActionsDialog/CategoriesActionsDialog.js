/* @flow */

import React from 'react';
import { MyButton } from 'mfg-base/ui/Button';
import { MyDialog } from 'mfg-base/ui/MyDialog'
import { RNView } from 'mfg-base/ui/RNUI'
import { RNText } from 'mfg-base/ui/RNUI'
import { MyDivider } from 'mfg-base/ui/Divider'
import { strings } from 'mfg-base/localization'
import type { OverviewModuleDispatch } from '../overview.flow'
import {
  categoriesActionDialogEditCategoryBPAC, categoriesActionDialogDeleteCategoryBPAC,
  categoriesActionDialogSortCategoriesBPAC,
  categoriesActionDialogAddCategoryBPAC,
} from './categoriesActionDialogAC';

import type { CategoriesActionsDialogState } from './categoriesActionsDialogReducer'

const
  renderActionButtons = ({ state: { deps: { isAdmin } }, dispatch }) => (
    <RNView>
      <MyDivider/>
      {
        isAdmin && (
          <RNView>
            <MyButton
              icon={{ name: 'edit' }}
              title={strings.edit}
              onPress={() => dispatch(categoriesActionDialogEditCategoryBPAC())}
            />
            <MyDivider/>
          </RNView>
        )
      }
      <MyButton
        icon={{ name: 'swap-vert' }}
        title={strings.sort}
        onPress={() => dispatch(categoriesActionDialogSortCategoriesBPAC())}
      />
      <MyDivider/>
      {
        isAdmin && (
          <RNView>
            <MyButton
              icon={{ name: 'add' }}
              title={strings.create}
              onPress={() => dispatch(categoriesActionDialogAddCategoryBPAC())}
            />
            <MyDivider/>
          </RNView>
        )
      }
      {
        isAdmin && (
          <RNView>
            <MyButton
              icon={{ name: 'delete' }}
              title={strings.deleteLabel}
              onPress={() => dispatch(categoriesActionDialogDeleteCategoryBPAC())}
            />
          </RNView>
        )
      }
    </RNView>
  ),
  CategoriesActionsDialog =
    ({ state, dispatch }: {|
      state: CategoriesActionsDialogState, dispatch: OverviewModuleDispatch
    |}) => {
      const { status: { type }, opened } = state
      return (
        <MyDialog opened={opened} disableOnBackPress>
          <RNView>
            <MyDivider/>
            <RNText
              style={{ textAlign: 'center', fontSize: 20 }}
            >
              {state.computed.selectedTitle}
            </RNText>
            {type === 'select_action' && renderActionButtons({ state, dispatch })}
            {
              type === 'deleting_category_fetching_live_transactions' && (
                <RNText>{strings.deleteCategoryReadingTransactions}</RNText>
              )
            }
            {
              type === 'deleting_category_fetching_archive_transactions' && (
                <RNText>{strings.deleteCategoryReadingArchiveTransactions}</RNText>
              )
            }
            {
              type === 'deleting_category_processing' && (
                <RNText>{strings.deleteCategoryProcessing}</RNText>
              )
            }
          </RNView>
        </MyDialog>
      )
    }

export {
  CategoriesActionsDialog,
};
