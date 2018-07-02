/* @flow */

import React from 'react'
import { codeVersion } from '../version';
import { strings } from '../localization';
import { RNText } from './RNUI'

export const VersionText = () => (
  <RNText style={{ textAlign: 'center', fontSize: 24 }}>
    {strings.formatString(strings.version, codeVersion)}
  </RNText>
)
