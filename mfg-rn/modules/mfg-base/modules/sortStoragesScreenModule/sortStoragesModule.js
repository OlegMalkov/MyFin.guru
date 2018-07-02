/* @flow */

import { makeSortStorages } from './sortStorages'
import { sortModuleFactory } from '../sortModuleFactoryModule/sortModuleFactory';
import { sortStoragesModuleId } from './sortStoragesModuleId';
import { filterObj, values } from '../../utils/utils';
import { storagesReducer } from '../../entities/account/live/parts/storagesReducer';
import { storagesSortReducer } from '../../entities/account/live/parts/storagesSortReducer';

import type { BaseModule } from '../../base.flow'
import type { AStorage, Storages, StoragesSort } from '../../entities/account/live/flowTypes'
import type { StorageId } from '../../const'
import type {
  SortModuleFactoryProps, SortScreenModuleState,
} from '../sortModuleFactoryModule/sortModuleFactory';

export type SortStoragesScreenState =
  SortScreenModuleState<StorageId, AStorage, StoragesSort>

export type SortStoragesScreenModule = BaseModule<SortStoragesScreenState>
const
  props: SortModuleFactoryProps<StorageId, AStorage, StoragesSort> = {
    moduleId: sortStoragesModuleId,
    dbKey: 'storagesSort',
    screenName: 'StoragesSort',
    entityReducer: storagesReducer,
    entitySortReducer: storagesSortReducer,
    getDbTypeParts: ({ screenParams: { ownerUid, type } }) => [ownerUid, type],
    makeItemsSelector: ({ screenParams: { ownerUid, type }, uid }) =>
      (s: SortStoragesScreenState): any => { /* TODO 4 MFG-36 remove any */
        const
          sortStorages = makeSortStorages(ownerUid, uid, s.deps.sortData)(type),
          filterStorages = filterObj(
            (storage: AStorage): bool =>
              storage.uid === ownerUid &&
              (
                (type === 'debt' && storage.type === 'debt')
                || (type === 'normal' && storage.type !== 'debt')
              ),
          ),
          filteredStoragesMap: Storages = filterStorages(s.deps.entities),
          filteredStoragesArray: Array<AStorage> = values(filteredStoragesMap),
          sortedFilteredEntitiesArray: Array<AStorage> = sortStorages(filteredStoragesArray)

        return sortedFilteredEntitiesArray
      },
  },
  sortStoragesScreenModule: SortStoragesScreenModule = sortModuleFactory(props)

export {
  sortStoragesScreenModule,
}
