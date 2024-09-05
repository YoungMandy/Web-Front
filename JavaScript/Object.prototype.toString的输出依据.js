


const arr = new Array(1);
console.log(Object.prototype.toString.call(arr), '\n'); // [object Array] 

arr[Symbol.toStringTag] = 'other';
console.log(Object.prototype.toString.call(arr), '\n'); // [object other] 


const fn = new Function();
console.log(Object.prototype.toString.call(fn), '\n'); // [object Function] 

const e = new Error('Invalid');
console.log(Object.prototype.toString.call(e), '\n'); // [object Error] 

const bol = new Boolean(true);
console.log(Object.prototype.toString.call(bol), '\n'); // [object Boolean] 

const num = new Number(1);
console.log(Object.prototype.toString.call(num), '\n'); // [object Number] 

const str = new String('加油');
console.log(Object.prototype.toString.call(str), '\n'); // [object String] 


const date = new Date();
console.log(Object.prototype.toString.call(date), '\n'); // [object Date]

const patt = new RegExp("e");
console.log(Object.prototype.toString.call(patt), '\n'); // [object RegExp] 


console.log(Object.prototype.toString.call(null), '\n'); // [object Null] 

console.log(Object.prototype.toString.call(undefined), '\n'); // [object Undefined] 



function aruTest () {
  console.log(Object.prototype.toString.call(arguments), '\n');
}
aruTest();// [object Arguments] 

const test = { 0: 1 };
console.log(Object.prototype.toString.call(test), '\n'); // [object Object] 

