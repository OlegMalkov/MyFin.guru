/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { CategoryId } from '../../../../const'
import type { Categories } from '../flowTypes';

const
  initialState: Categories = {}

const categoriesReducer: BaseReducer<Categories> =
    (s = initialState, a) => {
      if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
        return a.liveAccount.categories || initialState
      }

      if (a.type === DB_LIVE_ACCOUNT_CATEGORIES_ARRIVED) {
        return a.value || initialState
      }

      return s;
    },

  getCategoryByIdSelector = (categories: Categories, categoryId: CategoryId) => {
    return categories[categoryId];
  },
  getCategoryTitleByIdSelector = (categories: Categories, categoryId: CategoryId) => {
    const category = getCategoryByIdSelector(categories, categoryId)

    if (category) {
      return category.title
    }

    return `missing-category-${categoryId}`
  }

export {
  categoriesReducer,
  getCategoryByIdSelector,
  getCategoryTitleByIdSelector,
}

