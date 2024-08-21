function throttle (fn, gap) {
  let prev = 0;
  return function(...rest) {

    const now = Date.now();
    if (now - prev > gap) {
      fn.apply(this, rest);
      prev = now;
    }


  }
}

let num = 0;
function test (num) {

  console.log(num);
}

const a = throttle(test, 100);

a(1);
setTimeout(() => a(2), 50)
setTimeout(() => a(3), 100)
setTimeout(() => a(4), 100)
setTimeout(() => a(5), 140)
setTimeout(() => a(6), 210)
setTimeout(() => a(7), 100)

