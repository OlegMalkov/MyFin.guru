/* @flow */

export const FORCE_RECOMPUTE: '@@FORCE_RECOMPUTE' = '@@FORCE_RECOMPUTE'

type ForceRecomputeAction = {| type: typeof FORCE_RECOMPUTE |}

export type
  AnyUtilsAction = ForceRecomputeAction

export const
  forceRecomputeAC = (): ForceRecomputeAction => ({ type: FORCE_RECOMPUTE })
