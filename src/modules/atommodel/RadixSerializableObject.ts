import { RadixSerializer, includeJSON, includeDSON, JSON_PROPERTIES_KEY, DSON_PROPERTIES_KEY, RadixEUID } from '.';
import { radixHash, isEmpty } from '../common/RadixUtil';

export class RadixSerializableObject {
    public static SERIALIZER = ''

    @includeJSON
    @includeDSON
    public version = 100

    constructor(...args: any[]) {
        // Empty constructor
    }

    public static fromJSON(json?: object) {
        // So that we can have constructors for the different classes
        const obj = Object.create(this.prototype)

        if (json) {
            for (const key in json) {
                if (key === 'constructor' || key === 'serializationProperties') {
                    continue
                }

                obj[key] = json[key]
            }
        }

        return obj
    }
    
    @includeDSON
    get serializer() {
        return (this.constructor as typeof RadixSerializableObject).SERIALIZER
    }

    set serializer(_) {
        // Do nothing
    }

    public toJSON() {
        const constructor = this.constructor as typeof RadixSerializableObject        
        const output = { serializer: constructor.SERIALIZER }

        const serializationProps = Reflect.getMetadata(JSON_PROPERTIES_KEY, this)
        
        for (const key of serializationProps) {
            const serialized = RadixSerializer.toJSON(this[key])
            if (!isEmpty(serialized)) {
                output[key] = serialized
            }
        }

        return output
    }

    public toDSON(): Buffer {
        return RadixSerializer.toDSON(this)
    }

    public encodeCBOR(encoder) {
        // Streaming encoding for maps
        const serializationProps = Reflect.getMetadata(DSON_PROPERTIES_KEY, this)

        if (!encoder.push(Buffer.from([0b1011_1111]))) {return false}
        
        for (const prop of serializationProps) {
            if (isEmpty(this[prop])) {
                continue
            }

            // TODO: serializer id for atoms is temporarily excluded from hash for compatibility with abstract atom
            if (prop === 'serializer' && this[prop] === 'radix.atom') {
                continue
            }

            if (!encoder.pushAny(prop)) {return false}
            if (!encoder.pushAny(this[prop])) {return false}
        }

        if (!encoder.push(Buffer.from([0xFF]))) {return false}

        return true
    }

    public getHash() {
        return radixHash(this.toDSON())
    }

    public getSize() {
        return this.toDSON().length
    }
}
