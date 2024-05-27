Object.prototype[Symbol.iterator] = function*() {
  console.log('keys数组', JSON.stringify(Object.keys(this)));
  for (const key of Object.keys(this)) {
    yield this[key] ? this[key]: undefined;
  }
};
var [a, b] = { a: 1, c:9, d: 2,f:3 };
console.log(a, b);

let [c, d, e] = [7, 9, 0];
console.log(c, d, e);
