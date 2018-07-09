Feature: Categories
  As a user
  In order to organize my expenses and incomes
  I want to be able to set a category for any transaction

  Categories can be nested

  Scenario: Add Category without parent
    When I create category "Food" without parent
    Then I should see category "Food" without parent

  Scenario: Add Category with parent
    Given Account has expense category "Local life" without parent
    When I create category "Food" with Parent "Local life"
    Then I should see category "Food" with "Local life" parent

  @skip @mvp
  Scenario: Edit Category

  @skip @stage2
  Scenario: Delete Category with no transactions

  @skip @mvp
  Scenario: Delete Category with transactions

  @skip @mvp
  Scenario: Sort Categories