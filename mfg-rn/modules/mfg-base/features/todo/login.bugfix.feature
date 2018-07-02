Feature: Login screen bug fixes

  @skip @mvp
  Scenario: Remove all characters from login field
    Given Login screen email set to "email@gmail.com"
    When I remove all characters from email field
    Then I should email field empty

  @skip @mvp
      Scenario: After login i should see "to Overview screen" animation once (not twice)