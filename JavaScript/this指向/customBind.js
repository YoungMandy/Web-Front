// 简单版本
function bind (fn, obj) {
  return function() {
    fn.apply(obj, arguments);
  }
}

// MDN提供的bind实现

// if (!Function.prototype.bind) {
//   Function.prototype.bind = function(oThis) {
//     if (typeof oThis !== 'function') {
//       throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
//     }
//     var args = Array.prototype.slice.call(arguments, 1), // 除去this指向的参数
//       fToBind = this,
//       fNOP = function () {},
//       fBound = function () {
//         return fToBind.apply(
//           this instanceof fNOP && oThis ? this : oThis,
//           args.concat(Array.prototype.slice.call(arguments))
//         );
//       };
    
//     fNOP.prototype = this.prototype;
//     fBound.prototype = new fNOP();

//     return fBound;
//   }  
// }

// Function.prototype.bind2 = function(context) {
//   const self = this;
//   const args = Array.prototype.slice.call(arguments, 1);// 除了this以外的参数
//   const fBound =  function() {
//     // 这里的arguments是指bind返回的函数传入的参数
//     var restArgs = [...arguments];
//     self.apply(this instanceof fBound ? this: context, args.concat(restArgs));
//   }

//   Object.setPrototypeOf(fBound.prototype, this.prototype);

//   return fBound;
// }

// var name = 'Jack';
// var Yve = {
//     name: 'Yvette'
// };
// function person(age, job, gender) {
//     return {
//         name: this.name,
//         age,
//         job,
//         gender
//     }
// }
// var jack = person(22, 'engineer', 'female');
// console.log(jack);
// // {name: 'Jack', age: 22, job: 'engineer', gender: 'female'}
// var bindYve = person.bind(Yve, 22, 'engineer');
// var Yvette = bindYve('female');
// console.log(Yvette);
// // {name: 'Yvette', age: 22, job: 'engineer', gender: 'female'}

// var bindYve2 = person.bind2(Yve, 22, 'engineer');
// var Yvette2 = bindYve2('female');
// console.log(Yvette2);
// // undefined



Function.prototype.bind3 = function(context) {
  const self = this;
  return function() {
    self.apply(context, arguments);
  }
}

Function.prototype.bind4 = function(...rest) { 
  const self = this;
  const obj = rest.shift();
  const fBound = function(...args) {
    // 返回的方法有可能被用作构造函数,这时候的this应该指向构造出来的实例
    return self.apply(this instanceof fBound? this: obj, rest.concat(args));
  }
  // 函数的构造调用返回的实例的原型链
  Object.setPrototypeOf(fBound.prototype, this.prototype);
  return fBound
}

Function.prototype.bind5 = function (...rest) {
  const self = this;
  const obj = rest.shift(); // 第一个参数是要绑定的this对象

  const fBound = function (...args) {
    // new 构造函数调用返回的对象,this指向实例本身
    return self.apply(this instanceof fBound ? this : obj, rest.concat(args));
  };

  // new 构造函数调用返回的实例原型链指向原来的函数原型
  Object.setPrototypeOf(fBound.prototype, this.prototype);

  return fBound;
};

Function.prototype.bind6 = function(...rest) {
  const self = this;
  const obj = rest.shift();

  const fBound = function(...args) {
    return self.apply(this instanceof fBound ? this : obj, rest.concat(args));
  }

  Object.setPrototypeOf(fBound.prototype, this.prototype);
  return fBound;
}

const obj1 = {
  name:"huili"
}

function returnObj(age = 18,gender ="female") {
  // return {
  //   name: this.name,
  //   age,
  //   gender
  // }

  console.log(this.name, age, gender);
}
returnObj.prototype.hi = () => console.log('hi');

const test1 = returnObj.bind(obj1);
const c1 = new test1(16);
console.log(c1);
c1.hi();

console.log('\n');

const test2 = returnObj.bind5(obj1);
const c2 = new test2(16);
console.log(c2);
c2.hi();

test2.prototype.hello = () => console.log('hello');
c2.hello();

c1.hello();// 这个是要访问异常

