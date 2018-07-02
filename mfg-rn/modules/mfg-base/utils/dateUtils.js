/* @flow */

import moment from 'moment';
import type { MyDate, PeriodType, PlanPeriod } from '../const'
import { day, month, year } from '../entities/account/live/periodKinds';
import type { ZoneLessDateTime } from '../global.flow'
import { dec, I, inc } from './utils';

const
  myDateFormat = 'YYYYMMDDTHHmmss',
  changeDate = (op, periodKind, updater) => {
    return (val: MyDate) => {
      return toZoneLessDateTime(
        /* $FlowFixMe ok */
        updater(moment(val, myDateFormat), periodKind)[op](periodKind),
      );
    };
  },
  makeSetPeriod = (op) => (date, periodKind) => date.set(periodKind, op(date.get(periodKind))),
  setNextPeriod = makeSetPeriod(inc),
  setPrevPeriod = makeSetPeriod(dec),

  setBeginOfPrevT = (type: PeriodType) => changeDate('startOf', type, setPrevPeriod),
  setEndOfPrevT = (type: PeriodType) => changeDate('endOf', type, setPrevPeriod),
  setBeginOfCurrentT = (type: PeriodType) => changeDate('startOf', type, I),
  setEndOfCurrentT = (type: PeriodType) => changeDate('endOf', type, I),
  setBeginOfNextT = (type: PeriodType) => changeDate('startOf', type, setNextPeriod),
  setEndOfNextT = (type: PeriodType) => changeDate('endOf', type, setNextPeriod),
  setBeginOfPrevMonth = setBeginOfPrevT(month),
  setEndOfPrevMonth = setEndOfPrevT(month),
  setBeginOfCurrentMonth = setBeginOfCurrentT(month),
  setEndOfCurrentMonth = setEndOfCurrentT(month),
  setBeginOfNextMonth = setBeginOfNextT(month),
  setEndOfNextMonth = setEndOfNextT(month),
  setBeginOfPrevYear = setBeginOfPrevT(year),
  setEndOfPrevYear = setEndOfPrevT(year),
  setBeginOfCurrentYear = setBeginOfCurrentT(year),
  setEndOfCurrentYear = setEndOfCurrentT(year),
  setBeginOfNextYear = setBeginOfNextT(year),
  setEndOfNextYear = setEndOfNextT(year),
  setBeginOfX = (type: PeriodType) => (x: number) =>
    changeDate('startOf', type, makeSetPeriod((y) => y + x)),
  setEndOfX = (type: PeriodType) => (x: number) =>
    changeDate('endOf', type, makeSetPeriod((y) => y + x)),
  setBeginOfXMonth = setBeginOfX(month),
  setEndOfXMonth = setEndOfX(month),

  setBeginOfPrevDay = changeDate('startOf', day, setPrevPeriod),
  setEndOfPrevDay = changeDate('endOf', day, setPrevPeriod),
  setBeginOfCurrentDay = changeDate('startOf', day, I),
  setEndOfCurrentDay = changeDate('endOf', day, I),
  setBeginOfNextDay = changeDate('startOf', day, setNextPeriod),
  setEndOfNextDay = changeDate('endOf', day, setNextPeriod),
  getDate = (timestamp: MyDate) => moment(timestamp, myDateFormat).date(),
  getMonth = (timestamp: MyDate) => moment(timestamp, myDateFormat).month() + 1,
  getYear = (timestamp: MyDate) => moment(timestamp, myDateFormat).year(),

  toZoneLessDateTime = (val: number): ZoneLessDateTime =>
    moment(val).format(myDateFormat),
  momentToUniversalStr = (m): MyDate => {
    const r: any = `${m.format('YYYYMMDD')}T120000`
    return r
  },
  momentToUniversalDateStr = (m): PlanPeriod => (`${m.format('YYYYMMDD')}`: any),
  toDate12OClock = (val: MyDate): MyDate => momentToUniversalStr(moment(val, myDateFormat)),
  universalPeriodStr = ([year, realMonth]: [number, number]) =>
    momentToUniversalDateStr(moment([year, realMonth - 1])),
  universalPeriodStrFromTimestamp = (ts: MyDate): PlanPeriod =>
    momentToUniversalDateStr(moment(ts, myDateFormat)),
  dayPeriodStr = (ts: MyDate) => moment(ts, myDateFormat).format('DD MMMM YYYY'),
  monthPeriodStr = (ts: MyDate) => moment(ts, myDateFormat).format('MMMM YYYY'),
  debtUntilPeriodStr = (ts: MyDate) => moment(ts, myDateFormat).format('DD.MM.YY')

export {
  setBeginOfPrevMonth,
  setEndOfPrevMonth,
  setBeginOfCurrentMonth,
  setEndOfCurrentMonth,
  setBeginOfNextMonth,
  setEndOfNextMonth,
  setBeginOfXMonth,
  setEndOfXMonth,

  setBeginOfPrevDay,
  setEndOfPrevDay,
  setBeginOfCurrentDay,
  setEndOfCurrentDay,
  setBeginOfNextDay,
  setEndOfNextDay,
  setBeginOfX,
  setEndOfX,
  setBeginOfPrevT,
  setEndOfPrevT,
  setBeginOfCurrentT,
  setEndOfCurrentT,
  setBeginOfNextT,
  setEndOfNextT,

  setBeginOfPrevYear,
  setEndOfPrevYear,
  setBeginOfCurrentYear,
  setEndOfCurrentYear,
  setBeginOfNextYear,
  setEndOfNextYear,
  getDate,
  getMonth,
  getYear,
  universalPeriodStr,
  debtUntilPeriodStr,
  universalPeriodStrFromTimestamp,
  dayPeriodStr,
  monthPeriodStr,
  toZoneLessDateTime,
  toDate12OClock,
};
