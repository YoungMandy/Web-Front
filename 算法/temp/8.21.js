
// 字节飞书的面试题
// function throttle (fn, gap) {
//   let prev = 0;
//   return function(...rest) {

//     const now = Date.now();
//     if (now - prev > gap) {
//       fn.apply(this, rest);
//       prev = now;
//     }


//   }
// }


// function test (num) {
//   console.log(num);
// }

// const a = throttle(test, 100);
// a(1);

// setTimeout(() => a(2), 50)
// setTimeout(() => a(3), 100)
// setTimeout(() => a(4), 100)
// setTimeout(() => a(5), 140)
// setTimeout(() => a(6), 210)
// setTimeout(() => a(7), 100)

// 并发控制
function controller (urls, max, callback) {
  let count = 0;
  const n = urls.length;
  const queue = [];
  const result = new Array(n);
  debugger

  async function doRequest (url, index) {
    debugger
    count++;
    if (count >= max) {
      await new Promise((resolve) => queue.push(resolve))
    }
    doAction(url).then(res => {
      result[index] = {
        status: 'fulfilled',
        value: res
      }
    }).catch(err =>
      result[index] = {
        status: 'rejected',
        reason: err
      }
    ).finally(() => {
      count--;
      if (queue.length) {
        const job = queue.shift();
        job();
      }

      if (count == 0) {
        callback(result);
      }
    })
  }


  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    doRequest(url, i);
  }

}

function doAction (i) {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      setTimeout(() => {
        console.log(`任务${i}完成`);
        resolve(i);
      }, i * 100)
    } else {
      console.log(`任务${i}完成`);
      resolve(i);
    }

  })
}
function print (data) {
  console.log('end');
  console.log(data);
}

function test () {
  const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  controller(urls, 3, print)
}
test();
