Function.prototype.before = function(beforeFn) {
  var _self = this;// 保存原函数的引用
  return function() { // 返回包含了原函数的新函数的"代理"函数
    beforeFn.apply(this, arguments); // 执行新函数，修正this
    return _self.apply(this, arguments);// 执行原函数
    
  }
}

Function.prototype.after = function(afterFn) {
  var _self = this;

  return function() {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

var func = function() {
  console.log(2);
}

func = func.before(function() {
  console.log(1);
}).after(function() {
  console.log(3)
})

func();
// 这种使用AOP的方式来给函数添加职责，也是JavaScript语言中一种非常特别和巧妙的装饰者模式实现。


var cost1 = (function() {
  debugger
      let money = 0;
      for (let i = 0, l = arguments.length; i < l; i++){
        money += arguments[i];
      }
  return money;
  
})



var currying = function(fn) {
  debugger
  let args = [];
  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;// callee指向拥有arguments对象的函数
    }
  }
}
var cost = currying(cost1);

cost(100);
cost(200);
cost(300);
console.log(cost());

const strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};
const calculateBonus = function (level, salary) {
  return strategies[level](salary);
};
console.log(calculateBonus('S', 2000));