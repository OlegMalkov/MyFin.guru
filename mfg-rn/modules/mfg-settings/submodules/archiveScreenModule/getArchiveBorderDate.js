/* @flow */

import { setBeginOfPrevMonth } from 'mfg-base/utils/dateUtils';

import type { Now } from 'mfg-base/modules/nowModule/nowReducer'

export const getArchiveBorderDate = (now: Now) => setBeginOfPrevMonth(now);
