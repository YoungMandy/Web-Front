function SuperType () {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
}

function SubType () {
  this.subproperty = true;
}


SubType.prototype = new SuperType();// 构造函数调用返回的对象[[Prototype]] 链接到SuperType.prototype上

SubType.prototype.getSubValue = function() {
  return this.subproperty;
}

var instance = new SubType();
instance.property = false;
console.log('getSuperValue', instance.getSuperValue());

console.log(instance instanceof SubType);
console.log(instance instanceof SuperType);
console.log(instance instanceof Object);

console.log(SubType instanceof Function)
console.log(Function instanceof Object);
console.log(Function.isPrototypeOf(instance))
console.log(Object.prototype.isPrototypeOf(instance))
console.log(Function.prototype.isPrototypeOf(SubType));


// 原型链可能带来的问题：
// 1. 整个原型链上的非预期的引用类型的值覆盖
// 2. 不能在构造函数中传递参数