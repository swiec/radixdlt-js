export interface RadixPrimitive {
    toJSON: () => any,
    toDSON: () => Buffer,
    encodeCBOR: (encoder: any) => void,
}
