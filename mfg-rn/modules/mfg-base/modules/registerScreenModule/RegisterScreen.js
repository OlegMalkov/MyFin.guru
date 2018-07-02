/* @flow */
import React from 'react'
import { baseConnect } from '../../baseConnect'
import { MyDivider } from '../../ui/Divider'
import { MyButton } from '../../ui/Button'
import { LoginTextInput } from '../../ui/LoginTextInput'
import { MyScreen } from '../../ui/MyScreen'
import { SecureInput } from '../../ui/SecureInput'
import { BackButton } from '../../ui/BackButton'

import {
  RegisterButtonId,
  RepeatPasswordInputId,
  PasswordInputId,
  EmailInputId,
  RegistrationInProgressTextId,
  RegistrationSuccessTextId,
  RegistrationFailTextId,
} from '../../testIds';
import { RNText } from '../../ui/RNUI';
import { strings } from '../../localization';
import {
  registerScreenBackButtonPressedAC,
  registerScreenEmailChangedAC, registerScreenPasswordChangedAC,
  registerScreenRegisterButtonPressedAC,
  registerScreenRepeatPasswordChangedAC,
} from './registerScreenAC'
import { registerScreenModuleId } from './registerScreenModuleId'
import { RegisterScreenStatus } from './registerScreenReducer'

import type { BaseVP } from '../../base.flow'
import type { RegisterScreenState } from './registerScreenReducer'

const
  RegisterScreenView = ({ state, dispatch }: BaseVP<RegisterScreenState>) => {
    const BB = <BackButton onPress={() => registerScreenBackButtonPressedAC()}/>

    switch (state.status) {
      case RegisterScreenStatus.idle:
        return (
          <MyScreen routeName="Register">
            <MyDivider/>
            {BB}
            <MyDivider styleName="line"/>
            <LoginTextInput
              placeholder="Email"
              keyboardType="email-address"
              value={state.email}
              onChangeText={email => dispatch(registerScreenEmailChangedAC(email))}
              testID={EmailInputId}
            />
            <MyDivider styleName="line"/>
            <SecureInput
              placeholder="Password"
              value={state.password}
              onChangeText={password => dispatch(registerScreenPasswordChangedAC(password))}
              testID={PasswordInputId}
            />
            <MyDivider styleName="line"/>
            <SecureInput
              placeholder="Repeat password"
              value={state.repeatPassword}
              onChangeText={repeatPassword =>
                dispatch(registerScreenRepeatPasswordChangedAC(repeatPassword))}
              testID={RepeatPasswordInputId}
            />
            <MyDivider styleName="line"/>
            <MyDivider/>
            <MyButton
              onPress={() => dispatch(registerScreenRegisterButtonPressedAC())}
              title={strings.register}
              testID={RegisterButtonId}
            />
          </MyScreen>
        )
      case RegisterScreenStatus.inProgress:
        return (
          <MyScreen routeName="Register">
            <MyDivider/>
            <RNText testID={RegistrationInProgressTextId}>
              {strings.registerInProgress}
            </RNText>
            <MyDivider/>
          </MyScreen>
        )
      case RegisterScreenStatus.success:
        return (
          <MyScreen routeName="Register">
            <MyDivider/>
            {BB}
            <MyDivider styleName="line"/>
            <RNText testID={RegistrationSuccessTextId}>
              {strings.registerSuccess}
            </RNText>
          </MyScreen>
        )
      case RegisterScreenStatus.fail:
        return (
          <MyScreen routeName="Register">
            <MyDivider/>
            {BB}
            <MyDivider styleName="line"/>
            <RNText testID={RegistrationFailTextId}>
              {strings.registerFail}
            </RNText>
          </MyScreen>
        )
      default:
        throw new Error(`invalid register screen status ${state.status}`);
    }
  },
  RegisterScreen = baseConnect(
    (as): RegisterScreenState => as[registerScreenModuleId],
    RegisterScreenView,
  )

export {
  RegisterScreen,
}
