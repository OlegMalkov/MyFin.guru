Feature: Overview screen
  As a user
  In order to quickly understand my current account state and add new transactions
  I want to be able see state of my storages and spends on categories on main screen
  I want to be able to quickly add new transaction from main screen

  Incognito mode let user show only 'public' storages that he usually use to add transactions
  in public place

  Show all categories mode let user see all categories, when it is disabled, user will see only
  categories that have plan for current month

  Overview screen has 3 navigation buttons
  - Settings
  - Plan screen
  - Analytics screen

  Create transfer transaction mode
  User can press "Transfer mode button" and press on 2 storages currencies (from and to) it will
  result in opening 'Add transfer transaction dialog' or if different currencies was selected in
  opening 'Add exchange transaction dialog'

  @skip @step1
    Scenario: Assert visibility of due field on storages (should be only visible for debts)

  @skip @step1
  Scenario: Incognito mode is disabled by default

  @skip @step2
  Scenario: Incognito mode is saved in preferences

  @skip @step2
  Scenario: Exit Incognito mode

  @skip @step2
  Scenario: Enter Incognito mode

  @skip @step1
  Scenario: Show all categories mode is enabled by default

  @skip @step2
  Scenario: Show all categories mode is saved in preferences

  @skip @step2
  Scenario: Enter Show all categories mode

  @skip @step2
  Scenario: Exit Show all categories mode

  @skip @step1
  Scenario: Change between income/expense modes

