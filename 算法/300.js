function lengthOfLIS (nums) {
  const n = nums.length;

  // 特殊情况处理
  if (n < 1) return 0;

  // 状态转移方程
  const f = new Array(n).fill(0).map(() => new Array(n).fill(0));// 从i到j的最长递增子序列的长度
  debugger

  // 用倒推，不需要考虑数组下标越界
  for (let i = n - 1; i >= 0; i--) {
    f[i][i] = 1;

    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[j + 1]) {
        f[i][j] = f[i][j + 1] + 1
      } else {
        f[i][j] = f[i][j + 1]
      }
    }
  }
  console.log(f)
  console.log(f[0][n - 1])
  return f[0][n - 1]


};

lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])

