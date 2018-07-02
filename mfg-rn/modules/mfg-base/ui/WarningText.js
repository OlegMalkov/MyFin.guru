/* @flow */

import React from 'react'
import { RNText } from './RNUI'

type Props = {
  text: string,
}

export const WarningText = ({ text }: Props) => (
  <RNText style={{ textAlign: 'center', fontSize: 14, color: '#ffa746' }} >
    {text}
  </RNText >
)
