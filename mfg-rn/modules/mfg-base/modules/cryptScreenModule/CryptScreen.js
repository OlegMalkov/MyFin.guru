/* @flow */

import { cryptScreenFirstStep } from './cryptScreenSteps'
import React from 'react'
import { baseConnect } from '../../baseConnect'
import { MyButton } from '../../ui/Button'
import { MyDivider } from '../../ui/Divider'
import { RNText } from '../../ui/RNUI'
import { ScreenWithBackButton } from '../../ui/ScreenWithBackButton'
import { strings } from '../../localization';
import {
  cryptScreenBackButtonPressedAC, cryptScreenDecryptAccountAC,
  cryptScreenEncryptAccountAC,
} from './cryptScreenAC';
import { cryptScreenModuleId } from './cryptScreenModuleId';

import type { BaseVP } from '../../base.flow'
import type { CryptScreenState } from './cryptScreenReducer'

const
  CryptScreenView = (props: BaseVP<CryptScreenState>) => {
    const { accountEncrypted } = props.state.deps.session

    if (props.state.step === cryptScreenFirstStep) {
      return (
        <ScreenWithBackButton
          routeName="Crypt"
          onBackButtonPress={() => props.dispatch(cryptScreenBackButtonPressedAC())}
        >
          <RNText style={{ fontSize: 20, textAlign: 'center' }}>
            Your account
            is {`${accountEncrypted ? 'encrypted' : 'not encrypted'}`}
          </RNText>
          <MyDivider/>
          {
            accountEncrypted && <MyButton
              title={strings.decryptAccount}
              onPress={() => props.dispatch(cryptScreenDecryptAccountAC())}
            />
          }
          {
            !accountEncrypted && <MyButton
              title={strings.encryptAccount}
              onPress={() => props.dispatch(cryptScreenEncryptAccountAC())}
            />
          }
        </ScreenWithBackButton>
      )
    }
    return (
      <ScreenWithBackButton
        routeName="Crypt"
        onBackButtonPress={() => props.dispatch(cryptScreenBackButtonPressedAC())}
      >
        <RNText style={{ fontSize: 20, textAlign: 'center' }}>
          Not implemented
        </RNText>
      </ScreenWithBackButton>
    )
  }

const CryptScreen =
  baseConnect((as): CryptScreenState => as[cryptScreenModuleId], CryptScreenView)

export {
  CryptScreen,
}
