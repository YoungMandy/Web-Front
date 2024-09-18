var maximalSquare = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  let res = 0;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && matrix[i][j] == 1) {
        res = Math.max(res, 1);
        visited[i][j] = 1;
        dfs(i, j,  i, i, j, j);
      }
    }
  }

  function dfs (i, j, x1, x2, y1, y2) {
    if (i == 1 && j == 2) {
      debugger
    }

    if (i < 0 || i > m - 1 || j < 0 || j > n - 1 || matrix[i][j] !== '1') {
      if ((x2 - x1) === (y2 - y1)) {
        debugger
       
        const area = (x2 - x1 + 1) * (y2 - y1 + 1);
        res = Math.max(res, area)
      }

      return;
    }


    dfs(i + 1, j, x1, i + 1, y1, y2)// 下
    dfs(i, j + 1, x1, x2, y1, j + 1)// 右
    dfs(i + 1, j + 1, x1, i + 1, y1, j + 1)// 右下
  }

  console.log(res);

  return res;

};

maximalSquare([
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"]
]);

