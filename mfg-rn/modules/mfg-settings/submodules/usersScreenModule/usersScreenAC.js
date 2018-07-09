/* @flow */

export const
  A_N: 'A_N' = 'A_N'

type A = {| type: typeof A_N |}

export type AnyModuleNameModuleAction = A

export const
  aAC = (): A => ({ type: A_N })
