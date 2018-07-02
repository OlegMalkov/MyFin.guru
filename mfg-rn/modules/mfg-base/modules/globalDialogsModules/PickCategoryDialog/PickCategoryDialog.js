/* @flow */

import React from 'react'
import { baseConnect } from '../../../baseConnect'
import { PickerDialog } from '../../../ui/PickerDialog'
import { __undef } from '../../../const'
import {
  onPickCategoryCancelAC, onPickCategoryDoneAC,
} from './PickCategoryDialogAC'
import { I, keys, pipe } from '../../../utils/utils'
import { strings } from '../../../localization'
import { pickCategoryDialogModuleId } from './pickCategoryDialogModuleId'

import type { BaseVP } from '../../../base.flow'
import type { Values } from '../../../ui/PickerDialog'
import type { CategoryId } from '../../../const'
import type { PickCategoryDialogState } from './pickCategoryDialogReducer'

const View = (props: BaseVP<PickCategoryDialogState>) => {
    const
      {
        state: {
          opened, callerId, includeNoParent, title, categoryType,
          deps: { categories },
        },
        dispatch,
      } = props,
      values: Values<CategoryId> = pipe(
        o => o.filter(categoryId => categories[categoryId].type === categoryType),
        arr => arr.map(
          categoryId => ({ label: categories[categoryId].title, value: categoryId })
        ),
        includeNoParent ? arr => [{ label: strings.noParent, value: __undef }, ...arr] : I,
      )(keys(categories))

    return (
      <PickerDialog
        title={title}
        opened={opened}
        onDone={categoryId => dispatch(onPickCategoryDoneAC({ categoryId, callerId }))}
        onCancel={() => dispatch(onPickCategoryCancelAC(callerId))}
        values={values}
      />
    )
  },

  PickCategoryDialog = baseConnect(
    (as): PickCategoryDialogState => as[pickCategoryDialogModuleId],
    View
  )

export {
  PickCategoryDialog,
}
