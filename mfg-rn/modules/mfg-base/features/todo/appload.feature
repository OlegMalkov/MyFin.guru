Feature: App load
  In order to use app
  I need to load it first

  Technical details:

  App is depends on firebase, so in order to use firebase we should have valid auth token

  Firebase is serving transparently offline data, that means internet is required only if auth token
  is missing or invalid.

  So given top three statements we have following flow to start the app:
  - check auth token
  - if token is valid
  -- check database encryption status
  -- if it is encrypted
  --- check if we have encryption key in async storage
  --- if we don't have it
  ---- prompt it from user
  --- put encryption key to redux storage
  -- load account data version from database
  -- if not account data version is matching source code data version
  --- if current user is account owner
  ---- perform account migration, show result, restart app
  --- else
  ---- show notification, that only owner can migrate account
  -- load account from database (initSubscriptions)
  -- if load account failed, due it is encrypted and decryption key is incorrect
  --- prompt for valid encryption key until valid key is entered, let user to close app as well
  -- once load account success, navigate to main screen
  - if token is invalid open login screen, also probably this is the case to purge locally saved database