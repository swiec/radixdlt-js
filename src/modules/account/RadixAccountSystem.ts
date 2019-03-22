import { RadixAtomUpdate } from '../atommodel'

export default interface RadixAccountSystem {
    name: string
    processAtomUpdate(atomUpdate: RadixAtomUpdate)
}
