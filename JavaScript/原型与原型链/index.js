
const a = '我是a'
const err = new Error('报错');

console.log(err instanceof Error)// true
console.log(err.constructor === Error)// true

err.constructor = a;
console.log(err.constructor === Error)// false

const fn = new Function("a", 'b', 'return a + b');
Function.constructor = a;
console.log(fn instanceof Function) // true

function createObject () {
  this.a = 1;
  this.b = 2;
}

createObject.constructor = a;
// obj =>> createObject.prototype => Object.prototype => null
const obj = new createObject();
console.log(obj instanceof createObject);// true
debugger