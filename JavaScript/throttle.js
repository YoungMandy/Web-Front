function throttle (fn, gap) {
  let previous = 0;
  return function(...args) {
    const now = Date.now();
    if (now - previous > gap) {
      fn.apply(this,args);
      previous = now;
    }
  }
}

const obj = { name: 'Alice' };
const obj2 = { name: 'Bob' };

function myFunc (a, b) {
  debugger
  console.log(this.name + ' says ' + a + ' ' + b);
}
const throttledFunc = throttle(myFunc, 5000);


throttledFunc.call(obj2, 'Hello', 'world');

// var name = 123;

// myFunc('Hello', 'world');
