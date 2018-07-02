Feature: User data encryption
  As a user
  In order to keep privacy of my personal data
  I want to encrypt sensitive data with password

  In settings user may press "encrypt my account" so depending on his plan
  - starter: encryption of comments, if total year income less than "20 000 USD"
  - medium: encryption of comments, if total year income less than "100 000 USD"
  - vip: encryption of comments and amounts(numbers), without limits on income

  he can activate encryption of only comments, or comments and amounts
  Data stored in encrypted way on server, so no one except how know encryption password can't decrypt it
  Encryption password is only stored on device, and never sent to server

  @skip @mvp
  Scenario: Enable encryption of comments
    Given Account has expense category "Food" without parent
    And Account has storage "Wallet" with initial balance "100 AED"
    And Account has expense transaction "Fish" from "Wallet" to "Food" of "50 AED"
    And Account has plan "Food plan" on category "Food" for "20.01.2000" of "300 AED" with no repeat
    And Account has planned transaction "Dance class" on category "Food" for "20.02.2000" of "100 AED" with no repeat
    And All checks will be done on data layer
    When I Enable encryption of comments
    Then I should see that category "Food" has unreadable title
    And I should see that storage "Wallet" has unreadable title and readable initial balance
    And I should see that transaction "Fish" has unreadable comment and readable amount
    And I should see plan "Food plan" has readable amount
    And I should see planned transaction "Dance class" has unreadable comment and readable amount

  @skip @mvp
  Scenario: Enable encryption of everything
    Given Account has expense category "Food" without parent
    And Account has storage "Wallet" with initial balance "100 AED"
    And Account has expense transaction "Fish" from "Wallet" to "Food" of "50 AED"
    And Account has plan "Food plan" on category "Food" for "20.01.2000" of "300 AED" with no repeat
    And Account has planned transaction "Dance class" on category "Food" for "20.02.2000" of "100 AED" with no repeat
    And All checks will be done on data layer
    When I Enable encryption of everything
    Then I should see that category "Food" has unreadable title
    And I should see that storage "Wallet" has unreadable title and initial balance
    And I should see that transaction "Fish" has unreadable comment and amount
    And I should see plan "Food plan" has unreadable amount
    And I should see planned transaction "Dance class" has unreadable comment and amount