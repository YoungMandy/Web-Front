// js主要有六中继承方式
// 1. 原型链
// const Parent = function(){
//   this.name = "Parent";
//   this.obj = { a: 1, b: 2 };

// }
// Parent.prototype.sayHi = function() {
//   console.log('hi, ' + this.name);
// }

// const Child = function() {
//   this.name = "Child";
// }

// Child.prototype = new Parent();
// const child = new Child();
// child.sayHi();
// child.obj.a = 4;
// console.log(child.__proto__);
// console.log(Object.getPrototypeOf(child));

// const A = {
//   text: {
//     a: 1,
//     b:2
//   }
// }

// const B = Object.create(A);
// B.text.a = 3;
// console.log('A', A);
// console.log('B', B);
// 缺点:父对象的引用类型的数据可能会无意间被子对象所修改
// 2. 构造
// function Parent (name) {
//   this.name = name;
//   this.hello = function() {
//      console.log('Hello,' + this.name);
//   }
// }
// Parent.prototype.sayHi = function() {
//   console.log('hi,'+ this.name)
// }

// function Child () {
//   Parent.call(this,'child');
// }

// const child = new Child();
// // child.sayHi();
// console.log(child);
// child.hello = function() {
//   console.log('helloChild,'+ this.name)
// }
// const parent = new Parent('parent');
// parent.hello();
// child.hello();
// 构造继承通过调用父类的构造方法,可以访问到父类的属性，无法访问到父类prototype上绑定的函数，因为调用了父类的构造方法，在子类修改父类上同名属性，不会影响到父类

// new 的构造调用做的事情
// 1.创建一个新对象
// 2.对象的[[Prototype]]链接到构造函数的prototype上
// 3.this指向这个新对象
// 4.如果没有默认返回，就返回这个对象

// 3. 组合(原型链 + 构造)
// function Parent (name) {
//   this.name = name;
//   this.hello = function() {
//     console.log('parent hello ' + this.name)
//   }
// }

// Parent.prototype.hi = function() {
//   console.log('hi ' + this.name);
// }

// function Child (name) {
//   Parent.call(this, name);
// }
// Child.prototype = new Parent();
// const child = new Child('child');
// child.hello = function() {
//   console.log('child hello ' + this.name);
// };
// child.hello();
// child.hi();
// const parent = new Parent('parent');
// parent.hello();
// 优点，子类继承了父类的属性和方法，且子类修改与父类同名的应用属性，不会影响到父类
// 缺点，调用了两次父类的构造方法，有一定的性能消耗
// 4. 寄生
// function objectClone (parentObj) {
//   const res = Object.create(parentObj);
//   res.sayHi = function sayHi () {
//     console.log('hello',this.name)
//   }
//   return res;
// }
// const parent = {
//   name:'parent',
//   a: 1,
//   b: {
//     text1: 1,
//     text2:2,
//   }
// }
// const child = objectClone(parent);
// console.log(child);
// child.b.text1 = 3;
// child.name = 'child';
// console.log(parent);
// child.sayHi();
// 缺点：子类会修改父类上的引用类型
// 5. 原型式
// function createObject (parent) {
//   function F () { };
//   // F.prototype = parent;
//   Object.setPrototypeOf(F.prototype, parent);
//   return new F();
// }
// const parent = {
//   name:'parent',
//   a: 1,
//   b: {
//     text1: 1,
//     text2:2,
//   }
// }
// const child = createObject(parent);
// child.b.text1 = 5;
// child.name = 'child';
// console.log(parent);
// 缺点，会修改父类的引用属性
// 最好的是
// function Parent (name) {
//   this.name = name;
//   this.hello = {
//     a: 1,
//     b:2
//   }
// }
// Parent.prototype.sayHi = function() {
//   console.log('Hello ',this.name)
// }
// function Child (name) {
//   Parent.call(this,name)
// }
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// const child = new Child('child');
// const parent = new Child('parent');
// child.sayHi();
// parent.sayHi();
// child.hello.a = 9;
// console.log('child', child);
// console.log('parent', parent);
// 6. ES6的class继承
class Parent{
  c = 0;
  constructor (name) {
    this.name = name;
    this.obj = {
      a: 1,
      b: 2
    }

  }
  static a () {
    console.log('a')
  }
  b () {
    console.log('b')
  }
}

class Child extends Parent{
  constructor (name) {
    super(name);
  }
}
const child = new Child('child');
child.obj.a = 9;
console.log('child', child);
const parent = new Parent('parent');
console.log('parent', parent);
console.log(Parent.c);
// child.a();
