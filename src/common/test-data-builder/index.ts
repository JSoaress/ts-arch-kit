/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chance } from "chance";

export type PropOrFactory<T> = T | ((index: number) => T);

export abstract class BaseFakeBuilder<TBuild = any> {
    protected countObjs: number;
    protected chance: Chance.Chance;

    protected constructor(countObjs = 1) {
        this.countObjs = countObjs;
        this.chance = Chance();
    }

    abstract build(): TBuild | Promise<TBuild>;

    protected getValue(prop: any) {
        const privateProp = `_${prop}` as keyof this;
        return this.callFactory(this[privateProp], 0);
    }

    protected callFactory(factoryOrValue: PropOrFactory<any>, index: number): any {
        if (typeof factoryOrValue === "function") return factoryOrValue(index);
        if (factoryOrValue instanceof Array) return factoryOrValue.map((value) => this.callFactory(value, index));
        return factoryOrValue;
    }
}
