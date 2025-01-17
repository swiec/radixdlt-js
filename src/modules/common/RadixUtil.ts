import Long from 'long'
import BN from 'bn.js'
import crypto from 'crypto'


export function radixHash(data: Buffer | number[], offset?: number, len?: number): Buffer {
    if (offset) {
        data = data.slice(offset, len)
    }

    if (!Buffer.isBuffer(data)) {
        data = Buffer.from(data)
    }

    // Double hash to protect against length extension attacks
    const hash1 = crypto.createHash('sha256')
    hash1.update(data)

    const hash2 = crypto.createHash('sha256')
    hash2.update(hash1.digest())

    return hash2.digest()
}

export function bigIntFromByteArray(bytes: Buffer): BN {
    return new BN(bytes).fromTwos(bytes.length * 8)
}

export function byteArrayFromBigInt(num: BN): Buffer {
    // Compatibility with Java BigInteger.toByteArray() https://stackoverflow.com/a/24158695
    const byteLength = Math.ceil((num.bitLength() + 1) / 8)
    const result = num.toTwos(8 * byteLength).toArrayLike(Buffer)

    if (result.length !== byteLength) {
        const newResult = Buffer.alloc(byteLength, 0)
        result.copy(newResult, byteLength - result.length)
        return newResult
    }

    return result
}

export function longFromBigInt(num: BN) {
    // Emulate Java BigInteger.longValue(), following the spec at 5.1.3 https://docs.oracle.com/javase/specs/jls/se7/html/jls-5.html
    const byteLength = Math.max(8, num.byteLength())
    const bytes = num.toTwos(8 * byteLength).toArray('be', byteLength)
    const truncatedBytes = bytes.slice(bytes.length - 8, bytes.length)
    return Long.fromBytesBE(truncatedBytes)
}

export function bigIntFromLong(num: Long) {
    return new BN(num.toBytesBE(), 'be').fromTwos(64)
}

export function powTargetFromAtomSize(size: number): Buffer {
    const target = Buffer.alloc(32, 0xff)

    const leadingBits = Math.ceil(Math.log(size * 8))
    const leadingBytes = Math.floor(leadingBits / 8)
    const leftOverBits = leadingBits % 8

    target.fill(0, 0, leadingBytes)

    const middleByte = ~(0xff << (8 - leftOverBits)) & 0xff

    target.writeUInt8(middleByte, leadingBytes)

    return target
}

export function shuffleArray(arr: any[]) {
    return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1])
}


export function isEmpty(val: any) {
    return val === undefined 
        || val === null 
        || val.length === 0 
        || (Object.keys(val).length === 0 && val.constructor === Object)
}
