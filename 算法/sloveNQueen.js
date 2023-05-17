/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  if (n < 1) return [];

  const res = [];
  const cols = new Set();
  const pie = new Set();
  const na = new Set();

  function DFS (n, row, curState)
  {
    if (row >= n)
    {
      res.push(curState);
      return;
    }

    for (let col = 0; col < n; col++)
    {
      
      if (cols.has(col) || pie.has(row + col) || na.has(row - col)) {
        continue; // 跳过这次迭代
      }

      cols.add(col);
      pie.add(row + col);
      na.add(row - col);
      console.log('col: ' + col);
      DFS(n, row + 1, curState.concat([col]));

      
      cols.delete(col);
      pie.delete(row + col);
      na.delete(row - col);
    }
  }

  DFS(n, 0, []);

  function generateResult(n) {
    const board = [];

    for (let part of res) {
      const temp = [];
      for (let value of part) {
        const char = '.'.repeat(value) + 'Q' + '.'.repeat(n - value - 1);
        temp.push(char);
      }
      board.push(temp);
    }

    return board;
  }

  return generateResult(n);
};


solveNQueens(4);