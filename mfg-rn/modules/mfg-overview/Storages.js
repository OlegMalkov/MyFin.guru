/* @flow */

import { rnCreateStylesheet } from 'mfg-base/rn/RN'
import { ArrowButton } from 'mfg-base/ui/ArrowButton'
import React from 'react'
import { date0 } from 'mfg-base/const'
import { undefinedCurrencyCode } from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer'
import { RNNoChildView, RNScrollView, RNText, RNTouchableOpacity, RNView } from 'mfg-base/ui/RNUI'
import { debtUntilPeriodStr } from 'mfg-base/utils/dateUtils'
import { toMoney, toMoneyFloat, toMoneyLimited } from 'mfg-base/utils/format'
import { filterObj, keys } from 'mfg-base/utils/utils'
import {
  blueColor, lightGrayColor, headerHeight, darkGray, lightPurple,
  grayColor,
} from 'mfg-base/variables'
import { ExpandButtonRect } from './ExpandButtonRect'
import { overviewModuleConnect } from './overviewModuleUtils'
import { familyMembersExpandedBPAC, overviewSecureModeBPAC, overviewTotalRemainsPressedAC } from './overviewScreenAC'
import * as actionCreators from './overviewScreenAC'
import { UserProgressBars } from './UserProgressBar'

import type { OverviewModuleVP } from './overview.flow'
import type { CurrencyCode } from 'mfg-base/const'
import type { Balance } from 'mfg-base/entities/account/live/flowTypes'
import type { StoragesScreenPart } from './overviewScreenReducer'

type MRBProps = {|
  onPress: (CurrencyCode) => any,
  onLongPress: (CurrencyCode) => any
|}

