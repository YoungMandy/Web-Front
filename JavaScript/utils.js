function debounce(fn, gap, immediate) {
  let timer;
  return function () {
    let context = this;

    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => (timer = null), gap);
      if (callNow) {
        fn.apply(context, arguments);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, gap);
    }
  };
}


function throttle (fn, gap) {
  let previous = 0;
  return function() {
    const now = Date.now();

    if (now - previous > gap) {
      previous = now;
      fn.apply(this, arguments);
    }
  }
}
