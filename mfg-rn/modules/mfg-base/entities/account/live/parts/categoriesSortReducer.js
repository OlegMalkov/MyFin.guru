/* @flow */

import {
  DB_GET_LIVE_ACCOUNT_DONE,
  DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED,
} from '../../../../modules/dbModule/dbAC'

import type { BaseReducer } from '../../../../base.flow'
import type { CategoriesSort } from '../flowTypes'

const initialState = {}

const categoriesSortReducer: BaseReducer<CategoriesSort> = (s = initialState, a) => {
  if (a.type === DB_GET_LIVE_ACCOUNT_DONE) {
    return a.liveAccount.categoriesSort || initialState
  }

  if (a.type === DB_LIVE_ACCOUNT_CATEGORIES_SORT_ARRIVED) {
    return a.value || initialState
  }

  return s
}

export {
  categoriesSortReducer,
}
