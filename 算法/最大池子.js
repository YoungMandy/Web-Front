class maxPool{
  constructor (max, urls) {
    this.max = max;
    this.urls = urls;
  }

  getResult () {
    const res = [];
    let count = 0;
    const pool = [];

    return new Promise((resolve, reject) => { 
      for (let i = 0; i < this.urls.length; i++){
        getAjax(url)
      }

      async function getAjax (url) {

        count++;
        if (count >= this.max) {
          await pool.push(Promise.resolve())
        }

        fetch(url).finally((res) => {
          count--;
          if (pool.length) {
            job = pool.shift();
            job();
          }
          if (count === 0) {
            resolve(res);
          }
        })
      }
     

    })
  }
}

function asyncPool (max) {
  const tasks = [];
  const concurrent = 0;

  return async function(fn) {
    concurrent++;
    if (concurrent > max) {
      await new Promise(resolve => {
        tasks.push(resolve)
      })
    }

    return fn().finally(res => {
      concurrent--;
      if (tasks.length) {
        const resolve = tasks.shift();
        resolve();
      }
      return res;
    })
  }
}


function asyncPool (max) {
  const MAX = max;
  let count = 0;
  const queue = [];

  return async function(fn) {
    count++;
    if (count > MAX) { 
      await new Promise(resolve=> queue.push(resolve))
    }
    fn().finally(res => {
      count--;
      if (queue.length) {
        job = queue.shift();
        job();
      }
      return res;
    })
  }
}