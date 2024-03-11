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


function Person(name, age, job){ 
 
 //创建要返回的对象
 var o = new Object(); 
 
 //可以在这里定义私有变量和函数
 //添加方法
 o.sayName = function(){ 
 console.log(name); 
 console.log(job); 
 }; 
 
 //返回对象
 return o; 
}

var friend = Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); //"Nicholas"

var friend2 = Person('Nicholas', 290, 'Softwar3e Engineer'); 
friend2.sayName(); //"Nicholas"