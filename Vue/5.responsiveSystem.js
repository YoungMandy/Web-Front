// ### 第一版对象属性支持响应式
// // 存储副作用函数的桶
// const bucket = new Set();

// // 原始数据
// const data = { text: 'hello world' };

// // 对原始数据的代理
// const obj = new Proxy(data, {
//   // 拦截读取操作
//   get(target, key) {
//     // 将副作用函数effect添加到桶里
//     bucket.add(effect);

//     // 返回属性值
//     return target[key];
//   },
//   // 设置拦截操作
//   set(target, key, newVal) {
//     // 设置属性值
//     target[key] = newVal;

//     // 把副作用函数从桶里取出并执行
//     bucket.forEach(fn => fn());

//     // 返回true代表设置成功
//     return true;
//   },
// });

// // 副作用函数
// function effect () {
//   document.body.innerText = obj.text ? obj.text:'没有';
// }

// // 执行副作用函数，触发读取
// effect();

// // 1秒后修改响应式数据
// setTimeout(() => {
//   obj.text = "hello vue3";
// }, 1000);


// ### 第二版 支持任意的effect 函数名
// 存储副作用函数的桶
const bucket = new Set();
const data = { text: 'hello world' };
// 用一个全局变量存储被注册的副作用函数
let activeEffect;
// effect 函数用于注册副作用函数

function effect(fn){
  // 当调用effect注册副作用函数时，将副作用那个函数注册给activeEffect
  activeEffect = fn;

  // 执行副作用函数
  fn();
}


const obj = new Proxy(data, {
  get(target, key) {
    // 将activeEffect 中存储的副作用函数收集到"桶"中
    if (activeEffect) {
      // 新增
      bucket.add(activeEffect); // 新增
    }

    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    bucket.forEach((fn) => fn());

    return true;
  },
});

effect(
  // 一个匿名的副作用函数
  () => {
    console.log('effect run'); // 会打印两次
    document.body.innerText = obj.text;
  }
);

setTimeout(() => {
  // 副作用函数并没有读取noExist属性的值
  obj.notExist = "hello vue3";
}, 1000);
