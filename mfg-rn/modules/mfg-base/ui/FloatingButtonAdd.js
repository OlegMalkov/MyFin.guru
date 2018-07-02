/* @flow */
/* global $Diff */

import React from 'react';
import { FloatingButton } from './FloatingButton';
import type { FloatingButtonAddProps } from './FloatingButton';

const FloatingButtonAdd = (props: FloatingButtonAddProps) => <FloatingButton
  type={props.type}
  color={props.color}
  onPress={props.onPress}
  offset={props.offset}
  reverse={props.reverse}
  name="add"
/>

export {
  FloatingButtonAdd,
}
