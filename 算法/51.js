/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let res;

  const col = new Array(n).fill(0);
  const row = new Array(n).fill(0);
  const pi = new Map();
  const na = new Map();

  function isValid (r, c) {

    if (col[c] == 1 || row[r] == 1 || pi.get(r + c) == 1 || na.get(r - c) == 1 ) {
      return false;
    }

    return true
  }

  function dfs (r, path) { // 第r行
    
    if (r == n || path.length == n) {
      debugger
      res = getBoard(path);
      return;
    }

    for (let i = 0; i < n; i++) { // 枚举列号

      if (isValid(r, i)) {
        
        path.push({ r, i });

        col[i] = 1;
        row[r] = 1;
        pi.set(r + i, 1);
        na.set(r - i, 1);

        dfs(r + 1,path);

        col[i] = 0;
        row[r] = 0;
        pi.set(r + i, 0);
        na.set(r - i, 0);
      }
    }

  }

  dfs(0,[]);


  return res;

};

function getBoard (path) {

  const board = Array.from({ length: path.length }, () => new Array(path.length).fill("."));

  for(let item of path) {
    const { r, i } = item;
    board[r][i] = 'Q';
  }
  return board;

}

console.log(solveNQueens(4));

