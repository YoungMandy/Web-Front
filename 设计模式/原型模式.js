Object.prototype.sayHello = () => {
  console.log('Hello');
};

let Plane = function () {
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
  this.sayHi = function () {
    console.log('Hi');
  };
};

let plane = new Plane();

plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

let clonePlane = Object.create(plane);

console.log(JSON.stringify(clonePlane));
console.log(clonePlane.blood);
console.log(clonePlane.attackLevel);
console.log(clonePlane.defenseLevel);
clonePlane.sayHi();
clonePlane.sayHello();

Object.create =
  Object.create ||
  function (obj) {
    let F = function () {};
    F.prototype = obj; // 主要是要把构造出来的对象的原型指向obj

    return new F();
  };

Object.create = Object.create || function(obj) {
  var F = function() {
      
  }
  F.prototype = obj;
  return new F();
}

// new 构造函数调用会
// 1.创建一个tempObj对象
// 2.tempObj 对象的[[Prototype]] 会链接到构造函数的prototype
// 3.this指向会指向这个tempObj对象(相当于调用CreateFn.call(tempObj))
// 4.如果没有返回值会默认将tempObj对象进行返回
