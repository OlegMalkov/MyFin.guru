/* @flow */

import React from 'react'

import { ListView } from 'mfg-base/ui/ListView'
import { MyScreen } from 'mfg-base/ui/MyScreen'
import { RNText, RNNoChildView, RNScrollView, RNView } from 'mfg-base/ui/RNUI'
import { month } from 'mfg-base/entities/account/live/periodKinds'
import * as format from 'mfg-base/utils/format'
import { BackButton } from 'mfg-base/ui/BackButton'
import {
  PickCurrencyDialog,
} from 'mfg-base/modules/globalDialogsModules/PickCurrencyDialog/PickCurrencyDialog'
import { PickUserDialog } from 'mfg-base/modules/globalDialogsModules/PickUserDialog/PickUserDialog'
import { PickDayDialog } from 'mfg-base/modules/globalDialogsModules/PickDayDialog/PickDayDialog'
import { ToggleIcon } from 'mfg-base/ui/ToggleIcon'
import {
  EditPlannedTransactionActionsDialog,
} from './PlanCategoryDialog/EditPlannedTransactionActionsDialog/EditPlannedTransactionActionsDialog' // eslint-disable-line max-len
import type { PlanModuleVP } from './plan.flow' // eslint-disable-line max-len
import {
  planScreenCategoryFactPressAC,
  planScreenCategoryPlanPressAC,
  planScreenCategoryTitlePressAC,
  planScreenNextPeriodBtnPressAC,
  planScreenCurrencyCodePressedAC,
  planScreenExpenseBPAC,
  planScreenIncomeBPAC, planScreenPeriodPressedAC,
  planScreenPreviousPeriodBtnPressAC,
  planScreenUserNamePressedAC, planScreenBackButtonPressedAC,
} from './planScreenAC'
import { PlanCategoryDialog } from './PlanCategoryDialog/PlanCategoryDialog'
import {
  EditPlannedTransactionDialog,
}
  from './PlanCategoryDialog/EditPlannedTransactionDialog/EditPlannedTransactionDialog'
import { planScreenModuleId } from './planScreenModuleId'
import { planModuleConnect } from './planModuleUtils'
import { ShowTransactionsDialog } from './ShowTransactionsDialog/ShowTransactionsDialog'
import { planScreenStyles } from './styles'
import type {
  CategoryListItem, PlanFactDiffFactoryProps,
  PlanScreenState,
} from './planScreenReducer'
import { black, grayColor } from 'mfg-base/variables'
import { Orientations } from 'mfg-base/modules/orientationModule/Orientations'
import { topBarHeight } from 'mfg-base/ui/styleUtils'

type GetStylesFn = (conf: { level: number }) => Array<Object>

type MakePlanFactDiffFactoryProps = {|
  getTopTitleStyles: GetStylesFn,
  getBottomTitleStyles: GetStylesFn,
  negativeRed: bool
|}

