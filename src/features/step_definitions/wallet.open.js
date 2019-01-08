const { Before, Given, When, Then } = require('cucumber')
const expect = require('chai').expect

const RadixRemoteIdentity = require('../../../build/main/index').RadixRemoteIdentity
const RadixAddress = require('../../../build/main/index').RadixAddress
const RadixUniverse = require('../../../build/main/index').RadixUniverse
const radixUniverse = require('../../../build/main/index').radixUniverse

radixUniverse.bootstrap(RadixUniverse.LOCAL)

// Scenario: Desktop Wallet is open

// NOTE: only this test will pass when the wallet is open

let identity = undefined

Given('that I do have the desktop wallet open', async function () {
  expect(await RadixRemoteIdentity.isServerUp()).to.eql(true)
})
When('I try to create a remote identity', async function () {
  identity = await RadixRemoteIdentity.createNew('my dApp', 'my dApp description')
})
Then('the desktop wallet should ask for my permission', async function () {
  expect(RadixAddress.fromPublic(await identity.getPublicKey()).getAddress()).not.null
})