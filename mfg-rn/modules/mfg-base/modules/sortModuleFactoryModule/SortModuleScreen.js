/* @flow */

import { RNText } from '../../ui/RNUI'
import { ScreenWithBackButton } from '../../ui/ScreenWithBackButton'
import { RNSortableList, rnAnimated, rnCreateStylesheet, rnEasing, rnPlatform } from '../../rn/RN'
import React from 'react'
import { grayColor } from '../../variables'
import { sortRowMovedAC, sortScreenBackButtonPressedAC } from './sortScreenAC'

import type { BaseDispatch } from '../../base.flow'
import type { SortItems } from './flowTypes'

type State<ID> = { items: SortItems<ID> }
type P = { dispatch: BaseDispatch<>, routeName: string }
type RowProps = { data: { active: bool, data: { title: string } } }

const
  styles = rnCreateStylesheet({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',

      ...rnPlatform.select({
        ios: {
          paddingTop: 20,
        },
      }),
    },

    list: {
      flex: 1,
    },

    contentContainer: {
      width: '100%',

      ...rnPlatform.select({
        ios: {
          paddingHorizontal: 30,
        },

        android: {
          paddingHorizontal: 0,
        },
      }),
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      height: 80,
      flex: 1,
      marginTop: 7,
      marginBottom: 12,
      borderRadius: 4,


      ...rnPlatform.select({
        ios: {
          width: window.width - 30 * 2,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowOpacity: 1,
          shadowOffset: { height: 2, width: 2 },
          shadowRadius: 2,
        },

        android: {
          width: window.width - 30 * 2,
          elevation: 0,
          marginHorizontal: 30,
        },
      }),
    },

    rowActive: {
      backgroundColor: grayColor,
    },

    image: {
      width: 50,
      height: 50,
      marginRight: 30,
      borderRadius: 25,
    },

    text: {
      fontSize: 24,
      color: '#222222',
    },
  }),
  /* TODO 2 MFG-34 remove any, state */

  RowComponent = class Row extends React.Component<RowProps> {
    _active: any;
    _style: any;

    constructor(props) {
      super(props);

      this._active = new rnAnimated.Value(0);

      this._style = {
        ...rnPlatform.select({
          ios: {
            transform: [{
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            }],
            shadowRadius: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 10],
            }),
          },

          android: {
            transform: [{
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            }],
            elevation: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 6],
            }),
          },
        }),
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.data.active !== nextProps.data.active) {
        rnAnimated.timing(this._active, {
          duration: 300,
          easing: rnEasing.bounce,
          toValue: Number(nextProps.data.active),
        }).start();
      }
    }

    render() {
      const { data: { active, data: { title } } } = this.props;

      return (
        <rnAnimated.View style={[styles.row, this._style, active && styles.rowActive]}>
          <RNText style={styles.text}>{title}</RNText>
        </rnAnimated.View>
      );
    }
  },
  SortModuleScreen: any = class extends React.Component<P, State<string>> {
    constructor(props) {
      super(props)
      this.state = { items: props.items }
    }

    render() {
      const
        { items } = this.state,
        { dispatch } = this.props
      return (
        <ScreenWithBackButton
          routeName={this.props.routeName}
          onBackButtonPress={() => this.props.dispatch(sortScreenBackButtonPressedAC())}
        >
          <RNSortableList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={items}
            renderRow={row => <RowComponent data={row}/>}
            onChangeOrder={newOrder => dispatch(sortRowMovedAC(newOrder))}
          />
        </ScreenWithBackButton>
      )
    }
  }

export {
  SortModuleScreen,
}
