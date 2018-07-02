/* @flow */

import { splashScreenModule } from './modules/splashScreenModule/splashScreenModule'
import type { AppConfig } from './base.flow'
import type { AnyModule, AnyModuleMap } from './global.flow'
import { alertModule } from './modules/alertModule/alertModule'
import { makeAsyncStorageModule } from './modules/asyncStorageModule/makeAsyncStorageModule'
import { cryptScreenModule } from './modules/cryptScreenModule/cryptScreenModule'
import { makeDbModule } from './modules/dbModule/makeDbModule'
import {
  editTransactionDialogsModule,
} from './modules/editTransactionDialogsModule/editTransactionDialogsModule'
import { geoModule } from './modules/geoModule/geoModule'
import {
  pickCategoryDialogModule,
} from './modules/globalDialogsModules/PickCategoryDialog/pickCategoryDialogModule'
import {
  pickCurrencyDialogModule,
} from './modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogModule'
import {
  pickDateDialogModule,
} from './modules/globalDialogsModules/PickDateDialog/PickDateDialogModule'
import {
  pickDayDialogModule,
} from './modules/globalDialogsModules/PickDayDialog/pickDayDialogModule'
import {
  pickUserDialogModule,
} from './modules/globalDialogsModules/PickUserDialog/pickUserDialogModule'
import { initModule } from './modules/initModule/initModule'
import { loginScreenModule } from './modules/loginScreenModule/loginScreenModule'
import { logoutScreenModule } from './modules/logoutScreenModule/logoutScreenModule'
import { migrationScreenModule } from './modules/migrationScreenModule/migrationScreenModule'
import { nativeAppStateModule } from './modules/nativeAppState/nativeAppStateModule'
import { makeNavModule } from './modules/navModule/makeNavModule'
import { networkIsConnectedModule } from './modules/networkIsConnected/networkIsConnectedModule'
import { makeNowModule } from './modules/nowModule/nowModule'
import { orientationModule } from './modules/orientationModule/orientationModule'
import { registerScreenModule } from './modules/registerScreenModule/registerScreenModule'
import { sessionModule } from './modules/sessionModule/sessionModule'
import {
  makeSideEffectManagerModule,
} from './modules/sideEffectManagerModule/sideEffectManagerModule'
import {
  sortCategoriesScreenModule,
} from './modules/sortCategoriesScreenModule/sortCategoriesModule'
import { sortStoragesScreenModule } from './modules/sortStoragesScreenModule/sortStoragesModule'
import { testModule } from './modules/test/testModule'
import { utilModule } from './modules/util/utilModule'
import { welcomeScreenModule } from './modules/welcomeScreenModule/welcomeScreenModule'
import { makeModuleMiddleware } from './utils/makeModuleMiddleware'
import { modulesArrayToMap } from './utils/utils'

const
  makeModulesRegistry = (appConf: AppConfig,
    extraModules: Array<AnyModule>,
    onError?: Error => any) => {
    const
      modules: Array<AnyModule> = [
        alertModule,
        cryptScreenModule,
        makeDbModule(appConf),
        geoModule,
        /* globalDialogsModules */
        pickCategoryDialogModule,
        pickCurrencyDialogModule,
        pickDateDialogModule,
        pickDayDialogModule,
        pickUserDialogModule,
        initModule,
        loginScreenModule,
        logoutScreenModule,
        nativeAppStateModule,
        networkIsConnectedModule,
        makeNowModule(appConf),
        orientationModule,
        registerScreenModule,
        sessionModule,
        sortStoragesScreenModule,
        sortCategoriesScreenModule,
        testModule,
        utilModule,
        welcomeScreenModule,
        editTransactionDialogsModule,
        migrationScreenModule,
        splashScreenModule,
        ...extraModules,
      ],
      { navModule, MyNavigator } = makeNavModule(modules, appConf),
      modulesWithNav: Array<AnyModule> = [
        ...modules,
        navModule,
      ],
      modulesWithAsyncStorage: Array<AnyModule> = [
        ...modulesWithNav,
        makeAsyncStorageModule(modules),
      ],
      sideEffectManagerModule =
        makeSideEffectManagerModule(modulesArrayToMap(modulesWithAsyncStorage), onError),
      modulesWithSideEffectManager: Array<AnyModule> = [
        sideEffectManagerModule,
        ...modulesWithAsyncStorage,
      ],
      allModulesProcessed = modulesWithSideEffectManager.map(m => {
        if (m.middlewareFn) {
          return {
            ...m,
            middleware: makeModuleMiddleware({ moduleId: m.moduleId, fn: m.middlewareFn }),
          }
        }
        return m;
      }),
      modulesRegistry: AnyModuleMap = modulesArrayToMap(allModulesProcessed)

    return {
      modulesRegistry,
      MyNavigator,
    }
  }


export {
  makeModulesRegistry,
}
