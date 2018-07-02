/* @flow */

import { path, sort } from '../../utils/utils'
import { getDbParentIdKey } from './getDbParentIdKey'

import type { CategoriesSort, Category } from '../../entities/account/live/flowTypes'
import type { UID } from '../../const'

type MakeSortFnProps = { uid: UID, sortData: CategoriesSort }

const
  makeCategoriesSortFn = ({ uid, sortData }: MakeSortFnProps) =>
    (entities: Array<Category>) => sort(({ id: id1, parentId }, { id: id2 }) => {
      const
        p = (id) => [uid, getDbParentIdKey(parentId), id],
        sortVal1 = path(p(id1), sortData),
        sortVal2 = path(p(id2), sortData);

      return (sortVal1 !== undefined && sortVal2 !== undefined) ? sortVal1 - sortVal2 : 9999999;
    }, entities)

export {
  makeCategoriesSortFn,
}
