Object.prototype[Symbol.iterator] = function*() {
  for (let key of Object.keys(this)){
   yield this[key];
 }
};
var [a, b] = { a: 1, c:9, d: 2,f:3 };
console.log(a, b);

let [c, d, e] = [7, 9, 0];
console.log(c, d, e);
