/* @flow */

import { pipe, when } from './utils';

/**
 * Number.prototype.format(number, n, x, s, c)
 *
 * @param integer number: the number for format
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
function formatNumber(number: number, n?: number = 0, x?: number = 3, s?: string = ' ', c?: string) {
  const
    re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\D' : '$'})`,
    num = number.toFixed(Math.max(0, ~~n)), // eslint-disable-line no-bitwise
    result = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), `$&${s}`);

  if (result !== result) { // eslint-disable-line no-self-compare
    return '';
  }
  return result;
}


const
  toMoney = (number: number) => formatNumber(number),
  toMoneyFloat = (number: number) => formatNumber(number, 2),
  toMoneyFloatRemoveZeros = (number: number) => {
    return pipe(
      v => when(t => t.endsWith('00'), t => t.substring(0, t.length - 2))(v),
    )(formatNumber(number, 2));
  },

  makePad = (size: number) => (num: number) => {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  },
  pad2 = makePad(2);

function toMoneyLimited(num: number) {
  if (num >= 1000000 || num <= -1000000) {
    return `${parseFloat((num / 1000000).toFixed(2))}m`;
  }
  if (num >= 100000 || num <= -100000) {
    return `${parseFloat((num / 1000).toFixed(1))}k`;
  }
  return toMoney(num);
}

function toMoneyLimited1(num: number) {
  if (num >= 10000000 || num <= -10000000) {
    return `${parseFloat((num / 1000000).toFixed(1))}m`;
  }

  if (num >= 999 || num <= -999) {
    return `${parseFloat((num / 1000).toFixed(1))}k`;
  }

  return toMoney(num);
}

const
  isMoneySeparator = (char: string) => char === '.' || char === ',',
  calcMoneySeparatorsCount = (text: string) =>
    text.split('').reduce((a, v) => isMoneySeparator(v) ? a + 1 : a, 0)

export {
  toMoney,
  toMoneyFloat,
  toMoneyFloatRemoveZeros,
  pad2,
  toMoneyLimited,
  toMoneyLimited1,
  isMoneySeparator,
  calcMoneySeparatorsCount,
};
