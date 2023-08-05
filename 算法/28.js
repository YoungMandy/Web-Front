/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let m = haystack.length;
  let n = needle.length;

  let pa = 0;
  let pb = 0;
  let nextStart;
  debugger

  while (pa < m && pb < n) {
    if (haystack[pa] == needle[pb]) {
      pa++;
      pb++;

      if (haystack[pa] == needle[0] && !nextStart) {
        nextStart = pa;
      }
    } else {
      if (nextStart) {
        pa = nextStart;
        nextStart = undefined;
        pb = 0;
      } else if (m - pa >= n) {
        pa++;
        pb = 0;
      } else {
        return -1;
      }
    }
    if (pb == n) {
      return pa - pb;
    }
  }
  return -1;
};

console.log(strStr("babba",
"bbb"));
