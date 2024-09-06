Promise.prototype.all = function(list){
  const n = list.length;
  const res = new Array(n);
  let count = 0;

  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < n; i++){
        Promise.resolve(list[i]).then(response => {
          res[i] = response;
          count++;

          if(count == n){
            resolve(res)
          }
          
        }).catch(e=>reject(e))
      }
      
    } catch (error) {
      reject(e)
    }
  })

}