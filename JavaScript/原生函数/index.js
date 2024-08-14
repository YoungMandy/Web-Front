// obj => Object.prototype => null
const obj = { text: 1 };
console.log(JSON.stringify(obj));
console.log(Object.getPrototypeOf(obj));
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.getPrototypeOf(obj) === Object.prototype);


// str => String.prototype => Object.prototype => null
const str = String('字符串');
const str1 = '字符串'

console.log(Object.getPrototypeOf(str));
console.log(Object.getPrototypeOf(str1));
console.log(Object.getPrototypeOf(str1) === String.prototype);
console.log(Object.getPrototypeOf(String.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(String.prototype));
console.log(Object.getPrototypeOf(Object.prototype));
// console.log('\n');


// Number.prototype.say = () => {
//   console.log('hello');
// }

// num => Number.prototype=> Object.prototype
// const num = Number(123);
// const num1 = 123;
// // num1.say();
// console.log(Object.getPrototypeOf(num));
// console.log(Object.getPrototypeOf(num1));
// console.log(Object.getPrototypeOf(num1) === Number.prototype);
// console.log(Object.getPrototypeOf(num1) === Object.prototype);
// console.log(Object.getPrototypeOf(Number.prototype) === Object.prototype);
// console.log(Number.prototype.valueOf());
// console.log(Object.prototype.valueOf());
// console.log(Number.prototype.toString());
// console.log(Object.prototype.toString());
// console.log('\n');

// bol => Boolean.prototype => Object.prototype
// const bol = Boolean(true);
// const bol1 = true;
// console.log(Object.getPrototypeOf(bol));
// console.log(Object.getPrototypeOf(bol1));
// console.log(Object.getPrototypeOf(Boolean.prototype));
// console.log(Object.getPrototypeOf(Boolean.prototype) === Object.prototype);
// console.log(Object.getPrototypeOf(Boolean.prototype).toString());
// console.log('\n');


// arr[[Prototype]] => Array.prototype => Object.prototype (Object.prototype.valueOf = {})
// const arr = Array(1, 2, 3);
// const arr1 = [1, 2, 3];
// console.log(Object.getPrototypeOf(arr));
// console.log(Object.getPrototypeOf(arr1));
// console.log(Object.getPrototypeOf(arr1) == Array.prototype);
// console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype);
// console.log('\n');

// Function.prototype.hi = () => {
//   console.log('不是花中偏爱菊，此花开尽更无花')
// }

// fn => Function.prototype => Object.prototype
// const fn = new Function();
// const f1 = () => 1;
// // f1.hi();
// console.log(Object.getPrototypeOf(fn));
// console.log(Object.getPrototypeOf(f1));
// console.log(Object.getPrototypeOf(fn) === Function.prototype);
// console.log(Object.getPrototypeOf(Function.prototype) ===Object.prototype);
// console.log('\n');
// const reg = new RegExp();

// date => Date.prototype => Object.prototype
// const date = new Date();
// console.log(Object.getPrototypeOf(date));
// console.log(Object.getPrototypeOf(date) === Date.prototype);
// console.log(Object.getPrototypeOf(Date.prototype).toString());
// console.log(Object.getPrototypeOf(Date.prototype) === Object.prototype);
// const err = new Error();
// const sym = Symbol(1);


// console.log(Object.prototype)

// console.log(Object.prototype.valueOf());
// console.log(Object.prototype.toString());
debugger
