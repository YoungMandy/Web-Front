function asyncPool(max = 6) {
  let count = 0;
  let queue = [];

  return async function (fn) {


    const handle = function (fn) {
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
      queue.push(() => handle(fn));
    }
  };
}

const pool = asyncPool(2);
debugger;
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(1);
    resolve(1);
  });
});
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(2);
    reject(2);
  });
});
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(3);
    resolve(3);
  });
});
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(4);
    resolve(4);
  });
});
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(5);
    resolve(5);
  });
});
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(6);
    resolve(6);
  });
});
pool(() => {
  return new Promise((resolve, reject) => {
    console.log(7);
    resolve(7);
  });
});
