/* @flow */

import { pipe, u } from '../utils/utils';

type AccountV4 = Object;
type AccountV5 = Object;

const reduceAndAddType = (target, type) => (acc) => Object.keys(target).reduce((acc, key) => {
  acc[key] = { ...target[key], type };
  return acc;
}, acc)

export const migration5 = (account: AccountV4): AccountV5 => {
  const categories = pipe(
    reduceAndAddType(account.live.expenseCategories, 'expense'),
    reduceAndAddType(account.live.incomeCategories, 'income')
  )({})

  return pipe(
    account => u(account, (account) => {
      delete account.live.incomeCategories
      delete account.live.expenseCategories
    }),
    account => u(account, (account: AccountV5) => {
      account.live.categories = categories
      account.version = 5
    })
  )(account)
};
