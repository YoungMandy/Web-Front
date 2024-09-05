const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// Expected output: "symbol"

console.log(symbol2 === 42);
// Expected output: false

console.log(symbol3.toString());
// Expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
console.log(symbol3 === symbol3);

const a = Symbol.for('a');
const b = Symbol.for('a');

console.log(a === b)