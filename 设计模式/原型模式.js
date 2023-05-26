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
