// let myPromise = new Promise();
// console.log('myPromise', myPromise); // 必须给Promise对象传入一个执行函数，否则会报错

class myPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(fn) {
    this.PromiseState = myPromise.PENDING; // 默认是pending状态
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
      this.onFulfilledCallback.forEach(callback => callback(result))
    }
  }

  reject(reason) {
    if (this.PromiseState == myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED;
      this.PromiseResult = reason;
      this.onRejectedCallback.forEach(callback => callback(reason))
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected == 'function' ? onRejected : reason => { throw reason };
    if (this.PromiseState == myPromise.PENDING) { 
      this.onFulfilledCallback.push(setTimeout(() => onFulfilled));
      this.onRejectedCallback.push(setTimeout(() => onRejected));
    }
    if (this.PromiseState === myPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.PromiseResult);
      })
    }

    if (this.PromiseState == myPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.PromiseResult);
      })
    }
  }
}

let promise1 = new myPromise((resolve, reject) => {
  resolve('这次一定');
});
promise1.then((res) => {
  console.log('res', res);
});

let promise2 = new myPromise((resolve, reject) => {
  reject('下次一定');
});
console.log(promise2);
