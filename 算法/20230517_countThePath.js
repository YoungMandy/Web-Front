function countPaths (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const opt = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

  for (let i = rows - 1; i >= 0; i--){
    for (let j = cols - 1; j >= 0; j--){
      if (grid[i][j] === 1) { // 遇到了障碍物
        opt[i][j] = 0;  
      } else if (i === rows - 1 && j === cols - 1) { // 终点
        opt[i][j] = 0;
      } else if (i === rows - 1 || j === cols - 1) { // 只能往右走或者往下走
        opt[i][j] = 1;
      } else {
        opt[i][j] = opt[i + 1][j] + opt[i][j + 1];// 下和右的加起来就是
      }
    }
  }

  const res = opt[0][0];
  console.log(res);
  return res;
}


let mat = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

countPaths(mat);