import { RadixNode } from '../..'


export default interface RadixNodeDiscovery {
    loadNodes: () => Promise<RadixNode[]>
}
