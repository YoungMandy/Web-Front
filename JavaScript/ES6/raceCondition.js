function test1(cb) {
  let cleanup;
  function onInvalidate(fn) {
    cleanup = fn;
  }

  function a() {
    if (cleanup) {
      cleanup();
    }
    cb(onInvalidate);
  }

  return a;
}

async function test2(onInvalidate) {
  let expired = false;
  onInvalidate(() => (expired = true));

  await Promise.resolve().then(() => console.log('foo'));

  console.log('expired', expired);
}

// let a = test1(test2);
// a();
// a(); // 两次调用指向同一块内存

// test1(test2);// 出栈入栈，用了不同的内存

function ajaxControl (cb) {
  debugger
  let cleanup;
  
  function onInvalidate (fn) {
    cleanup = fn;
  }

  let a = () => { // 需要指向同一块内存空间的函数，
    debugger
    if (cleanup) {
      cleanup();
    }
    cb(onInvalidate)
  };
  return a;
}

async function ajax (onInvalidate) {
  let expired = false;

  onInvalidate(() => expired = true);
debugger
  await 1;
debugger
  console.log('expired', expired);
}

let b = ajaxControl(ajax);
b();
debugger
b();
