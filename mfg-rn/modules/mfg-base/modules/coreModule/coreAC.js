/* @flow */

import type { CurrencyCode, UID } from '../../const'
/* TODO 2 MFG-14 remove this file */

export const
  APP_MOUNT: 'APP_MOUNT' =
    'APP_MOUNT',
  RESTART_APP: 'RESTART_APP' =
    'RESTART_APP',
  ADD_USER_ACCEPT_INVITATION: 'ADD_USER_ACCEPT_INVITATION' =
    'ADD_USER_ACCEPT_INVITATION',
  ADD_USER_REJECT_INVITATION: 'ADD_USER_REJECT_INVITATION' =
    'ADD_USER_REJECT_INVITATION',
  ADD_USER_FINISH: 'ADD_USER_FINISH' =
    'ADD_USER_FINISH',
  CLEAR_PASSWORD: 'CLEAR_PASSWORD' =
    'CLEAR_PASSWORD',
  SET_CURRENCIES_RATES: 'SET_CURRENCIES_RATES' =
    'SET_CURRENCIES_RATES',
  RESET_APP_STATE: 'RESET_APP_STATE' =
    'RESET_APP_STATE'

type CurrenciesRates = { [currencyCode: CurrencyCode]: number }

type AppMountAction = {| type: typeof APP_MOUNT |}

type ResetAppStateAction = {| type: typeof RESET_APP_STATE |}

export type AnyAppAction =
  | {| type: typeof RESTART_APP |}
  | {| type: typeof RESET_APP_STATE |}
  | {| type: typeof CLEAR_PASSWORD |}
  | {| type: typeof ADD_USER_ACCEPT_INVITATION, inviterUid: UID |}
  | {| type: typeof ADD_USER_REJECT_INVITATION, inviterUid: UID |}
  | {| type: typeof ADD_USER_FINISH |}

  | {| type: typeof SET_CURRENCIES_RATES, rates: CurrenciesRates |}
  | AppMountAction


export const
  setCurrenciesRates = (rates: CurrenciesRates) => ({ type: SET_CURRENCIES_RATES, rates }),
  restartAppAC = () => ({ type: RESTART_APP }),
  addUserAcceptInvitation = (inviterUid: UID) => ({
    type: ADD_USER_ACCEPT_INVITATION,
    inviterUid,
  }),
  addUserRejectInvitation = (inviterUid: UID) => ({
    type: ADD_USER_REJECT_INVITATION,
    inviterUid,
  }),
  appMountAC = (): AppMountAction => ({ type: APP_MOUNT }),
  resetAppStateAC = (): ResetAppStateAction => ({ type: RESET_APP_STATE })

