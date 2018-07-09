Feature: Show hidden storages
  As a user
  In order to be able show back hidden storages
  I want a separate screen for this functionality

  Scenario: Navigate to show hidden storages screen
    Given Account has storage "Wallet" with initial balance "50 AED" which is hidden
    And Account has storage "Card" with initial balance "10 AED"
    When I opened Show hidden storages screen
    Then I should see only one storage "Wallet" on show hidden storages screen

  Scenario: Make storage visible
    Given Account has storage "Wallet" with initial balance "50 AED" which is hidden
    And Account has storage "Card" with initial balance "10 AED"
    And I opened Show hidden storages screen
    When I press on show icon on row with title "Wallet"
    Then I should see label "None of storages are hidden" on show hidden storages screen