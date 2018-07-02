/* @flow */

import moment from 'moment'
import { __undef } from '../../const'
import { categoryTitlePathByIdSelector } from '../../entities/account/live/categoriesSelectors'
import { undefinedCurrencyCode } from '../../entities/account/live/parts/mainCurrencyCodeReducer'
import { storageTitleByIdSelector } from '../../entities/account/live/storagesSelectors'
import { allUserNamesMapSelector } from '../../selectors'
import { isDefined } from '../../utils/utils'

import type { CurrencyCode, MyDateNoTimeStr, TransactionId, UID, Undefined } from '../../const'
import type {
  Categories, Storages, Tags, Transaction,
  Users,
} from '../../entities/account/live/flowTypes'
import type { PersonalData } from '../../entities/personalData/personalData.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'

type ValueType = 'expense' | 'income' | 'transfer'

type TransactionProps = {|
  index: number,
  id: TransactionId,
  isSelected: bool,
  hasSecondValue: bool,
  title: string,
  comment: string,
  tags: Tags,
  value1: number,
  value1Type: ValueType,
  value1CurrencyCode: CurrencyCode,
  value2: number,
  value2Type: ValueType,
  value2CurrencyCode: CurrencyCode,
  date: MyDateNoTimeStr,
  time: string,
  value1Storage: string,
  value2Storage: string,
  author: string,
|}

export type TransactionsListProps = Array<TransactionProps>

export type CalcTransactionsListProps = {|
  transactions: Array<Transaction>,
  storages: Storages,
  categories: Categories,
  selectedTransactionId: TransactionId | Undefined,
  selectedUid: UID,
  users: Users,
  personalData: PersonalData,
  session: Session,
|}

const
  calcTransactionsListProps = ({
    transactions,
    storages,
    categories,
    selectedTransactionId,
    selectedUid,
    users,
    personalData,
    session,
  }: CalcTransactionsListProps): TransactionsListProps => {
    const allUserNamesMap = allUserNamesMapSelector({ users, personalData, session })

    return [...transactions] // TODO 3 MFG-41 remove spread, sort is some why mutate array
      .sort((t1, t2) => {
        const
          d2 = moment(t2.date)
            .valueOf(),
          d1 = moment(t1.date)
            .valueOf()

        return d2 - d1
      })
      .map((transaction, index): TransactionProps => {
        const {
            id,
            comment,
            currencyCode,
            date: transactionDate,
            tags,
            value,
          } = transaction,
          mdate = moment(transactionDate),
          date: MyDateNoTimeStr = mdate.format('DD.MM.YYYY'),
          time = mdate.format('kk:mm'),
          value1CurrencyCode = currencyCode,
          value2CurrencyCode = undefinedCurrencyCode,
          value2Storage = __undef,
          value2Type = 'expense',
          value2 = 0,
          isSelected = selectedTransactionId === id,
          hasSecondValue = false,
          author = isDefined(selectedUid) ? __undef : allUserNamesMap[transaction.uid]

        if (transaction.type === 'expense') {
          const {
            storageIdFrom,
            categoryId,
          } = transaction;

          return {
            id,
            index,
            comment,
            tags,
            date,
            time,
            value1CurrencyCode,
            value2CurrencyCode,
            value2Storage,
            isSelected,
            author,
            hasSecondValue,
            value2Type,
            value2,
            value1: -value,
            value1Type: 'expense',
            value1Storage: storageTitleByIdSelector(storages, { storageId: storageIdFrom }),
            title: categoryTitlePathByIdSelector(categories, { categoryId })
              .join(' -> '),
          };
        }
        if (transaction.type === 'income') {
          const {
            storageIdTo,
            categoryId,
          } = transaction;

          return {
            id,
            index,
            comment,
            tags,
            date,
            time,
            value1CurrencyCode,
            value2CurrencyCode,
            value2Storage,
            isSelected,
            author,
            hasSecondValue,
            value2Type,
            value2,
            value1: value,
            value1Type: 'income',
            value1Storage: storageTitleByIdSelector(storages, { storageId: storageIdTo }),
            title: categoryTitlePathByIdSelector(categories, { categoryId })
              .join(' -> '),
          };
        }
        if (transaction.type === 'transfer') {
          const {
            storageIdFrom,
            storageIdTo,
          } = transaction;

          return {
            id,
            index,
            comment,
            tags,
            date,
            time,
            value1CurrencyCode,
            isSelected,
            author,
            hasSecondValue: true,
            value2CurrencyCode: currencyCode,
            value1: -value,
            value2: value,
            value1Type: 'expense',
            value2Type: 'income',
            value1Storage: storageTitleByIdSelector(storages, { storageId: storageIdFrom }),
            value2Storage: storageTitleByIdSelector(storages, { storageId: storageIdTo }),
            title: 'transfer',
          };
        }
        if (transaction.type === 'exchange') {
          const {
            storageId,
            currencyCodeTo,
            valueTo,
          } = transaction;

          return {
            id,
            index,
            comment,
            tags,
            date,
            time,
            value1CurrencyCode,
            value2Storage,
            isSelected,
            author,
            hasSecondValue: true,
            value1: -value,
            value2: valueTo,
            value1Type: 'expense',
            value2Type: 'income',
            value2CurrencyCode: currencyCodeTo,
            value1Storage: storageTitleByIdSelector(storages, { storageId }),
            title: 'exchange',
          };
        }

        throw new Error('Unknown transaction type');
      });
  }

export {
  calcTransactionsListProps,
}
