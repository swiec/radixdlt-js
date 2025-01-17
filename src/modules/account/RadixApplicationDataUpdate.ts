import RadixApplicationData from './RadixApplicationData'

export default interface RadixApplicationDataUpdate {
    action: string
    aid: string
    applicationId: string
    data: RadixApplicationData
    signatures: object
}
