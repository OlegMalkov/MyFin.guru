/* @flow */

import type { AnyBaseAction } from 'mfg-base/base.flow'
import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer'
import { isAdminReducer } from 'mfg-base/entities/personalData/isAdminReducer'
import { __undef } from 'mfg-base/const'
import {
  PICK_CATEGORY_CANCEL,
} from 'mfg-base/modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialogAC'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeUpdateDepsReducer, pipe, tba, updateChild, us } from 'mfg-base/utils/utils'
import { deleteCategoryCallerId } from '../deleteCategoryCallerId'
import {
  OVERVIEW_DELETE_CATEGORY_DONE,
  OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG,
} from '../overviewScreenAC'
import {
  OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP,
  OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED,
  OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP,
  OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP,
} from './categoriesActionDialogAC'

import type { Categories, CategoryTypes } from 'mfg-base/entities/account/live/flowTypes'
import type { CategoryId } from 'mfg-base/const'
import type { OverviewModuleReducer } from '../overview.flow'
import type { AnyOverviewScreenAction } from '../overviewScreenAC'
import type { Status } from './categoriesActionDialogAC'

type Deps = {|
  categories: Categories,
  isAdmin: bool,
|}

export type CategoriesActionsDialogState = {|
  status: Status,
  categoryId: CategoryId,
  categoryType: CategoryTypes,
  opened: bool,
  computed: { selectedTitle: string },
  deps: Deps,
|}

const
  depsInitialState: Deps = {
    isAdmin: getReducerInitialState(isAdminReducer),
    categories: getReducerInitialState(categoriesReducer),
  },
  initialState = {
    status: { type: 'select_action' },
    categoryId: __undef,
    categoryType: 'expense',
    opened: false,
    deps: depsInitialState,
    computed: { selectedTitle: '' },
  },
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    isAdmin: isAdminReducer(s.isAdmin, tba(a)),
    categories: categoriesReducer(s.categories, tba(a)),
  })),
  categoriesActionsDialogReducer =
    (s: CategoriesActionsDialogState = initialState, a: AnyOverviewScreenAction) => {
      if (a.type === OVERVIEW_OPEN_CATEGORY_ACTIONS_DIALOG) {
        return us(s, a, (s, a) => {
          s.computed.selectedTitle = s.deps.categories[a.categoryId].title
          s.categoryId = a.categoryId
          s.categoryType = a.categoryType
          s.opened = true
        })
      }

      if (a.type === PICK_CATEGORY_CANCEL) {
        const { callerId } = a
        if (callerId === deleteCategoryCallerId) {
          return us(s, a, s => s.status = { type: 'select_action' })
        }
      }

      if (a.type === OVERVIEW_DELETE_CATEGORY_DONE) {
        return us(s, a, s => s.status = { type: 'select_action' })
      }

      if (
        a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_BACKDROP_PRESSED
        || a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_EDIT_CATEGORY_BP
        || a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_SORT_CATEGORIES_BP
        || a.type === OVERVIEW_CATEGORIES_ACTION_DIALOG_ADD_CATEGORY_BP
        || a.type === OVERVIEW_DELETE_CATEGORY_DONE
      ) {
        return us(s, a, s => s.opened = false)
      }

      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
      )(s);
    }

export {
  categoriesActionsDialogReducer,
}
