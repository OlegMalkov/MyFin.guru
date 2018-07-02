/* @flow */

import { personalDataReducer } from '../../entities/personalData/personalDataReducer'
import { isTestEnv } from '../../isTestEnv'
import { deprecatedConnect } from '../../baseConnect'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import { invertObj, makeUpdateDepsReducer, pipe, updateChild } from '../../utils/utils'
import { dbUpdateSortAC } from '../dbModule/dbAC'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModule'

import type { BaseAppState, BaseMiddlewareFn, BaseModule, BaseReducer } from '../../base.flow'
import type { PersonalData } from '../../entities/personalData/personalData.flow'
import type { UID } from '../../const'
import type { MapKV } from '../../global.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'
import { navigateBackAC } from '../navModule/navAC'
import type { SortItems, SortItem } from './flowTypes'
import { SORT_SCREEN_BACK_BUTTON_PRESSED, SORT_SCREEN_ROW_MOVED } from './sortScreenAC'

type Deps<ID, Entity, SortDataType> = {|
  entities: MapKV<ID, Entity>,
  sortData: SortDataType,
  personalData: PersonalData,
  session: Session,
|}

export type SortScreenModuleState<ID, Entity, SortDataType> = {|
  deps: Deps<ID, Entity, SortDataType>
|}

export type SortModuleFactoryProps<ID, Entity, SortDataType> = {|
  moduleId: 'sortCategoriesScreen' | 'sortStoragesScreen',
  screenName: 'CategoriesSort' | 'StoragesSort',
  dbKey: string,
  entityReducer: BaseReducer<MapKV<ID, Entity>>,
  entitySortReducer: BaseReducer<SortDataType>,
  getDbTypeParts: (props: { screenParams: Object }) => Array<string>,
  makeItemsSelector: ({ screenParams: Object, uid: UID }) =>
    (s: SortScreenModuleState<ID, Entity, SortDataType>) => Array<SortItem<ID>>,
|}

const

  sortModuleFactory = <ID, Entity, SortDataType>({
    moduleId,
    screenName,
    dbKey,
    entityReducer,
    entitySortReducer,
    getDbTypeParts,
    makeItemsSelector,
  }: SortModuleFactoryProps<ID, Entity, SortDataType>): BaseModule<SortScreenModuleState<ID, Entity, SortDataType>> => { // eslint-disable-line max-len
    const
      depsReducer: BaseReducer<Deps<ID, Entity, SortDataType>> = makeUpdateDepsReducer((s, a) => ({
        entities: entityReducer(s.entities, a),
        sortData: entitySortReducer(s.sortData, a),
        personalData: personalDataReducer(s.personalData, a),
        session: sessionModuleReducer(s.session, a),
      })),
      anyInitialSortData: any = {},
      initialSortData: SortDataType = anyInitialSortData,
      initialDependenciesState: Deps<ID, Entity, SortDataType> = {
        entities: {},
        sortData: initialSortData,
        personalData: getReducerInitialState(personalDataReducer),
        session: getReducerInitialState(sessionModuleReducer),
      },
      initialState: SortScreenModuleState<ID, Entity, SortDataType> = {
        deps: initialDependenciesState,
      },
      _reducer: BaseReducer<SortScreenModuleState<ID, Entity, SortDataType>> =
        (s = initialState, a) => {
          return pipe(
            s => updateChild(s, a, 'deps', depsReducer),
          )(s)
        },
      reducer: BaseReducer<SortScreenModuleState<ID, Entity, SortDataType>> =
        makeModuleReducer({ reducer: _reducer, moduleId }),
      sortModuleFactoryMiddlewareFn: BaseMiddlewareFn<> = a => {
        if (a.type === SORT_SCREEN_ROW_MOVED) {
          const
            screenParams = {},
            // TODO pass screen params without nav currentScreenParamsSelector(nav),
            { newOrder } = a,
            sort = invertObj(newOrder),
            sortSpecificPath = getDbTypeParts({ screenParams })
              .join('/')

          return { a: dbUpdateSortAC({ dbKey, sortSpecificPath, sort }) }
        }

        if (a.type === SORT_SCREEN_BACK_BUTTON_PRESSED) {
          return { a: navigateBackAC() }
        }

        return null
      }

    const
      /* TODO 2 remove props */
      mapStateToProps = (as: BaseAppState, props: any) => {
        const
          s: SortScreenModuleState<any, any, any> = as[moduleId],
          { navigation: { state: { params } } } = props,
          itemsArr: Array<SortItem<ID>> = makeItemsSelector({
            screenParams: params,
            uid: s.deps.session.uid,
          })(s),
          emptyItems: SortItems<ID> = {},
          itemsObj = itemsArr.reduce((a, v) => {
            a[v.id] = v
            return a
          }, emptyItems)

        return {
          items: itemsObj,
        }
      }

    return {
      middlewareFn: sortModuleFactoryMiddlewareFn,
      screens: isTestEnv ? {} : {
        [screenName]:
          deprecatedConnect(mapStateToProps)(require('./SortModuleScreen').SortModuleScreen),
      },
      moduleId,
      reducer,
    }
  }


export {
  sortModuleFactory,
}
