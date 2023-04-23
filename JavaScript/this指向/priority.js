// 1. 对象调用的call绑定的对比
// function foo () {
//   console.log(this.myName);
// }

// const obj1 = {
//   myName: "obj1",
//   foo:foo
// }

// const obj2 = {
//   myName: "obj2",
//   foo: foo
// }

// obj1.foo(); // obj1
// obj2.foo(); // obj2

// obj1.foo.call(obj2); // obj2
// obj2.foo.call(obj1); // obj1

// 由上可得,call绑定的优先级大于对象调用

// 2. new构造函数调用和对象调用的对比
// function foo (something) {
//   this.a = something;
// };

// let obj1 = {
//   foo: foo // 指向foo函数的指针,
// };

// let obj2 = {};
// obj1.foo(2);
// console.log(obj1.a); // 2


// obj1.foo.call(obj2, 3);
// console.log(obj2.a); // 3

// const bar = new obj1.foo(4);

// console.log(obj1.a); // 2
// console.log(bar.a); // 4

// 基于上面的例子可得,new 构造的优先级大于对象调用

// 3. new 构造函数调用与bind绑定的对比

// new 无法和call/apply 一起使用
function foo (something) {
  this.a = something;
}

const obj1 = {};
const bar = foo.bind(obj1);

bar(2);

console.log(obj1.a); // 2

const baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3

// bar 函数通过this将obj1.a的值改为了2, new bar(3)并没有改动obj1的值，说明这一操作this的指向并不是obj1对象。因为使用了new 绑定，我们得到了一个新的baz对象,并且baz.a的值是3

// 所以，可的new 构造函数的优先级大于bind 绑定





