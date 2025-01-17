export default interface RadixDecryptionProvider {
    decryptECIESPayload: (payload: Buffer) => Promise<Buffer>
    decryptECIESPayloadWithProtectors: (protectors: Buffer[], payload: Buffer) => Promise<Buffer>
}
