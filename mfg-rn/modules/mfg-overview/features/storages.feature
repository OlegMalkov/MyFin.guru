Feature: Storages
  As user
  In order to reflect my wallets and account balances
  I want to be able to manage storages

  There are 3 types of storages
  Debit (wallets and debit cards)
  Credit (credit cards)
  Debt (We can Lend money to some one / We can borrow money from someone)

  Scenario: Add debit storage
    When I create debit storage "My Wallet" with initial balance "100 USD & 300 AED"
    Then I should see debit storage "My Wallet" with balance "100 USD & 300 AED"

  @skip @step2
  Scenario: Edit debit storage

  @skip @step2
  Scenario: Add credit storage
    Given I just logged in after registration
    When I create credit storage "NBD Credit" with initial spend 1000AED and credit limit 50000AED
    Then I should see credit storage with spend 1000AED and available balance 49000AED

  @skip @step2
  Scenario: Edit credit storage

  @skip @step2
  Scenario: Lend money
    Given I have debit storage "My Wallet" with balance 300AED
    When I lend 100AED from "My Wallet" to "Friend" until 10.10.2000
    Then I should see Debt storage "Friend" with 100AED until 10.10.2000
    And I should see debit storage "My Wallet" with balance 200AED

  @skip @step2
  Scenario: Return lend money
    Given I have debit storage "My Wallet" with balance 300AED
    And I had lend 100AED to "Friend"
    When I transfer 100AED from "Friend" to "My Wallet"
    Then I should not see debt storage "Friend"
    And I should see debit storage "My Wallet" with balance 400AED

  @skip @step2
  Scenario: Borrow money
    Given I have debit storage "My Wallet" with balance 300AED
    When I borrow 100AED from "Friend" to "My Wallet" until 10.10.2000
    Then I should see Debt storage "Friend" with -100AED until 10.10.2000
    And I should see debit storage "My Wallet" with balance 400AED

  @skip @step2
  Scenario: Return borrow money
    Given I have debit storage "My Wallet" with balance 300AED
    And I have borrowed 100AED from "Friend"
    When I transfer 100AED from "My Wallet" to "Friend"
    Then I should not see debt storage "Friend"
    And I should see debit storage "My Wallet" with balance 200AED

  @skip @step2
  Scenario: Edit debt storage
  We can edit due data and title

  @skip @step2
  Scenario: Hide storage in incognito

  @skip @step2
  Scenario: Show storage in incognito

  @skip @step2
  Scenario: Disable storage
  User can't delete storage, he can only disable it

  @skip @step2
  Scenario: Enable storage
