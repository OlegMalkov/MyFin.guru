/* @flow */

import { rnCreateStylesheet } from 'mfg-base/rn/RN'
import { makeValueSelectorContainerStyle, topBarHeight } from 'mfg-base/ui/styleUtils'

export const planScreenStyles = rnCreateStylesheet({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  containerPortrait: {
    marginTop: 20,
  },
  balanceContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  categoryRowContainer: {
    width: '100%',
    paddingTop: 8,
  },
  categoryRowContainerL1: {
    width: '100%',
    paddingBottom: 3,
  },
  categoryRowContainerL2: {
    width: '100%',
  },
  categoryRowTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  categoryRowTitle: {
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  planFactDiffContainer: {
    width: 105,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planFactTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  planFactTopTitle: {
    flex: 1,
    textAlign: 'center',
  },
  planFactTopTitleL1: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  planFactTopTitleL2: {
    fontSize: 12,
  },

  planFactBottom: {
    width: '100%',
    marginTop: -3,
  },
  planFactBottomTitle: {
    width: '100%',
    textAlign: 'center',
    color: '#e5e5e5',
  },
  planFactBottomTitleWarning: {
    color: 'red',
  },
  totalBalanceTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalBalanceBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalBalanceTitleTop: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
  },
  totalBalanceTitleBottom: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  planFactBottomTitleL1: {
    fontSize: 10,
  },
  planFactBottomTitleL2: {
    fontSize: 10,
  },

  balancePlanFactTopTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  balancePlanFactBottomTitle: {
    fontSize: 10,
  },

  leftRightSeparator: {
    borderLeftWidth: 1,
    position: 'absolute',
    left: 235,
    top: -100,
    height: 1000,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'black',
  },
  expenseSummary: {
    height: 27,
    flexDirection: 'column',
  },
  totalSummary: {
    height: 31,
  },
  incomeSummary: {
    height: 27,
  },
  balanceSummaryRowTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarContainer: {
    height: topBarHeight,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencySelectorContainer: makeValueSelectorContainerStyle({ width: 30 }),
  currencySelectorText: {
    fontSize: 14,
  },

  periodSelectorText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Courier New',
  },
  userName: {
    fontSize: 14,
    textAlign: 'center',
  },
})
