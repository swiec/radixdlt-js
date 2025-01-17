import RadixMessage from '../messaging/RadixMessage'

export default interface RadixMessageUpdate {
    action: string
    aid: string
    message: RadixMessage
}
