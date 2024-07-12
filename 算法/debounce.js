function debounce (func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}


function debounce1 (fn, gap, immediate) {
  let timer;

  return function(...args) {
    let context = this;
    let later = function() {
      timer = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }

    let callNow = immediate && !timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(later, gap);
    if (callNow) fn.apply(context, args);

  }
}

function throttle (fn, gap) {
  let prev = 0;
  return function(...args) {
    if(Date.now() - prev > gap) {
      fn.apply(this, args);
      prev = Date.now();
    }
  }
}

function throttle1 (fn, gap) {
  let prev = 0;
  return function(...args) {
    let context = this;
    let now = Date.now();
    if (now - prev > gap) {
      fn.apply(context, args);
      prev = now;
    }
  }
}

