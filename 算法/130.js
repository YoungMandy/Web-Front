/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const m = board.length;
  const n = board[0].length;

  if (m < 3 || n < 3) return; // 至少要3*3

  const visited = new Array(m).fill(0).map(() => new Array(n).fill(1));

  function mark (x, y, direction) {
    debugger
    switch (direction) {
      
      case 'top':
        debugger;
        while (x < m && board[x][y] == 'O') {
          visited[x][y] = 0;
          x++;
        }
        break;

      case 'bottom':
        debugger;
        while (x > 0 && board[x][y] == 'O') {
          visited[x][y] = 0;
          x--;
        }
        break;

      case 'left':
        debugger;
        while (y <= n && board[x][y] == 'O') {
          visited[x][y] = 0;
          x++;
        }
        break;

      case 'right':
        while (y > 0 && board[x][y] == 'O') {
          visited[x][y] = 0;
          y--;
        }
        break;
    }
  }

  for (let i = 0; i < m; i++) {
    if (board[i][0] == 'O') {
      mark(i, 0, 'left');
    }

    if (board[i][n - 1] == 'O') {
      mark(i, n - 1, 'right');
    }
  }

  for (let j = 0; j < n; j++) {
    if (board[0][j] == 'O') {
      mark(0, j, 'top');
    }

    if (board[m - 1][j] == 'O') {
      mark(m - 1, j, 'bottom');
    }
  }

  debugger

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (board[i][j] == 'O' && visited[i][j] == 1) {
        board[i][j] = 'X';
      }
    }
  }

  return board;
};

const res = solve([
  ['X', 'O', 'X'],
  ['X', 'O', 'X'],
  ['X', 'O', 'X'],
]);

console.log(res);
