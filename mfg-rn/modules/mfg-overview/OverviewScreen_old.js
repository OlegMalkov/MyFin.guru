/* @flow */

import { date0 } from 'mfg-base/const'
import { initFirstScreenMountedAC } from 'mfg-base/modules/initModule/initAC'
import { memoMaxOneArgs4 } from 'mfg-base/utils/memo'
import React from 'react'
import { MyScreen } from 'mfg-base/ui/MyScreen'
import { rnCreateStylesheet } from 'mfg-base/rn/RN'
import { RNText, RNNoChildView, RNView } from 'mfg-base/ui/RNUI'
import {
  undefinedCurrencyCode,
} from 'mfg-base/entities/account/live/parts/mainCurrencyCodeReducer';
import { toMoney, toMoneyFloat, toMoneyLimited } from 'mfg-base/utils/format'
import { ListView } from 'mfg-base/ui/ListView'
import { deprecatedConnect } from 'mfg-base/baseConnect'
import * as styleUtils from 'mfg-base/ui/styleUtils'
import { ToggleIcon } from 'mfg-base/ui/ToggleIcon'
import { Icon } from 'mfg-base/ui/Icon'
import { FloatingButtonAdd } from 'mfg-base/ui/FloatingButtonAdd'
import { FloatingButton } from 'mfg-base/ui/FloatingButton'
import { filterObj, is, isDefined, keys } from 'mfg-base/utils/utils'
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
import {
  overviewAddCategoryBPAC, overviewAddStorageBPAC,
} from './overviewScreenAC'
import * as actionCreators from './overviewScreenAC'
import { StoragesActionsDialog } from './StoragesActionsDialog/StoragesActionsDialog'
import { CategoriesActionsDialog } from './CategoriesActionsDialog/CategoriesActionsDialog'
import { ToLendMoneyDialog } from './ToLendMoneyDialog/ToLendMoneyDialog'
import {
  PickUserDialog,
} from 'mfg-base/modules/globalDialogsModules/PickUserDialog/PickUserDialog'
import {
  PickCurrencyDialog,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/PickCurrencyDialog';
import {
  PickCategoryDialog,
} from 'mfg-base/modules/globalDialogsModules/PickCategoryDialog/PickCategoryDialog';
import { red } from 'mfg-base/variables';
import { debtUntilPeriodStr } from 'mfg-base/utils/dateUtils';
import { strings } from 'mfg-base/localization';

import type { OverviewModuleAppState, OverviewModuleDispatch } from './overview.flow'
import type { CurrencyCode } from 'mfg-base/const'
import type { Balance } from 'mfg-base/entities/account/live/flowTypes';
import type { OverviewScreenState } from './overviewScreenReducer'
import type {
  EditTransactionDialogsState,
} from 'mfg-base/modules/editTransactionDialogsModule/editTransactionDialogsReducer.js'

/* CATEGORIES */
const
  makeRenderCategory = ({ level, onPress, onLongPress }) => (props) => {
    return (
      <RNView
        key={props.title}
        style={[
          styles.categoryContainer,
          {
            borderColor: props.selected ? selectedIncomeBorderColor : 'white',
          },
        ]}
      >
        <RNView
          style={[styles.categoryText, level !== 1 && styles.categoryTextSecondLevel]}
        >
          <RNView style={[styles.categoryTitleContainer, { flex: props.valueIsNumber ? 60 : 77 }]}>
            <RNText
              style={level === 1 ? styles.fontSize17 : styles.fontSize14}
              numberOfLines={1}
              onPress={() => onPress(props.id)}
              onLongPress={() => onLongPress(props.id)}
            >{props.title}</RNText>
          </RNView>
          <RNView style={[styles.categoryValueContainer, { flex: props.valueIsNumber ? 40 : 23 }]}>
            <RNText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                props.valueIsNumber ?
                  styles.fontSize12 : (level === 1 ? styles.fontSize17 : styles.fontSize14),
                { textAlign: 'left' },
              ]}
            >
              {props.value}
            </RNText>
          </RNView>
        </RNView>
        {
          props.children && props.children.map(
            makeRenderCategory({ level: level + 1, onPress, onLongPress }),
          )
        }
      </RNView>
    )
  },
  CategoriesView = ({ state, dispatch }) => {
    const { computed } = state

    if (computed === null) {
      return <RNNoChildView/>
    }

    const { overviewTotalUsageMode } = computed

    let totalUsageStr
    if (overviewTotalUsageMode === 'number') {
      const
        fact = toMoney(computed.currentPeriodTotal),
        plan = toMoney(computed.currentPeriodPlan);

      totalUsageStr = `${fact} / ${plan}`;
    } else {
      totalUsageStr = `${is(Number, computed.totalUsage) ? computed.totalUsage : '-'} %`;
    }

    const
      onCategoryPress =
        (categoryId) => dispatch(actionCreators.overviewCategoryPressedAC(categoryId)),
      onCategoryLongPress =
        (categoryId) => dispatch(actionCreators.overviewCategoryLongPressAC(categoryId))

    return (
      <RNView
        style={styles.expenseOrIncomeCategoryListContainer}
      >
        <RNView>
          <RNView style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {
              computed.type === 'admin' && (
                <RNText
                  style={{ textAlign: 'center' }}
                  onPress={
                    () => dispatch(actionCreators.overviewAdminCategoriesUserNamePressedAC())
                  }
                >
                  {computed.adminCategoriesUserName}
                </RNText>
              )
            }
            <RNText
              onPress={() => dispatch(actionCreators.overviewTotalUsageStrPressAC())}
              style={{ textAlign: 'center' }}
            >
              {totalUsageStr}
            </RNText>
          </RNView>
          <ListView
            data={computed.categoriesData}
            renderRow={makeRenderCategory({
              level: 1,
              onPress: onCategoryPress,
              onLongPress: onCategoryLongPress,
            })}
          />
          {
            <RNView>
              <RNText
                style={{ textAlign: 'center' }}
                onPress={() => dispatch(overviewAddCategoryBPAC())}
              >+ {strings.addCategory}</RNText>
            </RNView>
          }
        </RNView>

        <RNView style={styles.secureModeBtnContainer}>
          <ToggleIcon
            onPress={() => dispatch(actionCreators.overviewCategoriesViewModeBPAC())}
            active={state.showNotPlannedCategories}
            icon={'visibility'}
          />
        </RNView>
      </RNView>
    );
  }
