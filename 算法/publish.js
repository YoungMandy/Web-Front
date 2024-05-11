function EventEmitter() {
  const events = {};

  // 监听
  this.on = function (key, fn) {
    if (!events[key]) {
      events[key] = [];
    }
    events[key].push(fn);
  };

  //触发
  this.emit = function (key, ...args) {
    if (!events[key]) return;

    const queue = events[key];
    queue.forEach((fn) => fn.apply(this, args));
  };

  //移除
  this.off = function(key, fn) {
    
    if (!events[key]) return;

    const queue = events[key];
    
    const index = queue.findIndex((item) => item === fn);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  };
  this.destroy = function () {
    events = null;
  };
}

const listen = function (args) {
  console.log('click', args);
};

const observer = new EventEmitter();
observer.on('click',listen);
observer.on('click',listen);
observer.on('click',listen);
observer.on('click',listen);

observer.emit('click',888);
observer.emit('click',3);
observer.emit('click',6);
observer.emit('click', 9);

observer.off('click', listen);


console.log('%%%%')
observer.emit('click', 9);


