/* @flow */

import type { BaseReducer } from '../../base.flow'
import { DB_GET_PERSONAL_DATA_DONE } from '../../modules/dbModule/dbAC'
import { memoMaxOneArgs2 } from '../../utils/memo'
import { uidIsUndef } from '../account/live/utils'

const isAdminReducer: BaseReducer<bool> = memoMaxOneArgs2((s = false, a) => {
  if (a.type === DB_GET_PERSONAL_DATA_DONE) {
    return uidIsUndef(a.personalData.maUid)
  }
  return s
})

export {
  isAdminReducer,
}
