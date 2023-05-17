let p1 = new Promise((resolve, reject) => {
  resolve('成功');
  console.log('p1 resolved 之后');
  // throw new Error("让p1报一个错");
});

console.log('p1', p1);

let p2 = new Promise((resolve, reject) => {
  reject('失败');
  resolve('成功');
});

console.log('p2', p2);

let p3 = new Promise((resolve, reject) => {
  throw '报错';
});

console.log('p3', p3);

let myPromise1 = new Promise(() => {});
console.log('myPromise1', myPromise1);

let myPromise2 = new Promise((resolve, reject) => {
  let a = 1;
  for (let index = 0; index < 5; index++) {
    a++;
  }
});

console.log('myPromise2', myPromise2);

myPromise2.then(() => {
  console.log('myPromise2 执行了then');
});

let myPromise0 = new Promise();
console.log('myPromise', myPromise);


// const fs = require('fs');

// const getFile = (fileName) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     return fs.readFile(fileName, (err, data) =>
//     {
//       if (err)
//       {
//         reject(err);
//         return 
//       }
//       resolve(data);
//     })
//   })
// }


// let thenable = {
//   then: function(resolve, reject) {
//     resolve(42);
//   }
// }

// let p11 = Promise.resolve(thenable);
// p11.then((value) => {
//   console.log('Promise.resolve',value);
// })

// const p = Promise.reject(thenable);
// p.then(null,function(s) {
//   console.log("Promise.reject",s);
// })

//Promise 内部的错误不会影响外部的代码


