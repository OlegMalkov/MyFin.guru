/* @flow */
/* eslint-disable max-len */

import type { StorageId } from 'mfg-base/const'

export const
  SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED: 'SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED'
    = 'SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED'

type ShowHiddenStoragesScreenShowIconPressedAction = {|
  type: typeof SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED,
  storageId: StorageId,
|}

export type AnyShowHiddenStoragesScreenModuleAction =
  | ShowHiddenStoragesScreenShowIconPressedAction

export const
  showHiddenStoragesScreenShowIconPressedAC = (storageId: StorageId): ShowHiddenStoragesScreenShowIconPressedAction =>
    ({ type: SHOW_HIDDEN_STORAGES_SCREEN_SHOW_ICON_PRESSED, storageId })
