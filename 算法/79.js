/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length; // 行
  const n = board[0].length; //列
  const len = word.length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] == word[0]) {
        if (dfs(board, i, j, 0, word, new Array(m * n).fill(false)))
          return true;
      }
    }
  }

  function dfs(board, i, j, k, word, list) {
    if (i < 0 || i > m - 1 || j < 0 || j > n - 1 || board[i][j] !== word[k]) {
      return false;
    }
    let curIndex = i * n + j;

    if (k == len - 1) {
      return true;
    }

    list[curIndex] = true;

    if (
      list[curIndex + n] == false &&
      dfs(board, i + 1, j, k + 1, word, [...list])
    ) {
      return true;
    }

    if (
      list[curIndex - n] == false &&
      dfs(board, i - 1, j, k + 1, word, [...list])
    ) {
      return true;
    }
    if (
      list[curIndex + 1] == false &&
      dfs(board, i, j + 1, k + 1, word, [...list])
    ) {
      return true;
    }

    if (
      list[curIndex - 1] == false &&
      dfs(board, i, j - 1, k + 1, word, [...list])
    ) {
      return true;
    }

    return false;
  }

  return false;
};
