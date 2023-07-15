// 一个异步任务队列，如果超过限制大小，其他任务需要等待
// 第一种情况：假设是ajax请求，一个ajax返回了就触发下一个ajax任务
// function asyncPool (max) {
//   const queue = [];
//   const MAX = max;
//   let count = 0;
//   return async function(fn) {
//     count++;
    
//     const controlFn = () =>
//       fn().finally((res) => {
//         count--;
//         if (queue.length) {
//           let newTask = queue.shift();
//           newTask();
//         }
//         return res;
//       });
    
//     if (count > MAX) {
//       return queue.push(controlFn);
//     }
//     return controlFn();
//   }

// }

// const pool = asyncPool(2);

// const task1 = async function() {
//  console.log('task1');
// }
// const task2 = async function() {
//  console.log('task2');
// }
// const task3 = async function() {
//   console.log('task3');
// }
// const task4 = async function() {
//   console.log('task4');
// }

// pool(task1);
// pool(task2);
// pool(task3);
// pool(task4);

// 第二种情况，利用协程await可以交出控制权的特点，在前面任务都执行完毕，才开始执行后面的任务
function asyncPool(max) {
  const MAX = max;
  let count = 0;
  return async function (fn) {
    count++;

    if (count > MAX) {
      await 1;// 交出控制权
    }

    return fn().finally((res) => {
      count--;
      return res;
    });

  };
}

const pool = asyncPool(2);

const task1 = async function () {
  console.log('task1');
};
const task2 = async function () {
  console.log('task2');
};
const task3 = async function () {
  console.log('task3');
};
const task4 = async function () {
  console.log('task4');
};

pool(task1);
pool(task2);
pool(task3);
pool(task4);