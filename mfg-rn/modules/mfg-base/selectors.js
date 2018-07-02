/* @flow */

import { uidIsUndef } from './entities/account/live/utils'
import { userNamesMapSelector } from './entities/users/selectors'
import { strings } from './localization'
import { ifDefined } from './utils/utils'

import type { UID } from './const'
import type { Users } from './entities/account/live/flowTypes'
import type { PersonalData } from './entities/personalData/personalData.flow'
import type { MapKV } from './global.flow'
import type { Session } from './modules/sessionModule/flowTypes'

const
  isAdmin = (personalData: PersonalData) => uidIsUndef(personalData.maUid),
  allUserNamesMapSelector =
    ({ users, personalData, session }: {
      users: Users,
      personalData: PersonalData,
      session: Session,
    }): MapKV<UID, string> => ({
      ...userNamesMapSelector(users),
      [session.uid]: ifDefined(personalData.name, strings.me),
    })

export {
  isAdmin,
  allUserNamesMapSelector,
}
