/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const n = s.length;
  let max = 0;
  let start = 0;
  let map = {};

  for (let i = 0; i < n; i++) {
    debugger
    let ch = s[i];

    if (map[ch] == undefined) {
      max = Math.max(i - start + 1, max)
    } else {
      start = map[ch] + 1;// 下一个坐标
      const keys = Object.keys(map);
      for (let key of keys) {
        if (map[key] < start) {
          map[key] = undefined;
        }
      }
    }

    map[ch] = i;

  }

  return max;
};


lengthOfLongestSubstring('tmmzuxt')