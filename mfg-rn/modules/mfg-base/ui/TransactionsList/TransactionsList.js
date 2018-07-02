/* global React$Component, Class */
/* @flow */

import React from 'react'
import { rnCreateStylesheet } from '../../rn/RN'
import { RNText, RNTouchableHighlight, RNView } from '../RNUI'
import { isDefined } from '../../utils/utils'
import { black, grayColor, green, normalFontSize, red } from '../../variables';
import { toMoneyFloat } from '../../utils/format';
import { ListView } from '../ListView';

import type { TransactionsListProps } from './calcTransactionsListProps'
import type { TransactionId } from '../../const'

const
  styles = rnCreateStylesheet({
    grayBackGround: {
      backgroundColor: grayColor,
    },
    transactionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 1,
      marginBottom: 1,
      paddingLeft: 2,
      paddingRight: 2,
      borderWidth: 1,
      borderColor: 'white',
    },
    transactionContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    transactionContainerSelected: {
      borderColor: green,
    },
    transactionTitleAndCommentCol: {
      flex: 1,
    },
    transactionValueCol: {
      paddingRight: 5,
      width: 120,
    },
    transactionValueRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    transactionDateCol: {
      width: 75,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    transactionDateText: {
      fontSize: normalFontSize,
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      textAlign: 'right',
      paddingTop: 1,
    },
    valueExpenseStyle: {
      color: red,
    },
    valueIncomeStyle: {
      color: green,
    },
    valueTransferStyle: {
      color: black,
    },
    transactionTitle: {
      fontSize: normalFontSize,
    },
  }),
  valueTypeToStyle = {
    expense: styles.valueExpenseStyle,
    income: styles.valueIncomeStyle,
    transfer: styles.valueTransferStyle,
  },
  makeRenderTransaction = ({ onTransactionPress, onTransactionLongPress }) => ({
    index,
    id,
    isSelected,
    hasSecondValue,
    title,
    comment,
    tags,
    value1,
    value1Type,
    value1CurrencyCode,
    value2,
    value2Type,
    value2CurrencyCode,
    date,
    time,
    value1Storage,
    value2Storage,
    author,
  }) => {
    return (
      <RNView
        style={[styles.transactionContainer, isSelected && styles.transactionContainerSelected]}
      >
        <RNTouchableHighlight
          onPress={() => onTransactionPress && onTransactionPress(id)}
          onLongPress={() => onTransactionLongPress && onTransactionLongPress(id)}
          underlayColor="lightgray"
          style={{ width: '100%' }}
        >
          <RNView style={[styles.transactionContent, (index % 2 === 0) && styles.grayBackGround]}>
            <RNView style={styles.transactionTitleAndCommentCol}>
              <RNView>
                <RNText style={styles.transactionTitle}>{title}</RNText>
              </RNView>
              {
                comment ? (
                  <RNView>
                    <RNText>{comment}</RNText>
                  </RNView>
                ) : null
              }
              {
                tags && tags.length > 0 && (
                  <RNView>
                    <RNText>{tags.join(', ')}</RNText>
                  </RNView>
                )
              }
            </RNView>
            <RNView style={styles.transactionValueCol}>
              <RNView style={styles.transactionValueRow}>
                <RNText
                  style={valueTypeToStyle[value1Type]}
                  numberOfLines={1}
                >
                  {toMoneyFloat(value1 / 100)}
                </RNText>
                <RNText> {value1CurrencyCode}</RNText>
              </RNView>
              <RNView style={styles.transactionValueRow}>
                <RNText numberOfLines={1}>{value1Storage}</RNText>
              </RNView>
              {
                hasSecondValue && (
                  <RNView style={styles.transactionValueRow}>
                    <RNText
                      numberOfLines={1}
                      style={valueTypeToStyle[value2Type]}
                    >
                      {toMoneyFloat(value2 / 100)}
                    </RNText>
                    <RNText> {value2CurrencyCode}</RNText>
                  </RNView>
                )
              }
              {
                hasSecondValue && (
                  <RNView style={styles.transactionValueRow}>
                    <RNText numberOfLines={1}>{value2Storage}</RNText>
                  </RNView>
                )
              }
            </RNView>
            <RNView style={styles.transactionDateCol}>
              <RNView>
                <RNView>
                  <RNText style={styles.transactionDateText}>{date}</RNText>
                </RNView>
                <RNView>
                  <RNText style={styles.transactionDateText}>{time}</RNText>
                </RNView>
              </RNView>
              {
                isDefined(author) && (
                  <RNView>
                    <RNText style={{ textAlign: 'right' }}>{author}</RNText>
                  </RNView>
                )
              }
            </RNView>
          </RNView>
        </RNTouchableHighlight>
      </RNView>
    );
  }

type Props = {|
  transactionsProps: TransactionsListProps,
  onTransactionPress?: (transactionId: TransactionId) => any,
  onTransactionLongPress?: (transactionId: TransactionId) => any,
|}

const
  TransactionsList = ({ transactionsProps, onTransactionPress, onTransactionLongPress }: Props) => {
    return (
      <ListView
        data={transactionsProps}
        renderRow={makeRenderTransaction({ onTransactionPress, onTransactionLongPress })}
      />
    )
  }

export {
  TransactionsList,
}
