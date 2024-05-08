// 映射对象类型是一种独特的对象类型，它能够将已有的对象类型映射为新的对象类型。
// type K = 'x' | 'y';

// type T = number;
// type MappedObjectType = { [P in K]?: T };



// export type CT<T> = T extends Array<infer U> ? U: never;
// export type L = CT<Array<number>>


// export type ReturnType<T extends (...arg) => any> = T extends (...args: any[]) => infer R ? R : never;

// export type F = (x: number) => string; 
// export type R = ReturnType<F>;

// export type CT<T> = T extends { a: infer U; b: infer U } ? U : never;

// export type T = CT<{ a: number, b: string }>;

export type CT<T> = T extends { a: infer M; b: infer N } ? [M, N] : never;
export type T = CT<{ a: number, b: string }>;
