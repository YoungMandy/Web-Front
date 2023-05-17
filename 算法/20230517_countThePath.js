function countPaths (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let opt = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = cols - 1; j >= 0; j--) {
      if (grid[i][j] === 1) {// 障碍物
        opt[i][j] = 0;
      } else if (i === rows - 1 && j === cols - 1) {// 终点
        opt[i][j] = 0;
        
      } else if (i === rows - 1 || j === cols - 1) {// 下边缘或右边缘
        opt[i][j] = 1;
      } else {
        opt[i][j] = opt[i+ 1][j] + opt[i][j+ 1]; // 递推
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