const
  rowHeight = 29,
  styles = rnCreateStylesheet({
    width100PrcStyle: { width: '100%', flexDirection: 'row' },
    totalBalanceItem: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: -0.5,
    },
    totalBalanceSeparator: {
      width: '100%',
      height: 0.5,
      marginTop: 3,
      marginBottom: 3,
      backgroundColor: 'white',
    },
    totalBalanceContainerStyle: {
      height: 22,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  }),
  _ColorStoragesBorderedBox = ({ color, navStateIsExpense, children }) => {
    const colorBox = <RNView style={{ height: '100%', width: 4, backgroundColor: color }}/>
    return (
      <RNView style={{ flexDirection: 'row', height: '100%', width: '100%' }}>
        {!navStateIsExpense && colorBox}
        <RNView style={{ flex: 1, height: '100%', flexDirection: 'row' }}>
          {children}
        </RNView>
        {navStateIsExpense && colorBox}
      </RNView>
    )
  },
  /* TODO 4 remove any */
  ColorStoragesBorderedBox: any = overviewModuleConnect(
    as => ({ navStateIsExpense: as.overviewScreen.screen.navState === 'expense' }),
    /* $FlowFixMe */
    _ColorStoragesBorderedBox,
  ),
  storageStyles = rnCreateStylesheet({
    storageTitle: {},
  }),
  selectionColor = grayColor,
  makeRenderBalance = ({
    onLongPress,
    onPress,
  }: MRBProps = {}) => {
    type Props = {|
      balance: Balance,
      limitBalance?: Balance,
      selectedCurrencyCode: CurrencyCode,
      isArrowExpanded?: bool,
    |}

    return ({
      balance,
      limitBalance = {},
      selectedCurrencyCode,
      isArrowExpanded,
    }: Props) => {
      if (!balance) return <RNNoChildView/>

      const
        currencyCodes = keys(filterObj((x) => x !== 0)(balance)),
        Rows = currencyCodes.map((currencyCode, index) => {
          const
            isLast = currencyCodes.length - 1 === index,
            isSelected = selectedCurrencyCode === currencyCode,
            toString = isSelected ? toMoneyFloat : toMoney,
            limit = limitBalance[currencyCode],
            value = balance[currencyCode],
            canBeSpent = limit ? limit + value : value,
            p1 = (limit && !isSelected) ? `${toMoneyLimited(value / 100)}/` : '',
            valueStr = `${p1}${toString(canBeSpent / 100)}`,
            width100PrcStyle = { width: '100%', flexDirection: 'row' }

          return (
            <RNView
              key={currencyCode}
              style={[
                isSelected && { backgroundColor: selectionColor },
                { width: '100%', flexDirection: 'column', height: rowHeight },
              ]}
            >
              <RNView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <RNTouchableOpacity
                  style={width100PrcStyle}
                  onPress={() => onPress(currencyCode)}
                  onLongPress={() => onLongPress(currencyCode)}
                >
                  <RNText
                    key={value}
                    style={[
                      { fontWeight: '600', letterSpacing: -0.5, paddingLeft: 10 },
                    ]}
                  >
                    {valueStr}
                  </RNText>
                  <RNText
                    style={
                      [
                        { letterSpacing: -1, paddingLeft: 3, color: darkGray },
                      ]
                    }
                  >
                    {currencyCode}
                  </RNText>
                </RNTouchableOpacity>
              </RNView>
              {!isLast && <DashLine/>}
            </RNView>
          )
        });

      return (
        <RNView
          style={{ width: '100%' }}
        >
          {
            isArrowExpanded !== undefined && (
              <ArrowButton
                up={isArrowExpanded}
                color="white"
                style={{ position: 'absolute', right: -7, top: -3, height: 10 }}
              />
            )
          }
          {Rows}
        </RNView>
      )
    }
  },
  TotalBalance = ({
    balance,
    isArrowExpanded,
    onPress,
  }) => {
    if (!balance) return <RNNoChildView/>

    const
      currencyCodes = keys(filterObj((x) => x !== 0)(balance)),
      Rows = currencyCodes.map((currencyCode, index) => {
        const
          isLast = currencyCodes.length - 1 === index,
          value = balance[currencyCode],
          valueStr = toMoney(value / 100)

        return (
          <RNView
            key={currencyCode}
            style={{ width: '100%', flexDirection: 'column' }}
          >
            <RNView style={styles.totalBalanceContainerStyle}>
              <RNView style={styles.width100PrcStyle}>
                <RNText
                  key="currency"
                  style={styles.totalBalanceItem}
                >
                  {currencyCode}:
                </RNText>
                <RNText
                  key={value}
                  style={styles.totalBalanceItem}
                >
                  {valueStr}
                </RNText>
              </RNView>
            </RNView>
            {
              !isLast && <RNView style={styles.totalBalanceSeparator}/>
            }
          </RNView>
        )
      });

    return (
      <RNView>
        <RNTouchableOpacity onPress={onPress}>
          <RNView>
            <ArrowButton
              up={isArrowExpanded} color="white"
              style={{ position: 'absolute', right: -7, top: -3, height: 10 }}
            />
            }
            {Rows}
          </RNView>
        </RNTouchableOpacity>
      </RNView>
    )
  },
  DashLine = () => (
    <RNView style={{ width: '100%', height: 1, overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }}>
      <RNView
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: lightGrayColor,
          borderStyle: 'dotted',
          marginTop: -1,
        }}
      />
    </RNView>
  ),
  renderStorage = ({
    onStorageCurrencyBalancePressed,
    onStorageCurrencyBalanceLongPressed,
    dispatch,
    storages,
    isSecureMode,
  }) => {
    return (props) => {
      if (props.type === 'my-storages-separator') {
        return (
          <RNView
            style={{
              width: '100%',
              flex: 1,
              minHeight: headerHeight,
              backgroundColor: lightGrayColor,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <ExpandButtonRect
              onPress={() => dispatch(overviewSecureModeBPAC())}
              up={isSecureMode}
            />
          </RNView>
        )
      }

      if (props.type === 'label') {
        return (
          <RNTouchableOpacity
            onPress={() => dispatch(actionCreators.overviewCollapseUserStoragesPressAC(props.uid))}
          >
            <RNView
              style={{
                height: headerHeight,
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderBottomColor: lightGrayColor,
                flexDirection: 'row',
              }}
            >
              <ColorStoragesBorderedBox color={lightPurple}>
                <RNView style={{ paddingLeft: 3 }}>
                  <UserProgressBars incomeProgress={4} expenseProgress={16}/>
                </RNView>
                <RNView
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}
                >
                  <RNView>
                    <RNText style={{ fontSize: 11, fontWeight: '400' }}>
                      {props.title}
                    </RNText>
                    <RNView style={{ flexDirection: 'row' }}>
                      <RNText style={{ fontSize: 13, fontWeight: '600', letterSpacing: -1 }}>
                        163 617
                      </RNText>
                      <RNText
                        style={{
                          fontSize: 13,
                          fontWeight: '400',
                          color: darkGray,
                          letterSpacing: -1,
                          paddingLeft: 2,
                        }}
                      >
                        RUB
                      </RNText>
                    </RNView>
                  </RNView>
                </RNView>
                <RNView style={{ position: 'absolute', right: 5, top: 5 }}>
                  <ArrowButton up={!props.collapsed}/>
                </RNView>
              </ColorStoragesBorderedBox>
            </RNView>
          </RNTouchableOpacity>
        )
      }

      if (props.type === 'debt' || props.type === 'debit' || props.type === 'credit') {
        const
          {
            id,
            balance,
            title,
            selectedCurrencyCode,
          } = props,
          isSelected = selectedCurrencyCode !== undefined

        const
          currenciesInStorageCount = keys(balance).filter(k => balance[k] !== 0).length,
          height = (currenciesInStorageCount + 1) * rowHeight,
          debtUntil = props.debtUntil,
          storage = storages[id]

        return (
          <RNView
            key={title}
            style={{
              height,
              borderBottomWidth: 1,
              borderBottomColor: lightGrayColor,
              backgroundColor: 'white',
            }}
          >
            <ColorStoragesBorderedBox color={lightPurple}>
              <RNView
                style={{ flexDirection: 'column', width: '100%' }}
              >
                <RNTouchableOpacity
                  onPress={
                    () => onStorageCurrencyBalancePressed({
                      currencyCode: undefinedCurrencyCode,
                      storageId: id,
                    })
                  }
                  onLongPress={
                    () => onStorageCurrencyBalanceLongPressed({
                      currencyCode: undefinedCurrencyCode,
                      storageId: id,
                    })
                  }
                >
                  <RNView
                    style={[
                      {
                        height: rowHeight,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10,
                      },
                      isSelected && { backgroundColor: selectionColor },
                    ]}
                  >
                    <RNText
                      style={[
                        storageStyles.storageTitle,
                      ]}
                      numberOfLines={1}
                    >
                      {`${title}${debtUntil && debtUntil !== date0 ? ` ${debtUntilPeriodStr(debtUntil)}` : ''}`}
                    </RNText>
                  </RNView>
                </RNTouchableOpacity>
                {currenciesInStorageCount !== 0 && <DashLine/>}
                <RNView>
                  {
                    makeRenderBalance({
                      onPress: (currencyCode) => onStorageCurrencyBalancePressed({
                        currencyCode,
                        storageId: id,
                      }),
                      onLongPress: (currencyCode) => onStorageCurrencyBalanceLongPressed({
                        currencyCode,
                        storageId: id,
                      }),
                    })({
                      balance,
                      limitBalance: storage.type === 'credit' ? storage.limitBalance : {},
                      selectedCurrencyCode,
                    })
                  }
                </RNView>
              </RNView>
            </ColorStoragesBorderedBox>
          </RNView>
        )
      }

      return <RNNoChildView/>
    }
  },
  storagesStyles = rnCreateStylesheet({
    storagesSummury: {
      backgroundColor: blueColor,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
  }),
  Storages = (props: OverviewModuleVP<StoragesScreenPart>) => {
    const
      {
        state: {
          isSecureMode,
          isTotalRemainsExpanded,
          familyMembersExpanded,
          computed,
        },
        dispatch,
      } = props

    if (computed === null) {
      return <RNNoChildView/>
    }

    const
      { data, totalRemains, totalRemainsOneCurrency, mainCurrencyCode, storages } = computed,
      renderStorageProps = {
        onStorageCurrencyBalancePressed:
          (v) => dispatch(actionCreators.overviewStorageCurrencyBalancePressedAC(v)),
        onStorageCurrencyBalanceLongPressed:
          (v) => dispatch(actionCreators.overviewStorageCurrencyBalanceLongPressedAC(v)),
        isSecureMode,
        mainCurrencyCode,
        dispatch,
        storages,
      },
      Storage = renderStorage(renderStorageProps);

    return (
      <RNView style={{ height: '100%' }}>{/* ALL STORAGES */}
        <ExpandButtonRect
          onPress={() => dispatch(familyMembersExpandedBPAC())}
          up={familyMembersExpanded}
        />
        <RNView style={{ flex: 1 }}>
          <RNScrollView>
            <RNView style={{ flexDirection: 'column', minHeight: '100%' }}>
              {
                data.map((storage, i) => {
                  return <Storage key={i} {...storage} />
                })
              }
            </RNView>
          </RNScrollView>
        </RNView>
        <RNView style={storagesStyles.storagesSummury}>
          <TotalBalance
            balance={isTotalRemainsExpanded ? totalRemains : totalRemainsOneCurrency}
            isArrowExpanded={isTotalRemainsExpanded}
            onPress={() => dispatch(overviewTotalRemainsPressedAC())}
          />
        </RNView>
      </RNView>
    )
  }

export {
  Storages,
}
