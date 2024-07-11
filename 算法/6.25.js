//1. 请写出以下代码的执行顺序

async function async1 () {

  console.log("async1 start");

  await async2();// 创建微任务

  console.log("async1 end");

}

async function async2 () {

  console.log("async2");

}

console.log("script start");//1.直接打印输出



setTimeout(function() {

  console.log("setTimeout"); // 创建宏任务

}, 0);



async1();



new Promise(function(resolve) {

  console.log("promise1");

  resolve();

}).then(function() {

  console.log("promise2");

});

console.log("script end");

//
'script start'
"async1 start"
"async2"
"promise1"
"script end"
"async1 end"
"promise2"
"setTimeout"










// 2. 请写出以下代码的执行结果

// 给定两个整数n和k，返回范围[1,n]中所有可能的k个数的组合，可以按任意顺序返回答案；

/**

 *

示例1

输入：n = 4，k = 2

输出：[ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]

示例2

输入：n = 1，k = 1

输出：[ [ 1 ] ]

 *

 */




function combine (n, k) {
  let res = [];

  // 请实现

  function dfs (start, path) {
    debugger
    if (path.length == k) {
      res.push([...path]);
      return;
    }

    for (let i = start; i <= n; i++) {
      dfs(i + 1, path.concat(i))
    }
  }

  dfs(1, []);

  console.log(res);

  return res;

}









// 3. 柯里化函数实践并给柯里化函数进行类型标注
/**
 * params:number
 * return:number
 * **/

function carry (...rest) {

  return function(...args) {
    let arguments = rest.concat(args);
    let res = 0;
    for (let i = 0; i < arguments.length; i++) {
      res += arguments[i];
    }
    return res;
  }
}

console.log(carry(1)(2));
// sum(1)(2) = 3;








//4. 对象数组去重

/**

 *

const arr = [

  { a: 1, b: 2 },

  { a: 1, b: 2 },

  {

    a: 2,

    b: 2,

    c: {

      d: 1

    }

  },

  {

    a: 2,

    b: 2,

    c: {

      d: 1

    }

  }

]

*/

function getUniqueArray (arr) {
  const res = [];
  const map = {};

  for (let i = 0; i < arr.length; i++){
    let item = arr[i];
    let key = JSON.stringify(item);
    if (key in map) {
      continue;
    } else {
      res.push(item);
      map[key] = 1;
    }
  }
  console.log(res);
  return res;
}

const arr = [

  { a: 1, b: 2 },

  { a: 1, b: 2 },

  {

    a: 2,

    b: 2,

    c: {

      d: 1

    }

  },

  {

    a: 2,

    b: 2,

    c: {

      d: 1

    }

  }

]

getUniqueArray(arr);



