/* @flow */

import type { MapKV } from '../../global.flow'

export type SortItem<ID> = { id: ID, title: string }
export type SortItems<ID> = MapKV<ID, SortItem<ID>>
