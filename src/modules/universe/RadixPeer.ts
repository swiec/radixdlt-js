import RadixNodeSystem from './RadixNodeSystem';

export default interface RadixPeer {
    hid: string,
    system: RadixNodeSystem,
    host: {
        port: number,
        ip: string,
    },
    serializer: 'network.peer',
    protocols: string[],
    version: number,
}
