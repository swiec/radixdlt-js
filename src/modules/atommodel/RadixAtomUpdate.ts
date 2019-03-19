import { RadixAtom } from '.';

export interface RadixAtomUpdate {
    action: string
    atom: RadixAtom
    processedData: {[key: string]: any}
    isHead: boolean
}