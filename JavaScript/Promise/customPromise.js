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
      } else if (this.PromiseState == myPromise.FULFILLED) {
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
      } else if (this.PromiseState == myPromise.REJECTED) {
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

  static resolve(value) {
    if (value instanceof myPromise) {
      return value;
    } else if (value instanceof Object && 'then' in value) {
      return new myPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    } else {
      return new myPromise((resolve) => {
        resolve(value);
      });
    }
  }

  static reject(reason) {
    return new myPromise((undefined, reject) => {
      reject(reason);
    });
  }
  static all(list) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(list)) {
        let res = new Array(list.length);
        let count = 0;

        if (list.length == 0) {
          return resolve(list);
        }

        list.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              count++;
              res[index] = value;
              if (count == list.length) {
                resolve(res);
              }
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      }
    });
  }

  static allSettled(list) {
    return new myPromise((resolve, reject) => {
      if (!Array.isArray(list)) {
        return reject(new TypeError('Promise.allSettled requires an array'));
      } else {
        let res = new Array(list.length);
        let count = 0;

        if (list.length == 0) return resolve(list);

        list.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              let obj = {
                status: 'fulfilled',
                value: value,
              };

              res[index] = obj;
              count++;

              if (count === list.length) {
                resolve(res);
              }
            },
            (reason) => {
              res[index] = {
                status: 'rejected',
                reason: reason,
              };
              count++;

              if (count == list.length) {
                resolve(res);
              }
            }
          );
        });
      }
    });
  }

  static any(list) {
    return new myPromise((resolve, reject) => {
      if (!Array.isArray(list)) {
        return reject(new TypeError('Argument is not iterable'));
      } else {
        return new myPromise((resolve, reject) => {
          let err = [];
          let count = 0;

          if (list.length == 0) {
            reject(new AggregateError('All Promises were rejected'));
          } else {
            list.forEach((item) => {
              myPromise.resolve(item).then(
                (value) => {
                  resolve(value);
                },
                (reason) => {
                  count++;
                  error.push(reason);

                  count == list.length && reject(new AggregateError(error));
                }
              );
            });
          }
        });
      }
    });
  }

  static race(list) {
    return new myPromise((resolve, reject) => {
      if (!Array.isArray) {
        return reject(new TypeError('Argument is not iterable'));
      } else {
        if (list.length > 0) {
          list.forEach((item) => {
            myPromise.resolve(item).then(resolve, reject);
          });
        }
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    this.then(callback, callback);
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
    x.then((y) => {
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
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
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
};

module.exports = myPromise;

/**
 * 验证Promise.race()方法
 */

// 数组全是非Promise值，测试通过
let p1 = myPromise.race([1, 3, 4]);
setTimeout(() => {
  console.log('p1 :>> ', p1);
});

// 空数组，测试通过
let p2 = myPromise.race([]);
setTimeout(() => {
  console.log('p2 :>> ', p2);
});

const p11 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const p22 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

// // 数组里有非Promise值，测试通过
myPromise.race([p11, p22, 10]).then((value) => {
  console.log('p3 :>> ', value);
  // Both resolve, but p22 is faster
});
// expected output: 10

// 数组里有'已解决的Promise' 和 非Promise值 测试通过
let p12 = myPromise.resolve('已解决的Promise');
setTimeout(() => {
  myPromise.race([p12, p22, 10]).then((value) => {
    console.log('p4 :>> ', value);
  });
  // expected output:已解决的Promise
});

// Promise.race的一般情况 测试通过
const p13 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const p14 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

myPromise.race([p13, p14]).then((value) => {
  console.log('p5 :>> ', value);
  // Both resolve, but promise2 is faster
});
