//1.环境变量
// var a = 1;
// function b () {

//   var a = 2;
//   console.log(a);
// }
// b();// 2

// console.log(a);// 1

// 2.词法环境
// {
//   let a;
// }
// console.log(a);// ReferenceError: a is not defined
// function b () {
//   console.log(a);
// }
// b();// ReferenceError: a is not defined

// 3.作用域链

// function a() {
//   var c = 1;
//   return function b() {
//     console.log(c);
//   };
// }

// var c = 2;
// let foo = a();
// foo();// 1

// 4.this指向
// var a = 1;
// function foo () {
//   debugger
//   this.a = 2;
//   console.log(this.a)// 2
// }
// foo();
// console.log(a);// 2

// let obj1 = {
//   name:'obj1'
// }

// let obj2 = {
//   name:'obj2'
// }

// let obj3 = {
//   name: 'obj3',
//   foo: function(other) { 
//     console.log(this.name, other);
//   }
// }

// obj3.foo(3);// obj3 3


// 4.构造函数调用

// function foo () {
// }

// foo.prototype.name = 'hello world';

// let b = new foo();
// console.log(b.name);// hello world



debugger
var a = 1;
debugger
this.b = 3;
let c = 4;
function fun () {
  debugger
 
  this.a = 2;
  console.log('函数内的this:', this);
  console.log(this.a)
}

fun();
debugger
console.log('函数外的this.a:', this.a);
console.log('函数外的this:',this)
console.log(a);