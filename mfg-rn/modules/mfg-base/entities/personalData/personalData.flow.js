/* @flow */

import type { CurrencyCode, UID } from '../../const'

export type Preferences = {
  majorCurrencies: {
    [currencyCode: CurrencyCode]: number | true,
  },
  overviewCollapsedUids: { [uid: UID]: bool },
  planCollapsedCategoriesIds: { [uid: UID]: bool },
  overviewCategoriesUid: UID,
  overviewTotalUsageMode: 'percent' | 'number',
  analyticsSelectedUid: UID,
  planSelectedUid: UID,
}

export type PersonalData = {|
  name: string,
  maUid: UID,
  backupEmail: string,
  preferences: Preferences,
|}
