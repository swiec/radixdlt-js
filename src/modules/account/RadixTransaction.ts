import BN from 'bn.js'
import Decimal from 'decimal.js';

export default interface RadixTransaction {
    hid: string
    balance: {[id: string]: BN}
    tokenUnitsBalance: {[id: string]: Decimal}
    fee: number
    participants: object
    timestamp: number
    message: string
}
