Feature: Archive old transaction
  As as user
  In order to keep app running fast
  I want my old transactions to be archived and retrieved when i need to read them
  Archived transactions are not editable or deletable

  @skip @mvp
  Scenario: Old Transactions are archived
    Given Account with 100 transactions from 20.01.2000 to 20.03.2000
    And Initial date is "20.05.2000"
    When I complete transactions archiving
    Then My account balance should remain same
    And I should not see any transactions in live transactions storage