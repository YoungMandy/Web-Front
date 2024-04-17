/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
/**
 * @param {string} s
 * @return {string[][]}
 */

var partition = function (s) {
  const n = s.length;

  const res = [];
  const path = [];

  function dfs(i) {
    if (i == n) {
      res.push([...path]);
      return;
    }

    for (let j = i; j < n; j++) {
      let ch = s.substring(i, j + 1);
      if (isSymmetry(ch)) {
        console.log('f');
        path.push(ch);
        dfs(j + 1);
        path.pop();
      }
    }
  }

  return res;
};

function isSymmetry (s) {
  debugger
  
  let l = 0;
  let r = s.length - 1;

  while (l < r) {
    if (s[l++] !== s[r--]) {
      return false;
    }
  }

  return true;
}

s = 'aab';

partition(s);