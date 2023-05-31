Promise.prototype.allSettled = function(list) {
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