const
  { toMoneyLimited } = format,
  planFactDiffFactory = ({
    getTopTitleStyles,
    getBottomTitleStyles,
    negativeRed,
  }: MakePlanFactDiffFactoryProps) =>
    (props: PlanFactDiffFactoryProps) => {
      const
        { level, plan, fact, diff, onPlanPress, onFactPress, bold, onlyPlan } = props,
        topStyle = [planScreenStyles.planFactTop],
        bottomStyle = [planScreenStyles.planFactBottom],
        topTitleStyle = [
          planScreenStyles.planFactTopTitle,
          ...getTopTitleStyles({ level }),
        ],
        d = negativeRed ? diff : -diff,
        bottomTitleStyle = [
          planScreenStyles.planFactBottomTitle,
          d < 0 && planScreenStyles.planFactBottomTitleWarning,
          ...getBottomTitleStyles({ level }),
        ]

      return (
        <RNView style={[planScreenStyles.planFactDiffContainer]}>
          <RNView style={topStyle}>
            <RNText
              style={[topTitleStyle, bold && planScreenStyles.bold]}
              numberOfLines={1}
              onPress={onPlanPress}
              ellipsizeMode="tail"
            >
              {toMoneyLimited(plan)}
            </RNText>
            {
              !onlyPlan && <RNText
                style={[topTitleStyle, bold && planScreenStyles.bold]}
                numberOfLines={1}
                onPress={onFactPress}
                ellipsizeMode="tail"
              >
                {toMoneyLimited(fact)}
              </RNText>
            }
          </RNView>
          {
            !onlyPlan && <RNView style={bottomStyle}>
              <RNText
                style={[bottomTitleStyle, bold && planScreenStyles.bold]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {toMoneyLimited(diff)}
              </RNText>
            </RNView>
          }
        </RNView>
      )
    },
  PlanFactDiffF = (negativeRed) => planFactDiffFactory({
    getTopTitleStyles: ({ level }) =>
      [level === 1 ? planScreenStyles.planFactTopTitleL1 : planScreenStyles.planFactTopTitleL2],
    getBottomTitleStyles: ({ level }) =>
      [
        level === 1 ?
          planScreenStyles.planFactBottomTitleL1 : planScreenStyles.planFactBottomTitleL2,
      ],
    negativeRed,
  }),
  PlanFactDiffExpense = PlanFactDiffF(false),
  PlanFactDiffIncome = PlanFactDiffF(true)

type ExpenseTitleProps = {
  title: string,
  width?: number,
  bold: bool,
  onPress: () => any,
}

const
  ExpenseTitle = ({ title, width, bold, onPress }: ExpenseTitleProps) => (
    <RNView style={[planScreenStyles.categoryRowTitleContainer, { width }]}>
      <RNText
        style={[
          planScreenStyles.categoryRowTitle,
          bold && planScreenStyles.bold,
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
        onPress={onPress}
      >
        {title}
      </RNText>
    </RNView>
  )

type IncomeTitleProps = {
  title: string,
  level: number,
  targetStorageTitle?: string,
  width?: number,
  bold: bool,
  onPress: () => any
}

const
  IncomeTitle = ({ title, level, targetStorageTitle, width, bold, onPress }: IncomeTitleProps) => (
    <RNView style={[planScreenStyles.categoryRowTitleContainer, { width }]}>
      <RNText
        style={[
          planScreenStyles.categoryRowTitle,
          bold && planScreenStyles.bold,
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
        onPress={onPress}
      >
        {title}
      </RNText>
      {targetStorageTitle && <RNText
        style={[
          planScreenStyles.categoryRowTitle,
          level === 1 ? planScreenStyles.categoryRowTitleL1 : planScreenStyles.categoryRowTitleL2,
        ]} numberOfLines={1}
      >
        {targetStorageTitle}
      </RNText>}
    </RNView>
  ),
  renderCategoryRowFactory = ({ Title, PlanFactDiff }) => {
    const renderCategoryRow = ({
      level,
      onPlanPress,
      onFactPress,
      renderTitle,
      titleWidth,
      dispatch,
      onlyPlan,
    }) =>
      (categoryData) => {
        const
          { id, children, value, collapsed, highlight }: CategoryListItem = categoryData,
          boxStyle = {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 30,
            borderLeftWidth: undefined,
            borderLeftColor: undefined,
            backgroundColor: highlight ? grayColor : undefined,
          }

        if (!renderTitle) {
          boxStyle.borderLeftWidth = 1
          boxStyle.borderLeftColor = black
        }
        return (
          <RNView
            key={id}
            style={[
              planScreenStyles.categoryRowContainer,
              level === 1 ?
                planScreenStyles.categoryRowContainerL1 : planScreenStyles.categoryRowContainerL2,
            ]}
          >
            <RNView
              style={boxStyle}
            >
              {
                renderTitle && (
                  <RNView style={{ flexDirection: 'row', width: titleWidth }}>
                    <Title
                      bold={!!children}
                      level={level}
                      {...categoryData}
                      onPress={() => dispatch(planScreenCategoryTitlePressAC(id))}
                    />
                    {collapsed && <ToggleIcon
                      icon="expand-more"
                      active
                      onPress={() => dispatch(planScreenCategoryTitlePressAC(id))}
                    />}
                  </RNView>
                )
              }
              <PlanFactDiff
                {...value}
                level={level}
                bold={!!children}
                onPlanPress={() => {
                  if (!children) {
                    onPlanPress(id)
                  }
                }}
                onFactPress={() => onFactPress(id)}
                onlyPlan={onlyPlan}
              />
            </RNView>
            {
              children && (
                <RNView>
                  {children.map(renderCategoryRow({
                    level: level + 1,
                    onPlanPress,
                    onFactPress,
                    renderTitle,
                    titleWidth,
                    dispatch,
                    onlyPlan,
                  }))}
                </RNView>
              )
            }
          </RNView>
        )
      }

    return renderCategoryRow
  },

  categoriesListFactory =
    ({ renderRow }) =>
      ({ data, isActive, dispatch, renderTitle, titleWidth, index, onlyPlan }) => {
        if (!isActive) {
          return <RNNoChildView/>
        }
        return (
          <RNView style={[{ flex: isActive ? 5000 : 1 }]}>
            <ListView
              data={data}
              renderRow={renderRow({
                level: 1,
                onPlanPress: (categoryId) => dispatch(planScreenCategoryPlanPressAC(categoryId,
                  index)),
                onFactPress: (categoryId) => dispatch(planScreenCategoryFactPressAC(categoryId,
                  index)),
                renderTitle,
                titleWidth,
                dispatch,
                onlyPlan,
              })}
            />
          </RNView>
        )
      },

  ExpenseCategoriesList = categoriesListFactory({
    renderRow: renderCategoryRowFactory({ Title: ExpenseTitle, PlanFactDiff: PlanFactDiffExpense }),
  }),
  IncomeCategoriesList = categoriesListFactory({
    renderRow: renderCategoryRowFactory({ Title: IncomeTitle, PlanFactDiff: PlanFactDiffIncome }),
  }),

  BalanceSummaryRowTitle = (props) => (
    <RNView style={planScreenStyles.balanceSummaryRowTitleContainer}>
      {props.icon && <ToggleIcon size={30} {...props} />}
      {props.icon && <RNText style={{ fontSize: 20, fontWeight: 'bold' }}>=</RNText>}
    </RNView>
  ),
  makeBalancePlanFactDiff = (negativeRed) => planFactDiffFactory({
    getTopTitleStyles: () => [planScreenStyles.balancePlanFactTopTitle],
    getBottomTitleStyles: () => [planScreenStyles.balancePlanFactBottomTitle],
    negativeRed,
  }),
  makeBalanceSummaryRow = (negativeRed) => {
    const BalancePlanFactDiff = makeBalancePlanFactDiff(negativeRed)
    return ({ data, renderTitle, onIconPress, onlyPlan, ...rest }) => {
      return (
        <RNView style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          {renderTitle && <BalanceSummaryRowTitle {...rest} onPress={onIconPress}/>}
          <BalancePlanFactDiff {...data} onlyPlan={onlyPlan}/>
        </RNView>
      )
    }
  },
  IncomeBalanceSummaryRow = makeBalanceSummaryRow(true),
  ExpenseBalanceSummaryRow = makeBalanceSummaryRow(false),
  diffToString = (diff) => `${diff > 0 ? '+' : ''}${toMoneyLimited(diff)}`,
  TotalPlanFactDiff = ({ planTotal, planDiff, factTotal, factDiff, onlyPlan }) => (
    <RNView style={planScreenStyles.planFactDiffContainer}>
      <RNView style={planScreenStyles.totalBalanceTop}>
        <RNText
          style={planScreenStyles.totalBalanceTitleTop}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {diffToString(planDiff)}
        </RNText>
        {
          !onlyPlan && <RNText
            style={planScreenStyles.totalBalanceTitleTop}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {diffToString(factDiff)}
          </RNText>
        }
      </RNView>
      <RNView style={planScreenStyles.totalBalanceBottom}>
        <RNText
          style={planScreenStyles.totalBalanceTitleBottom}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {toMoneyLimited(planTotal)}
        </RNText>
        {
          !onlyPlan && <RNText
            style={planScreenStyles.totalBalanceTitleBottom}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {toMoneyLimited(factTotal)}
          </RNText>
        }
      </RNView>
    </RNView>
  ),
  TotalSummaryRow = ({ data, onlyPlan }) => (
    <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <BalanceSummaryRowTitle/>
      <TotalPlanFactDiff {...data} onlyPlan={onlyPlan}/>
    </RNView>
  ),
  BalanceContainer = ({
    renderTitle,
    expenseSummary,
    totalSummary,
    incomeSummary,
    state,
    onlyPlan,
    dispatch,
  }) => {
    return (
      <RNView
        style={[
          planScreenStyles.balanceContainer,
          !renderTitle && { borderLeftWidth: 1, borderLeftColor: black },
        ]}
      >
        <RNView style={planScreenStyles.expenseSummary}>
          <IncomeBalanceSummaryRow
            renderTitle={renderTitle}
            {...expenseSummary}
            icon="trending-down"
            active={state.mode === 'expense-only'}
            onIconPress={() => dispatch(planScreenExpenseBPAC())}
            onlyPlan={onlyPlan}
          />
        </RNView>
        <RNNoChildView style={planScreenStyles.horizontalLine}/>
        <TotalSummaryRow renderTitle={renderTitle} {...totalSummary} onlyPlan={onlyPlan}/>
        <RNNoChildView style={planScreenStyles.horizontalLine}/>
        <RNView style={planScreenStyles.incomeSummary}>
          <ExpenseBalanceSummaryRow
            renderTitle={renderTitle}
            {...incomeSummary}
            icon="trending-up"
            active={state.mode === 'income-only'}
            onIconPress={() => dispatch(planScreenIncomeBPAC())}
            onlyPlan={onlyPlan}
          />
        </RNView>
      </RNView>
    )
  },


  columnWidth = 105,
  getTitleColWidth = (columns, windowWidth) => {
    return windowWidth - (columns * columnWidth)
  },

  TopBar = ({
    dispatch,
    currencyCode,
    userName,
    periodStrings,
    periodType,
    windowWidth,
  }) => {
    const
      columns = periodStrings.length,
      leftColWidth = getTitleColWidth(columns, windowWidth),
      columnsWidth = columns * columnWidth

    return (
      <RNView style={planScreenStyles.topBarContainer}>
        <RNView
          style={{
            width: leftColWidth,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <BackButton onPress={() => dispatch(planScreenBackButtonPressedAC())}/>
          <RNText
            onPress={() => dispatch(planScreenUserNamePressedAC())}
            style={planScreenStyles.userName}
          >
            {userName}
          </RNText>
          <RNText
            style={planScreenStyles.currencySelectorText}
            onPress={() => dispatch(planScreenCurrencyCodePressedAC())}
          >{currencyCode}</RNText>
        </RNView>
        <RNView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: columnsWidth,
          }}
        >
          <RNView
            style={{ flexDirection: 'row', width: columnsWidth }}
          >
            {
              periodStrings.map((period, index) => {
                const
                  shouldRenderBorderLeft = index !== 0,
                  borderLeftStyle = shouldRenderBorderLeft ? {
                    borderLeftWidth: 1,
                    borderLeftColor: black,
                  } : {}
                return (
                  <RNView
                    key={index}
                    style={{ width: columnWidth, ...borderLeftStyle }}
                  >
                    <RNText
                      style={planScreenStyles.periodSelectorText}
                      onPress={() => dispatch(planScreenPeriodPressedAC())}
                    >
                      {periodType === month ? `${format.pad2(period.month)}.` : ''}{period.year}
                    </RNText>
                  </RNView>
                )
              })
            }
          </RNView>
          <RNView style={{ position: 'absolute' }}>
            <ToggleIcon
              icon="keyboard-arrow-left"
              active
              onPress={() => dispatch(planScreenPreviousPeriodBtnPressAC())}
            />
          </RNView>
          <RNView style={{ position: 'absolute', right: 0 }}>
            <ToggleIcon
              icon="keyboard-arrow-right"
              active
              onPress={() => dispatch(planScreenNextPeriodBtnPressAC())}
            />
          </RNView>
        </RNView>
      </RNView>
    )
  }

const
  summaryHeight = 85,
  PlanScreenView = (props: PlanModuleVP<PlanScreenState>) => {
    const
      { windowDimensions: { width: windowWidth, height: windowHeight } } = props.state.deps,
      orientationHeightDiff =
        props.state.deps.orientationModule.orientation === Orientations.PORTRAIT ? 20 : 0,
      scrollHeight = windowHeight - summaryHeight - orientationHeightDiff - topBarHeight,
      scrollWidth = windowWidth,
      { renderProps } = props.state.computed,
      expenseIsActive = renderProps[0] ? renderProps[0].expenseCategoriesListProps.isActive : false,
      summaryStyle = expenseIsActive ? { bottom: 0 } : { top: topBarHeight },
      containerHeight = windowHeight - 20 - 20

    return (
      <MyScreen routeName="Plan">
        <RNView
          style={[
            planScreenStyles.container,
            { height: containerHeight },
            props.state.deps.orientationModule.orientation === Orientations.PORTRAIT
            && planScreenStyles.containerPortrait,
          ]}
        >
          <TopBar
            dispatch={props.dispatch}
            currencyCode={props.state.currencyCode}
            userName={props.state.computed.userName}
            periodStrings={props.state.computed.periodStrings}
            periodType={props.state.periodType}
            windowWidth={windowWidth}
          />
          <RNView
            style={{
              height: scrollHeight,
              width: scrollWidth,
              backgroundColor: 'white',
              marginTop: expenseIsActive ? 0 : summaryHeight,
            }}
          >
            <RNScrollView>
              <RNView style={{ flexDirection: 'row' }}>
                {renderProps.map(({
                  expenseCategoriesListProps,
                  incomeCategoriesListProps,
                  onlyPlan,
                }, index) => {
                  const
                    { state: { computed: { columns } } } = props,
                    renderTitle = index === 0,
                    titleWidth = getTitleColWidth(columns, windowWidth),
                    width = renderTitle ? titleWidth + columnWidth : columnWidth

                  return (
                    <RNView key={index} style={{ flexDirection: 'column', width }}>
                      <ExpenseCategoriesList
                        renderTitle={renderTitle}
                        titleWidth={titleWidth}
                        data={expenseCategoriesListProps.data}
                        isActive={expenseCategoriesListProps.isActive}
                        dispatch={props.dispatch}
                        index={index}
                        onlyPlan={onlyPlan}
                      />
                      <IncomeCategoriesList
                        renderTitle={renderTitle}
                        titleWidth={titleWidth}
                        data={incomeCategoriesListProps.data}
                        isActive={incomeCategoriesListProps.isActive}
                        dispatch={props.dispatch}
                        index={index}
                        onlyPlan={onlyPlan}
                      />
                    </RNView>
                  )
                })}
              </RNView>
            </RNScrollView>
          </RNView>
          <RNView
            style={[{
              flexDirection: 'row',
              height: summaryHeight,
              position: 'absolute',
              backgroundColor: 'white',
            }, summaryStyle,
            ]}
          >
            {
              renderProps.map(({
                expenseSummary,
                incomeSummary,
                totalSummary,
                onlyPlan,
              }, index) => {
                const
                  { state: { computed: { columns } } } = props,
                  renderTitle = index === 0,
                  titleWidth = getTitleColWidth(columns, windowWidth),
                  width = renderTitle ? titleWidth + columnWidth : columnWidth

                return (
                  <RNView
                    key={index}
                    style={{ flexDirection: 'column', width, height: summaryHeight }}
                  >
                    <BalanceContainer
                      renderTitle={renderTitle}
                      expenseSummary={expenseSummary}
                      totalSummary={totalSummary}
                      incomeSummary={incomeSummary}
                      state={props.state}
                      dispatch={props.dispatch}
                      onlyPlan={onlyPlan}
                    />
                  </RNView>
                )
              })
            }
          </RNView>
        </RNView>
        <PlanCategoryDialog state={props.state.deps.planCategoryDialog} dispatch={props.dispatch}/>
        <ShowTransactionsDialog
          state={props.state.deps.showTransactionsDialog}
          dispatch={props.dispatch}
        />
        <EditPlannedTransactionDialog
          state={props.state.deps.planCategoryDialog.deps.editPlannedTransactionDialog}
          dispatch={props.dispatch}
        />
        <EditPlannedTransactionActionsDialog
          state={
            props.state
              .deps.planCategoryDialog
              .deps.editPlannedTransactionActionsDialog
          }
          dispatch={props.dispatch}
        />
        <PickCurrencyDialog/>
        <PickUserDialog/>
        <PickDayDialog/>
      </MyScreen>
    )
  },
  PlanScreen = planModuleConnect((as): PlanScreenState => as[planScreenModuleId], PlanScreenView)

export {
  PlanScreen,
}

