/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const n = board.length;
  const m = board[0].length;
  const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => false));
  let res = false;
  let curIndex = 0;
  const map = {};

  function dfs (r, c, path) {

    if (path.join("") == word) {
      res = true;
      return;
    }

    if (r < 0 || r > n - 1 || c > m - 1 || c < 0) {
      return;
    }


    let x = board[r][c];

    if (!visited[r][c]) {
      

      if (x == word[curIndex]) {
        debugger
        path.push(x);

        console.log(r, c);
        console.log(JSON.stringify(path));
        console.log('curIndex', curIndex);
        console.log('\n')

        visited[r][c] = true;

        curIndex++;

        dfs(r + 1, c, [...path]);

        dfs(r, c + 1, [...path]);

        dfs(r - 1, c, [...path]);

        dfs(r, c - 1, [...path]);

        path.pop();
        visited[r][c] = false;
      } 

    }

  }

  dfs(0, 0, []);
  console.log(res);

  return res;

};

exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE")