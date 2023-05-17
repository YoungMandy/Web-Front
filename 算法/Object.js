function ObjectDemo ()
{
  // return "HUILI TEST"
  return {
    123: "HUILI TEST"
  }
}

// new 操作符会返回一个默认对象，如果函数内部没有返回对象，默认对象的[[Prototype]]链会自动关联到ObjectDemo.prototype, 使new 出来的对象能访问到ObjectDemo.prototype上的属性和方法
const a = new ObjectDemo();

ObjectDemo.prototype.text = function()
{
  return 'text';
}

//ObjectDemo本身作为一个对象，也能定义其他属性在上面
ObjectDemo.hello = function(val)
{
  return 'hello ' + val;
}

console.log('a:', a);
console.log('a变量的值的类型:', typeof a);// object

console.log('调用 ObjectDemo.hello(123):', ObjectDemo.hello(123)); // hello 123

Object.setPrototypeOf(a, ObjectDemo.prototype);
console.log('调用 a.text():', a.text()); // text

// a 对象本身的可枚举属性的数组
console.log('a 对象本身的可枚举属性的数组:', Object.keys(a)); // [ '123' ]

// hello属性 在a本身或者a的原型链上可以找到
console.log('hello属性 在a本身或者a的原型链上可以找到:', 'hello' in a); // false

// hello属性 在a对象本身可以找到
console.log(
  'hello属性 在a对象本身可以找到',
  a.hasOwnProperty('hello')
);// false

// text属性 在a本身或者a的原型链上可以找到
console.log('text属性 在a本身或者a的原型链上可以找到:', 'text' in a);// true


// hello属性 在ObjectDemo本身可以找到
console.log(
  'hello属性 在ObjectDemo本身可以找到',
  ObjectDemo.hasOwnProperty('hello')
);// true



const b = {};
// b关联到ObjectDemo.prototype后也能调用ObjectDemo.prototype上定义的方法
Object.setPrototypeOf(b, ObjectDemo.prototype);
console.log('b.text():', b.text());// text

const ArrayDemo = {
  prototype: {
    arrayDemoText: function () {
      console.log('ArrayDemo.prototype的arrayDemoText方法被调用');
    },
  },
};

// b关联到ArrayDemo.prototype后也能调用ArrayDemo.prototype上定义的方法
Object.setPrototypeOf(b, ArrayDemo.prototype);

b.arrayDemoText();// ArrayDemo.prototype的arrayDemoText方法被调用
