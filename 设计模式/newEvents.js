function EventEmitter () {
  this.events = {};

  // 监听函数
  this.on = function(key, fn) {
    if (!this.events[key]) {
      this.events[key] = [];
    }

    this.events[key].push(fn);
  }

  // 触发函数
  this.emit = function(key, ...args) {
    if (!this.events[key]) { // 没有注册过的就不处理
      return;
    }

    const events = this.events[key];// 取出所有的监听函数
    events.forEach(fn => fn.apply(this,args));
  }

  // 移除事件监听
  this.off = function(key) {
    
    if (!this.events[key]) {
      return;
    }
    
    const events = this.events[key];
    if (events.length) {
      events.shift(); //从头部删除
    }
   
  }

  this.removeAll = function() {
    this.events = {};
  }
}

const events = new EventEmitter();

function trigger (...args) {
  console.log('我是触发函数1',JSON.stringify(args))
}
function trigger2 (code) {
  console.log('我是触发函数2');
}

events.on('test',trigger)
events.on('test',trigger)
events.on('test',trigger)
events.on('test1',trigger2)
events.on('test1',trigger2)
events.on('test1',trigger2)
events.on('test2',trigger2)
events.on('test2',trigger2)
events.on('test2', trigger2)

events.emit('test',1,2,3);
events.emit('test1');
events.emit('test2');

events.off('test');
events.off('test1');
events.off('test2');
events.off('test');

events.removeAll();

