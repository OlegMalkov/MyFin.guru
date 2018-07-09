/* @flow */

import { __undef } from 'mfg-base/const'
import { categoriesReducer } from 'mfg-base/entities/account/live/parts/categoriesReducer'
import { storagesReducer } from 'mfg-base/entities/account/live/parts/storagesReducer'
import { usersReducer } from 'mfg-base/entities/account/live/parts/usersReducer'
import { personalDataReducer } from 'mfg-base/entities/personalData/personalDataReducer'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import {
  makeUpdateDepsReducer, pipe, updateChild, updateStateIfChanged,
  us,
} from 'mfg-base/utils/utils'
import {
  calcTransactionsListProps,
} from 'mfg-base/ui/TransactionsList/calcTransactionsListProps'
import { sessionModuleReducer } from 'mfg-base/modules/sessionModule/sessionModuleReducer'

import type {
  Categories, Storages, Transaction,
  Users,
} from 'mfg-base/entities/account/live/flowTypes'
import type { Session } from 'mfg-base/modules/sessionModule/flowTypes'
import type { PersonalData } from 'mfg-base/entities/personalData/personalData.flow'
import type { TransactionsListProps } from 'mfg-base/ui/TransactionsList/calcTransactionsListProps'
import type { PlanModuleReducer } from '../plan.flow'
import {
  PLAN_SCREEN_CLOSE_TRANSACTIONS_DIALOG,
  PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG,
} from './showTransactionsDialogAC'

type Deps = {|
  storages: Storages,
  categories: Categories,
  users: Users,
  personalData: PersonalData,
  session: Session,
|}

export type ShowTransactionsDialogState = {|
  transactions: Array<Transaction>,
  opened: bool,
  computed: {
    transactionsListProps: TransactionsListProps | null,
  },
  deps: Deps,
|}

const
  initialDepsState: Deps = {
    storages: getReducerInitialState(storagesReducer),
    categories: getReducerInitialState(categoriesReducer),
    users: getReducerInitialState(usersReducer),
    personalData: getReducerInitialState(personalDataReducer),
    session: getReducerInitialState(sessionModuleReducer),
  },
  initialState: ShowTransactionsDialogState = {
    transactions: [],
    opened: false,
    computed: {
      transactionsListProps: null,
    },
    deps: initialDepsState,
  },
  depsReducer: PlanModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
    categories: categoriesReducer(s.categories, a),
    users: usersReducer(s.users, a),
    storages: storagesReducer(s.storages, a),
  })),
  showTransactionsDialogReducer: PlanModuleReducer<ShowTransactionsDialogState> =
    (s = initialState, a) => {
      return pipe(
        s => {
          if (a.type === PLAN_SCREEN_SHOW_TRANSACTIONS_DIALOG) {
            return us(s, a, (s, a) => {
              s.transactions = a.transactions
              s.opened = true
            })
          }

          if (a.type === PLAN_SCREEN_CLOSE_TRANSACTIONS_DIALOG) {
            us(s, a, s => s.opened = false)
          }
          return s
        },
        cs => updateStateIfChanged(s, cs, a, s => {
          const {
            transactions,
            deps: {
              storages,
              categories,
              session: { uid: selectedUid }, // TODO 2 MFG-59 make userid selectable
              users,
              personalData,
              session,
            },
          } = s
          s.computed.transactionsListProps = calcTransactionsListProps({
            transactions,
            storages,
            categories,
            selectedTransactionId: __undef,
            selectedUid,
            users,
            personalData,
            session,
          })
        }),
        s => updateChild(s, a, 'deps', depsReducer),
      )(s)
    }

export {
  showTransactionsDialogReducer,
}
