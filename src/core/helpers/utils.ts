/**
 * The RequireOnly<T, K> utility type ensures that a specific property K
in a given type T is required, while all other properties remain optional
or retain their original state.
 */
export type RequireOnly<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
