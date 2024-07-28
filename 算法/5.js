/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const n = s.length;
  let res = s[0];
  const map = {}

  function dfs (l, r) {
    const key = `${l}-${r}`;

    if (map[key] !== undefined) {
      return;
    }
    const ch = s.substring(l, r + 1);
    map[key] = 1;

    if (l >= r) {
      return;
    }

    if (isPalindrome(ch)) {
      res = ch;
      return;
    } else {
       dfs(l + 1, r);
       dfs(l, r--);
       dfs(l++, r--);
    }
  }

  dfs(0, n - 1);
  console.log(res);
  return res;
};

function isPalindrome (ch) {
  const n = ch.length;

  let l = 0;
  let r = n - 1;

  while (l < r) {
    if (ch[l] !== ch[r]) {
      return false;
    }
    l++;
    r--;
  }
  return true;
}

longestPalindrome('babad')