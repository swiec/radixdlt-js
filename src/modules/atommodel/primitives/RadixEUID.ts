import { RadixSerializer, RadixPrimitive } from '..';
import long from 'long'


const id = ':uid:'
@RadixSerializer.registerPrimitive(id)
export class RadixEUID implements RadixPrimitive {

    public readonly bytes: Buffer
    public readonly shard: long

    constructor(value: number | Buffer | number[] | string) {

        if (typeof value === 'number') {
            this.bytes = Buffer.alloc(16)
            this.bytes.writeUInt32BE(value, 12)
        } else if (Buffer.isBuffer(value) || Array.isArray(value)) {
            if (value.length === 0) {
                throw new Error('EUID must not be 0 bytes')
            }

            this.bytes = Buffer.from(value as Buffer)
        } else if (typeof value === 'string') {
            this.bytes = Buffer.from(value, 'hex')
        } else {
            throw new Error('Unsupported EUID value')
        }

        this.shard = long.fromBytes([...this.bytes.slice(0, this.bytes.length - 8)])
    }

    public static fromJSON(data: string) {
        return new this(data)
    }

    public toJSON() {
        return `${id}${this.bytes.toString('hex')}`
    }

    public toDSON(): Buffer {
        return RadixSerializer.toDSON(this)
    }

    public encodeCBOR(encoder) {
        const output = Buffer.alloc(this.bytes.length + 1)
        output.writeInt8(0x02, 0)
        this.bytes.copy(output, 1)

        return encoder.pushAny(output)
    }


    public equals(euid: RadixEUID) {
        return this.bytes.compare(euid.bytes) === 0
    }

    public toString(): string {
        return this.bytes.toString('hex')
    }

    public getShard() {
        return this.shard
    }

}
