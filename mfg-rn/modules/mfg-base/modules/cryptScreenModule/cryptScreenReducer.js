/* @flow */

import { cryptScreenModuleId } from './cryptScreenModuleId'
import { us } from '../../utils/utils'
import {
  CRYPT_SCREEN_DECRYPT_ACCOUNT_BP,
  CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP,
} from './cryptScreenAC'
import {
  cryptScreenDecryptAccountPasswordPromptStep,
  cryptScreenEncryptAccountPasswordPromptStep,
  cryptScreenFirstStep,
} from './cryptScreenSteps'
import { personalDataReducer } from '../../entities/personalData/personalDataReducer'
import { getReducerInitialState } from '../../utils/getReducerInitialState'
import { makeModuleReducer } from '../../utils/makeReducer'
import { makeUpdateDepsReducer, pipe, updateChild } from '../../utils/utils'
import { sessionModuleReducer } from '../../modules/sessionModule/sessionModule'

import type { BaseReducer } from '../../base.flow'
import type { PersonalData } from '../../entities/personalData/personalData.flow'
import type { Session } from '../../modules/sessionModule/flowTypes'

type Deps = {|
  session: Session,
  personalData: PersonalData,
|}


type Step =
  | typeof cryptScreenFirstStep
  | typeof cryptScreenEncryptAccountPasswordPromptStep
  | typeof cryptScreenDecryptAccountPasswordPromptStep

export type CryptScreenState = {|
  deps: Deps,
  step: Step,
  password: string,
  repeatPassword: string
|}

const
  initialState: CryptScreenState = ({
    step: cryptScreenFirstStep,
    password: '',
    repeatPassword: '',
    deps: {
      session: getReducerInitialState(sessionModuleReducer),
      personalData: getReducerInitialState(personalDataReducer),
    },
  }),

  depsReducer: BaseReducer<Deps> = makeUpdateDepsReducer((s, a) => ({
    session: sessionModuleReducer(s.session, a),
    personalData: personalDataReducer(s.personalData, a),
  })),

  /* TODO 2 MFG-69 add validation for password and repeat password strength */

  reducer: BaseReducer<CryptScreenState> =
    (s = initialState, a) => {
      return pipe(
        s => updateChild(s, a, 'deps', depsReducer),
        s => {
          if (a.type === CRYPT_SCREEN_ENCRYPT_ACCOUNT_BP) {
            return us(s, a, s => {
              s.step = cryptScreenEncryptAccountPasswordPromptStep
            })
          }

          if (a.type === CRYPT_SCREEN_DECRYPT_ACCOUNT_BP) {
            return us(s, a, s => {
              s.step = cryptScreenDecryptAccountPasswordPromptStep
            })
          }

          return s
        },
      )(s)
    },

  cryptScreenReducer: BaseReducer<CryptScreenState> =
    makeModuleReducer({ reducer, moduleId: cryptScreenModuleId })

export {
  cryptScreenReducer,
}
