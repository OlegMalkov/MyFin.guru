/* @flow */

import React from 'react'
import { RNEList, RNEListItem } from 'mfg-base/ui/RNUI'
import { baseConnect } from 'mfg-base/baseConnect'
import { ScreenWithBackButton } from 'mfg-base/ui/ScreenWithBackButton'
import { navigateAC } from 'mfg-base/modules/navModule/navAC'
import { mapObjIndexed, pipe, values } from 'mfg-base/utils/utils'
import type { SettingsModuleVP } from '../../settings.flow'
import { settingsModuleConnect } from '../../settingsScreenUtils'
import { usersScreenModuleId } from './usersScreenModuleId'

import type { UsersScreenState } from './usersScreenReducer'

const
  UsersScreenView = (props: SettingsModuleVP<UsersScreenState>) => {
    return (
      <ScreenWithBackButton
        routeName="Users"
        onBackButtonPress={() => {
          throw new Error('TODO 2')
        }}
      >
        <RNEList>
          {
            pipe(
              mapObjIndexed((user, uid) => {
                return (
                  <RNEListItem
                    key={uid}
                    title={user.name || 'no user name'}
                    rightIcon={{ name: 'edit' }}
                    onPress={() => props.dispatch(navigateAC({
                      routeName: 'EditUser',
                      params: {
                        uid,
                      },
                    }))}
                  />
                )
              }),
              values,
            )(props.state.deps.users)
          }

        </RNEList>
        {/* TODO 3 add user <FloatingButtonAdd
          onPress={() => props.dispatch(navigateAC({ routeName: 'AddUser' }))}
        />*/}
      </ScreenWithBackButton>
    )
  },
  UsersScreen = settingsModuleConnect(
    (as): UsersScreenState => as[usersScreenModuleId],
    UsersScreenView
  )

export {
  UsersScreen,
}
