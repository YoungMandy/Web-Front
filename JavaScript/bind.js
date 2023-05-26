Function.prototype.bind = function(bindObj) {
  let self = this;
  let args = [...arguments].slice(1);// 取1及后面的数

  return function(...rest) {
    return self.apply(bindObj, args.concat(rest));
  }
}