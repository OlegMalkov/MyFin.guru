/* @flow */

import { initFirstScreenMountedAC } from '../initModule/initAC'
import React from 'react'
import { baseConnect } from '../../baseConnect'
import { MyDivider } from '../../ui/Divider'
import { MyButton } from '../../ui/Button'
import { LoginTextInput } from '../../ui/LoginTextInput'
import { MyScreen } from '../../ui/MyScreen'
import { RNText, RNView } from '../../ui/RNUI'
import { SecureInput } from '../../ui/SecureInput'
import { VersionText } from '../../ui/VersionText'
import { LoginButtonId, NavigateToRegisterScreenButtonId } from '../../testIds'
import { strings } from '../../localization'
import {
  loginScreenEmailChangedAC, loginScreenLoginButtonPressedAC, loginScreenPasswordChangedAC,
  loginScreenRegisterButtonPressedAC,
} from './loginScreenAC'
import { loginScreenModuleId } from './loginScreenModuleId'

import type { BaseVP } from '../../base.flow'
import type { LoginScreenState } from './loginScreenReducer'

class LoginScreenView extends React.PureComponent<BaseVP<LoginScreenState>> {
  componentDidMount() {
    this.props.dispatch(initFirstScreenMountedAC())
  }

  render() {
    const props = this.props;

    return (
      <MyScreen routeName="Login">
        <RNView>
          <MyDivider/>
          <MyDivider/>
          <LoginTextInput
            value={props.state.computed.email}
            placeholder={strings.email}
            keyboardType="email-address"
            onChangeText={email => props.dispatch(loginScreenEmailChangedAC(email))}
          />
          <MyDivider/>
          <SecureInput
            value={props.state.computed.password}
            placeholder={strings.password}
            onChangeText={password => props.dispatch(loginScreenPasswordChangedAC(password))}
          />
          <MyDivider/>
          <MyButton
            onPress={() => props.dispatch(loginScreenLoginButtonPressedAC())}
            title={strings.login}
            testID={LoginButtonId}
          />
        </RNView>
        <RNView>
          <RNText>{strings.notAMember}</RNText>
          <MyButton
            onPress={() => props.dispatch(loginScreenRegisterButtonPressedAC())}
            title={strings.register}
            testID={NavigateToRegisterScreenButtonId}
          />
        </RNView>
        <MyDivider/>
        <VersionText/>
      </MyScreen>
    )
  }
}

const LoginScreen = baseConnect((as): LoginScreenState => as[loginScreenModuleId], LoginScreenView)

export {
  LoginScreen,
}
