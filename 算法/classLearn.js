


class Point{
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  a = 1;

  toString () {
    return `${this.x}, ${this.y}`;
  }
}

const c = new Point(1, 2);
console.log(c.a);
// 类的属性和方法，除非显式定义在其本身（this对象上）,否则都是定义在原型上

console.log(typeof Point);
console.log(Point === Point.prototype.constructor);// 类本身指向构造函数

// 类的所有方法都定义在类的prototype属性上面
// 类内部所有定义的方法，都是不可枚举的，而ES5的prototype上的方法是可以被枚举的
console.log(Object.keys(Point.prototype))

// function Point1 (x,y) {
//   this.x = x;
//   this.y = y;
// }

// Point1.prototype.toString = function() {
//   return `${this.x}, ${this.y}`;
// }
// Point1.prototype.hello = function() {
//   return `${this.x}, ${this.y}`;
// }

// var p = new Point1(1, 2);
// console.log(Object.keys(Point1.prototype))
// 类必须使用new调用，否则会报错。这是他和普通函数的一个主要区别，后者不用new 也可以执行。

var p1 = new Point(2, 3);
var p2 = new Point(3, 2);

console.log(p1.__proto__ === p2.__proto__)
// 与ES5一样，类的所有实例共享一个原型对象

// 实例对象的属性可以在class的顶层进行定义
class foo {
  bar = 'hello';
  baz = 'world';

  constructor () {
    
  }
}
// 类的属性名，可以用表达式
let methodName = 'getArea';
class square{
  constructor (length) {
    
  }
  [methodName] () {
    
  }
}

const myClass = class Me{
  getClassName () {
    return Me.name;
  }
}

// 采用class表达式，可以写出立即执行的class
let person = new class {
  constructor (name) {
    this.name = name;
  }
  sayName () {
    console.log(this.name);
  }
}('张三');
person.sayName();// 张三

// 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就被称为“静态方法”
class Foo{
  static classMethod () {
    return 'hello';
  }
}
console.log(Foo.classMethod());
var foo = new Foo();
foo.classMethod();

// 如果静态方法包含this关键字，这个this指的是类，而不是实例
class Foo{
  static bar () {
    this.baz()
  }
  static baz () {
    console.log('hello')
    return 'hello';
  }
  baz () {
    console.log('world');
    return 'world'
  }
}

// Foo.bar();

// 父类的静态方法，可以被子类继承
class Bar extends Foo{
  static classMethod () {
    return super.baz() + 'too'
  }
}
Bar.classMethod();

class IncreasingCounter{
  #count = 0;
  get value () {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment () {
    this.#count++;
  }
}
const counter = new IncreasingCounter();
// counter.#count // 报错
// counter.#count = 42 // 报错
console.log(IncreasingCounter.#count);

