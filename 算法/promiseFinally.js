Promise.prototype.allSettled = function(list) {
  const res = new Array(list.length).fill(null)
  

  if(!Array.isArray(list)) {
    return Promise.reject(new TypeError('list must be an array'));
  } else {
    let count = 0;
    list.forEach((item,index) => {
      Promise.resolve(item).then(res => {
        res[index] = ({ status: 'fulfilled', value: item })
        count++;
        if(count === list.length) {
          return Promise.resolve(res);
        }
      }, reject => {
        res[index] = { status: 'rejected', reason: reject };

        if(count == list.length) {
          return Promise.resolve(res);
        }
      })
    })

  }
}