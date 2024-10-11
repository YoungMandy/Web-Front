const action = 'action';
const obj = new gap('hello');
obj.wait(10).run('action1');// 输出`{name} do {action}`,等待10秒
obj.prewait(8000).run('action2');// 等待10秒，输出`{name} do {action}`

class Gap {
  immediate = false;
  gap = 300;
  constructor (name) {
    this.name = name;
  }

  prewait (gap) {
    this.gap = gap;
    this.immediate = false;
    return this;

  }

  wait (gap) {
    this.gap = gap;
    this.immediate = true;
    return this
  }

  run (action) {
    if (this.immediate) {
      console.log(`${this.name} do ${action}`);
      setTimeout(() => {
        return this
      })
    } else {
      setTimeout(() => {
        console.log(`${this.name} do ${action}`);
        return this
      }, this.gap)
    }

  }
}




// 并发控制器
class Scheduler {

  max = 2;
  count = 0;
  queue = [];


  async add (promiseCreator) {
    this.count++;
    if (this.count > this.max) {
      await new Promise(resolve => {
        this.queue.push(resolve)
      })
    }

    return promiseCreator().finally(res => {
      this.count--;
      if (this.queue.length) {
        const resolve = this.queue.shift();
        resolve();
      }
      return res;
    })

  }

}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(
    () => timeout(time)
  )
    .then(() => {
      debugger
      console.log(order)
    })
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')


function ajaxController (urls, max) {
  let count = 0;
  const MAX = max || 3;
  const queue = [];
  const n = urls.length;
  const result = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < n; i++) {
      const url = urls[i]
      myfetch(url, i);
    }

    async function myfetch (url, i) {
      count++;
      if (count > MAX) {
        await queue.push(Promise.resolve());
      }

      fetch(url).then((res) => {
        count--;
        if (queue.length) {
          const job = queue.shift();
          job();
        }
        result[i] = { status: 'faild', value: res }
        if (count == 0) {
          resolve(result)
        }
      }).catch(e => {
        count--;
        result[i] = { status: 'faild', reason: e }
        if (count == 0) {
          resolve(result)
        }
      })
    }
  })
}