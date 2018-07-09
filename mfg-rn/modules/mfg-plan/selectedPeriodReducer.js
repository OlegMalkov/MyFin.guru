/* eslint-disable quotes */
/* @flow */

import { period0 } from 'mfg-base/const'
import { month } from 'mfg-base/entities/account/live/periodKinds'
import { getReducerInitialState } from 'mfg-base/utils/getReducerInitialState'
import { setBeginOfXMonth, universalPeriodStrFromTimestamp } from 'mfg-base/utils/dateUtils';
import { makeUpdateDepsReducer, pipe, updateChild, us } from "mfg-base/utils/utils";
import { nowReducer } from 'mfg-base/modules/nowModule/nowReducer'
import { makePeriodStartReducer } from './periodStartReducer'
import { PLAN_SCREEN_CATEGORY_PLAN_PRESSED } from "./planScreenAC";

import type { PlanModuleReducer } from './plan.flow'
import type { MyDate, PlanPeriod } from 'mfg-base/const'
import type { Now } from 'mfg-base/modules/nowModule/nowReducer'

type Deps = {|
  now: Now,
|}

export type SelectedPeriodComponent = {
  periodIndex: number,
  periodStart: MyDate,
  deps: Deps,
  computed: {
    selectedPeriod: PlanPeriod,
  },
}

const
  nowInitialState = getReducerInitialState(nowReducer),
  depsInitialState: Deps = {
    now: nowInitialState,
  },
  initialState = {
    periodIndex: 0,
    periodStart: getReducerInitialState(makePeriodStartReducer(month, nowInitialState)),
    deps: depsInitialState,
    computed: {
      selectedPeriod: period0,
    },
  },
  compute = (s, a) => {
    const
      thisPeriodStartDate = setBeginOfXMonth(s.periodIndex)(s.periodStart),
      period = universalPeriodStrFromTimestamp(thisPeriodStartDate)

    return us(s, a, s => s.computed.selectedPeriod = period)
  },
  depsReducer: PlanModuleReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    now: nowReducer(s.now, a),
  })),
  selectedPeriodComponentReducer: PlanModuleReducer<SelectedPeriodComponent> =
    (s = initialState, a) => {
      const newState = pipe(
        s => updateChild(s, a, 'periodStart', makePeriodStartReducer(month, s.deps.now)),
        s => {
          if (a.type === PLAN_SCREEN_CATEGORY_PLAN_PRESSED) {
            return us(s, a, (s, a) => s.periodIndex = a.periodIndex)
          }
          return s
        },
      )(s);

      if (newState !== s) {
        return compute(newState, a)
      }
      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
      )(newState)
    }

export {
  selectedPeriodComponentReducer,
}
