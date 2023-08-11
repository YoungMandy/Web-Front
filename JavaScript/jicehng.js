// // 1.原型链继承
function Parent () {
  this.name = 'parent';
  this.text = 'other';
  this.obj = {
    text: 123
  }
}

Parent.prototype.sayHi = function() {
  console.log('Hello ' + this.name);
}

function Child () {
  this.name = 'child';
}

Child.prototype = new Parent();
const child = new Child();

// child.sayHi();

child.text = 'another';
child.__proto__.obj.text = '456';
// child.obj = '456';

console.log('child.obj:', child.obj);

console.log('child:', child);// { name: 'child', text: 'another' }
console.log(Object.keys(child)); // ['name', 'text]
console.log('obj' in child);// true
console.log(child.hasOwnProperty('obj'));// false

const parent = new Parent();

debugger

console.log('parent:', parent);// { name: 'parent', text: 'other', obj: { text: '123' } }
// 为什么原型链上的obj.text没有被改成'456'

// // 缺点：构造函数不能传参实现参数的共享


// 2.构造继承 (在子函数里调用父类的构造函数)
// function Parent (name) {
//   this.name = name;
// }

// Parent.prototype.sayHi = function() {
//   console.log('Hello' + this.name)
// }

// function Child (name) {
//   Parent.call(this,name)
// }

// 优点，实现了参数的共享，缺点，不能共享父类的方法

// 3. 组合继承
// function Parent (name) {
//   this.name = name;
// }
// Parent.prototype.sayHi = function() {
//   console.log('Hello ' + this.name);
// }

// function Child (name) {
//   Parent.call(this, name);
// }

// Child.prototype = new Parent();
// Child.constructor = Child;

// 优点：可以实现参数的共享，缺点：两次调用构造方法，有一定的性能上的开销

// 4.原型式继承
// createObject = function(parent){
//   function F ();
//   F.prototype = parent;
//   return new F;
// }

// const parent = {
//   text: 123,
//   obj: {
//     text: 234
//   }
// }

// const child = createObject(parent);
// 缺点： 父函数的引用属性会被所有的子类所共享

//5.寄生式继承
// function createObject (parent) {
//   function F () { };
//   F.prototype = parent;
//   F.prototype.sayHi = function() { };
//   return new F();
// }
// const parent = {
//   text: 123
// }
// const child = createObject(parent);

// 优点： 可以复制父类的属性和方法
// 缺点： 父对象的引用属性可以被子属性共享

// 6.ES6 的class 




