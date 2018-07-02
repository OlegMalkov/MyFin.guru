/* @flow */

export const
  UTIL_GENERATE_GUID: 'UTIL_GENERATE_GUID' = 'UTIL_GENERATE_GUID',
  UTIL_GUID_GENERATED: 'UTIL_GUID_GENERATED' = 'UTIL_GUID_GENERATED'

type GenerateGuidAction = {| type: typeof UTIL_GENERATE_GUID, callerId: string |}

type GuidGeneratedProps = {|
  guid: string,
  callerId: string,
|}

type GuidGeneratedAction = {|
  type: typeof UTIL_GUID_GENERATED,
  ...GuidGeneratedProps,
|}

export type AnyUtilModuleAction =
  | GenerateGuidAction
  | GuidGeneratedAction

export const
  utilGenerateGuidAC = (callerId: string): GenerateGuidAction =>
    ({ type: UTIL_GENERATE_GUID, callerId }),
  utilGuidGeneratedAC = ({ guid, callerId }: GuidGeneratedProps): GuidGeneratedAction =>
    ({ type: UTIL_GUID_GENERATED, guid, callerId })
