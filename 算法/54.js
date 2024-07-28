/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  let minRow = 0;
  let maxRow = m - 1;

  let minCol = 0;
  let maxCol = n - 1;

  let visited = {};
  const res = [];
  let r = 0;
  let c = 0;

  function dfs (i, j) {
    r = i;
    c = j;
    const key = `${i}-${j}`;

    if (visited[key] != undefined) {
      return;
    }

    const x = matrix[i][j];
    debugger
    res.push(x);
    visited[key] = 1;

    if (i == minRow && j < maxCol) {
      dfs(i, j + 1);
      debugger
      minRow = minRow + 1;
    }

    if (j == maxCol && i < maxRow) {
      dfs(i + 1, j);
      
      maxCol == maxCol - 1;
      
    }

    if (i == maxRow && j > minCol) {
      
      dfs(i, j - 1)
      maxRow = maxRow - 1;
    }

    if (j == minCol && i > minRow) {

      dfs(i - 1, j)
      minCol = minCol + 1;
    }

    
  }

  dfs(0, 0);
  if (res.length < m * n) {
    dfs(r, c)
  }
  console.log(res);
  return res;

};

spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])