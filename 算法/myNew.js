function myNew (...rest) {
  // 1.创建一个新的对象
  const obj = {};

  // 2.获取构造函数
  const Con = rest.shift(); // 函数是第一个参数

  // 3.将对象的原型链接到构造函数的prototype上
  Object.setPrototypeOf(obj, Con.prototype);

  // 4.构造函数执行，其this要绑定我们新创建的obj
  const result = Con.apply(obj, rest);

  // 5.判断返回对象
  return typeof result == 'object' && result !== null ? result: obj;
}

function Con(name) {
  this.text = "hello world";
  this.num = 10086;
  this.name = name;
}

const a = myNew(Con,'抹茶');

console.log(a);// Con { text: 'hello world', num: 10086, name: '抹茶' }
console.log(Object.getPrototypeOf(a) == Con.prototype);//true