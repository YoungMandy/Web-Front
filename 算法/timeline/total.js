// input: (nums = [1, 2, 3, 4, 5, 1]), (target = 5);
// [1, 2, 3, 4, 5, 1, 4], (target = 5);

const findTarget = function(nums, target) {
  const n = nums.length;

  if (n < 2) return [];
  const res = [];

  for (let i = 0; i < n; i++) {
    let a = nums[i];
    let b = target - a;

    if (!(a in map)) {
      // 当前数是第一次访问
      map[a] = 1;
    } else {
      // 当前数不是第一次访问
      map[a]++;
    }

    if (b in map) {
      res.push([a, b]);
      map[b]--;
      map[a]--;

      if (map[b] === 0) {
        delete map[b];
      }

      if (map[a] === 0) {
        delete map[a];
      }
    }
  }
  console.log('res', res)
  return res;
};

findTarget([1, 2, 3, 4, 5, 1, 4], 5);


/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 判断两个字符是否由相同字符构成
 *
 * @param string1 string字符串
 * @param string2 string字符串
 * @return bool布尔型
 */
function isGoodFriends (string1, string2) {
  // write code here
  const n = string1.length;
  const m = string2.length;
  let idx1 = 0;
  let idx2 = 0;
  let set = new Set();

  if (string1 == string2) {
    return false;
  }

  while (idx1 < n) {
    let a = string1[idx1];
    set.add(a);

    idx1++;
  }

  while (idx2 < m) {
    let b = string2[idx2];

    if (!set.has(b)) { // string1中不含有string2字符
      return false;
    }
    idx2++;
  }

  return true;
}

console.log(isGoodFriends('cmbchina1', 'ccanbmhi2'));

// 'cmbchina', 'ccanbmhi';
// "cmbchina","cmbchina"


// 考查输出
function F1 () {
  var a = 100;
  return function() {
    console.log(a);
  }
}

var f1 = F1();
var a = 200;
f1();
f1();



// 求1到100的和
function sum (min, max) {
  let s = 0;

  if (min > max) {
    return 0;
  } else if (min == max) {
    s = s + min;
  } else if (min < max) {
    s = s + min + max;
    min++;
    max--;
    s = s + sum(min, max);
  }

  return s;
}

console.log(sum(1, 100));



// 格式化输出
// 1000.32 => 1,000.32
// 100.5 => 100.5
function formatPrice (price) {

  const list = price.split(".");
  const interPart = list[0];// 整数部分
  let interList = interPart.split("");

  let len = interList.length;
  let str = '';
  let count = 0;

  while (len) {
    let ch = interList.pop();// 从尾部拿数

    if (count == 3) {//之前已经有三个数了
      str = ch + ',' + str;
      count = 0;
    } else {
      str = ch + str
    }

    count++;
    len--;

  }

  let res = list.length > 1 ? str + '.' + list[1] : str;

  console.log(res);
  return res;

}
formatPrice('10000000.32');
formatPrice('1000000.32');
formatPrice('10000.32');
formatPrice('1000.32');
formatPrice('100.32');
formatPrice('10.32');
formatPrice('1.32');



// [1, 2, 3, 4, 5, 6, 7, 8, 9] => [[1, 2, 3],[4, 5, 6],[7, 8, 9]]，把一个一维数组变成三个三个的二维数组

function splitArray (arr, len) {
  let res = [];

  while (arr.length) {
    res.push(arr.splice(0, len))
  }
  console.log(res)
  return res;

}

splitArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);


// 提供了一个数组结构的 data，要求实现一个query类，返回一个新的数组，query类中内部有 过滤、排序、分组 等操作，并且支持链式调用，调用最终的 execute 方法返回结果
class Query {
  constructor(data) {
    this.data = data || [];
    this.res = {};
  }

  filter(fn) {
    fn.apply(this, this.data);
    return this;
  }

  sort(fn) {
    fn.apply(this, this.data);
    return this;
  }

  groupBy(key) {
    this.data.forEach((item) => {
      let mapKey = item[key];
      if (!this.res[mapKey]) {
        this.res[mapKey] = [];
      }
      this.res[mapKey].push(item);
    });
    return this;
  }

  execute () {
    return this.res;
  };
}


const data = [
  { id: 1, name: 'Alice', age: 20, sex: 'girl' },
  { id: 2, name: 'Bob', age: 25, sex: 'boy' },
  { id: 3, name: 'Charlie', age: 30, sex: 'girl' },
  { id: 4, name: 'David', age: 35, sex: 'boy' },
  { id: 5, name: 'Ella', age: 40, sex: 'girl' },
];

const result = new Query(data)
  .filter((item) => {
    item.age > 25
  })
  .sort((a, b) => a.age - b.age)
  .groupBy('sex')
  .execute();

console.log(result);

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

  for (let i = 0; i < arr.length; i++) {
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





// 并发控制器
class Scheduler {

  max = 2;
  count = 0;
  queue = [];


  async add (promiseCreator) {
    this.count++;
    if (this.count > this.max) {
      await new Promise(resolve => {
        this.queue.push(resolve)
      })
    }

    return promiseCreator().finally(res => {
      this.count--;
      if (this.queue.length) {
        const resolve = this.queue.shift();
        resolve();
      }
      return res;
    })

  }

}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(
    () => timeout(time)
  )
    .then(() => {
      debugger
      console.log(order)
    })
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')


class MyObject {
  constructor (name) {
    this.name = name;
    this.queue = [];
    this.gap = 0;
    this.immediate = true;
    // 构造函数可以初始化对象状态
  }

  wait (gap) {
    // 这里使用setTimeout来模拟等待
    this.gap = gap;
    this.immediate = true;
    return this;
    // 返回this以允许链式调用
  }

  prewait (gap) {
    this.gap = gap;
    this.immediate = false;
    return this;
  }

  async run (action) {
    // 执行某个动作
    if (this.immediate) {
      console.log(`${this.name} do ${action}`);
      setTimeout(() => {

      }, this.gap);
    } else {
      setTimeout(() => {
        console.log(`${this.name} do ${action}`);
      }, this.gap)

    }
    // 返回this以允许链式调用
    return this;
  }
}

// 创建一个MyObject实例并使用链式调用

// obj.wait(10).run('action1');
const obj = new MyObject('hello');
obj.wait(10).run('action1');// 输出`{name} do {action}`,等待10秒
obj.prewait(1000).run('action2');// 等待10秒，输出`{name} do {action}`


// 给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// [−2,1,−3,4,−1,2,1,−5,4] // [4,-1,2,1]

function findMaxSum (nums) {
  const n = nums.length;

  if (n == 1) return nums[0];
  let max = nums[0];

  const f = new Array(n).fill(-Infinity).map(() => new Array(n + 1).fill(-Infinity));
  f[0][0] = nums[0];

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      f[i][j + 1] = Math.max(f[i][j] + nums[j], nums[j]);
      max = Math.max(max, f[i][j]);
    }
  }

  console.log(max);
  return max;
}

findMaxSum([-2, 1, -3, 4, -1, 2, 1, -5, 4])




