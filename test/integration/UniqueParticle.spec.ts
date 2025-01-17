import 'mocha'
import { expect } from 'chai'

import Decimal from 'decimal.js'
import BN from 'bn.js'
import axios from 'axios'

import {
  radixUniverse,
  radixTokenManager,
  logger,
  RadixUniverse,
  RadixIdentityManager,
  RadixTransactionBuilder,
  RadixAccount,
  RadixLogger,
  RadixTokenDefinition,
  RadixIdentity,
  RadixAtomNodeStatus,
} from '../../src'


const ERROR_MESSAGE = 'Local node needs to be running to run these tests'

describe('RLAU-392: RadixUniqueParticle', () => {
    const identityManager = new RadixIdentityManager()

    let identity1: RadixIdentity
    let identity2: RadixIdentity
    let testTokenRef: string

    before(async () => {
        logger.setLevel('error')

        const universeConfig = RadixUniverse.LOCALHOST
        radixUniverse.bootstrap(universeConfig)

        // Check node is available
        try {
            await universeConfig.nodeDiscovery.loadNodes()
        } catch {
            logger.error(ERROR_MESSAGE)
            throw new Error(ERROR_MESSAGE)
        }



        identity1 = identityManager.generateSimpleIdentity()
        identity2 = identityManager.generateSimpleIdentity()

        testTokenRef = `/${identity1.account.getAddress()}/UNIQ`


        // Create token

        const symbol = 'UNIQ'
        const name = 'UNIQ test'
        const description = 'my token description'
        const granularity = 1
        const amount = 1000

        await new RadixTransactionBuilder().createTokenMultiIssuance(
            identity1.account,
            name,
            symbol,
            description,
            granularity,
            amount,
            'http://a.b.com',
        )
        .signAndSubmit(identity1)
        .toPromise()
    })

    it('(1) should create an atom with a unique id', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity1.account, 'unique1')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                done()
            },
            error: e => done(new Error(JSON.stringify(e))),
        })
    })

    it('it should fail when submitting a unique particle for an unowned account', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity2.account, 'unique1')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                done('Should have failed')
            },
            error: e => {
                expect(e.status).to.equal(RadixAtomNodeStatus.EVICTED_FAILED_CM_VERIFICATION)
                done()
            },
        })
    })

    it('(2) should fail submitting an atom with a conflicting unique id', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity1.account, 'unique1')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                done('Should have failed')
            },
            error: e => {
                expect(e.status).to.equal(RadixAtomNodeStatus.EVICTED_CONFLICT_LOSER_FINAL)
                done()
            },
        })
    })

    it('(3) should succeed submitting an atom with multiple unique ids', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity1.account, 'unique2')
        .addUniqueParticle(identity1.account, 'unique3')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                done()
            },
            error: e => done(new Error(JSON.stringify(e))),
        })
    })

    it('(3b) should fail when conflicting with one of the unique ids', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity1.account, 'unique2')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                done('Should have failed')
            },
            error: e => {
                expect(e.status).to.equal(RadixAtomNodeStatus.EVICTED_CONFLICT_LOSER_FINAL)
                done()
            },
        })
    })

    it('(4) should fail submitting an atom with multiple conflicing unique ids', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity1.account, 'unique4')
        .addUniqueParticle(identity1.account, 'unique4')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                done('Should have failed')
            },
            error: e => {
                // Atom causes multiple conflicts (this is temporary, ask Florian)
                // expect(e).to.contain('unique require compromised')
                done()
            },
        })
    })

    it('(5) should observe uniques in transfer system', function (done) {
        this.timeout(50000)

        RadixTransactionBuilder.createMintAtom(
            identity1.account,
            testTokenRef,
            1)
        .addUniqueParticle(identity1.account, 'unique5')
        .addUniqueParticle(identity1.account, 'unique6')
        .signAndSubmit(identity1)
        .subscribe({
            complete: () => {
                
                const unique = [
                    `/${identity1.account.getAddress()}/unique5`,
                    `/${identity1.account.getAddress()}/unique6`,
                ]
                
                expect(identity1.account.transferSystem.transactions.values().map(t => t.unique))
                    .to.deep.include(unique)

                done()
            },
            error: e => done(new Error(JSON.stringify(e))),
        })
    })

})
