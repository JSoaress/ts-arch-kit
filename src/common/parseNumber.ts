export function parseNumber(value: unknown, defaultValue = 0): number {
    if (typeof value === "number") return value;
    return Number(value) || defaultValue;
}
