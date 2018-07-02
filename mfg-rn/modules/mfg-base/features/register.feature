Feature: Register
  User can register with email and password

  Scenario: Register with email and password
    Given App started after install
    When I complete registration process with email and password
    Then I should see, that registration was successful

  @skip
  Scenario: Register succeed, but account was not created (some issue?)
    Given I complete registration process with email and password
    And Account was not created
    When I complete login process using email and password of newly created user
    Then I should see notification about account data is invalid

  @skip @mvp
  Scenario: Register using facebook
# test fail cases
# When i did not enter email and press register button i see warning, that i have to fill it
# When i did not enter password and press register button i see warning, that i have to fill it
# When i did not enter repeat password and press register button i see warning, that i have to fill it
# When i entered repeat password that not match password and press register button i see warning, that i have to fix it
# When i entered repeat password that not match password and press register button i see warning, after i close warning password fields are cleaned and password field is focused
# When i entered password that not match security policy and press register button i see warning, that i have to fix it
# When i entered password that not match security policy and press register button i see warning, after i close warning password fields are cleaned and password field is focused
# When i have entered email that is invalid and press register button i see warning, that i have to fix it
# When i have entered email that is invalid and press register button i see warning, after i close warning, email field is cleaned and focused
# When i have entered email that is already exists and press register button i see warning, that i have to fix it
# When i have entered email that is already exists and press register button i see warning, after i close warning, email field is cleaned and focused
