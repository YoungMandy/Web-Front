Function.prototype.bind1 = function(bindObj) {
  let self = this;
  let args = [...arguments].slice(1);// 取1及后面的数

  return function(...rest) {
    return self.apply(bindObj, args.concat(rest));
  }
}

// ----------------------------------------------------------------
// 当前版本可以优化的地方：bind返回的函数可以作为构造函数调用，new 构造返回的对象的this默认指向的是构造函数的prototype

Function.prototype.bind2 = function(context,...rest) {
  let self = this;
  const fFound = function(...args) {
    // 如果是构造函数调用，返回对象的原型会指向构造函数的prototype
    // 判断返回的对象的this 的原型链上是不是有fFound,如果有，说明是new 构造函数出来的

    return self.apply(this instanceof fFound? this:context,rest.concat(args))
  }

  return fFound;
}

//----------------------------------------------------------------
// 当前版本的问题: 返回的对象的并没有实现原型继承
Function.prototype.bind3 = function(context, ...rest) {
  let self = this;
  const fFound = function(...args) {
    return self.apply(this instanceof fFound? this: context,rest.concat(args));
  }
  Object.setPrototypeOf(fFound.prototype, this.prototype);
  return fFound;
}

var name = 'Jack';
var Yve = {
    name: 'Yvette'
};
function person(age, job, gender) {
    this.work = '福报'; // 实例属性
    console.log(this.name, age, job, gender);
}
person.prototype.clockIn = function () {
    console.log(996);
}
var bindYve = person.bind3(Yve, 22, 'engineer');
var obj = new bindYve('female');
obj.work; // 福报
obj.clockIn(); // 996







