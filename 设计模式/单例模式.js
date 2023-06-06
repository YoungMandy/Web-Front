// 第一种实现单例
function Singleton(name) {
  this.name = name;
}
Singleton.prototype.getName = function () {
  console.log(this.name);
};
Singleton.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new F(name);
    }
    return instance;
  };
})();

let a = Singleton.getInstance('a');
let b = Singleton.getInstance('b');

console.log(a == b);

// 第二种实现单例的方式
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const c = Singleton.getInstance('seven1');
const e = Singleton.getInstance('seven2');

console.log(c == e);

var bar = {
  myName: 'meituan1',
  printName: function () {
    console.log(myName);
  },
};
function foo() {
  let myName = 'meituan2';
  return bar.printName;
}
let myName = 'meituan3';
let _printName = foo();
_printName();
bar.printName();
