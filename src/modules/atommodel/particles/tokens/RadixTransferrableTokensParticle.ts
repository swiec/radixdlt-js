import {
    includeDSON,
    includeJSON,
    RadixSerializer,
    RadixParticle,
    RadixAddress,
    RadixUInt256,
    RRI,
    RadixOwnable,
    RadixFungible,
    RadixConsumable,
    RadixTokenPermissions,
} from '../..'

import BN from 'bn.js'

/**
 *  A particle which represents an amount of consumable and consuming, tranferable fungible tokens
 *  owned by some key owner and stored in an account.
 */
@RadixSerializer.registerClass('radix.particles.transferrable_tokens')
export class RadixTransferrableTokensParticle extends RadixParticle implements RadixOwnable, RadixFungible, RadixConsumable {

    @includeDSON
    @includeJSON
    public address: RadixAddress
    
    @includeDSON
    @includeJSON
    public tokenDefinitionReference: RRI

    @includeDSON
    @includeJSON
    public granularity: RadixUInt256

    @includeDSON
    @includeJSON
    public planck: number

    @includeDSON
    @includeJSON
    public nonce: number

    @includeDSON
    @includeJSON
    public amount: RadixUInt256

    @includeDSON
    @includeJSON
    public permissions: RadixTokenPermissions

    constructor(
        amount: BN,
        granularity: BN,
        address: RadixAddress,
        nonce: number,
        tokenReference: RRI,
        tokenPermissions: RadixTokenPermissions,
        planck?: number,
    ) {
        if (amount.isZero()) {
            throw new Error('Ammount cannot be zero')
        }

        planck = planck ? planck : Math.floor(Date.now() / 60000 + 60000)

        super()

        this.address = address
        this.granularity = new RadixUInt256(granularity)
        this.tokenDefinitionReference = tokenReference
        this.amount = new RadixUInt256(amount)
        this.planck = planck
        this.nonce = nonce
        this.permissions = tokenPermissions
    }

    public getAddress() {
        return this.address
    }

    public getAddresses() {
        return [this.address]
    }

    public getPlanck() {
        return this.planck
    }

    public getNonce() {
        return this.nonce
    }

    public getTokenDefinitionReference() {
        return this.tokenDefinitionReference
    }

    public getOwner() {
        return this.address
    }

    public getAmount() {
        return this.amount.value
    }

    public getGranularity(): BN {
        return this.granularity.value
    }

    public getTokenPermissions() {
        return this.permissions
    }
}
