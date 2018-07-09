/* @flow */

import { initFirstScreenMountedAC } from 'mfg-base/modules/initModule/initAC'
import { rnCreateStylesheet, rnLayoutAnimation } from 'mfg-base/rn/RN'
import { ArrowButton } from 'mfg-base/ui/ArrowButton'
import { Icon } from 'mfg-base/ui/Icon'
import GestureRecognizer from 'react-native-swipe-gestures'
import { RNText, RNImage, RNView, RNTouchableOpacity } from 'mfg-base/ui/RNUI'
import {
  blackText,
  borderColor, darkGray, darkGray1, footerHeight, grayColor, headerHeight, lightGrayColor, textActiveColor,
} from 'mfg-base/variables'
import React from 'react'
import { MyScreen } from 'mfg-base/ui/MyScreen'
import {
  EditExchangeDialog,
} from 'mfg-base/modules/editTransactionDialogsModule/exchange/EditExchangeDialog'
import {
  EditExpenseDialog,
} from 'mfg-base/modules/editTransactionDialogsModule/incomeAndExpense/expense/EditExpenseDialog'
import {
  EditIncomeDialog,
} from 'mfg-base/modules/editTransactionDialogsModule/incomeAndExpense/income/EditIncomeDialog'
import {
  EditTransferDialog,
} from 'mfg-base/modules/editTransactionDialogsModule/transfer/EditTransferDialog'
import { PickDateDialog } from 'mfg-base/modules/globalDialogsModules/PickDateDialog/PickDateDialog'
import { ExpandButtonRect } from './ExpandButtonRect'
import { overviewModuleConnect } from './overviewModuleUtils'
import {
  PickUserDialog,
} from 'mfg-base/modules/globalDialogsModules/PickUserDialog/PickUserDialog'
import {
  PickCurrencyDialog,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/PickCurrencyDialog';
import {
  PickCategoryDialog,
} from 'mfg-base/modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialog';

import {
  overviewCategoriesViewModeBPAC,
  overviewScreenSwipeLeftAC, overviewScreenSwipeRightAC,
  overviewSettingsBPAC,
} from './overviewScreenAC'
import { overviewScreenNavStates } from './overviewScreenReducer'
import { Storages } from './Storages'
import { AnalyticsScreen } from './submodules/mfg-analytics/AnalyticsScreen'
import { UserProgressBars } from './UserProgressBar'

import type { OverviewModuleVP } from './overview.flow'
import type { OverviewScreenState } from './overviewScreenReducer'

const
  fullWidthPart = 1000,
  leftPart = 385,
  rightPart = fullWidthPart - leftPart,
  incomePart = rightPart,
  expensePart = rightPart,
  storagesPart = leftPart,
  analyticsPart = fullWidthPart,
  flexCenter = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stylesHeader = {
    header: {
      width: '100%',
      height: headerHeight,
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    logoContainer: {
      height: '100%',
      flex: leftPart,
    },
    logoSubContainer: {
      padding: 5,
    },
    userAndMenuBurderContainer: {
      height: '100%',
      flex: rightPart,
      ...flexCenter,
    },
    userContainer: {
      flex: 1,
      height: '100%',
      ...flexCenter,
    },
    userProgressIconContainer: {
      ...flexCenter,
      height: '100%',
      width: 30,
    },
    userContainerArrow: {
      width: 10,
      height: '100%',
      ...flexCenter,
    },
    userNameAndProgressContainer: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
      paddingLeft: 8,
    },
    userNameContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    userNameText: {
      color: blackText,
      fontSize: 14,
      fontWeight: 'bold',
    },
    userSpentPercentText: {
      color: darkGray1,
      fontSize: 14,
      fontWeight: 'bold',
    },
    userNameProgressContainer: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    userProgressText: {
      color: darkGray,
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: -1,
    },
    menuBurgerContainer: {
      width: 34,
      height: headerHeight,
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  Header = ({ dispatch }) => (
    <RNView style={stylesHeader.header}>
      <RNView style={stylesHeader.logoContainer}>
        <RNView style={stylesHeader.logoSubContainer}>
          <RNImage
            /* $FlowOk */
            source={require('mfg-base/images/logo.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode={RNImage.resizeMode.contain}
          />
        </RNView>
      </RNView>
      <RNView style={stylesHeader.userAndMenuBurderContainer}>
        <RNView style={stylesHeader.userContainer}>
          <RNView style={stylesHeader.userProgressIconContainer}>
            <UserProgressBars incomeProgress={4} expenseProgress={6}/>
          </RNView>
          <RNView style={stylesHeader.userContainerArrow}>
            <ArrowButton up={false}/>
          </RNView>
          <RNView style={stylesHeader.userNameAndProgressContainer}>
            <RNView style={stylesHeader.userNameContainer}>
              <RNText style={stylesHeader.userNameText}>
                Олег
              </RNText>
              <RNText style={stylesHeader.userSpentPercentText}>
                (137%)
              </RNText>
            </RNView>
            <RNView style={stylesHeader.userNameProgressContainer}>
              <RNText
                style={stylesHeader.userProgressText}
                numberOfLines={1}
              >
                990 500 / 100 000 RUB
              </RNText>
            </RNView>
          </RNView>
        </RNView>
        <RNView style={stylesHeader.menuBurgerContainer}>
          <RNTouchableOpacity
            onPress={() => dispatch(overviewSettingsBPAC())}
          >
            <Icon name="menu" size={26} color={lightGrayColor}/>
          </RNTouchableOpacity>
        </RNView>
      </RNView>
    </RNView>
  ),
  fullBodyWidthMult = (incomePart + storagesPart + expensePart + analyticsPart) / fullWidthPart,
  stylesBody = rnCreateStylesheet({
    body: {
      width: `${fullBodyWidthMult * 100}%`,
      flex: 1,
      backgroundColor: lightGrayColor,
      flexDirection: 'row',
    },
    incomeScreen: {
      marginLeft: 0,
    },
    expenseScreen: {
      marginLeft: `-${incomePart / fullWidthPart * 100}%`,
    },
    analyticsScreen: {
      marginLeft: `-${(incomePart + storagesPart + expensePart + 1) / fullWidthPart * 100}%`,
    },
    storagesContainer: {
      height: '100%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      borderLeftColor: borderColor,
      borderLeftWidth: 1,
      flex: leftPart,
    },
    incomeCategoriesContainer: {
      height: '100%',
      flex: rightPart,
      backgroundColor: '#c2e4b0',
    },
    expenseCategoriesContainer: {
      height: '100%',
      flex: rightPart,
      backgroundColor: '#e1bdd7',
    },
    analyticsContainer: {
      height: '100%',
      flex: analyticsPart,
    },
  }),
  Categories = ({ categories, onExpandButtonPressed, expanded }) => {
   console.log('categories', categories)
    return (
      <RNView style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
        <RNView
          style={{
            minHeight: headerHeight,
            backgroundColor: lightGrayColor,
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <RNView style={{ width: '100%' }}>
            <ExpandButtonRect
              onPress={onExpandButtonPressed}
              up={expanded}
            />
          </RNView>
        </RNView>
      </RNView>
    )
  },
  Body = ({ navState, storagesScreenPart, categoriesScreenPart, dispatch }) => (
    <RNView
      style={[
        stylesBody.body,
        navState === 'income' && stylesBody.incomeScreen,
        navState === 'expense' && stylesBody.expenseScreen,
        navState === 'analytics' && stylesBody.analyticsScreen,
      ]}
    >
      <RNView style={stylesBody.incomeCategoriesContainer}>
        <Categories
          categories={categoriesScreenPart.computed.categoriesData}
          onExpandButtonPressed={() => dispatch(overviewCategoriesViewModeBPAC())}
          expanded={categoriesScreenPart.showNotPlannedCategories}
        />
      </RNView>
      <RNView style={stylesBody.storagesContainer}>
        <Storages state={storagesScreenPart} dispatch={dispatch}/>
      </RNView>
      <RNView style={stylesBody.expenseCategoriesContainer}>
        <Categories
          categories={[]}
          onExpandButtonPressed={() => dispatch(overviewCategoriesViewModeBPAC())}
          expanded={categoriesScreenPart.showNotPlannedCategories}
        />
      </RNView>
      <RNView style={stylesBody.analyticsContainer}>
        <AnalyticsScreen/>
      </RNView>
    </RNView>
  ),
  stylesFooter = {
    footer: {
      height: footerHeight,
      backgroundColor: lightGrayColor,
      borderTopColor: borderColor,
      borderTopWidth: 1,
      ...flexCenter,
    },

    navDot: {
      height: '100%',
      ...flexCenter,
      width: 23,
    },
  },

  makeNavDot = (color) => ({ onPress }) => (
    <RNView style={stylesFooter.navDot}>
      <RNTouchableOpacity onPress={onPress}>
        <Icon name="lens" size={10} color={color}/>
      </RNTouchableOpacity>
    </RNView>
  ),
  NavDotInactive = makeNavDot(grayColor),
  NavDotActive = makeNavDot(textActiveColor),

  Footer = ({
    navState,
    onDotPress,
  }) => (
    <RNView style={stylesFooter.footer}>
      {
        overviewScreenNavStates
          .map(
            ns => {
              const Dot = ns === navState ? NavDotActive : NavDotInactive

              return <Dot onPress={() => onDotPress(ns)} key={ns}/>
            },
          )
      }
    </RNView>
  ),
  enableLayoutAnimationFor200ms = () => {
    const myAnimConfig = {
      ...rnLayoutAnimation.Presets.easeInEaseOut,
      duration: 150,
    }
    rnLayoutAnimation.configureNext(myAnimConfig);
  }

class OverviewScreenView extends React.PureComponent<OverviewModuleVP<OverviewScreenState>> {
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(initFirstScreenMountedAC())
    }, 100)
    /* $FlowOk */
    this.navLeft = this.navLeft.bind(this)
    /* $FlowOk */
    this.navRight = this.navRight.bind(this)
    /* $FlowOk */
    this.nav = this.nav.bind(this)
  }

  nav(action) {
    enableLayoutAnimationFor200ms();
    this.props.dispatch(action)
  }

  navRight() {
    this.nav(overviewScreenSwipeRightAC())
  }

  navLeft() {
    this.nav(overviewScreenSwipeLeftAC())
  }

  render() {
    return (
      <MyScreen routeName="Overview">
        <Header dispatch={this.props.dispatch}/>
        <RNView style={{ flex: 1 }}>
          <Body {...this.props.state.screen} dispatch={this.props.dispatch}/>
          <GestureRecognizer
            onSwipeLeft={this.navLeft}
            onSwipeRight={this.navRight}
            config={{
              velocityThreshold: 0.3,
              directionalOffsetThreshold: 80,
            }}
          >
            <Footer
              navState={this.props.state.screen.navState}
              onDotPress={
                (requestedNavState) => {
                  // TODO MFG-78 put proper actions for dot press and remove logic here
                  if (requestedNavState === 'analytics') {
                    this.navLeft()
                  } else if (requestedNavState === 'income') {
                    this.navRight()
                  } else if (this.props.state.screen.navState === 'analytics') {
                    this.navRight()
                  } else {
                    this.navLeft()
                  }
                }
              }
            />
          </GestureRecognizer>
        </RNView>
        <EditExpenseDialog/>
        <EditIncomeDialog/>
        <EditTransferDialog/>
        <EditExchangeDialog/>
        <PickCurrencyDialog/>
        <PickDateDialog/>
        <PickUserDialog/>
        <PickCategoryDialog/>
      </MyScreen>
    )
  }
}

const
  OverviewScreen = overviewModuleConnect(as => as.overviewScreen, OverviewScreenView)

export {
  OverviewScreen,
}
