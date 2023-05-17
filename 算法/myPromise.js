class myPromise
{
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor (func)
  {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = null;// 在执行resolve()或者reject()的时候会给结果赋值
    this.onFulfilledCallback = []; // 保存成功回调
    this.onRejectedCallback = []; // 保存失败回调
    
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error)
    {
      this.reject(error);
      
    }
  }

  resolve (result)
  { debugger
    if (this.PromiseState === myPromise.PENDING)
    {
      this.PromiseState = myPromise.FULFILLED;
      this.PromiseResult = result;
      this.onFulfilledCallback.forEach(callback => callback(result))
    }
  }

  reject (reason)
  {
    if (this.PromiseState === myPromise.PENDING)
    {
      this.PromiseState = myPromise.REJECTED;
      this.PromiseResult = reason;
      this.onRejectedCallback.forEach(callback =>
      {
        callback(reason);
      })
    }
  }

  then (onFulfilled, onRejected)
  {
    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    
    // if (this.PromiseState === myPromise.PENDING){
    //   this.onFulfilledCallback.push(() => {
    //       setTimeout(() =>
    //       {
    //          onFulfilled(this.PromiseResult);
    //       })
    //   });

    //   this.onRejectedCallback.push(() =>
    //   {
    //     setTimeout(() =>
    //     {
    //       onRejected(this.PromiseResult);
    //     })
    //   });
    // }
    // if (this.PromiseState === myPromise.FULFILLED){
    //   setTimeout(() =>{
    //     onFulfilled(this.PromiseResult);
    //   })
    // }
    // if (this.PromiseState === myPromise.REJECTED){
    //   setTimeout(() =>{
    //     onRejected(this.PromiseResult);
    //   });
    // }

    const promise2 = new Promise((resolve, reject) => {
      if (this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult);
            } else {
              let x = onFulfilled(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.PromiseResult);
            } else {
              let x = onRejected(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult);
              } else {
                let x = onFulfilled(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallback.push(() => { 
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.PromiseResult);
              } else {
                let x = onRejected(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          });
        })
      }
    })

    return promise2;
  }
  
}

/**
   * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
   * @param  {promise} promise2 promise1.then方法返回的新的promise对象
   * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
   * @param  {[type]} resolve   promise2的resolve方法
   * @param  {[type]} reject    promise2的reject方法
  */
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new TypeError("Chaining cycle detected for promise")
  }

  if (x instanceof myPromise) {
    x.then(y => {
      resolve ( promise2, y, resolve, reject)
    },reject)
  } else if (x !== null && typeof x === "object" || typeof x === "function") {
    try {
      var then = x.then;
    } catch (e) {
      return reject(e);
    }
    if (typeof then === "function") {
      let called = false;// 避免多次调用
      try {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
  
    
};


// // 测试代码
// const promise = new myPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 2000);
// })
// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
// })
// promise.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })
// promise.then(value => {
//     console.log(3)
//     console.log('resolve', value)
// })

let p1 = new myPromise((resolve, reject) => {
    resolve(10)
})
p1.then(res => {
    console.log('fulfilled', res);
    return 2 * res
}).then(res => {
    console.log('fulfilled', res)
}) 



