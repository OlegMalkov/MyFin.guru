/* @flow */

import { overviewScreenModule } from './overviewScreenModule'
import {
  editCategoryScreenModule,
} from './submodules/editCategoryScreenModule/editCategoryScreenModule'
import {
  editStorageScreenModule,
} from './submodules/editStorageScreenModule/editStorageScreenModule'
import { analyticsScreenModule } from './submodules/mfg-analytics/analyticsScreenModule'
import {
  showHiddenStoragesScreenModule,
} from './submodules/showHiddenStoragesScreenModule/showHiddenStoragesScreenModule'

export const overviewModuleRegistry = [
  overviewScreenModule,
  editCategoryScreenModule,
  editStorageScreenModule,
  showHiddenStoragesScreenModule,
  analyticsScreenModule,
]
