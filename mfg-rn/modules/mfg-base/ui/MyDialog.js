/* @flow */

import React from 'react'
import { RNSimpleDialog } from '../rn/RN'

type Shared = {|
  opened: bool,
  justifyContent?: 'flex-start' | 'center' | 'flex-end',
  children: any,
  fullWidth?: true,
|}
type Props = {|
  ...Shared,
  disableOnBackPress: true
|} | {|
  ...Shared,
  modalDidClose: () => any
|}

const
  MyDialog = (props: Props) => {
    const {
      opened,
      children,
      justifyContent = 'flex-start',
      fullWidth = false,
    } = props

    return (
      <RNSimpleDialog
        open={opened}
        offset={0}
        overlayBackground={'rgba(0, 0, 0, 0.75)'}
        animationDuration={100}
        animationTension={80}
        modalDidClose={props.modalDidClose ? props.modalDidClose : undefined}
        disableOnBackPress={props.disableOnBackPress ? true : false}
        closeOnTouchOutside
        containerStyle={{
          justifyContent,
        }}
        modalStyle={{
          borderRadius: 2,
          margin: fullWidth ? 0 : 20,
          padding: fullWidth ? 0 : 10,
          backgroundColor: '#F5F5F5',
        }}
        disableOnBackPress={false}
      >
        {children}
      </RNSimpleDialog>
    )
  }

export { MyDialog }