/* CATEGORIES */


/* STORAGES*/

const
  makeRenderBalance = ({ onPress, onLongPress, fontSize, italic } = {}) => {
    type Props = {|
      balance: Balance,
      limitBalance?: Balance,
      textStyle?: Object,
      selectedCurrencyCode: CurrencyCode,
    |}

    return ({ balance, limitBalance = {}, textStyle, selectedCurrencyCode }: Props) => {
      if (!balance) return <RNNoChildView/>

      return keys(filterObj((x) => x !== 0)(balance))
        .map(currencyCode => {
          const
            isSelected = selectedCurrencyCode === currencyCode,
            toString = isSelected ? toMoneyFloat : toMoney,
            limit = limitBalance[currencyCode],
            value = balance[currencyCode],
            canBeSpent = limit ? limit + value : value,
            p1 = (limit && !isSelected) ? `${toMoneyLimited(value / 100)}/` : '',
            valueStr = `${p1}${toString(canBeSpent / 100)}`

          return (
            <RNView
              key={currencyCode}
              style={[
                styles.balanceCurrencyContainer,
                isSelected && { borderColor: 'orange' },
              ]}
            >
              <RNText
                style={[
                  styles.balanceText,
                  textStyle,
                  italic && { fontStyle: 'italic' },
                  value < 0 && { color: red },
                  fontSize && { fontSize },
                ]}
                onPress={onPress && (() => onPress(currencyCode))}
                onLongPress={onLongPress && (() => onLongPress(currencyCode))}
                numberOfLines={1}
                ellipsizeMode="tail"
              >{valueStr} {currencyCode}</RNText>
            </RNView>
          )
        })
    }
  },
  renderStorage = ({
    onStorageCurrencyBalancePressed,
    onStorageCurrencyBalanceLongPressed,
    dispatch,
    storages,
  }) => {
    return (props) => {
      const
        {
          balance,
          title,
          id,
          selectedCurrencyCode,
          type,
          totalBalance,
          collapsed,
          uid,
          debtUntil,
        } = props,
        isSelected = selectedCurrencyCode === undefinedCurrencyCode

      return (
        <RNView
          key={title}
          style={[
            styles.storageContainer,
            isSelected && styles.storageContainerSelected,
          ]}
        >
          <RNView style={{ flexDirection: 'row' }}>
            <RNText
              style={[
                styles.storageTitle,
                type === 'label' && styles.storageTitleLabel,
                type === 'debt' && styles.storageDebtLabel,
              ]}
              numberOfLines={1}
              onPress={
                type !== 'label' ? () => onStorageCurrencyBalancePressed({
                  currencyCode: undefinedCurrencyCode,
                  storageId: id,
                }) : null
              }
              onLongPress={
                type !== 'label' ? () => onStorageCurrencyBalanceLongPressed({
                  currencyCode: undefinedCurrencyCode,
                  storageId: id,
                }) : null
              }
            >
              {`${title}${debtUntil && debtUntil !== date0 ? ` ${debtUntilPeriodStr(debtUntil)}` : ''}`}
            </RNText>
            {
              type === 'label' && (
                <ToggleIcon
                  icon="keyboard-arrow-down"
                  onPress={() => dispatch(actionCreators.overviewCollapseUserStoragesPressAC(uid))}
                  active={!collapsed}
                />
              )
            }
          </RNView>
          {
            type === 'label' && collapsed && makeRenderBalance()({
              balance: totalBalance,
              selectedCurrencyCode: undefinedCurrencyCode,
            })
          }
          <RNView>
            {makeRenderBalance({
              italic: type === 'debt',
              fontSize: type === 'debt' ? 10 : 11,
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
              limitBalance: type === 'credit' ? storages[id].limitBalance : {},
              selectedCurrencyCode,
            })}
          </RNView>
        </RNView>
      )
    }
  },
  TopBarIcon = ({ name, onPress, type, color }: {
    name: string,
    onPress?: () => any,
    type?: string,
    color?: string
  }) => {
    return (
      <RNView style={{ flex: 1, height: styleUtils.topBarHeight }}>
        <Icon
          size={styleUtils.topBarHeight}
          name={name}
          onPress={onPress}
          type={type}
          color={color}
        />
      </RNView>
    )
  },
  Storages = (props) => {
    const
      {
        state: {
          isSecureMode,
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
      onAddStorageBP = () => props.dispatch(overviewAddStorageBPAC())

    return (
      <RNView
        style={styles.storagesColumn}
      >
        <RNView style={[styles.flexDirectionColumn, { flex: isSecureMode ? 95 : 80 }]}>
          {
            <RNView>
              <RNText
                style={{ textAlign: 'center', margin: 5 }}
                onPress={onAddStorageBP}
              >+ {strings.addStorage}</RNText>
            </RNView>
          }
          <ListView
            data={data}
            renderRow={renderStorage(renderStorageProps)}
          />
        </RNView>
        <RNView style={[styles.flexDirectionColumn]}>
          {!isSecureMode && <RNText style={styles.fontSize16}>=</RNText>}
          {!isSecureMode && makeRenderBalance()({
            balance: totalRemains,
            selectedCurrencyCode: undefinedCurrencyCode,
          })}
          {!isSecureMode && <RNText style={styles.fontSize16}>=</RNText>}
          {
            !isSecureMode && (
              <RNText
                style={styles.fontSize14}
                onPress={() => dispatch(actionCreators.overviewTotalBalanceCurrencyPressedAC())}
              >
                {totalRemainsOneCurrency}
              </RNText>
            )
          }
          <RNView style={styles.secureModeBtnContainer}>
            <ToggleIcon
              onPress={() => dispatch(actionCreators.overviewSecureModeBPAC())}
              active={isSecureMode}
              icon={'user-secret'}
              type="font-awesome"
            />
          </RNView>
        </RNView>
      </RNView>
    )
  }
/* STORAGES */

type Computed = {
  showAddTransactionBtn: bool,
  showToLendButtons: bool,
}

type MSTPR = {|
  state: OverviewScreenState,
  editTransactionDialogs: EditTransactionDialogsState,
  computed: Computed,
|}

const
  selectedIncomeBorderColor = 'lightgreen',
  styles = rnCreateStylesheet({
    content: {
      marginTop: 20,
      flexDirection: 'column',
      flex: 1,
    },
    balanceCurrencyContainer: {
      borderWidth: 1,
      borderColor: 'white',
    },
    categoryContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'white',
    },
    expenseOrIncomeCategoryListContainer: {
      flex: 60,
      flexDirection: 'column',
      borderLeftWidth: 1,
      borderLeftColor: '#fbfbfb',
      paddingLeft: 1,
      paddingRight: 1,
    },
    categoryText: {
      paddingTop: 5,
      width: '100%',
      flex: 1,
      flexDirection: 'row',
    },
    categoryTextSecondLevel: {
      paddingLeft: 4,
    },
    categoryTitleContainer: { flexDirection: 'column' },
    categoryValueContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    balanceText: {
      fontSize: 14,
      paddingLeft: 2,
    },
    storageContainer: { paddingBottom: 5, width: '100%', borderWidth: 1, borderColor: 'white' },
    storageTitle: { fontSize: 14 },
    storageTitleLabel: { fontWeight: 'bold', paddingLeft: 3 },
    storageDebtLabel: { fontStyle: 'italic', fontSize: 11 },
    fontSize14: { fontSize: 14 },
    fontSize16: { fontSize: 16 },
    fontSize17: { fontSize: 17 },
    fontSize12: { fontSize: 12 },
    storagesColumn: {
      flex: 40,
      flexDirection: 'column',
      paddingLeft: 1,
      paddingRight: 1,
    },
    addTransactionDialogContainer: {
      width: 330,
      height: 250,
      backgroundColor: '#f3f3f3',
      position: 'absolute',
      flex: 1,
      flexDirection: 'column',
      top: 10,
      left: 20,
      padding: 10,
      paddingRight: 5,
      borderRadius: 20,
    },
    flex1: { flex: 1 },
    flexDirectionColumn: { flexDirection: 'column' },
    secureModeBtnContainer: {
      position: 'absolute',
      width: 30,
      height: 30,
      right: 3,
      bottom: 3,
    },
    topBarContainer: {
      height: styleUtils.topBarHeight,
      width: '100%',
      flexDirection: 'row',
    },
  }),
  renderTopBar = (props) => {
    return (
      <RNView style={styles.topBarContainer}>
        <TopBarIcon
          name="settings"
          onPress={() => props.dispatch(actionCreators.overviewSettingsBPAC())}
        />
        <TopBarIcon
          name="exchange"
          type="font-awesome"
          color={props.state.screen.isTransferMode ? 'yellow' : 'black'}
          onPress={() => props.dispatch(actionCreators.overviewTransferBP())}
        />
        <TopBarIcon
          name={
            props.state.screen.categoriesScreenPart.showExpenseMode ?
              'trending-up' : 'trending-down'
          }
          onPress={() => props.dispatch(actionCreators.overviewIncomeExpenseBP())}
        />
        <TopBarIcon
          name="target"
          type="material-community"
          onPress={() => props.dispatch(actionCreators.overviewPlanBPAC())}
        />
        <TopBarIcon
          name="chart-line"
          type="material-community"
          onPress={() => props.dispatch(actionCreators.overviewAnalyticsBPAC())}
        />
      </RNView>
    )
  }

class OverviewScreenView extends React.PureComponent<{|
  state: OverviewScreenState,
  computed: Computed,
  editTransactionDialogs: EditTransactionDialogsState,
  dispatch: OverviewModuleDispatch,
|}> {
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(initFirstScreenMountedAC())
    }, 100)
  }

  render() {
    const {
      computed: { showAddTransactionBtn, showToLendButtons },
      dispatch,
    } = this.props

    return (
      <MyScreen routeName="Overview">
        <RNView style={styles.content}>
          {renderTopBar(this.props)}
          <RNView style={{ flex: 1, flexDirection: 'row' }}>
            <Storages
              state={this.props.state.screen.storagesScreenPart}
              dispatch={this.props.dispatch}
            />
            <CategoriesView
              state={this.props.state.screen.categoriesScreenPart}
              dispatch={this.props.dispatch}
            />
          </RNView>
        </RNView>
        {
          showAddTransactionBtn && (
            <FloatingButtonAdd
              onPress={() => dispatch(actionCreators.overviewAddTransactionBPAC())}
            />
          )
        }
        {
          showToLendButtons && <FloatingButton
            name="basket-unfill"
            type="material-community"
            onPress={() => dispatch(actionCreators.overviewToLendMoneyBPAC())}
          />
        }
        {
          showToLendButtons && <FloatingButton
            name="basket-fill"
            type="material-community"
            offset={1}
            color="#1565C0"
            onPress={() => dispatch(actionCreators.overviewToBorrowMoneyBPAC())}
          />
        }
        <StoragesActionsDialog
          dispatch={this.props.dispatch}
          state={this.props.state.storagesActionsDialog}
        />
        <CategoriesActionsDialog
          dispatch={this.props.dispatch}
          state={this.props.state.categoriesActionsDialog}
        />
        <ToLendMoneyDialog
          dispatch={this.props.dispatch}
          state={this.props.state.toLendMoneyDialog}
        />
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
  mem = memoMaxOneArgs4((overviewScreen,
    editTransactionDialogs,
    showAddTransactionBtn,
    showToLendButtons) => ({
    state: overviewScreen,
    editTransactionDialogs,
    computed: {
      showAddTransactionBtn,
      showToLendButtons,
    },
  })),
  mapStateToProps = (as: OverviewModuleAppState): MSTPR => {
    /* TODO 2 MFG-53 no logic here */
    const
      {
        overviewScreen,
        editTransactionDialogs,
      } = as,
      {
        expense: { opened: expenseOpened },
        income: { opened: incomeOpened },
        transfer: { opened: transferOpened },
        exchange: { opened: exchangeOpened },
      } = editTransactionDialogs,
      {
        screen: {
          isTransferMode,
          categoriesScreenPart: { selectedCategoryId },
          storagesScreenPart: { selectedStorageCurrency },
        },
        toLendMoneyDialog: { opened: toLendMoneyOpened },
      } = overviewScreen,
      modalOpened = expenseOpened
        || incomeOpened
        || transferOpened
        || exchangeOpened
        || toLendMoneyOpened

    return mem(
      overviewScreen,
      editTransactionDialogs,
      !!(
        !modalOpened && isDefined(selectedCategoryId) && selectedStorageCurrency
      ),
      !!(!modalOpened && isTransferMode && selectedStorageCurrency),
    )
  },
  /* TODO 2 $FlowFixMe */
  OverviewScreen = deprecatedConnect(mapStateToProps)(OverviewScreenView)

export {
  OverviewScreen,
}
