const a = { 1: 1 };
const b = { 1: 1 };
const c = a;

const f = 1;
const e = 1;

console.log(Object.is(a, b));
console.log(Object.is(a, c));

console.log(Object.is(f, e));

