// @flow
// noinspection JSFileReferences

import Fuse from '../../utils/fuse'
import { currencyReferenceMap } from './currencyReferenceMap'
import { keys, pipe, flatten } from '../../utils/utils';

import type { CurrencyCode } from '../../const'

export type SearchRecord = {
  type: 'country',
  countryName: string,
  currencyCode: CurrencyCode,
  emoji: string,
} | {
  type: 'currency',
  name: string,
  currencyCode: CurrencyCode
}

const
  list: Array<SearchRecord> = pipe(
    keys,
    arr => arr.map((currencyCode) => {
      const
        [, , currencyName, countries] = currencyReferenceMap[currencyCode],
        result = [{ type: 'currency', name: currencyName, currencyCode }]

      countries.forEach(([, emoji, countryName]) => {
        result.push({ type: 'country', countryName, emoji, currencyCode })
      })
      return result
    }),
    flatten,
  )(currencyReferenceMap),
  options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [{
      name: 'name',
      weight: 0.2,
    }, {
      name: 'countryName',
      weight: 0.3,
    }, {
      name: 'currencyCode',
      weight: 0.5,
    }],
  },
  fuse = new Fuse(list, options),
  currenciesSearch = (str: string) => fuse.search(str);

export { currenciesSearch }
