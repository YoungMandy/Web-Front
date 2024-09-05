// arr => Array.prototype => Object.prototype => null
const arr = [123];
const arr1 = new Array(123);
console.log(Object.prototype.toString.call(arr));// '[object Array]'
console.log(Object.getPrototypeOf(arr));// Object(0) []
console.log(Object.getPrototypeOf(arr1));// Object(0) []
console.log(Object.getPrototypeOf(arr) === Array.prototype);//true
console.log(Object.getPrototypeOf(arr1) === Array.prototype);//true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);//true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true

// num => Number.prototype => Object.prototype => null
const num = 123;
const num1 = new Number(123);
console.log(Object.prototype.toString.call(num));// '[object Number]'
console.log(Object.getPrototypeOf(num));//{}
console.log(Object.getPrototypeOf(num1));//{}
console.log(Object.getPrototypeOf(num) === Number.prototype);//true
console.log(Object.getPrototypeOf(num1) === Number.prototype);//true
console.log(Object.getPrototypeOf(Number.prototype) === Object.prototype);//true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true

// str => String.prototype => Object.prototype => null
const str = '字符串';
const str1 = new String('字符串');
Object.prototype.toString.call(str);// '[object String]'
console.log(Object.getPrototypeOf(str));//{}
console.log(Object.getPrototypeOf(str) === String.prototype);//true
console.log(Object.getPrototypeOf(str1) === String.prototype);//true
console.log(Object.getPrototypeOf(String.prototype) === Object.prototype);//true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true


// bol => Boolean.prototype => Object.prototype => null
const bol = true;
const bol1 = new Boolean(true);
console.log(Object.prototype.toString.call(bol));// '[object Boolean]'
console.log(Object.getPrototypeOf(bol));//{}
console.log(Object.getPrototypeOf(bol1));//{}
console.log(Object.getPrototypeOf(bol) === Boolean.prototype);//true
console.log(Object.getPrototypeOf(bol1) === Boolean.prototype);//true
console.log(Object.getPrototypeOf(Boolean.prototype) === Object.prototype);//true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true


// date => Date.prototype => Object.prototype => null
const date = new Date();
console.log(Object.prototype.toString.call(date));// '[object Date]'
console.log(Object.getPrototypeOf(date));// {}
console.log(Object.getPrototypeOf(date) === Date.prototype);// true
console.log(Object.getPrototypeOf(Date.prototype) === Object.prototype);// true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true


// patt => RegExp.prototype => Object.prototype => null
const patt = new RegExp("e");
console.log(Object.prototype.toString.call(patt));// '[object RegExp]'
console.log(Object.getPrototypeOf(patt));// {}
console.log(Object.getPrototypeOf(patt) === RegExp.prototype);// true
console.log(Object.getPrototypeOf(RegExp.prototype) === Object.prototype);// true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true


// fn => Function.prototype => Object.prototype => null
const fn = new Function("a",'b', 'return a + b');
console.log(Object.prototype.toString.call(fn));// '[object Function]'
console.log(Object.getPrototypeOf(fn));// {}
console.log(Object.getPrototypeOf(fn) === Function.prototype);// true
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);// true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true


// err => Error.prototype => Object.prototype => null
const err = new Error('报错');
console.log(Object.prototype.toString.call(err));// '[object Error]'
console.log(Object.getPrototypeOf(err));// {}
console.log(Object.getPrototypeOf(err) === Error.prototype);// true
console.log(Object.getPrototypeOf(Error.prototype) === Object.prototype);// true
console.log(Object.getPrototypeOf(Object.prototype) === null);// true



function createObject () {
  this.a = 1;
  this.b = 2;
}
// obj =>> createObject.prototype => Object.prototype => null
const obj = new createObject();
console.log(Object.getPrototypeOf(obj));// {}
console.log(Object.getPrototypeOf(obj) === createObject.prototype);// true
console.log(Object.getPrototypeOf(createObject.prototype) === Object.prototype);// true


const a = { text: 'a' };
// b => a => Object.prototype => null
const b = Object.create(a);
console.log(b.text);// a
console.log(Object.getPrototypeOf(b));// { text: 'a' }
console.log(Object.getPrototypeOf(b) === a);// true
console.log(Object.getPrototypeOf(a) === Object.prototype);// true


const c = { text: 'c' };
const d = { text: 'd', num: 123 };
// c => d => Object.prototype => null
Object.setPrototypeOf(c, d)// 把c的原型设置为d
console.log(c.num);// 123
console.log(Object.getPrototypeOf(c));// { text: 'd', num: 123 }
console.log(Object.getPrototypeOf(c) === d);// true
console.log(Object.getPrototypeOf(d) === Object.prototype);// true

console.log(Object.prototype.toString.call(c))



const e = { name: 'e' };
const f = { text: 'f', num: 123 };
Object.prototype.hello='hi'
// c => d => Object.prototype => null
e.__proto__ = f// 把e的原型设置为f
console.log(e);// { name: 'e' }
console.log(e.num);// 123
console.log(e.text);// f
console.log(e.tree);// undefined (原型链上访问不到)
console.log(e.hello);// hi (原型链上的爷爷节点有这个属性)
console.log(Object.getPrototypeOf(e));// { text: 'f', num: 123 }
console.log(Object.getPrototypeOf(e) === f);// true
console.log(Object.getPrototypeOf(f) === Object.prototype);// true
