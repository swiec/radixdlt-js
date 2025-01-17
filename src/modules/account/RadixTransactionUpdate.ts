import RadixTransaction from './RadixTransaction'

export default interface RadixTransactionUpdate {
    action: string
    aid: string
    transaction?: RadixTransaction
}
