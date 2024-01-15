class EventBus{
  events: {};

  // 绑定注册事件
  on (eventName: string, fn: any) {
    if (this.events[eventName]) {
      this.events[eventName].push(fn)
    } else {
      this.events[eventName] =[fn]
    }
  }

  // 发布事件
  emit (eventName: string,...params) {
    const events = this.events[eventName];
    if (events && events.length > 0) {
      events.forEach(fn => fn(...params));
    }
  }

  remove (eventName: string) {
    if (this.events[eventName]) { 
      delete this.events[eventName];
    }
  }
}