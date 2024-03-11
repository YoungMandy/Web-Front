// 1. 借用构造函数或者也叫做经典继承
// function SuperType (name) {
//   this.colors = ['red', 'green', 'blue'];
//   this.name = name
// }

// function SubType () {
//   // 继承了SuperType,这样每个SubType的实例会拥有自己的属性
//   SuperType.call(this,'hello');
// }


// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);
// console.log(instance1.name);


// let instance2 = new SubType();
// console.log(instance2.colors);
// console.log(instance2.name);
// 构造继承的问题： 方法都在构造函数中定义，因此函数复用就无从谈起

// 2.组合继承，有时候也叫做伪经典继承。
// 使用原型链实现对原型属性和方法的继承，而借用构造函数实现对属性实例的继承

// function SuperType (name) {
//   this.name = name;
//   this.colors = ['red', 'green', 'yellow'];
// }

// SuperType.prototype.sayName = function() {
//   console.log(this.name);
// }

// function SubType (name,age) {
//   // 继承属性
//   SuperType.call(this, name);
//   this.age = age;
// }
// //继承方法

// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function() {
//   console.log(this.age);
// }

// let instance3 = new SubType('Nicholas', 29);
// instance3.colors.push('black');
// console.log(instance3.colors);
// instance3.sayName();
// instance3.sayAge();

// let instance4 = new SubType('Greg', 27);
// console.log(instance4.colors);
// instance4.sayName();
// instance4.sayAge();
// 缺点：两次构造函数调用

// 3.原型链式继承
let person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
}

let anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends)


// 4.寄生组合式继承是最理想的继承范式
function SuperType (name) {
  this.name = name;
  this.colors = ['red','blue','green']
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
}

function SubType (name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SubType);

function inheritPrototype (subType, superType) {
  let prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

SubType.prototype.sayAge = function() {
  console.log(this.age);
}

