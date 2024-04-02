class myPromise {
  static PENDING = 'pending'; //static代表的是Class上面的属性，而不是实例对象上的属性
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(fn) {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result) {
    if (this.PromiseState == myPromise.PENDING) {
      this.PromiseState = myPromise.FULFILLED;
      this.PromiseResult = result;
      this.onFulfilledCallback.forEach((callback) => callback(result));
    }
  }

  reject(reason) {
    if (this.PromiseState == myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED;
      this.PromiseResult = reason;
      this.onRejectedCallback.forEach((callback) => callback(reason));
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new myPromise((resolve, reject) => {
      if (this.PromiseState == myPromise.PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult);
              } else {
                let x = onFulfilled(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
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
            } catch (error) {
              reject(error);
            }
          });
        });
      }else if (this.PromiseState == myPromise.FULFILLED) {
        // 模拟放入微任务队列
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult);
            } else {
              let x = onFulfilled(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
          // onFulfilled(this.PromiseResult);
        });
      }else if (this.PromiseState == myPromise.REJECTED) {
        // 模拟放入微任务队列
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.PromiseResult);
            } else {
              let x = onRejected(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }

          // onRejected(this.PromiseResult);
        });
      }
    });

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
    throw new TypeError('Chaining cycle detected for promise');
  }
  if (x instanceof myPromise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      var then = x.then;

    } catch (error) {
       reject(error);
    }

    if (typeof then == 'function') {
      let called = false;

      try {

        then.call(x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );

      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
     resolve(x);
  }
}


// 测试代码
// let p1 = new myPromise((resolve, reject) => {
//   resolve(10);
// });
// p1.then((res) => {
//   console.log('fulfilled', res);
//   return 2 * res;
// }).then((res) => {
//   console.log('fulfilled', res);
// });

  myPromise.deferred = function () {
      let result = {};
     result.promise = new myPromise((resolve, reject) => {
        result.resolve = resolve;
          result.reject = reject;
     });
     return result;
  }

module.exports = myPromise;