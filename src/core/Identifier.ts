export class Identifier<T> {
    constructor(private value: T) {
        this.value = value;
    }

    static isIdentifier(id: unknown): id is Identifier<unknown> {
        return id instanceof Identifier;
    }

    public equals(id?: Identifier<T>): boolean {
        if (!id || !Identifier.isIdentifier(id)) return false;
        return id.toValue() === this.value;
    }

    public toString(): string {
        return String(this.value);
    }

    public toValue(): T {
        return this.value;
    }
}
