/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
var minimumTotal = function(triangle) {
  debugger

  const m = triangle.length;
  const n = triangle[m - 1].length;

  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));// 第i行j列的最小路径和

  f[0][0] = triangle[0][0];
  let res = triangle[0][0];

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      let left = 0;
      let right = triangle[i].length - 1;
      const cur = triangle[i][j];

      if (j == left) {
        f[i][j] = f[i - 1][0] + cur;

      } else if (j == right) {
        const prevRight = triangle[i - 1].length - 1;
        f[i][j] = f[i - 1][prevRight] + cur;
      } else {
        const l = j - 1;
        const r = j;
        const min = Math.min(f[i - 1][l], f[i - 1][r]);
        f[i][j] = min + cur;
      }
    }

  }

  let min = Infinity;
  for (let i = 0; i < n; i++) {
    min = Math.min(triangle[m - 1][i], min)
  }

  return min;

};
minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])