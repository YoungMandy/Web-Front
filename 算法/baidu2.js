// 第一种 用await的写法
// Promise.retry = function(promiseFn, times = 3) {
//   let retryFn = async(fn) => {
//     try {
//       res = await fn();
//       return res;
//     } catch (err) {
//       times--;
//       throw err;
//     }

//   }
//   // 补全代码
//   return new Promise(async (resolve, reject) => {
//     while (times) {
//       try {
//         const res = await retryFn(() => promiseFn());
//         resolve(res);
//         times = 0;
//       } catch (error) {
//         if (times - 1 === 0) {
//           reject(error);
//         }
//       }
//     }
//   });
// };

// 第二种用Promise
Promise.retry = function (promiseFn, times = 3) {
  // 补全代码
  const Fn = () => {
    return new Promise((resolve, reject) => {
      promiseFn()
        .then((res) => {
          resolve(res);
        })
        .catch(err => {
          times--;
          if (times === 0) {
             reject(err);
          } else {
            Fn().catch(err => reject(err))
          }
        });
    });
  }
  return Fn();
};


function getProm() {
  const n = Math.random();
  console.log(`random: ${n}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => (n > 1 ? resolve(n) : reject(n)), 1000);
  });
}

Promise.retry(getProm);
// .then((res) => {
//   console.log(`retry succ, retry num is: ${res}`);
// })
// .catch(() => {
//   console.log('retry fail');
// });
