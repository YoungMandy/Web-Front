Function.prototype.bind = function(bindObj) {
  let self = this;
  let args = Array.prototype.slice.call(arguments)

  return function(...rest) {
    return self.apply(bindObj, args.concat(rest));
  }
}