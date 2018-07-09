Feature: Plan screen
  As user
  In order to view and edit category plans and planned transactions
  I want to have nice interface for that

  @skip
  Scenario: Plan screen initial period set to current month
    And Initial datetime is "20.10.2000 12:00"
    When I open Plan screen
    Then I should see period filters "10.2000 & 11.2000"

  @skip
  Scenario: Plan screen period filter changes back
    And Initial datetime is "20.10.2000 12:00"
    And I am on Plan screen
    When I press prev period button
    Then I should see period filters "9.2000 & 10.2000"

  @skip
  Scenario: Plan screen period filter changes back
    And Initial datetime is "20.11.2000 12:00"
    And I am on Plan screen
    When I press next period button
    Then I should see period filters "01.2001 & 02.2001"

  @skip
  Scenario: Plan screen period filter changes to years
    And Initial datetime is "20.10.2000 12:00"
    And I am on Plan screen
    When I press on period
    Then I should see period filters "2001 & 2002"

  @skip
  Scenario: Plan screen period filter changes to years
    And Initial datetime is "20.10.2000 12:00"
    And I am on Plan screen
    And Period filters mode is years
    When I press prev period button
    Then I should see period filters "2000 & 2001"

  @skip
  Scenario: Plan screen period filter changes to years
    And Initial datetime is "20.10.2000 12:00"
    And I am on Plan screen
    And Period filters mode is years
    When I press next period button
    Then I should see period filters "2002 & 2003"

  @skip
  Scenario: Plan screen initial state with expense and income categories but without plan
    Given Account has expense category "Food" without parent
    And Account has income category "Job" without parent
    And Initial datetime is "20.10.2000 12:00"
    And Account has "AED" as default currency
    And Account has following transactions
      | category | date       | amount  |
      | Job      | 10.10.2000 | 100 AED |
      | Food     | 15.10.2000 | 50 AED  |
    When I open Plan screen
    And I should see selected currency is "AED"
    And I should see plan totals
      | period  | expense plan | expense fact | income plan | income fact | expense income diff |
      | 10.2000 | 0            | 50           | 0           | 100         | 50                  |
      | 11.2000 | 0            | 0            | 0           | 0           | 0                   |

  @skip @step2
  Scenario: Change user filter

  @skip @step2
  Scenario: Change currency

  @skip @step2
  Scenario: Change period backward

  @skip @step2
  Scenario: Change period forward

  @skip @step2
  Scenario: Collapse categories

  @skip @step2
  Scenario: Change Income/expense mode

  @skip @step2
  Scenario: See plan details

  @skip @step2
  Scenario: See fact details
