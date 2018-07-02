/* @flow */

import type { EMAIL, UID } from '../../const'

type Computed = {|
  isAuthenticated: bool,
|}

export type SessionPersistPart = {|
  email: EMAIL,
  password: string,
  uid: UID,
  accountEncrypted: bool,
  encryptionPassword: string,
|}

export type Session = {|
  ...SessionPersistPart,
  computed: Computed,
|}
