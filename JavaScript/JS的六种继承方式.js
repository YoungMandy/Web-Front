// 1. 原型链继承
// function Parent () {
//   this.name = 'Parent';
// }

// Parent.prototype.sayHi = function() {
//   console.log('I am ' + this.name);
// }

// function Child () {
//   this.name = 'Child';
// }

// Child.prototype = new Parent();// new Parent()返回的默认对象，其[[Prototype]]会自动链接到Parent.prototype上

// let child = new Child();
// child.sayHi();

//2. 构造函数继承
//在子函数内部调用父函数的构造函数来实现继承
// function Parent (name) {
//   this.name = name;
// }

// Parent.prototype.sayHi = function() {
//   console.log('hello, I am ' + this.name);
// }

// function Child () {
//   Parent.call(this,'Child');//
// }

// let child = new Child();
// console.log('child: ' + child.name);
// child.sayHi();//TypeError: child.sayHi is not a function
// 优点，解决了原型链继承不能传参的问题和父类的原型共享问题
// 缺点，无法实现函数的复用，在父类原型中定义的方法，对子类型也是不可见的


// 3. 原型链式继承和组合继承(经典继承)
// function Parent (name) {
//   this.name = name;
// }

// Parent.prototype.sayHi = function() {
//   console.log('I am ' + this.name);
// }

// function Child (name) {
//   Parent.call(this, name);// 对父类的构造调用
// }

// Child.prototype = new Parent();// 再次构造调用实现原型链关联
// Child.prototype.construct = Child;
// let child = new Child('child');
// child.sayHi();
// 优点：这种方式可以实现属性和方法的继承，
// 缺点：在创建子对象时会调用两次付对象的构造函数，有一定的性能开销

// 4.原型链式继承
// 创建一个临时的构造函数实现继承
// function createObject (parent) {
//   function F () { };
//   F.prototype = parent;
//   return new F();
// }

// let parent = {
//   name: 'parent',
//   sayHi: function() {
//     console.log('Hello,I am ' + this.name)
//   }
// }

// let child = createObject(parent);
// child.name = 'child';
// child.sayHi();
// 缺点:父对象的所有引用属性会被所有子对象共享

// 5.寄生式继承
// 在原型式继承的基础上，对继承的对象进行扩展
// function createObject (parent) { 
//   let child = Object.create(parent);
//   child.sayHi = function() {
//     console.log('Hello,I am ' + this.name);
//   }
//   return child;
// }
// const parent = {
//   name:'Parent'
// }

// const child = createObject(parent);
// child.name = 'Child';
// child.sayHi();
// 缺点：父对象上的引用属性会被所有子对象所共享

// 6.ES6的class继承
class Parent {
  constructor () {
    this.name = 'Parent';
  }
  sayHi () {
    console.log('Hello,I am ' + this.name);
  }
}

class Child extends Parent { 
  constructor (name) {
    super();// 调用父类的构造函数
    this.name = 'Child';
  }
}
let child = new Child();
child.sayHi();



