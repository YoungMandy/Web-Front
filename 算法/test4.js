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

combine(4,2);