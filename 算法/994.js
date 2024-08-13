var orangesRotting = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const map = {};

  const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));

  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] == 1) {
        if (!dfs(i, j)) {
          debugger
          return -1;
        } else {
          count++;
        }
      }
    }
  }

  function dfs (i, j) {
    debugger
    visited[i][j] = true;
    let canChange = false;

    if (i - 1 >= 0 && j >= 0 && i <= m - 1 && j <= n - 1 && grid[i - 1][j] && grid[i - 1][j] == 2) {
      changeChild(i - 1, j);
      canChange = true;
    }
    if (i >= 0 && j >= 0 && i + 1 <= m - 1 && j <= n - 1 && grid[i + 1][j] && grid[i + 1][j] == 2) {
      changeChild(i + 1, j);
      canChange = true;
    }

    if (i >= 0 && j - 1 >= 0 && i <= m - 1 && j <= n - 1 && grid[i][j - 1] && grid[i][j - 1] == 2) {
      changeChild(i, j - 1);
      canChange = true;
    }
    if (i >= 0 && j >= 0 && i <= m - 1 && j + 1 <= n - 1 && grid[i][j + 1] && grid[i][j + 1] == 2) {
      changeChild(i, j + 1);
      canChange = true;
    }

    return canChange;

  }

  function changeChild (i, j) {
    if (i - 1 >= 0 && j >= 0 && i <= m - 1 && j <= n - 1 && grid[i - 1][j] && grid[i - 1][j] == 1) {
      grid[i - 1][j] == 2;
    }
    if (i >= 0 && j >= 0 && i + 1 <= m - 1 && j <= n - 1 && grid[i + 1][j] && grid[i + 1][j] == 1) {
      grid[i + 1][j] == 2;
    }

    if (i >= 0 && j - 1 >= 0 && i <= m - 1 && j <= n - 1 && grid[i][j - 1] && grid[i][j - 1] == 1) {
      grid[i][j - 1] == 2
    }
    if (i >= 0 && j >= 0 && i <= m - 1 && j + 1 <= n - 1 && grid[i][j + 1] && grid[i][j + 1] == 1) {
      grid[i][j + 1] == 2
    }
  }



  return count;


};
orangesRotting([[2, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 0, 1, 1, 1, 1, 0, 1], [1, 0, 1, 0, 1, 0, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 0, 1, 0, 1], [1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]);