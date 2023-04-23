// 简单版本
function bind (fn, obj) {
  return function() {
    fn.apply(obj, arguments);
  }
}

// MDN提供的bind实现

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof oThis !== 'function') {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
    }
    var args = Array.prototype.slice.call(arguments, 1), // 除去this指向的参数
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          args.concat(Array.prototype.slice.call(arguments))
        );
      };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  }  
}