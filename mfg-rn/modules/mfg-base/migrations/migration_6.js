/* @flow */


import type { MyAccount } from '../entities/account/live/account.flowTypes'
import type {
  AStorage, Category, CategoryPlan, PlannedTransaction,
  Transaction,
} from '../entities/account/live/flowTypes'
import { mapObjIndexed, pipe, u } from '../utils/utils'
const
  updateCategories = mapObjIndexed((category: Category) => u(category,
    (category: Category) => {
      category.encrypted = true
    })),
  updateStorages = mapObjIndexed((storage: AStorage) => u(storage,
    (storage: AStorage) => {
      storage.encrypted = true
    })),
  updateTransactions = mapObjIndexed((transaction: Transaction) => u(transaction,
    (transaction: Transaction) => {
      transaction.encrypted = true
    })),
  updatePlannedTransactions = mapObjIndexed((plannedTransaction: PlannedTransaction) =>
    u(plannedTransaction, (plannedTransaction: PlannedTransaction) => {
      plannedTransaction.encrypted = true
    })),
  updatePlans = mapObjIndexed(mapObjIndexed(mapObjIndexed((plan: CategoryPlan) =>
    u(plan, (plannedTransaction: CategoryPlan) => {
      plannedTransaction.encrypted = true
    }))))

export const migration6 = (account: MyAccount): MyAccount => {
  return pipe(
    account => u(account, (account: MyAccount) => {
      if (account.encrypted) {
        account.live.categories = updateCategories(account.live.categories)
        account.live.storages = updateStorages(account.live.storages)
        account.live.transactions = updateTransactions(account.live.transactions)
        account.live.plannedTransactions =
          updatePlannedTransactions(account.live.plannedTransactions)
        account.live.plans = updatePlans(account.live.plans)
        account.archive.transactions = updateTransactions(account.archive.transactions)
        account.version = 6
      }
    }),
  )(account)
}
