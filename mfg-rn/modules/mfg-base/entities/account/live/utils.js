/* @flow */

import { __undef } from '../../../const'
import type { UID } from '../../../const'
import { I, isDefined, mapObjIndexed, path, pipe, T, values } from '../../../utils/utils';

interface OnlyVisibleFilterProps {
  isHidden: bool
}

type OnlyVisibleFilter = (props: OnlyVisibleFilterProps) => bool

type MakeRecursiveWalkerProps<Item, MappedItem> = {|
  mapper: (item: Item,
           context: { level: number, hasChildren: bool, index: number }) => MappedItem,
  filter: (item: MappedItem) => bool,
  sort: (items: Array<MappedItem>) => Array<MappedItem>,
  level?: number,
|}

export type RecursiveWalker<Item, MappedItem> =
  (item: Item, index: number, level?: number) => MappedItem

const
  makeRecursiveWalker =
    <Item, MappedItem>(props: MakeRecursiveWalkerProps<Item, MappedItem>) => {
      const
        { mapper, filter = T, sort = I } = props,

        recursiveWalker =
          (item: Item, index: number, level?: number = 1) => {
            const itm: any = item;
            /* TODO 5 remove any */

            if (itm.children) {
              const
                children = itm.children,
                mappedChildren = children.map(
                  (item, index) => recursiveWalker(item, index, level + 1)
                ),
                filteredChildren = mappedChildren.filter(filter),
                sortedChildren: Array<MappedItem> = sort(filteredChildren),
                result: any = {
                  ...mapper(itm, { level, hasChildren: true, index }),
                  children: sortedChildren,
                }

              return result;
            }

            const result: any = mapper(itm, { level, hasChildren: false, index })
            return result
          }

      return recursiveWalker
    },
  onlyVisibleFilter: OnlyVisibleFilter = (category) => !category.isHidden,
  getUsersList = pipe(
    mapObjIndexed(({ name }, key) => ({ name, uid: key })),
    values,
  ),
  uidToUserName = (users: Object, uid: UID) => path(['name'], users[uid]) || 'user-not-found',
  uidIsUndef = (uid: UID) => !isDefined(uid),
  uidIsDef = (uid: UID) => isDefined(uid)

export {
  onlyVisibleFilter,
  makeRecursiveWalker,
  uidToUserName,
  getUsersList,
  uidIsUndef,
  uidIsDef,
}
