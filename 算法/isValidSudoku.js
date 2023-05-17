/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  if (board?.length === 0) {
    return false;
  }

  function solve(board) {
    for (let i = 0; i < board.length; i++) {
      // 先行
      for (let j = 0; j < board[0].length; j++) {
        // 每一列
        if (board[i][j] == '.') {
          // 当前为空
          for (let char = 1; char <= 9; char++) {
            if (isValid(board, i, j, '' + char)) {
              board[i][j] = '' + char;
              if (solve(board)) {
                return true;
              } else {
                board[i][j] = '.'; // 填入的数字不可解，回溯
              }
            }
          }
          return false; // 填入了所有的数都不可解，说明该数独不可解
        }
      }
    }
    return true; // 都循环结束，没有返回false，说明可解
  }

  function isValid(board, row, col, char) {
    for (let i = 0; i < 9; i++) {
      if (board[i][col] != '.' && board[i][col] == char) return false;
      if (board[row][i] != '.' && board[row][i] == char) return false;
      if (
        board[3 * parseInt(row / 3) + parseInt(i / 3)][
          3 * parseInt(col / 3) + (i % 3)
        ] != '.' &&
        board[3 * parseInt(row / 3) + parseInt(i / 3)][
          3 * parseInt(col / 3) + (i % 3)
        ] == char
      )
        return false;
    }
    return true;
  }

  const res = solve(board);
  console.log(res);
  return res;
};


isValidSudoku([
  ['.', '8', '7', '6', '5', '4', '3', '2', '1'],
  ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['9', '.', '.', '.', '.', '.', '.', '.', '.'],
]);

