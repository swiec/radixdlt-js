import { RadixFungible, RadixOwnable, RRI, RadixParticle, RadixTokenPermissions } from '../..';
import BN from 'bn.js'

export interface RadixConsumable extends RadixParticle, RadixFungible, RadixOwnable {
    getTokenDefinitionReference(): RRI,
    getGranularity(): BN,
    getTokenPermissions(): RadixTokenPermissions,
}
