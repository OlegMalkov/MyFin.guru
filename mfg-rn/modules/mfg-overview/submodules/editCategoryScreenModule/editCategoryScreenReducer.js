/* @flow */

import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { __undef } from 'mfg-base/const'
import { strings } from 'mfg-base/localization'
import { PICK_CATEGORY_DONE } from 'mfg-base/modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialogAC'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { makeModuleReducer } from 'mfg-base/utils/makeReducer'
import {
  isDefined, makeUpdateDepsReducer, pipe, updateChild,
  us,
} from 'mfg-base/utils/utils'
import {
  EDIT_CATEGORY_TITLE_CHANGED,
  ADD_CATEGORY, EDIT_CATEGORY,
} from './editCategoryScreenAC'
import { editCategoryScreenModuleId } from './editCategoryScreenModuleId'
import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer';
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModule';

import type { CategoryId } from 'mfg-base/const'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { OverviewModuleReducer } from '../../overview.flow'
import type { Categories, CategoryTypes } from 'mfg-base/entities/account/live/flowTypes';
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes';

type Deps = {|
  categories: Categories,
  session: Session,
  personalData: PersonalData,
|}

export type EditCategoryScreenState = {|
  id: CategoryId,
  title: string,
  type: CategoryTypes,
  parentId: CategoryId,
  computed: {|
    parentTitle: string,
  |},
  deps: Deps,
|}

const
  editCategoryDefaultState: EditCategoryScreenState = ({
    id: __undef,
    title: '',
    type: 'expense',
    parentId: __undef,
    computed: {
      parentTitle: '',
    },
    deps: {
      categories: getReducerInitialState(categoriesReducer),
      session: getReducerInitialState(sessionModuleReducer),
      personalData: getReducerInitialState(personalDataReducer),
    },
  }),

  recompute = (s: EditCategoryScreenState) => {
    if (isDefined(s.parentId)) {
      const parentCategory = s.deps.categories[s.parentId]
      if (parentCategory) {
        s.computed.parentTitle = parentCategory.title
      }
    } else {
      s.computed.parentTitle = strings.noParent
    }
  },
  depsReducer: OverviewModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    categories: categoriesReducer(s.categories, a),
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
  })),
  reducer: OverviewModuleReducer<EditCategoryScreenState> =
    (s = editCategoryDefaultState, a) => {
      if (!s) {
        return editCategoryDefaultState
      }

      if (a.type === ADD_CATEGORY) {
        return us(s, a, (s, a) => {
          const { categoryId, parentCategoryId, mode } = a

          s.type = mode
          s.id = categoryId
          s.parentId = parentCategoryId
          s.title = editCategoryDefaultState.title
          recompute(s)
        })
      }

      if (a.type === EDIT_CATEGORY) {
        return us(s, a, (s, a) => {
          const { categoryId } = a

          const category = s.deps.categories[categoryId]
          s.id = categoryId
          s.parentId = category.parentId
          s.title = category.title
          recompute(s)
        })
      }

      if (a.type === EDIT_CATEGORY_TITLE_CHANGED) {
        return us(s, a, (s, a) => s.title = a.newTitle)
      }

      if (a.type === PICK_CATEGORY_DONE) {
        const { callerId } = a
        if (callerId === editCategoryScreenModuleId) {
          return us(s, a, (s, a) => {
            s.parentId = a.categoryId
            recompute(s)
          })
        }
      }

      return pipe(
        (s) => updateChild(s, a, 'deps', depsReducer),
      )(s)
    },
  editCategoryScreenReducer: OverviewModuleReducer<EditCategoryScreenState> =
    makeModuleReducer({ reducer, moduleId: editCategoryScreenModuleId })

export { editCategoryScreenReducer }
