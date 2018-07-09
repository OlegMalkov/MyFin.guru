/* @flow */

import React from 'react'
import { Icon } from 'mfg-base/ui/Icon'
import { rnCreateStylesheet } from 'mfg-base/rn/RN'
import { RNView } from 'mfg-base/ui/RNUI'
import { RNText } from 'mfg-base/ui/RNUI'
import * as format from 'mfg-base/utils/format'
import { getWindowDimensions } from 'mfg-base/utils/myDimensions'
import * as styleUtils from 'mfg-base/ui/styleUtils'
import {
  green, red,
} from 'mfg-base/variables'
import { analyticsScreenModuleId } from './analyticsScreenModuleId'
import {
  analyticsScreenBackBP,
  analyticsScreenDeleteTransactionBPAC,
  analyticsScreenNextPeriodBPAC,
  analyticsScreenPreviousPeriodBPAC,
  analyticsScreenTransactionLongPressAC,
  analyticsScreenTransactionPressAC,
  analyticsScreenUserNamePressAC,
} from './analyticsScreenAC'
import { TransactionsList } from 'mfg-base/ui/TransactionsList/TransactionsList'

import type { AnalyticsModuleVP } from './analytics.flow'
import type { AnalyticsScreenState } from './analyticsScreenReducer'
import { analyticsModuleConnect } from './analyticsModuleUtils'

const
  styles = rnCreateStylesheet({
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    content: {
      flexDirection: 'column',
      flex: 1,
    },
    periodSelectorText: {
      fontSize: 20,
      fontFamily: 'Courier New',
      fontWeight: 'bold',
    },
    topBarContainer: {
      height: styleUtils.topBarHeight,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    periodSelectorContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteTransactionBtn: {
      backgroundColor: '#ff6643',
      position: 'absolute',
      bottom: 40,
      right: 40,
      zIndex: 100,
      width: 50,
      height: 50,
      borderRadius: 50,
      overflow: 'hidden',
    },
    userName: {
      fontSize: 20,
      textAlign: 'center',
      paddingTop: 5,
    },
  }),

  TopBar = ({
    onPreviousPeriodBtnPress,
    onNextPeriodBtnPress,
    day,
    month,
    year,
    userName,
    userNameOnPress,
    isAdmin,
  }) => {
    return (
      <RNView style={styles.topBarContainer}>
        <RNText onPress={isAdmin ? userNameOnPress : null} style={styles.userName}>
          {userName}
        </RNText>
        <RNView>
          <RNView style={styles.periodSelectorContent}>
            <Icon
              size={45}
              name="keyboard-arrow-left"
              onPress={onPreviousPeriodBtnPress}
            />
            <RNText
              style={styles.periodSelectorText}
            >
              {format.pad2(day)}.{format.pad2(month)}.{year}
            </RNText>
            <Icon
              size={45}
              name="keyboard-arrow-right"
              onPress={onNextPeriodBtnPress}
            />
          </RNView>
        </RNView>
      </RNView>
    )
  },

  AnalyticsScreenView = (props: AnalyticsModuleVP<AnalyticsScreenState>) => {
    const
      {
        state: {
          computed: {
            showDeleteTransactionBtn,
            periodSelectorProps,
            userName,
            transactionsBalanceByTypeOneCurrency: {
              expense,
              income,
            },
            transactionsCountByType: {
              expense: expensesCount,
              income: incomesCount,
            },
            isAdmin,
            transactionsListProps,
          },
        },
        dispatch,
      } = props,
      topBarProps = {
        ...periodSelectorProps,
        onPreviousPeriodBtnPress: () => dispatch(analyticsScreenPreviousPeriodBPAC()),
        onNextPeriodBtnPress: () => dispatch(analyticsScreenNextPeriodBPAC()),
        userName,
        userNameOnPress: () => dispatch(analyticsScreenUserNamePressAC()),
        isAdmin,
        onBackButtonPress: () => {
          dispatch(analyticsScreenBackBP())
        },
      },
      { height } = getWindowDimensions()

    return (
      <RNView>
        <RNView style={styles.container}>
          <TopBar {...topBarProps} />
          <RNView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {
              expense && (
                <RNView style={{ flexDirection: 'row' }}>
                  <RNText style={{ color: red, fontSize: 16 }}>{expensesCount}</RNText>
                  <Icon name="trending-down" size={20} color={red}/>
                  <RNText style={{ color: red, fontSize: 16 }}> -{expense}</RNText>
                </RNView>
              )
            }
            {
              income && (
                <RNView style={{ flexDirection: 'row' }}>
                  <RNText style={{ color: green, fontSize: 16 }}>{incomesCount}</RNText>
                  <Icon name="trending-up" size={20} color={green}/>
                  <RNText style={{ color: green, fontSize: 16 }}> +{income}</RNText>
                </RNView>
              )
            }
          </RNView>
          <RNView style={{ height: height - 85 }}>
            <TransactionsList
              transactionsProps={transactionsListProps}
              onTransactionPress={
                (transactionId) => dispatch(analyticsScreenTransactionPressAC(transactionId))
              }
              onTransactionLongPress={
                (transactionId) => dispatch(analyticsScreenTransactionLongPressAC(transactionId))
              }
            />
          </RNView>
          {
            showDeleteTransactionBtn && <RNView
              style={styles.deleteTransactionBtn}
            >
              <RNText
                style={{ textAlign: 'center', marginTop: -2, fontSize: 40 }}
                onPress={() => dispatch(analyticsScreenDeleteTransactionBPAC())}
              >
                x
              </RNText>
            </RNView>
          }
        </RNView>
      </RNView>
    )
  },

  AnalyticsScreen = analyticsModuleConnect(
    (as): AnalyticsScreenState => as[analyticsScreenModuleId],
    AnalyticsScreenView,
  )

export { AnalyticsScreen }
