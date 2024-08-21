function throttle (fn, gap) {
  let timer;
  return function(...rest) {
    debugger
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, rest);
      debugger
      clearTimeout(timer);
      timer = null;
    }, gap);
  }
}

let num = 0;
function test (num) {
  
  console.log(num);
}

const a = throttle(test, 100);

a(1);
setTimeout(()=>a(2), 50)
setTimeout(()=>a(3), 90)
setTimeout(()=>a(4), 100)
setTimeout(()=>a(5), 140)
setTimeout(()=>a(6), 210)
setTimeout(()=>a(7), 100)

