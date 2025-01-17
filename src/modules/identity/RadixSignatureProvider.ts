import { RadixAtom } from '../atommodel'

export default interface RadixSignatureProvider {
    signAtom: (atom: RadixAtom) => Promise<RadixAtom>
}
