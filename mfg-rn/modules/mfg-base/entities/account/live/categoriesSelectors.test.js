// @flow

import {
  testDemoCategories, testDemoTransactions,
  testTransactionsSelectPropsExpense,
} from '../../../test/testData'
import { categoriesWithTotalBalanceSelector } from './categoriesSelectors'

describe('categoriesWithTotalBalanceSelector', () => {
  it('works with demo data', () => {
    const x = categoriesWithTotalBalanceSelector(
      testDemoCategories,
      testDemoTransactions,
      testTransactionsSelectPropsExpense,
    );
    expect(x).toEqual([{
      balance: {},
      children: null,
      id: 'food-cat-id',
      isHidden: false,
      parentId: 'undefined-string',
      title: 'Food',
      totalBalance: {},
      type: 'expense',
    }])
  })
})
