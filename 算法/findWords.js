/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const m = board.length;
  const n = board[0].length;

  const res = [];
  const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));

  const trie = new Trie();
  for (let item of words) {
    trie.insert(item); // 用字典树存储要查找的字符串，方便查找
  }
  console.log("trie: " ,trie);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(res, board, visited, i, j, '', trie);
    }
  }

  console.log('res',res)
  return res;
};

function dfs(res, board, visited, i, j, str, trie) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
  if (visited[i][j]) return;

  str += board[i][j];
  console.log("str",str);

if(str.includes("ea")){debugger}
  if (!trie.searchPrefix(str)) return;
if (str.includes('ea')) {
  debugger;
}
  const node = trie.search(str);

  if (node?.isEnd) {
    node.isEnd = false;
    debugger
    res.push(str);
  }

  visited[i][j] = true;

  dfs(res, board, visited, i - 1, j, str, trie);
  dfs(res, board, visited, i + 1, j, str, trie);
  dfs(res, board, visited, i, j - 1, str, trie);
  dfs(res, board, visited, i, j + 1, str, trie);

  visited[i][j] = false;
}

class Trie {
  constructor() {
    this.children = {};
  }

  insert(word) {
    let node = this.children;

    for (let char of word) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.children;

    for (let char of word) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }

    return node;
  }

  searchPrefix(prefix) {
    let node = this.children;

    for (let char of prefix) {
      if (!node[char]) {
        return false;
      }
    }
    return true;
  }
}

findWords(
  [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v'],
  ],['oath', 'pea', 'eat', 'rain']
);
