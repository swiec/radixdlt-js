import { RadixBytes, RadixEUID } from '../atommodel';

export default interface RadixNodeSystem {
    agent: string
    clock: number
    key: RadixBytes
    shards: {
        anchor: number,
        serializer: string,
        range: {
            low: number,
            high: number,
            serializer: string,
        },
    }
    planck: 0
    port: 0
    serializer: string
    services: Array<any>
    version: {
        agent: number
        object: number
        protocol: number
    }
}
