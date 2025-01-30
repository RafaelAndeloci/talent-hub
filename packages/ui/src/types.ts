/**
 * Merge two types together, overwriting the properties of the first type with the properties of the second type.
 *
 * @example
 * type A = { a: string, b: string }
 * type B = { b: number, c: number }
 *
 * type C = Merge<A, B> // { a: string, b: number, c: number }
 */
export type Merge<T, U> = Omit<T, keyof U> & U;
