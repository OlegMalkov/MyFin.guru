Feature: Analytics screen
  As user
  In order to check my transactions log
  I want to have nice interface for it

  Scenario: When I Open Analytics screenc
    Given Account has expense category "Food" without parent
    And Account has storage "Wallet" with initial balance "100 AED"
    And Account with expense transaction "Fish" from storage "Wallet" to category "Food" for "50 AED" from "20.10.2000 10:00"
    And Initial datetime is "20.10.2000 12:00"
    When I open Analytics screen
    Then I should see transaction "Fish" from storage "Wallet" to category "Food" with "50 AED" from "20.10.2000 10:00" by "Belka"
    And I should see current date period is "20.10.2000"

  Scenario: Change period prev
    And Initial datetime is "20.10.2000 12:00"
    Given I am on Analytics screen
    When I press prev period button
    And I should see current date period is "19.10.2000"

  Scenario: Change period next
    And Initial datetime is "20.10.2000 12:00"
    Given I am on Analytics screen
    When I press next period button
    And I should see current date period is "21.10.2000"

  Scenario: Open pick user dialog
    Given I am on Analytics screen
    When I press on current user name
    Then I should see pick user dialog opened with "Belka" and "all" options

  Scenario: Pick "Me" as user filter
    Given I am on Analytics screen
    When I am picking "Belka" as a user filter
    Then I should see that current user filter is "Belka"

  Scenario: Delete transaction
    Given Account has expense category "Food" without parent
    And Account has storage "Wallet" with initial balance "100 AED"
    And Account with expense transaction "Fish" from storage "Wallet" to category "Food" for "50 AED" from "20.10.2000 10:00"
    And Initial datetime is "20.10.2000 12:00"
    And I am on Analytics screen
    When I delete transaction "Fish"
    Then I should not see any transactions

  @skip @step1
  Scenario: Check transactions for a day

  @skip @mvp
  Scenario: Check transactions for archived day

  @skip @step1
  Scenario: Change user filter

  @skip @step1
  Scenario: Delete transaction