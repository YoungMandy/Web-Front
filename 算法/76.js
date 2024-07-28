/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  const m = s.length;
  const n = t.length;
  if (m < n) return "";

  let typeCount = 0;
  const map = {};

  for (let i = 0; i < n; i++) {
    let x = t[i];
    if (!map[x]) {
      map[x] = 1;
      typeCount++;
    } else {
      map[x]++;
    }
  }

  
  let start = s.length;
  let minLen = s.length + 1;
  let l = 0;

  for (let r = 0; r < m; r++) {
    debugger
    const ch = s[r];
    if (map[ch] !== undefined) map[ch]--;

    if (map[ch] == 0) typeCount--;


    while (typeCount == 0) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1;
        start = l;
      }

      const x = s[l];

      if (map[x] !== undefined) map[x]++;
      if (map[x] > 0) typeCount++;

      l++
    }

  }

  const res = s.substring(start, start + minLen);
  console.log(res);
  return res;
};

minWindow('ADOBECODEBANC', "ABC");