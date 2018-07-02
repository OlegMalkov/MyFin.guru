/* @flow */

import type { StorageId, UID } from '../../const'
import type { StoragesSort } from '../../entities/account/live/flowTypes'
import { path, sort } from '../../utils/utils'

const
  makeSortStorages = (ownerUid: string, uid: UID, storagesSort: StoragesSort) =>
    (type: string) =>
      <T: { id: StorageId }>(storages: Array<T>): Array<T> =>
        sort(({ id: id1 }, { id: id2 }) => {
          const
            p = (id) => [uid, ownerUid, type, id],
            sortVal1 = path(p(id1), storagesSort),
            sortVal2 = path(p(id2), storagesSort);

          return (sortVal1 !== undefined && sortVal2 !== undefined) ? sortVal1 - sortVal2 : 9999999;
        }, storages)

export {
  makeSortStorages,
}
