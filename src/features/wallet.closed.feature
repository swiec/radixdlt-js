Feature: Localhost wallet identity

  Background:
    As a developer,
    I want to let Dapps running in the browser to use my existing account,
    So that I don't have to create a new account for each Dapp or to expose my private key  

  Scenario: Desktop Wallet is closed
    Given that I don’t have the desktop wallet open
    When I try to create a RadixRemoteIdentity
    Then I should be informed that it wasn’t possible to connect to the wallet
    