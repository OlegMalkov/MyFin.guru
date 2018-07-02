/* @flow */

export const
  INIT_ENCRYPTION_PASSWORD_PROVIDED: 'INIT_ENCRYPTION_PASSWORD_PROVIDED' =
    'INIT_ENCRYPTION_PASSWORD_PROVIDED',
  INIT_MIGRATION_REQUIRED: 'INIT_MIGRATION_REQUIRED' =
    'INIT_MIGRATION_REQUIRED',
  INIT_MIGRATION_NOT_REQUIRED: 'INIT_MIGRATION_NOT_REQUIRED' =
    'INIT_MIGRATION_NOT_REQUIRED',
  INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN: 'INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN' =
    'INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN',
  INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE: 'INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE' =
    'INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE',
  INIT_FIRST_SCREEN_MOUNTED: 'INIT_FIRST_SCREEN_MOUNTED' = 'INIT_FIRST_SCREEN_MOUNTED'


type EncryptionPasswordProvidedAction =
  {| type: typeof INIT_ENCRYPTION_PASSWORD_PROVIDED, encryptionPassword: string |}

type MigrationNotAllowedForNonAdminAction =
  {| type: typeof INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN |}

type MigrationRequiredAction = {| type: typeof INIT_MIGRATION_REQUIRED |}

type MigrationNotRequiredAction = {| type: typeof INIT_MIGRATION_NOT_REQUIRED |}

type AccountEncryptionCheckStepCompleteAction =
  {| type: typeof INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE |}

type FirstScreenMountedAction = {| type: typeof INIT_FIRST_SCREEN_MOUNTED |}

export type AnyInitModuleAction =
  | EncryptionPasswordProvidedAction
  | MigrationRequiredAction
  | MigrationNotRequiredAction
  | MigrationNotAllowedForNonAdminAction
  | FirstScreenMountedAction

export const
  encryptionPasswordProvidedAC = (encryptionPassword: string): EncryptionPasswordProvidedAction =>
    ({ type: INIT_ENCRYPTION_PASSWORD_PROVIDED, encryptionPassword }),
  initMigrationRequiredAC = (): MigrationRequiredAction =>
    ({ type: INIT_MIGRATION_REQUIRED }),
  initMigrationNotRequiredAC = (): MigrationNotRequiredAction =>
    ({ type: INIT_MIGRATION_NOT_REQUIRED }),
  initMigrationNotAllowedForNonAdminAC = (): MigrationNotAllowedForNonAdminAction =>
    ({ type: INIT_MIGRATION_NOT_ALLOWED_FOR_NON_ADMIN }),
  initAccountEncryptionCheckStepCompleteAC = (): AccountEncryptionCheckStepCompleteAction =>
    ({ type: INIT_ACCOUNT_ENCRYPTION_CHECK_STEP_COMPLETE }),
  initFirstScreenMountedAC = (): FirstScreenMountedAction => ({
    type: INIT_FIRST_SCREEN_MOUNTED,
  })
