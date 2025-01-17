import { RadixDecryptedData } from './RadixDecryptionAccountSystem';

export default interface RadixApplicationData {
    aid: string
    payload: RadixDecryptedData
    timestamp: number
    signatures: object
}
