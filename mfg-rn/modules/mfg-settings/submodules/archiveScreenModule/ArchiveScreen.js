/* @flow */

import React from 'react'
import { MyButton } from 'mfg-base/ui/Button'
import { MyScreen } from 'mfg-base/ui/MyScreen'
import { RNView } from 'mfg-base/ui/RNUI'
import { RNText } from 'mfg-base/ui/RNUI'
import { strings } from 'mfg-base/localization'
import { settingsModuleConnect } from '../../settingsScreenUtils'
import {
  archiveScreenArchiveTransactionBPAC,
  archiveScreenRestartAppBPAC,
} from './archiveScreenAC';
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
import { archiveScreenStatus } from './archiveScreenReducer'
import { getArchiveBorderDate } from './getArchiveBorderDate'
import * as selectors from './selectors'
import { archiveScreenModuleId } from './archiveScreenModuleId'
import { dayPeriodStr } from 'mfg-base/utils/dateUtils'
import { MyDivider } from 'mfg-base/ui/Divider'

import type { SettingsModuleVP } from '../../settings.flow'
import type { MapKV } from 'mfg-base/global.flow'
import type { ArchiveScreenState, ArchiveScreenStatus } from './archiveScreenReducer';

const
  statusToMessage: MapKV<ArchiveScreenStatus, string> = {
    idle: '',
    inprogress: strings.archiveTransactionsInProgress,
    done: strings.archiveTransactionsDone,
    fail: strings.archiveTransactionsFail,
  },
  ArchiveScreenView = (props: SettingsModuleVP<ArchiveScreenState>) => {
    const
      { transactions, now } = props.state.deps,
      transactionsToArchiveLength =
        selectors.getTransactionIdsToArchive(transactions, now).length,
      isIdle = props.state.status === archiveScreenStatus.idle,
      isDoneOfFail = props.state.status === archiveScreenStatus.done
        || props.state.status === archiveScreenStatus.fail,
      ScreenType = isIdle ? ScreenWithBackButton : MyScreen

    return (
      /* $FlowFixMe TODO 5 MFG-64 */
      <ScreenType
        routeName="Archive"
        onBackButtonPress={() => {
          throw new Error('TODO 1.9')
        }}
      >
        {
          isIdle && <RNView>
            <RNText style={{ paddingLeft: 20, fontSize: 16 }}>
              Internet connection is required.
            </RNText>
            <MyDivider/>
            <RNText style={{ paddingLeft: 20, fontSize: 14 }}>
              {transactionsToArchiveLength} {strings.transactionsBefore}
              {dayPeriodStr(getArchiveBorderDate(now))} {strings.toArchive}
            </RNText>
            <MyDivider/>
            <MyButton
              iconRight
              icon={{ name: 'archive' }}
              title={strings.doArchive}
              onPress={() => props.dispatch(archiveScreenArchiveTransactionBPAC())}
            />
          </RNView>
        }
        {
          !isIdle && <RNView>
            <RNText style={{ textAlign: 'center', fontSize: 16 }}>
              {statusToMessage[props.state.status]}
            </RNText>
          </RNView>
        }
        {
          isDoneOfFail && <RNView>
            <MyButton
              title={strings.restartApp}
              onPress={() => props.dispatch(archiveScreenRestartAppBPAC())}
            />
          </RNView>
        }
      </ScreenType>
    )
  },

  ArchiveScreen = settingsModuleConnect(
    (as): ArchiveScreenState => as[archiveScreenModuleId],
    ArchiveScreenView,
  )

export {
  ArchiveScreen,
}
