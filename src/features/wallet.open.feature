Feature: Localhost wallet identity

  Background:
    As a developer,
    I want to let Dapps running in the browser to use my existing account,
    So that I don't have to create a new account for each Dapp or to expose my private key

  Scenario: Desktop Wallet is open
    Given that I do have the desktop wallet open
    When I try to create a remote identity
    Then the desktop wallet should ask for my permission
    