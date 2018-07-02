/* @flow */

import React from 'react';
import { RNElements, RN } from '../rn/RN'

export const
  RNView = RN.View,
  RNSafeAreaView = RN.SafeAreaView,
  RNNoChildView = (props: *) => (<RN.View {...props} />),
  RNText = RN.Text,
  TitleText = ({ children, ...rest }: *) =>
    (<RN.Text style={{ fontSize: 20, fontWeight: 'bold' }}{...rest}>{children}</RN.Text>),
  RNTouchableHighlight = RN.TouchableHighlight,
  RNPicker = RN.Picker,
  RNTextInput = RN.TextInput,
  RNTouchableOpacity = RN.TouchableOpacity,
  RNTouchableWithoutFeedback = RN.TouchableWithoutFeedback,
  RNScrollView = RN.ScrollView,
  RNStyleSheet = RN.StyleSheet,
  RNImage = RN.Image,
  RNEList = RNElements.List,
  RNEListItem = RNElements.ListItem,
  RNEButton = RNElements.Button,
  RNEIcon = RNElements.Icon
