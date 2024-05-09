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

// function throttle(fn, gap) {
  
//   let flag = false;
//   return function(...args) {
//     if (flag) {
//        return;
//     } 
//     flag = true;
   
//     setTimeout(() => {
//       fn.apply(this, args);
//       flag = false;
//     }, gap);
//   }
// }

function throttle (fn, gap) {
  let flag = false;
  return function(...args) {
    if (flag) return;

    setTimeout(() => {
      flag = false;
      fn.apply(this, args);
    },gap)
  }
}
