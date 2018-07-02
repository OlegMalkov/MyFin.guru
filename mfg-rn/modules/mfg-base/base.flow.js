/* @flow */

import type {
  AnySplashScreenModuleAction,
} from './modules/splashScreenModule/splashScreenAC'
import type { EMAIL, MyDate, UID } from './const'
import type { FbsDatabaseState } from './entities/account/live/account.flowTypes'
import type {
  Computer, Dimensions, DispatchResult, ExMiddleware, ExStore,
  MiddlewareFn,
} from './global.flow'
import type { ExDispatch, Module, ModuleSubscriptionMaker, VP } from './global.flow'
import type { XReducer, ModulePromiseMaker } from './global.flow'
import type { AnyAlertModuleAction } from './modules/alertModule/alertModuleAC'
import type {
  AlertModuleState,
} from './modules/alertModule/alertModuleReducer'
import type { AnyAsyncStorageModuleAction } from './modules/asyncStorageModule/asyncStorageAC'
import type {
  AsyncStorageModuleState,
} from './modules/asyncStorageModule/makeAsyncStorageReducerAndMiddlewareAndPromises'
import type { AnyAppAction } from './modules/coreModule/coreAC'
import type { AnyEncryptionAction } from './modules/cryptScreenModule/cryptScreenAC'
import type {
  CryptScreenState,
} from './modules/cryptScreenModule/cryptScreenReducer'
import type { AnyDbModuleAction } from './modules/dbModule/dbAC'
import type {
  DbModuleState,
} from './modules/dbModule/dbModuleReducer'
import type {
  AnyAddTransactionDialogAction,
} from './modules/editTransactionDialogsModule/editTransactionDialogsAC'
import type {
  EditTransactionDialogsState,
} from './modules/editTransactionDialogsModule/editTransactionDialogsReducer'
import type { AnyGeoModuleAction } from './modules/geoModule/geoAC'
import type {
  GeoModuleState,
} from './modules/geoModule/geoModuleReducer'
import type {
  AnyPickCategoryDialogActionType,
} from './modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialogAC'
import type {
  PickCategoryDialogState,
} from './modules/globalDialogsModules/PickCategoryDialog/pickCategoryDialogReducer'
import type {
  AnyPickCurrencyDialogActionType,
} from './modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogAC'
import type {
  PickCurrencyDialogState,
} from './modules/globalDialogsModules/PickCurrencyDialog/pickCurrencyDialogReducer'
import type {
  AnyPickDateDialogActionType,
} from './modules/globalDialogsModules/PickDateDialog/pickDateDialogAC'
import type {
  PickDateDialogState,
} from './modules/globalDialogsModules/PickDateDialog/pickDateDialogReducer'
import type {
  AnyPickDayDialogActionType,
} from './modules/globalDialogsModules/PickDayDialog/pickDayDialogAC'
import type {
  PickDayDialogState,
} from './modules/globalDialogsModules/PickDayDialog/pickDayDialogReducer'
import type {
  AnyPickUserDialogActionType,
} from './modules/globalDialogsModules/PickUserDialog/pickUserDialogAC'
import type {
  PickUserDialogState,
} from './modules/globalDialogsModules/PickUserDialog/pickUserDialogReducer'
import type { AnyInitModuleAction } from './modules/initModule/initAC'
import type { InitModuleState } from './modules/initModule/initModuleReducer'
import type { AnyLoginScreenAction } from './modules/loginScreenModule/loginScreenAC'
import type { LoginScreenState } from './modules/loginScreenModule/loginScreenReducer'
import type { AnyLogoutScreenModuleAction } from './modules/logoutScreenModule/logoutScreenAC'
import type {
  LogoutScreenModuleState,
} from './modules/logoutScreenModule/logoutScreenModuleReducer'
import type { MigrationScreenState } from './modules/migrationScreenModule/migrationScreenReducer'
import type { AnyNativeAppStateAction } from './modules/nativeAppState/nativeAppStateAC'
import type {
  NativeAppState,
} from './modules/nativeAppState/nativeAppStateReducer'
import type {
  NavModuleState,
} from './modules/navModule/makeNavReducer'
import type { AnyNavigationAction } from './modules/navModule/navAC'
import type { AnyNetworkIsConnectedAction } from './modules/networkIsConnected/networkIsConnectedAC'
import type {
  NetworkIsConnected,
} from './modules/networkIsConnected/networkIsConnectedReducer'
import type {
  Now,
} from './modules/nowModule/nowReducer'
import type { AnyNowSubscriptionAction } from './modules/nowModule/nowSubscriptionAC'
import type { AnyOrientationAction } from './modules/orientationModule/orientationAC'
import type {
  OrientationModuleState,
} from './modules/orientationModule/orientationReducer'
import type { AnyRegisterScreenAction } from './modules/registerScreenModule/registerScreenAC'
import type { RegisterScreenState } from './modules/registerScreenModule/registerScreenReducer'
import type {
  Session,
} from './modules/sessionModule/flowTypes'
import type {
  AnySideEffectManagerModuleAction,
} from './modules/sideEffectManagerModule/sideEffectManagerAC'
import type {
  SideEffectManagerModuleState,
} from './modules/sideEffectManagerModule/sideEffectManagerReducer'
import type {
  SortCategoriesScreenState,
} from './modules/sortCategoriesScreenModule/sortCategoriesModule'
import type { AnySortModuleActionTypes } from './modules/sortModuleFactoryModule/sortScreenAC'
import type { SortStoragesScreenState } from './modules/sortStoragesScreenModule/sortStoragesModule'
import type { TestModuleState } from './modules/test/testModuleReducer'
import type { AnyUtilModuleAction } from './modules/util/utilAC'
import type { WelcomeScreenModuleState } from './modules/welcomeScreenModule/welcomeScreenReducer'
import type { AnyRnModuleAction } from './rn/rnAC'

