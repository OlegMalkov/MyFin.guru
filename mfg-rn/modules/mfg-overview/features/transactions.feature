Feature: Transactions
  As a user
  In order to track my expense and income
  I want to be able to manage my transactions

  @skip @step1
  Scenario: Add income transaction

  Scenario: Add expense transaction
    Given Account has expense category "Food" without parent
    Given Account has storage "Wallet" with initial balance "100 AED"
    When I add expense transaction "Fish" from "Wallet" to "Food" for "50 AED"
    Then I should see "Wallet" balance is "50 AED"
    And I should see total account balance "50 AED"
    And I should see transaction "Fish" from storage "Wallet" to category "Food" with "50 AED" amount on data level

  Scenario: Add transfer transaction
    Given Account has storage "Wallet" with initial balance "100 AED"
    Given Account has storage "Card" with initial balance "50 AED"
    When I add transfer transaction "Put to card" from "Wallet" to "Card" for "10 AED"
    Then I should see storage "Wallet" balance is "90 AED"
    And I should see storage "Card" balanse is "60 AED"

  @skip @step1
  Scenario: Add exchange transaction

  @skip @step2
  Scenario: Edit income transaction

  @skip @step2
  Scenario: Edit expense transaction

  @skip @step2
  Scenario: Edit transfer transaction

  @skip @step2
  Scenario: Edit exchange transaction