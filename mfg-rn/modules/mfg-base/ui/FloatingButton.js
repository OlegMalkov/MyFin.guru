/* @flow */

import React from 'react';
import { mctaColor } from '../const';
import { Icon } from './Icon';
import { rnCreateStylesheet } from '../rn/RN'
import { RNView } from './RNUI'

const
  styles = rnCreateStylesheet({
    addTransactionBtn: {
      position: 'absolute',
      bottom: 40,
      zIndex: 100,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export type FloatingButtonAddProps = {|
  type?: string,
  color?: string,
  onPress?: () => any,
  offset?: number,
  reverse?: true,
|}

export type FloatingButtonProps = {|
  name: string,
  ...FloatingButtonAddProps,
|}

const FloatingButton = (props: FloatingButtonProps) => {
  const
    offset = props.offset || 0,
    right = 20 + (offset * 80);

  return (
    <RNView style={[styles.addTransactionBtn, { right }]} >
      <Icon
        color={props.color || mctaColor}
        size={30}
        reverse={props.reverse}
        name={props.name}
        type={props.type}
        onPress={props.onPress}
      />
    </RNView >
  );
};

export {
  FloatingButton,
}
