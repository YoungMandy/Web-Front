// 防抖，一段时间只执行一次，如果重新触发，重新计时
function debounce (func, delay) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer);
    let callNow = !timer;

    timer = setTimeout(() => {
      timer = null;
    }, delay);
    callNow && func.apply(this);
  }
}

// 节流，一段时间内只执行一次
function throttle (func, delay) { 
  let prev = 0;
  return function() {
    let now = Date.now();
    if (now - prev > delay) {
      func.apply(this);
      prev = now;
    }
  }
}

