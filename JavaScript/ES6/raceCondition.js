
// 竞态问题，又叫竞态条件(race condition),它出现的原因是无法保证异步操作不一定会按他们开始的顺序执行

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
  await Promise.resolve().then(()=> setTimeout(()=> console.log('timeout')));
debugger
  console.log('expired', expired);
}

let b = ajaxControl(ajax);
b();
debugger
b();

// ajaxControl 返回的a函数，可用使用外部父函数的cleanup变量，相当于有一个装了 cleanup变量的闭包，调试可以看到Closure(ajaxControl),即名为ajaxControl的闭包

// 第一次执行b(),ajaxControl 里调用cb的时候传onInvalidate变量给ajax方法，它是一个指向函数的指针，在ajax内部调用了onInvalidate函数，从而把ajaxControl函数中的cleanup变量指向箭头函数()=> expired,

// 执行到await的时候，会先交换控制权，等异步操作完成，再接着执行后面语句

// 接下来第二次b(),因为cleanup变量已经指向了箭头函数()=> expired,所以执行后expired 变为true,
// 而 cb(onInvalidate)执行，ajax函数重新入调用栈，这里新创建了一个叫expired的变量，初始值为false,因为没有操作把expired变量改为true,所以这个变量的输出值为false

// 所以最终两次输出的expired分别为true和false。
// await后面的语句恢复执行，Promise.then()创建微任务，SetTimeout创建宏任务
