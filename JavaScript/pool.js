/*
 * @desc:
 * @param:
 * @return:
 * @Author: huili.local
 */function asyncPool(max = 6) {
  let count = 0;
   let queue = [];
   debugger

  return function (fn) {
    const handle = function(fn) {
        count++;
        fn().finally(() => {
          count--;
          if (queue.length) {
            let job = queue.shift();
            job();
          }
        });
    };

    
    if (count < max) {
      count++;
      fn().finally(() => {
        count--;
        if (queue.length) {
          let job = queue.shift();
          job();
        }
      });
    } else {
      queue.push(()=>handle(fn));
    }
  };
}

const pool = asyncPool(2);
pool(() => {
  return new Promise((resolve, reject) => resolve(1));
});
pool(() => {
  return new Promise((resolve, reject) => resolve(2));
});
pool(() => {
  return new Promise((resolve, reject) => resolve(3));
});
pool(() => {
  return new Promise((resolve, reject) => resolve(4));
});
pool(() => {
  return new Promise((resolve, reject) => resolve(5));
});
pool(() => {
  return new Promise((resolve, reject) => resolve(6));
});
pool(() => {
  return new Promise((resolve, reject) => resolve(7));
});
