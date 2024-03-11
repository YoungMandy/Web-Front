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

SubType.prototype.getSuperValue = function() {
  return this.subproperty;
}

var instance = new SuperType();
console.log(instance.getSuperValue());


