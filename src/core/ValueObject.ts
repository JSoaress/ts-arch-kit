type ValueObjectProps = {
    [key: string]: unknown;
};

export abstract class ValueObject<TValueObject extends ValueObjectProps> {
    public props: TValueObject;

    constructor(props: TValueObject) {
        this.props = props;
    }

    public toValue(): TValueObject {
        return this.props;
    }

    public equals(vo?: ValueObject<TValueObject>): boolean {
        if (!vo || !vo.props) return false;
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
}
