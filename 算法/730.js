class MyObject {
  constructor (name) {
    this.name = name;
    this.queue = [];
    this.gap = 0;
    this.immediate = true;
    // 构造函数可以初始化对象状态
  }

  wait (gap) {
    // 这里使用setTimeout来模拟等待
    this.gap = gap;
    this.immediate = true;
    return this;
    // 返回this以允许链式调用
  }

  prewait (gap) {
    this.gap = gap;
    this.immediate = false;
    return this;
  }

  async run (action) {
    // 执行某个动作
    if (this.immediate) {
      console.log(`${this.name} do ${action}`);
      setTimeout(() => {

      }, this.gap);
    } else {
      setTimeout(() => {
        console.log(`${this.name} do ${action}`);
      }, this.gap)

    }
    // 返回this以允许链式调用
    return this;
  }
}

// 创建一个MyObject实例并使用链式调用

// obj.wait(10).run('action1');
const obj = new MyObject('hello');
obj.wait(10).run('action1');// 输出`{name} do {action}`,等待10秒
obj.prewait(1000).run('action2');// 等待10秒，输出`{name} do {action}`
