// JavaScript中的对象有一个特殊的prototype 内置属性，其实就是对其他对象的引用。
// "use strict";
// var anotherObject = {
//   a: 2,
//   get foo ()
//   {
//     return this.a;
//   },
//   set foo (val)
//   {
//     console.log('调用setter')
//   }
// }

// // Object.defineProperty(anotherObject, "foo", {
// //   writable: true,
// //   configurable: true,
// //   value:'ddd',
// //   enumerable:true,
// // })

// // 创建一个关联到anotherObject的对象
// var myObject = Object.create(anotherObject);
// console.log(myObject.a);

// console.log(Object.keys(myObject));

// for (let key in myObject)
// {
//   console.log('for in key', key);
// }
// // 对对象进行for in 循环和 in操作都会查找原型链

// console.log('a' in myObject);

// myObject.a ++;

// console.log(anotherObject.a)

// myObject.foo = "bar"
// console.log(myObject)
// console.log(anotherObject)

// 所有普通的prototype 链最终都会指向内置的Object.prototype

// // 所有函数默认都会拥有一个名为prototype的公有且不可枚举的属性，它会指向另一个对象

// function Foo ()
// {
//   console.log("这是 Foo函数")
// }

// var a = new Foo();

// console.log(Object.getPrototypeOf(a) === Foo.prototype)

// // 在JavaScript 中，没有类的复制机制。你不能创建一个类的多个实例，只能创建多个对象，它们prototype关联的是同一个对象。但是在默认情况下并不会进行复制，因此这些对象之间并不会完全失去联系，它们是互相关联的。

// // new Foo()这个函数调用实际上并没有直接创建关联，这个关联只是一个意外的副作用。new Foo()只是简介完成了我们的目标，一个关联到其他对象的新对象


// // 在JavaScript中，我们并不会将对象复制到另一个对象，只是让它们关联起来，这个机制通常被称为原型继承

// // “继承”这个词会让人产生非常强的心理预期。仅仅在前面加上“原型”并不能区分出JavaScript 中和类继承几乎相反的行为，因此在过去的20年中造成了极大的误解。

// // 继承意味着复制操作，JavaScript(默认)并不会复制对象属性，相反，JavaScript会在两个对象之间创建一个关联，这样一个对象可以通过委托访问另一个对象的属性和函数。

// // 还有个偶尔会用到的JavaScript术语差异继承。基本原则是在描述对象行为时，使用其不同于普遍描述的特质。

// // 但是和原型继承一样，差异继承会更多的是你脑中构建出的模型，而非实际情况，它忽略了一个事实，那就是对象B实际上并不是被差异构造出来的，我们只是定义了B的一些指定特性，其他没有定义的东西都变成了“洞”.而这些洞(或者说缺少定义的空白处)最终会被委托行为“填满”。

// // new 会劫持所有普通函数并用构造对象的形式来调用它

// // Foo.prototype.constructor 默认指向Foo


// function Foo (who)
// {
//   this.me = who;
// }

// Foo.prototype.identify = function()
// {
//   return "I am " + this.me;
// }

// function Bar (who)
// {
//   Foo.call(this,who)
// }

// // Bar.prototype = Object.create(Foo.prototype);
// Object.setPrototypeOf(Bar.prototype, Foo.prototype);

// Bar.prototype.speak = function()
// {
//   console.log("Hello, " + this.identify() + ".")
// }

// var b1 = new Bar("b1");
// var b2 = new Bar("b2");

// b1.speak();
// b2.speak();

// // 闭包是在词法作用域外，能被其他函数调用的变量的集合
// Foo = {
//   init: function(who)
//   {
//     this.me = who;
//   },
//   identify: function()
//   {
//     debugger
//     return "I am " + this.me;
//   },
//   speak : function()
//   {
//     debugger
//   console.log("Hello, " + this.identify() + ".");
// }
// };

// Bar = Object.create(Foo);


