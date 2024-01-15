class EventBus{
  events: {};

  constructor () {
    this.events = {};
  }

  emit (eventName:string) {
    if (this.events[eventName]?.length > 0) {
      const events = this.events[eventName];
      events.forEach(fn => fn());
    }
  }

  on (eventName, fn) {
     if (!(eventName in this.events)) {
       this.events[eventName] = [];
     }
     this.events[eventName].push(fn);
  }

  remove (eventName) {
    if (eventName in this.events) { 
       delete this.events[eventName];
    }
  }
}