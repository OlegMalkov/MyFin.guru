Feature: Add transaction dialog
  As user in order to add transaction
  I want nice UI to be able to do it

  Scenario: When I open add expense transaction dialog
    Given Account has expense category "Food" without parent
    And Account has storage "Wallet" with initial balance "100 AED"
    And I am on overview screen
    And "Wallet" storage is selected
    And "Food" category is selected
    When I press on add transaction button
    Then I should see default account currency is picked by default