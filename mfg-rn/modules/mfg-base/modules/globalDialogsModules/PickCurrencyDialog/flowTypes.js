/* @flow */

import type { CurrencyCode } from '../../../const'

type Base = {|
  currencyCode: CurrencyCode,
  name: string,
  course: number,
  index: number,
  isMajor: bool,
|}

export type CurrencyData = {|
  type: 'currency',
  ...Base,
|} | {|
  type: 'country',
  ...Base,
  countryName: string,
  emoji: string,
|}
