/* @flow */

import { sumBalance } from 'mfg-base/entities/account/live/transactionsSelectors'
import { balanceToMainCurrency } from 'mfg-base/entities/account/utils'
import type { CurrenciesModule } from 'mfg-base/entities/currencies/currenciesModuleReducer'
import { allUserNamesMapSelector } from 'mfg-base/selectors'
import { makeSortStorages } from 'mfg-base/modules/sortStoragesScreenModule/sortStorages'

import type { CurrencyCode, MyDate, UID } from 'mfg-base/const'
import type { StorageTotalBalance } from 'mfg-base/entities/account/live/storagesSelectors'
import {
  defaultTo, filterObj, flatten, groupBy, I, mapObjIndexed, pipe, values,
} from 'mfg-base/utils/utils';
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes';
import type {
  AStorageType, Balance, StoragesSort,
  Users,
} from 'mfg-base/entities/account/live/flowTypes';
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'

type Props = {
  session: Session,
  users: Users,
  personalData: PersonalData,
  storagesSort: StoragesSort,
  currenciesModule: CurrenciesModule,
  isSecureMode: bool,
}

export type StorageLikeGroupedByUser = {|
  id: string,
  type: AStorageType,
  title: string,
  uid: UID,
  balance: Balance,
  hidden: bool,
  debtUntil: MyDate,
  collapsed: bool,
  showInSecureMode: bool,
  selectedCurrencyCode: CurrencyCode
|} | {|
  type: 'label',
  title: string,
  uid: UID,
  collapsed: bool,
  totalBalance: { currencyCode: CurrencyCode, value: number }
|} | {|
  type: 'my-storages-separator',
  collapsed: bool,
|}

export const
  makeGroupStorageLikeByUser =
    ({ session, users, personalData, storagesSort, isSecureMode, currenciesModule }: Props) => {
      const
        { uid } = session,
        userNamesMap = allUserNamesMapSelector({ users, personalData, session }),
        { preferences: { overviewCollapsedUids } } = personalData,

        mapStorages =
          (storages): Array<StorageLikeGroupedByUser> =>
            pipe(
              mapObjIndexed((ownerStorages, ownerUid) => {
                const
                  groupedOwnerStorages =
                    groupBy(s => s.type)(ownerStorages),
                  storagesSorter = makeSortStorages(ownerUid, uid, storagesSort),
                  sortedGroupedOwnerStorages =
                    mapObjIndexed(
                      (storages, type) => storagesSorter(type)(storages),
                    )(groupedOwnerStorages),
                  filteredSortedGroupedOwnerStorages = [
                    ...(sortedGroupedOwnerStorages.debit || []),
                    ...(sortedGroupedOwnerStorages.credit || []),
                    ...(sortedGroupedOwnerStorages.debt || []),
                  ],
                  collapsed = overviewCollapsedUids[ownerUid] === true
                /* ,
                                 TODO MFG-52 calc total balance back 1
                                 totalBalance = ownerStorages.reduce((acc, v) => {
                                   return sumBalance(acc, v.balance || {})
                                 }, {})*/

                return [
                  ownerUid !== uid ? {
                    type: 'label',
                    title: userNamesMap[ownerUid],
                    uid: ownerUid,
                    collapsed,
                  } : null,
                  ...[collapsed ? [] : filteredSortedGroupedOwnerStorages],
                ].filter(I);
              }),
              values,
              flatten,
            )(storages),
        getOthersStorages = filterObj(([s]) => {
          return s.uid !== uid;
        });

      return (storages: Array<StorageTotalBalance>): Array<StorageLikeGroupedByUser> => {
        const
          storagesGroupedByUid = groupBy(pipe(x => x.uid, defaultTo('no-owner')))(storages),
          my = storagesGroupedByUid[uid],
          myStorages = mapStorages(my ? { [uid]: my } : {}),
          othersStorages = mapStorages(getOthersStorages(storagesGroupedByUid)),
          othersStoragesWithSettedTotalBalance = othersStorages
            .map(s => {
              console.log('s', s)
              if (s.type !== 'label') {
                return s
              }
              const
                userStoragesBalances = othersStorages
                  .reduce(
                    (acc, ss) => {
                      if (
                        ss.type !== 'label' &&
                        ss.type !== 'my-storages-separator'
                        && ss.uid === s.uid
                      ) {
                        acc.push(ss.balance);
                      }
                      return acc;
                    }, []),
                totalBalance = userStoragesBalances.reduce(sumBalance, {})

              return {
                type: 'label',
                title: s.title,
                uid: s.uid,
                collapsed: s.collapsed,
                totalBalance: {
                  currencyCode: currenciesModule.deps.mainCurrencyCode,
                  value: balanceToMainCurrency(totalBalance, currenciesModule),
                },
              }
            })

        return [
          ...othersStoragesWithSettedTotalBalance,
          { type: 'my-storages-separator', collapsed: isSecureMode },
          ...myStorages,
        ]
      }
    };
