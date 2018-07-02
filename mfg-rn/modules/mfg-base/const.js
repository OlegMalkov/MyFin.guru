/* @flow */

import type { ZoneLessDateTime } from './global.flow'

export type PlanPeriod = '00000000'

export const
  mctaColor = '#F57C00',
  __undef = 'undefined-string',
  date0: ZoneLessDateTime = '19800101T000000',
  dateMax: ZoneLessDateTime = '22900120T000000',
  period0: PlanPeriod = '00000000',
  balanceForAllTimeProps = {
    fromTimestamp: date0,
    toTimestamp: dateMax,
    uid: __undef,
  },
  expenseTransactionType: 'expense' = 'expense',
  incomeTransactionType: 'income' = 'income',
  transferTransactionType: 'transfer' = 'transfer',
  exchangeTransactionType: 'exchange' = 'exchange',
  expenseCategoryType = expenseTransactionType,
  incomeCategoryType = incomeTransactionType,
  debtStorageType = 'debt',
  debitStorageType = 'debit',
  creditStorageType = 'credit'

export type Undefined = typeof __undef
export type UID = string
export type EMAIL = string // '@@EMAIL' | Undefined
export type MyDate = string // ZoneLessDateTime | Undefined
export type MyDateNoTimeStr = string // '20.12.2017'
export type CategoryId = string // '@@CATEGORY_ID' | Undefined
export type StorageId = string // '@@STORAGE_ID' | Undefined
export type TransactionId = string

export const Days = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '11': '11',
  '12': '12',
  '13': '13',
  '14': '14',
  '15': '15',
  '16': '16',
  '17': '17',
  '18': '18',
  '19': '19',
  '20': '20',
  '21': '21',
  '22': '22',
  '23': '23',
  '24': '24',
  '25': '25',
  '26': '26',
  '27': '27',
  '28': '28',
  '29': '29',
  '30': '30',
  '31': '31',
  'no-day': 'no-day',
}

export type MyDay = $Keys<typeof Days>
export type PeriodType = 'year' | 'month'

/* TODO 4 MFG-48 put more strict value */
/*
'AED'
| 'AFN'
| 'ALL'
| 'AMD'
| 'ANG'
| 'AOA'
| 'ARS'
| 'AUD'
| 'AWG'
| 'AZN'
| 'BAM'
| 'BBD'
| 'BDT'
| 'BGN'
| 'BHD'
| 'BIF'
| 'BMD'
| 'BND'
| 'BOB'
| 'BRL'
| 'BSD'
| 'BTC'
| 'BTN'
| 'BTS'
| 'BWP'
| 'BYN'
| 'BZD'
| 'CAD'
| 'CDF'
| 'CHF'
| 'CLF'
| 'CLP'
| 'CNH'
| 'CNY'
| 'COP'
| 'CRC'
| 'CUC'
| 'CUP'
| 'CVE'
| 'CZK'
| 'DASH'
| 'DJF'
| 'DKK'
| 'DOGE'
| 'DOP'
| 'DZD'
| 'EAC'
| 'EGP'
| 'EMC'
| 'ERN'
| 'ETB'
| 'ETH'
| 'EUR'
| 'FCT'
| 'FJD'
| 'FKP'
| 'FTC'
| 'GBP'
| 'GEL'
| 'GGP'
| 'GHS'
| 'GIP'
| 'GMD'
| 'GNF'
| 'GTQ'
| 'GYD'
| 'HKD'
| 'HNL'
| 'HRK'
| 'HTG'
| 'HUF'
| 'IDR'
| 'ILS'
| 'IMP'
| 'INR'
| 'IQD'
| 'IRR'
| 'ISK'
| 'JEP'
| 'JMD'
| 'JOD'
| 'JPY'
| 'KES'
| 'KGS'
| 'KHR'
| 'KMF'
| 'KPW'
| 'KRW'
| 'KWD'
| 'KYD'
| 'KZT'
| 'LAK'
| 'LBP'
| 'LD'
| 'LKR'
| 'LRD'
| 'LSL'
| 'LTC'
| 'LYD'
| 'MAD'
| 'MDL'
| 'MGA'
| 'MKD'
| 'MMK'
| 'MNT'
| 'MOP'
| 'MRO'
| 'MUR'
| 'MVR'
| 'MWK'
| 'MXN'
| 'MYR'
| 'MZN'
| 'NAD'
| 'NGN'
| 'NIO'
| 'NMC'
| 'NOK'
| 'NPR'
| 'NVC'
| 'NXT'
| 'NZD'
| 'OMR'
| 'PAB'
| 'PEN'
| 'PGK'
| 'PHP'
| 'PKR'
| 'PLN'
| 'PPC'
| 'PYG'
| 'QAR'
| 'RON'
| 'RSD'
| 'RUB'
| 'RWF'
| 'SAR'
| 'SBD'
| 'SCR'
| 'SDG'
| 'SEK'
| 'SGD'
| 'SHP'
| 'SLL'
| 'SOS'
| 'SRD'
| 'SSP'
| 'STD'
| 'STR'
| 'SVC'
| 'SYP'
| 'SZL'
| 'THB'
| 'TJS'
| 'TMT'
| 'TND'
| 'TOP'
| 'TRY'
| 'TTD'
| 'TWD'
| 'TZS'
| 'UAH'
| 'UGX'
| 'USD'
| 'UYU'
| 'UZS'
| 'VEF'
| 'VND'
| 'VTC'
| 'VUV'
| 'WST'
| 'XAF'
| 'XAG'
| 'XAU'
| 'XCD'
| 'XDR'
| 'XMR'
| 'XOF'
| 'XPD'
| 'XPF'
| 'XPM'
| 'XPT'
| 'XRP'
| 'YER'
| 'ZAR'
| 'ZMW'
| 'ZWL'
| 'UDF' // undefined currency*/
export type CurrencyCode = string
