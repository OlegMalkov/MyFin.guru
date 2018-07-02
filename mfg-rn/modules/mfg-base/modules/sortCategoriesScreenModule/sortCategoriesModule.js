/* @flow */

import { categoriesReducer } from '../../entities/account/live/parts/categoriesReducer';
import { sortModuleFactory } from '../sortModuleFactoryModule/sortModuleFactory';
import { makeCategoriesSortFn } from './makeCategoriesSort'
import { sortCategoriesModuleId } from './sortCategoriesModuleId';
import { getDbParentIdKey } from './getDbParentIdKey';
import { filterObj, values } from '../../utils/utils';
import { categoriesSortReducer } from '../../entities/account/live/parts/categoriesSortReducer';

import type { BaseModule } from '../../base.flow'
import type { CategoryId } from '../../const'
import type { Categories, CategoriesSort, Category } from '../../entities/account/live/flowTypes'
import type {
  SortModuleFactoryProps, SortScreenModuleState,
} from '../sortModuleFactoryModule/sortModuleFactory';

export type SortCategoriesScreenState =
  SortScreenModuleState<CategoryId, Category, CategoriesSort>

export type SortCategoriesScreenModule = BaseModule<SortCategoriesScreenState>

const
  props: SortModuleFactoryProps<CategoryId, Category, CategoriesSort> = {
    moduleId: sortCategoriesModuleId,
    screenName: 'CategoriesSort',
    dbKey: 'categoriesSort',
    entityReducer: categoriesReducer,
    entitySortReducer: categoriesSortReducer,
    getDbTypeParts: ({ screenParams: { parentId } }) => [getDbParentIdKey(parentId)],
    makeItemsSelector: ({ screenParams: { parentId }, uid }) =>
      (s: SortCategoriesScreenState): Array<any> => { /* TODO 4 MFG-33 remove any */
        const
          filterCategoriesMap = filterObj(category => category.parentId === parentId),
          filteredCategoriesMap: Categories = filterCategoriesMap(s.deps.entities),
          filteredCategories: Array<Category> = values(filteredCategoriesMap),
          categoriesSortFn = makeCategoriesSortFn({ uid, sortData: s.deps.sortData }),
          sortedCategories: Array<Category> = categoriesSortFn(filteredCategories)

        return sortedCategories
      },
  },
  sortCategoriesScreenModule: SortCategoriesScreenModule =
    sortModuleFactory(props);

export {
  sortCategoriesScreenModule,
}
