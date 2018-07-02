/* @flow */

import { __undef } from '../../../const'
import { categoriesReducer } from '../../../entities/account/live/parts/categoriesReducer'
import { getReducerInitialState } from '../../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild, us } from '../../../utils/utils'
import { pickCurrencyDialogModuleId } from '../PickCurrencyDialog/pickCurrencyDialogModuleId'
import {
  OPEN_PICK_CATEGORY_DIALOG, PICK_CATEGORY_CANCEL,
  PICK_CATEGORY_DONE,
} from './PickCategoryDialogAC'

import type { BaseReducer } from '../../../base.flow'
import type { Categories, CategoryTypes } from '../../../entities/account/live/flowTypes'

type Deps = {|
  categories: Categories,
|}

export type PickCategoryDialogState = {|
  opened: bool,
  callerId: string,
  title: string,
  includeNoParent: bool,
  categoryType: CategoryTypes | null,
  deps: Deps,
|}


const
  depsInitialState: Deps = {
    categories: getReducerInitialState(categoriesReducer),
  },
  initialState: PickCategoryDialogState = {
    opened: false,
    callerId: __undef,
    title: '',
    categoryType: null,
    includeNoParent: false,
    deps: depsInitialState,
  },
  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    categories: categoriesReducer(s.categories, a),
  })),
  reducer: BaseReducer<PickCategoryDialogState> = (s = initialState, a) => {
    if (a.type === OPEN_PICK_CATEGORY_DIALOG) {
      return us(s, a, (s, a) => {
        const { callerId, title, categoryType, includeNoParent } = a
        s.opened = true
        s.callerId = callerId
        s.title = title
        s.categoryType = categoryType
        s.includeNoParent = includeNoParent
      })
    }

    if (a.type === PICK_CATEGORY_DONE || a.type === PICK_CATEGORY_CANCEL) {
      return us(s, a, s => s.opened = false)
    }

    return pipe(
      (s) => updateChild(s, a, 'deps', depsReducer),
    )(s)
  },
  pickCategoryDialogReducer: BaseReducer<PickCategoryDialogState> =
    makeModuleReducer({ reducer, moduleId: pickCurrencyDialogModuleId })

export {
  pickCategoryDialogReducer,
}
