const { Before, Given, When, Then } = require('cucumber')
const expect = require('chai').expect

const RadixRemoteIdentity = require('../../../build/main/index').RadixRemoteIdentity

// Scenario: Desktop Wallet is closed

// NOTE: only this test will pass when the wallet is closed

let walletOpen = undefined

Given('that I don’t have the desktop wallet open', async function() {
  walletOpen = await RadixRemoteIdentity.isServerUp()
})
When('I try to create a RadixRemoteIdentity', function() {
  // not really necessary here
})
Then('I should be informed that it wasn’t possible to connect to the wallet', function() {
  expect(walletOpen).to.eql(false)
})