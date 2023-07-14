Promise.allSettled = function(list) {
  const task = [];
  return new Promise(resolve => {
    list.forEach(element => {
      Promise.resolve(element).then(res => {
        task.push({ status: 'fulfilled', value: res });
        if (task.length === list.length) {
          resolve(task);
        }
      }).catch(err => {
        task.push({ status: 'rejected', reason: err });
        if (task.length === list.length) {
           resolve(task);
        }
      })
      
    });
  })
}

Promise.allsettled = function(list) {
  const task = [];
  return new Promise((resolve) => {
    list.forEach(element => {
      Promise.resolve(element).then(res => {
        task.push({ status: 'fulfilled', value: res });
        task.length === list.length && resolve(task);
        
      }).catch(err => {
        task.push({ status: 'rejected', reason: err });
        task.length === list.length && resolve(task);
      })
    })
  })
}

Promise.all = function(list) {
  const task = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    list.forEach(element,index => {
      Promise.resolve(element).then(res => {
        task[index] = res;
        count++;
        count === list.length && resolve(task);
      }).catch(err => {
        reject(err);
      })
    })
  })
}

Promise.race = function(list) {
  return new Promise((resolve, reject) => {
    list.forEach(element => {
      Promise.resolve(element).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  })
}