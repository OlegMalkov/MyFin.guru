/* @flow */

import type { BaseReducer } from '../../base.flow'
import { __undef } from '../../const'
import { DB_GET_PERSONAL_DATA_DONE, DB_PERSONAL_DATA_ARRIVED } from '../../modules/dbModule/dbAC'
import { makeEntityReducer } from '../../utils/makeReducer'
import { us } from '../../utils/utils'
import type { PersonalData } from './personalData.flow'

const
  preferencesInitialState = {
    majorCurrencies: {},
    overviewCollapsedUids: {},
    planCollapsedCategoriesIds: {},
    overviewCategoriesUid: __undef,
    overviewTotalUsageMode: 'percent',
    analyticsSelectedUid: __undef,
    planSelectedUid: __undef,
  },
  personalDataInitialState = {
    name: '',
    maUid: __undef,
    backupEmail: '',
    preferences: preferencesInitialState,
  },
  compute = (s: PersonalData, a) => {
    return us(s, a, s => {
      const {
        name,
        maUid,
        backupEmail,
        preferences,
      } = personalDataInitialState
      if (!s.name) s.name = name
      if (!s.maUid) s.maUid = maUid
      if (!s.backupEmail) s.backupEmail = backupEmail
      if (!s.preferences) s.preferences = preferences
      if (!s.preferences.majorCurrencies) {
        s.preferences.majorCurrencies = preferences.majorCurrencies
      }
      if (!s.preferences.overviewCollapsedUids) {
        s.preferences.overviewCollapsedUids = preferences.overviewCollapsedUids
      }
      if (!s.preferences.overviewCategoriesUid) {
        s.preferences.overviewCategoriesUid = preferences.overviewCategoriesUid
      }
      if (!s.preferences.planCollapsedCategoriesIds) {
        s.preferences.planCollapsedCategoriesIds =
          preferences.planCollapsedCategoriesIds
      }
      if (!s.preferences.overviewTotalUsageMode) {
        s.preferences.overviewTotalUsageMode = preferences.overviewTotalUsageMode
      }
      if (!s.preferences.analyticsSelectedUid) {
        s.preferences.analyticsSelectedUid = preferences.analyticsSelectedUid
      }
      if (!s.preferences.planSelectedUid) {
        s.preferences.planSelectedUid = preferences.planSelectedUid
      }
    })
  },
  reducer: BaseReducer<PersonalData> = (s = personalDataInitialState, a) => {
    if (a.type === DB_GET_PERSONAL_DATA_DONE || a.type === DB_PERSONAL_DATA_ARRIVED) {
      return compute(a.personalData, a)
    }

    return s
  },
  personalDataReducer: BaseReducer<PersonalData> = makeEntityReducer({ reducer })

export {
  personalDataReducer,
}
