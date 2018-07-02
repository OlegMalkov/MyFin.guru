/* @flow */

import {
  makeTransactionMatcher, sumBalance,
  transactionsToBalance,
} from './transactionsSelectors';
import { groupBy, isDefined, keys, mapObjIndexed, pipe, values } from '../../../utils/utils';

import type { CategoryId } from '../../../const'
import type { MapKV } from '../../../global.flow'
import type {
  Balance, Categories, CategoriesIdsTrueMap,
  Category, CategoryRef, CategoryRefInternal,
  CategoryRefWithTotalBalance, TransactionMatcher, Transactions,
  TransactionsFilterProps,
  TransactionsSelectProps,
} from './flowTypes';

export type CategoriesChildrenMap = MapKV<CategoryId, Array<CategoryId>>
const
  getAllChildCategoriesIds =
    (categories: Categories, parentCategoryId) => {
      const
        result: CategoriesIdsTrueMap = { [parentCategoryId]: true },
        addAllCategoryChildren = (catId) => {
          pipe(
            keys,
            categoryIds => categoryIds.filter(
              categoryId => categories[categoryId].parentId === catId,
            ),
            relevantIds => relevantIds.forEach((categoryId: CategoryId) => {
              result[categoryId] = true
              addAllCategoryChildren(categoryId)
            }),
          )(categories)
        }

      addAllCategoryChildren(parentCategoryId)
      return result
    },
  makeTransactionsSelector = (transactionMatcher: TransactionMatcher) =>
    (categories: Categories, transactions: Transactions, props: TransactionsFilterProps) => {
      const relevantCategoriesIds = props.categoryId ?
        getAllChildCategoriesIds(categories, props.categoryId) : null

      return values(transactions)
        .filter((t) => transactionMatcher(t, props, relevantCategoriesIds))
    },

  expenseTransactionMatcher = makeTransactionMatcher(({ type }) => type === 'expense'),
  incomeTransactionMatcher = makeTransactionMatcher(({ type }) => type === 'income'),
  transactionSelectorsByType = {
    expense: makeTransactionsSelector(expenseTransactionMatcher),
    income: makeTransactionsSelector(incomeTransactionMatcher),
  },
  categoriesBalancesSelector = (categories: Categories,
                                transactions: Transactions,
                                props: TransactionsSelectProps) => {
    const transactionProps = {
      fromTimestamp: props.fromTimestamp,
      toTimestamp: props.toTimestamp,
      uid: props.uid,
    }
    return pipe(
      groupBy((transaction) => {
        if (transaction.categoryId) {
          return transaction.categoryId;
        }
        return 'non-category-transactions'
      }),
      mapObjIndexed(transactionsToBalance),
    )(transactionSelectorsByType[props.type](categories, transactions, transactionProps))
  },
  categoriesListToNestedStructure =
    (categories: Array<Category>,
     getBalance: (categoryId: CategoryId) => Balance): Array<CategoryRef> => {
      return pipe(
        (categories: Array<Category>) => categories.reduce((acc, category: Category) => {
          const
            byIdMap: { [key: string]: CategoryRefInternal } = acc.byIdMap,
            existingRef: CategoryRefInternal = byIdMap[category.id]

          if (existingRef) {
            if (existingRef.temporary) {
              delete existingRef.temporary
              Object.assign(existingRef, category)
            } else {
              throw new Error(`category ${category.id} is duplicated`)
              // return acc
            }
          } else {
            const
              type = category.type,
              catRef: CategoryRefInternal = {
                type,
                id: category.id,
                isHidden: category.isHidden,
                parentId: category.parentId,
                title: category.title,
                balance: getBalance(category.id),
              }
            byIdMap[category.id] = catRef
          }

          if (isDefined(category.parentId)) {
            const parentRef: CategoryRefInternal =
              byIdMap[category.parentId] || ({
                id: category.parentId,
                temporary: true,
                isHidden: false,
                parentId: null,
                title: '',
                balance: {},
                type: 'expense',
              })

            if (parentRef.temporary) {
              byIdMap[parentRef.id] = parentRef
            }

            if (!parentRef.children) {
              parentRef.children = []
            }

            parentRef.children.push(byIdMap[category.id])
          } else {
            acc.topLevelCategories.push(byIdMap[category.id])
          }

          return acc
        }, { byIdMap: {}, topLevelCategories: [] }),
        ({ topLevelCategories }) => topLevelCategories,
        (internalCategoriesRefs: Array<CategoryRefInternal>): Array<CategoryRef> =>
          internalCategoriesRefs.map(({
                                        temporary, // eslint-disable-line no-unused-vars
                                        ...rest // eslint-disable-line comma-dangle
                                      }) => {
            const categoryRef: CategoryRef = ({ ...rest }: any)
            return categoryRef
          }),
      )(categories)
    },
  emptyBalance: Balance = {},
  categoriesToNestedStructureWithBalance = (categories: Categories,
                        transactions: Transactions,
                        props: TransactionsSelectProps): Array<CategoryRef> => {
    const
      categoriesBalances = categoriesBalancesSelector(categories, transactions, props),
      categoriesRefs: Array<Category> =
        values(categories).filter(({ type }) => type === props.type)

    return categoriesListToNestedStructure(
      categoriesRefs,
      (categoryId) => categoriesBalances[categoryId] || emptyBalance,
    )
  },
  calcCategoryRefTotalBalance = ({
                                   id,
                                   isHidden,
                                   parentId,
                                   title,
                                   children,
                                   balance,
                                   type,
                                 }: CategoryRef): CategoryRefWithTotalBalance => {
    if (children) {
      const
        childrenWithTotalBalance = children.map(calcCategoryRefTotalBalance),
        r: CategoryRefWithTotalBalance = {
          type,
          id,
          isHidden,
          parentId,
          title,
          balance,
          children: childrenWithTotalBalance,
          totalBalance: childrenWithTotalBalance
            .map(({ totalBalance }) => totalBalance).reduce(sumBalance, balance),
        }
      return r
    }

    const r: CategoryRefWithTotalBalance = {
      type,
      id,
      isHidden,
      parentId,
      title,
      balance,
      totalBalance: balance,
      children: null,
    }

    return r
  },
  categoryTitlePathByIdSelector =
    (categories: Categories, { categoryId }: { categoryId: CategoryId }) => {
      const category = categories[categoryId]

      if (!category) {
        return [`${categoryId}-not-found`]
      }

      const result = [category.title]

      let pointer = category
      while (isDefined(pointer.parentId)) {
        const nextPointer = categories[pointer.parentId]
        result.unshift(nextPointer.title)
        pointer = nextPointer
      }

      return result
    },
  categoriesWithTotalBalanceSelector =
    (categories: Categories,
     transactions: Transactions,
     props: TransactionsSelectProps): Array<CategoryRefWithTotalBalance> => {
      const categoriesWithBalance: Array<CategoryRef> =
        categoriesToNestedStructureWithBalance(categories, transactions, props)

      return categoriesWithBalance.map(calcCategoryRefTotalBalance)
    },
  _toNestedStructure = (categories: Categories): Array<CategoryRef> =>
    categoriesListToNestedStructure(
      values(categories),
      (categoryId: CategoryId) => emptyBalance // eslint-disable-line no-unused-vars
    ),
  _categoriesChildrenMapSelector = (allCategories: Categories) => {
    const
      categoriesChildrenMap: CategoriesChildrenMap = {},
      nestedCategories: Array<CategoryRef> = _toNestedStructure(allCategories)

    function fillRecursive(category: CategoryRef, parentIds = []) {
      if (!categoriesChildrenMap[category.id]) {
        categoriesChildrenMap[category.id] = []
      }

      if (category.children) {
        category.children.map(childCat => { //eslint-disable-line
          categoriesChildrenMap[category.id].push(childCat.id)
          parentIds.forEach(parentCatId => {
            categoriesChildrenMap[parentCatId].push(childCat.id)
          })
          fillRecursive(childCat, [...parentIds, category.id])
        })
      }
    }

    nestedCategories.forEach((cat: CategoryRef) => fillRecursive(cat))

    return categoriesChildrenMap
  }

export {
  categoriesWithTotalBalanceSelector,
  categoryTitlePathByIdSelector,
  _categoriesChildrenMapSelector,
}
