

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