export type BaseAppState = {|
  alert: AlertModuleState,
  asyncStorage: AsyncStorageModuleState,
  cryptScreen: CryptScreenState,
  db: DbModuleState,
  geo: GeoModuleState,
  pickCategoryDialog: PickCategoryDialogState,
  pickCurrencyDialog: PickCurrencyDialogState,
  pickDateDialog: PickDateDialogState,
  pickDayDialog: PickDayDialogState,
  pickUserDialog: PickUserDialogState,
  init: InitModuleState,
  loginScreen: LoginScreenState,
  logoutScreen: LogoutScreenModuleState,
  nativeAppState: NativeAppState,
  nav: NavModuleState,
  networkIsConnected: NetworkIsConnected,
  now: Now,
  orientation: OrientationModuleState,
  registerScreen: RegisterScreenState,
  session: Session,
  sideEffectManager: SideEffectManagerModuleState,
  sortCategoriesScreen: SortCategoriesScreenState,
  sortStoragesScreen: SortStoragesScreenState,
  welcomeScreen: WelcomeScreenModuleState,
  windowDimensions: Dimensions,
  editTransactionDialogs: EditTransactionDialogsState,
  test: TestModuleState,
  migrationScreen: MigrationScreenState
|}

export type AnyBaseAction =
  | AnyAddTransactionDialogAction
  | AnyAlertModuleAction
  | AnyAsyncStorageModuleAction
  | AnyAppAction
  | AnyEncryptionAction
  | AnyDbModuleAction
  | AnyGeoModuleAction
  | AnyPickCategoryDialogActionType
  | AnyPickCurrencyDialogActionType
  | AnyPickDateDialogActionType
  | AnyPickDayDialogActionType
  | AnyPickUserDialogActionType
  | AnyInitModuleAction
  | AnyLoginScreenAction
  | AnyLogoutScreenModuleAction
  | AnyNativeAppStateAction
  | AnyNavigationAction
  | AnyNetworkIsConnectedAction
  | AnyNowSubscriptionAction
  | AnyOrientationAction
  | AnyRegisterScreenAction
  | AnySideEffectManagerModuleAction
  | AnySortModuleActionTypes
  | AnyUtilModuleAction
  | AnyRnModuleAction
  | AnySplashScreenModuleAction

export type BaseReducer<S> = XReducer<S, AnyBaseAction>
export type BaseModule<S> = Module<S, AnyBaseAction, BaseAppState>
export type BaseModulePromiseMaker<Props> = ModulePromiseMaker<Props, BaseAppState, AnyBaseAction>
export type BaseModuleSubscriptionMaker<Props> =
  ModuleSubscriptionMaker<Props, BaseAppState, AnyBaseAction>
export type BaseComputer<S> = Computer<S, AnyBaseAction>

export type BaseVP<S> = VP<S, AnyBaseAction>
export type BaseMiddlewareFn<PP = void, SP = void> =
  MiddlewareFn<AnyBaseAction, BaseAppState, PP, SP>
export type BaseMiddleware<PP = void, SP = void> =
  ExMiddleware<AnyBaseAction, BaseAppState, PP, SP>
export type BaseDispatch<PP = void, SP = void> = ExDispatch<AnyBaseAction, PP, SP>
export type BaseDispatchResult<PP = void, SP = void> = DispatchResult<AnyBaseAction, PP, SP>
export type BaseStore = ExStore<AnyBaseAction, BaseAppState, any, any>
export type DatabaseIdentity = {|
  email: EMAIL,
  password: string,
  uid: UID,
|}

export type AppConfig = {|
  testDatabaseInitialState?: FbsDatabaseState,
  testDatabaseIdentities?: Array<DatabaseIdentity>,
  testInitialDateTime?: MyDate,
  initialRouteName?: string,
  enableCodePush?: true,
|}
