// @flow

/* eslint-disable */

/*
import RNFS from 'react'// 'react-native-fs';
import { DocumentPicker, DocumentPickerUtil } from 'react'// 'react-native-document-picker';
import {
  Alert,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import { reportException } from '../../reportError';
import type { MyMiddleware } from '../../store/flowTypes'
import { getEncryptionPassword } from '../../session';
import makeGuid from '../../utils/makeGuid';
import { makeCrypt } from '../cryptScreenModule/cryptScreenMiddleware';
import { toZoneLessDateTime } from '../../utils/dateUtils';
import { dataVersion } from '../../version';
import { restartAppAC } from '../coreModule/coreAC';
import {
  assoc, defaultTo, evolve, filterArray, filterObj, head, I, keys, last, mapObjIndexed, path, pipe,
  split, tail, trim,
} from '../../utils/utils';

function ddDataToAccount(input, uid) {
  const missingAccountRefs = {},
    missingObjectRefs = {},

    ObjectTypes = {
      '2': 'INCOME',
      '3': 'EXPENSE',
      '4': 'STORAGE',
    },

    splitRow = (row) => {
      const splitter = ';',
        stringSplitter = '"',
        items = [];

      let indexOfNextOpenString,
        indexOfNextCloseString,
        indexOfNextSplitter = row.indexOf(splitter),
        loops = 0,
        currentIndex = 0;


      while (indexOfNextSplitter !== -1) {
        indexOfNextSplitter = row.indexOf(splitter, currentIndex);
        loops += 1;
        if (loops > 100) return ['recursion!!!'];
        indexOfNextOpenString = row.indexOf(stringSplitter, currentIndex);
        // todo improve calc of closeString in case of "bla ""alal"" ok"
        indexOfNextCloseString = row.indexOf(stringSplitter, indexOfNextOpenString);
        if (indexOfNextOpenString !== -1 && indexOfNextOpenString < indexOfNextSplitter) {
          indexOfNextSplitter = row.indexOf(splitter, indexOfNextCloseString);
        }
        items.push(
          row.substring(
            currentIndex,
            indexOfNextSplitter === -1 ? undefined : indexOfNextSplitter,
          ),
        );
        currentIndex = indexOfNextSplitter + 1;
      }
      const finalItems = items.map(item => {
        if (item[0] === '"' && item[item.length - 1] === '"') {
          return item.substring(1, item.length - 1).replace(/\"\"/g, '"');
        }
        return item;
      });
      return finalItems;
    },
    parsedInput = pipe(
      split('[currency]'),
      last,
      split('[objects]'),
      ([currencies, rest]) => ({
        currencies,
        rest,
      }),
      evolve({ rest: split('[records]') }),
      ({ currencies, rest: [objects, records] }) => ({
        currencies,
        objects,
        records,
      }),
      mapObjIndexed(pipe(split('\n'), filterArray(I), x => x.map(splitRow))),
      evolve({
        currencies: x => x.map(([id, name, course, code, is_autoupdate]) =>
          ({ id, name, course, code: code || name || id, is_autoupdate })),
        objects: x => x.map(
          ([
             id,
             parent_id,
             type,
             name,
             user_id,
             is_credit_card,
             is_hidden,
             is_for_duty,
             sort,
             icon_id,
             is_autohide,
           ]) =>
            ({
              id,
              parent_id,
              type: ObjectTypes[type],
              name,
              user_id,
              is_credit_card,
              is_hidden,
              is_for_duty,
              sort,
              icon_id,
              is_autohide,
            })),
        records: x => x.map(([
                               sum,
                               currency_id,
                               object_id,
                               account_id,
                               date,
                               comment,
                               user_id,
                               group_id,
                             ]) =>
          ({ sum, currency_id, object_id, account_id, date, comment, user_id, group_id })),
      }),
      evolve({
        currencies: filterObj(({ id }) => id),
        objects: filterObj(({ id }) => id),
        records: filterObj(({ date }) => date),
      }),
    )(input),
// course are always with respect to USD
    currencies = parsedInput.currencies.map(({ code, course, is_autoupdate }) => ({
      code,
      course: parseFloat(course),
      autoUpdate: is_autoupdate === 't',
    })),
    storagesOldToNew = parsedInput.objects
      .filter(o => o.type === 'STORAGE')
      .map(({ name, id, is_hidden, is_for_duty, is_credit_card }) => ({
        oldId: id,
        storage: {
          type: is_for_duty === 't' ? 'debt' : is_credit_card === 't' ? 'credit' : 'debit', // eslint-disable-line
          title: name,
          id: makeGuid(),
          initialBalance: {},
          hidden: is_hidden === 't',
        },
      })),
    storages = storagesOldToNew.map(s =>
      pipe(
        assoc('showInSecureMode', true),
        assoc('uid', uid),
      )(s.storage),
    ),
    storagesByOldId = storagesOldToNew.reduce((a, s) => ({ ...a, [s.oldId]: s.storage }), {}),
    getTagsFromComment = (comment) => {
      return pipe(
        defaultTo(''),
        split('['),
        tail,
        filterArray(s => s.indexOf(']') !== -1 && s.indexOf(']') === s.lastIndexOf(']')),
        x => x.map(pipe(split(']'), head, trim)),
      )(comment);
    },
    filterSecondTransferTransactions = ({ value, type }) => !(type === 'transfer' && value < 0),
    expenseCategoriesRaw = parsedInput.objects.filter(({ type }) => type === 'EXPENSE'),
    incomeCategoriesRaw = parsedInput.objects.filter(({ type }) => type === 'INCOME'),
    expenseOldCatIdToNew = expenseCategoriesRaw.reduce((acc, { id }) => {
      acc[id] = makeGuid();
      return acc;
    }, {}),
    incomeOldCatIdToNew = incomeCategoriesRaw.reduce((acc, { id }) => {
      acc[id] = makeGuid();
      return acc;
    }, {}),
    expenseSortIds = expenseCategoriesRaw.reduce((acc, { sort }) => {
      return [...acc, sort];
    }, []).sort(),
    incomeSortIds = incomeCategoriesRaw.reduce((acc, { sort }) => {
      return [...acc, sort];
    }, []).sort(),
    mapCategory = (oldToNewId, sortIds) => ({ id, is_hidden, name, parent_id, sort }) => {
      return {
        id: oldToNewId[id],
        isHidden: is_hidden === 't',
        title: name,
        parentId: oldToNewId[parent_id] || null,
        sort: { index: sortIds.indexOf(sort), parentId: oldToNewId[parent_id] || 'root' },
      };
    },
    expenseCategoriesWithSort = expenseCategoriesRaw.map(
      mapCategory(expenseOldCatIdToNew, expenseSortIds),
    ),
    incomeCategoriesWithSort = incomeCategoriesRaw.map(
      mapCategory(incomeOldCatIdToNew, incomeSortIds),
    ),
    removeSort = ({ sort, ...rest }) => rest, // eslint-disable-line no-unused-vars
    expenseCategories = expenseCategoriesWithSort.map(removeSort),
    incomeCategories = incomeCategoriesWithSort.map(removeSort),
    reduceSort = (acc, { id, sort }) => {
      if (!acc[sort.parentId]) {
        acc[sort.parentId] = {};
      }
      acc[sort.parentId][id] = sort.index;
      return acc;
    },
    categoriesSort = {
      [uid]: {
        ...expenseCategoriesWithSort.reduce(reduceSort, {}),
        ...incomeCategoriesWithSort.reduce(reduceSort, {}),
      },
    },
    mapToTransaction = (inputData) => {
      const notExistObj = {},
        {
          account_id,
          object_id,
          sum,
          id: transactionId,
          comment,
          currency_id,
          date,
          user_id,
        } = inputData,
        sumInt = parseInt(sum, 10),
        findObject = (targetId) => parsedInput.objects.find(({ id }) => id === targetId),
        refObj = findObject(object_id) || notExistObj,
        refAccount = findObject(account_id) || notExistObj,
        { type: accountType } = refAccount,
        { type: refObjectType } = refObj,
        currencyCode = path(['code'], parsedInput.currencies.find(({ id }) => id === currency_id)),
        tags = [...getTagsFromComment(comment)];

      if (refAccount === notExistObj) {
        missingAccountRefs[account_id] = true;
      }

      if (refObj === notExistObj) {
        if (object_id === '-1') {
          storagesByOldId[account_id].initialBalance[currencyCode] = parseInt(sum);
          return undefined;
        }
        missingObjectRefs[object_id] = true;
      }

      if (accountType !== 'STORAGE') {
        throw new Error(`accountType should be storage for transaction: ${transactionId}`);
      }

      let type;

      switch (refObjectType) {
        case 'EXPENSE':
          type = 'expense';
          break;
        case 'INCOME':
          type = 'income';
          break;
        case 'STORAGE':
          if (object_id === account_id) {
            type = 'exchange';
          } else {
            type = 'transfer';
          }
          break;
        default:
          console.log(`Unexpected Object type: ${refObjectType}`, object_id, inputData);
          throw new Error(`Unexpected Object type: ${refObjectType}`);
      }

      const
        base = {
          comment,
          currencyCode,
          value: type === 'expense' ? -sumInt : sumInt,
          date: toZoneLessDateTime(date),
          type,
          created: getServerTimeStamp() - (2 * maxOffsetMs),
          id: makeGuid(),
          uid: user_id,
        };

      let rest;
      switch (type) {
        case 'income':
          rest = {
            tags,
            storageIdTo: storagesByOldId[account_id].id,
            categoryId: incomeOldCatIdToNew[object_id],
          };
          break;
        case 'expense':
          rest = {
            tags,
            storageIdFrom: storagesByOldId[account_id].id,
            categoryId: expenseOldCatIdToNew[object_id],
          };
          break;
        case 'transfer':
          rest = {
            storageIdFrom: storagesByOldId[object_id].id,
            storageIdTo: storagesByOldId[account_id].id,
          };
          break;
        case 'exchange':
          rest = {
            storageId: storagesByOldId[account_id].id,
            currencyCodeTo: currencyCode,
            valueTo: sum,
          };
          break;
        default:
          console.log(`unknown transaction type: ${type}`, inputData);
          throw new Error(`unknown transaction type: ${type}`);
      }

      return { ...base, ...rest };
    },
    setType = (type, arr) => arr.map(assoc('type', type)),
    account = {
      transactions: pipe(
        x => x.map(mapToTransaction),
        filterArray(x => x),
        filterArray(filterSecondTransferTransactions),
        (transactions) => {
          const final = [];
          for (let i = 0; i < transactions.length; i += 1) {
            const currentTransaction = transactions[i];
            if (currentTransaction.type === 'exchange') {
              i += 1;
              const secondPartOfTransaction = transactions[i];
              final.push({
                ...currentTransaction,
                value: -parseInt(secondPartOfTransaction.valueTo, 10),
                valueTo: parseInt(currentTransaction.valueTo, 10),
                currencyCode: secondPartOfTransaction.currencyCodeTo,
              });
            } else {
              final.push(currentTransaction);
            }
          }
          return final;
        },
      )(parsedInput.records),
      storages,
      currencies,
      categories: [...setType('expense', expenseCategories), setType('income', incomeCategories)],
      categoriesSort,
      mainCurrencyCode: currencies.find(c => c.course === 1).code,
      plans: {},
      permissions: {},
      users: parsedInput.records.reduce((users, { user_id }) => {
        if (!users[user_id]) {
          return assoc(user_id, {
            name: `user_${keys(users).length + 1}`,
            isAnonymous: true,
          }, users);
        }

        return users;
      }, {}),
    },
    reducerArrayToMap = (keyProp = 'id') =>
      x => x.reduce((acc, item) => assoc(item[keyProp], item, acc), {}),
    finalAccount = pipe(
      evolve({
        currencies: reducerArrayToMap('code'),
        categories: reducerArrayToMap(),
        storages: reducerArrayToMap(),
        transactions: reducerArrayToMap(),
      }),
      (a) => ({ live: a }),
      assoc('version', dataVersion),
    )(account);

  return finalAccount;
}

const
  ddImportMiddleware: MyMiddleware = store => next => a => {
    if (a.type === 'SET_ACCOUNT_DATA') {
      const state = store.getState();

      if (state.ddImport.status === 'importing_to_firebase') {
        store.dispatch({ type: 'DD_IMPORT_SETTING_DATA_TO_FIREBASE_DONE' });
        console.timeEnd('dd_import_data_to_firebase');
        Alert.alert('Import complete', 'Your data imported successfully. App will be restarted.', [
          { text: 'OK', onPress: () => store.dispatch({ type: restartAppAC }) },
        ]);
      }
    }

    if (a.type === 'DD_IMPORT_FAILURE') {
      Alert.alert('Error', 'Import failed.');
      store.dispatch(NavigationActions.back());
    }

    if (a.type === 'IMPORT_FROM_DREBEDENGI_BP') {
      DocumentPicker.show({
        filetype: [DocumentPickerUtil.plainText()],
      }, (error, url) => {
        try {
          store.dispatch(navigateAC({ routeName: 'DDImport' }));
          store.dispatch({ type: 'DD_IMPORT_PARSING_START' });

          RNFS.readFile(url.uri, 'utf8').then((fileContent) => {
            try {
              const
                state = store.getState(),
                currentAccount = state.liveAccount,
                { uid } = state.session;

              const ddAccount = ddDataToAccount(fileContent, uid);

              if (currentAccount.encrypted) {
                store.dispatch({ type: 'DD_IMPORT_ENCRYPTING_ACCOUNT' });
                getEncryptionPassword().then(password => {
                  const
                    { encryptAccount } = makeCrypt(password);

                  const encryptedAccount = encryptAccount(ddAccount);

                  console.time('dd_import_data_to_firebase');
                  store.dispatch({ type: 'DD_IMPORT_SETTING_DATA_TO_FIREBASE' });
                  setTimeout(() => {
                    store.dispatch({
                      type: 'DD_IMPORT_ACCOUNT_DATA',
                      payload: assoc('encrypted', true, encryptedAccount),
                    });
                  });
                });
              } else {
                console.time('dd_import_data_to_firebase');
                store.dispatch({ type: 'DD_IMPORT_SETTING_DATA_TO_FIREBASE' });
                setTimeout(() => {
                  store.dispatch({
                    type: 'DD_IMPORT_ACCOUNT_DATA',
                    payload: assoc('encrypted', false, ddAccount),
                  });
                });
              }
            } catch (e) {
              console.log('DD_IMPORT_ERROR while parsing file content: ', e);
              reportException(e);
              store.dispatch({ type: 'DD_IMPORT_FAILURE' });
            }
          }).catch(e => {
            console.log('DD_IMPORT_ERROR while reading file: ', url.uri, e);
            reportException(e);
            store.dispatch({ type: 'DD_IMPORT_FAILURE' });
          });
        } catch (e) {
          console.log('DD_IMPORT_ERROR while reading file: ', url.uri, e);
          reportException(e);
          store.dispatch({ type: 'DD_IMPORT_FAILURE' });
        }
      });
    }

    return next(a);
  };

export {
  ddImportMiddleware,
}
*/
