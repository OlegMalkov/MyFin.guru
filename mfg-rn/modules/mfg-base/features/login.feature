Feature: Login
  As user i want to login to app from different devices and see my data

  Scenario: Login using email and password
    Given App started after install
    When I complete login process using email and password
    Then I should see "Overview" screen

  Scenario: Login using email and password just after registration
    Given App started after install
    When I complete login process using email and password of newly created user
    Then I should see "Overview" screen

  Scenario: I have already logged in and just starting app
    Given App started after logged in in last session
    Then I should see "Overview" screen

  @skip @stage2
  Scenario: Login when migration required

  @skip @mvp
  Scenario: Login using facebook

# fail cases
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