// var b1 = Object.create(Bar);
// b1.init("b1");

// var b2 = Object.create(Bar);

// b2.init("b2");
// b1.speak();
// b2.speak();


// const a = {
//   text:"原型链测试"
// }

// // 将b的[[Prototype]]指向a
// const b = Object.create(a);

// console.log("text" in b) // true

// for (let k in b)
// {
//   console.log(k) // text
// }

// // 闭包研究
// function getInit()
// {
//   var b = 
//   {
//     startTime: 1,
//     endTime: null,
//     name: null, 
//     school:null 
//   }

//   function Fn ()
//   {
//     debugger
//     console.log('hhh');
//     console.log(b); // 注释掉对b的访问就没有闭包了
//   }

//   return {Fn,b};
// }

// const e = getInit();
// debugger

// console.log(e.b);
// console.log(e.Fn());// 没有调用这个函数也没有闭包，因为没有产生要访问某个函数域里变量的需求

// const b = function() {
//   kdkdkd:777
// }

// let Foo = function()
// {
  
//   var c = 1;
//   function changeC(){
//     this.c = this.c + 1
//   }
//   // return { changeC, c };
// }
// const a = new Foo();


// Foo.prototype = Object.create(b.prototype)
// debugger



// let Foo = function () {
//   console.log('123');
// };
// const a = new Foo();

// console.log(Object.getPrototypeOf(a) === Foo.prototype);

// debugger;
// console.log(a.__proto__);

// Foo.prototype = { h: 1 }

// console.log(a.constructor === Foo) // false
// // debugger
// console.log(a.constructor === Object) // true

// console.log(Object.getPrototypeOf(a) === Foo.prototype);
// console.log(Object.getPrototypeOf(a) === Object.getPrototypeOf(b));

// debugger;
// console.log(a.__proto__ === b.__proto__);


// b.changeC();
// b.changeC();
// b.changeC();

// a.changeC();

// debugger
// console.log('\n a的遍历');
// for (let key in a)
// {
  
//   console.log(key,a[key])
// }
// console.log('\n b的遍历');
// for (let key in b)
// {
  
//   console.log(key,b[key])
// }

// const aFunction = function a() {
  
// }
// const bFunction = function b() {
 
// }

// ES6开始可以直接修改bFunction.prototype
// Object.setPrototypeOf(bFunction.prototype, aFunction.prototype)

// const a = {
//   a:123
// }
// const b = {
//    b:45
//  }

//  //ES6开始可以直接修改将b的[[Prototype]] 指向a
// Object.setPrototypeOf(b, a);

// const a = {
//   aaa:223
// }

// function NothingSpecial() {
//   console.log("Don't mind me");
// }

// let a = new NothingSpecial();
// console.log(a);

function Foo (name)
{
  this.name = name;
}

Foo.prototype.myName = function()
{
  return this.name;
}



function Bar (name, label)
{
  Foo.call(this, name);
  this.label = label;

}

// 创建了一个新的Bar.prototype对象并关联到Foo.prototype
// 效果等同于Object.setPrototypeOf(Bar.prototype, Foo.prototype);
Bar.prototype = Object.create(Foo.prototype);

// 因为函数也是对象，所以可以这么干，但是实际意义不大,调用a.myName会报错
// Object.setPrototypeOf(Bar, Foo.prototype)

Bar.prototype.myLabel = function(x,y)
{
  return this.label;
}

var a = new Bar("a", "obj a");
// a.__proto__ = Foo.prototype;
console.log(a.myName()); // a
console.log(a.myLabel()); // obj a
debugger

console.log(a.__proto__ === Object.getPrototypeOf(a))

//__proto__的内部实现
// Object.defineProperty(Object.prototype, "__proto__",
//   {
//     get: function()
//     {
//       return Object.getPrototypeOf(this)
//     },
//     set: function(o)
//     {
//       Object.setPrototypeOf(this, o)
//       return o;
//     }
//   }
// )