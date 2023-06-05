let salesOffices = {};// 定义售楼处
salesOffices.clientList = [];// 缓存裂变，存放订阅者的回调函数

salesOffices.listen = function(key,fn) {
  // 增加订阅者
  if (!this.clientList[key]) { 
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);// 订阅的消息加进缓存列表
}

salesOffices.trigger = function() {
  
  let key = Array.prototype.shift.call(arguments),// 取出消息类型
    fns = this.clientList[key];// 取出该消息对应的回调函数集合
  if (!fns || fns.length == 0) return;

  for (let i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments) // arguments是发布消息时带上的参数
  }
}

salesOffices.listen('squareMeter88', function (price, squareMeter) {
  // 小明订阅消息
  console.log('价格=' + price);
});

salesOffices.listen('squareMeter110', function (price, squareMeter) {
  // 小红订阅消息
  console.log('价格=' + price);
  
});

salesOffices.trigger('squareMeter88', 200000);
salesOffices.trigger('squareMeter110', 300000);

// 设计一个统用的发布订阅功能
const events = {
  clientList: [],
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    let key = Array.prototype.shift.call(arguments);
    fns = this.clientList[key];

    if (!fns || fns.length === 0) {// 没有绑定对应的消息
      return;
    }

    for (let i = 0, fn; fn = fns[i++];){
      fn.apply(this, arguments);
    }
  },
  remove: function(key, fn) {
    const fns = this.clientList[key];
    if (!fns) return;

    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应小溪的所有订阅
      fns && (fns.length = 0);
    } else {
      for (let l = fns.length - 1; l >= 0; l--) { 
        //反向建立订阅的回调函数列表
        let _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);// 删除订阅者的回调函数
        }
      }
    }
  }
}

// 定义一个installEvent函数，这个函数可以给所有对象都动态安装发布订阅功能
const installEvent = function(obj) {
  for (let i in events) {
    obj[i] = events[i];
  }
}

var salesOffices = {};
installEvent(salesOffices);
salesOffices.listen('squareMeter88', fn1 = function(price) {// 小明订阅消息
  console.log('价格=' + price);
})

salesOffices.listen('squareMeter88', fn2 = function(price) {// 小红订阅消息
   console.log('价格=' + price);
});
salesOffices.remove('squareMeter88', fn1);// 删除小明的订阅
salesOffices.trigger('squareMeter88', 200000);


// 发布订阅可以用一个全局的Event对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不知道消息会推送给那个订阅者，Event作为一个类似"中介者"的角色，把订阅者和发布者联系起来

const Events = (function() {
  let clientList = {},
    listen,
    trigger,
    remove;
  
  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function() {
    let key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return;
    }

    for (let i = 0, fn; fn = fns[i++];){
      fn.apply(this, arguments);
    }
  }

  remove = function(key, fn) {
    const fns = clientList[key];
    if (!fns) {
      return;
    } else {
      for (let l = fns.length - 1; l >= 0; l--) { 
        let _fn = fns[l];
        if (_fn === fn) {
          fns.splice
        }
      }
    }
  }
  return {
    listen,trigger,remove
  }
})()

Events.listen('squareMeter88', function(price) {
  console.log('价格=' + price);
})
Events.trigger('squareMeter88', 2000000);