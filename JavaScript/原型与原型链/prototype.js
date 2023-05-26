// js 采用的是原型设计设计模式，可以理解为从A对象克隆一个B对象出来，ES5用的是
// B = Object.create(A);

// 后面出了新的api,可以用下面的语法创建对象之间的关联
// const objA = {
//   name: 'beauty',
//   gender:'female'
// }


// objB = Object.create(objA);
// objB.slogan = 'hello world';
// debugger

// --------------------------------

const FunA = function() {
  this.name = 'name';
  this.color= "color"
  // console.log('hello world');
}

const FunB = function() {
console.log('function B')

}

FunB.prototype.slogan = function(){
  console.log('hello world');
}
FunB.hi = function() {
  console.log('hi');
}

const b = new FunA();
// __proto__ 指向的是对象的构造函数的原型
console.log(b.__proto__ === FunB.prototype)
// Object.setPrototypeOf(FunB, FunA);
// Object.setPrototypeOf(FunA.prototype, FunB.prototype);
Object.setPrototypeOf(FunA.prototype,FunB)
// b.slogan();
b.hi();
debugger

// new F() 构造出来的对象是关联到F.prototype的
// 用对象的[[Prototype]]，还是函数的prototype关联，看具体设计的情况
// 函数有prototype的原因是方便了new 出来的对象共享一些方法和数据吧