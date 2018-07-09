/* @flow */

import type { Category } from 'mfg-base/entities/account/live/flowTypes'
import { DB_UPDATE_CATEGORY_DONE, dbUpdateCategoryAC } from 'mfg-base/modules/dbModule/dbAC'
import { openPickCategoryDialog } from 'mfg-base/modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialogAC'
import { navigateAC, navigateBackAC } from 'mfg-base/modules/navModule/navAC'
import type { OverviewModuleAppState, OverviewModuleMiddlewareFn } from '../../overview.flow'
import { editCategoryScreenModuleId } from './editCategoryScreenModuleId'
import {
  ADD_CATEGORY, EDIT_CATEGORY, EDIT_CATEGORY_SAVE_BP,
  EDIT_CATEGORY_PARENT_PRESSED,
} from './editCategoryScreenAC'

const
  getModuleState = (getAppState: () => OverviewModuleAppState) =>
    getAppState()[editCategoryScreenModuleId],

  editCategoryScreenMiddlewareFn: OverviewModuleMiddlewareFn<> = (a, getAppState) => {
    if (a.type === ADD_CATEGORY || a.type === EDIT_CATEGORY) {
      return { a: navigateAC({ routeName: 'EditCategory' }) }
    }

    if (a.type === EDIT_CATEGORY_SAVE_BP) {
      const { id, type, title, parentId } = getModuleState(getAppState)

      if (title && id) {
        const category: Category = {
          id,
          type,
          title,
          parentId,
          isHidden: false,
        }

        return {
          a: dbUpdateCategoryAC({ category }),
        }
      }
    }

    if (a.type === EDIT_CATEGORY_PARENT_PRESSED) {
      const { type } = getModuleState(getAppState)

      return {
        a: openPickCategoryDialog({
          callerId: editCategoryScreenModuleId,
          categoryType: type,
          includeNoParent: true,
          title: '',
        }),
      }
    }

    if (a.type === DB_UPDATE_CATEGORY_DONE) {
      return {
        a: navigateBackAC(),
      }
    }

    return null
  }

export {
  editCategoryScreenMiddlewareFn,
}
