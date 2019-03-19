import {
    includeDSON,
    includeJSON,
    RadixSerializer,
    RadixParticle,
    RadixAddress,
    RadixTokenClassReference,
    RadixFungibleType,
    RadixUInt256,
    RadixResourceIdentifier,
    RadixOwnable,
    RadixFungible,
    RadixConsumable,
} from '../..'

import BN from 'bn.js'

/**
 *  A particle which represents an amount of consumable, minted fungible tokens
 *  owned by some key owner and stored in an account.
 */
@RadixSerializer.registerClass('MINTEDTOKENSPARTICLE')
export class RadixMintedTokensParticle extends RadixParticle implements RadixOwnable, RadixFungible, RadixConsumable {

    @includeDSON
    @includeJSON
    public address: RadixAddress
    
    @includeDSON
    @includeJSON
    public tokenTypeReference: RadixResourceIdentifier

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

    constructor(
        amount: BN,
        granularity: BN,
        address: RadixAddress,
        nonce: number,
        tokenReference: RadixTokenClassReference,
        planck?: number,
    ) {
        planck = planck ? planck : Math.floor(Date.now() / 60000 + 60000)

        super()

        this.address = address
        this.granularity = new RadixUInt256(granularity)
        this.tokenTypeReference = new RadixResourceIdentifier(tokenReference.address, 'tokenclasses', tokenReference.unique)
        this.amount = new RadixUInt256(amount)
        this.planck = planck
        this.nonce = nonce
    }

    public getAddress() {
        return this.getAddresses()[0]
    }

    public getAddresses() {
        return [this.address]
    }

    public getType() {
        return RadixFungibleType.MINT
    }

    public getPlanck() {
        return this.planck
    }

    public getNonce() {
        return this.nonce
    }

    public getTokenTypeReference() {
        return this.tokenTypeReference
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
}