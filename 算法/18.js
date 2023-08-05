var strStr = function (haystack, needle) {
  let pa = 0;
  let pb = 0;
  let count = 0;
  let first;
  debugger

  while (pa < haystack.length && pb < needle.length) {
    if (haystack[pa] == needle[pb]) {
      if (first === undefined) {
        first = pa;
      }
      count++;
      if (count == needle.length) {
        return first;
      }
      pa++;
      pb++;
    } else {
      count = 0;
      first = undefined;
      pa++;
      pb = 0;
    }
  }
  return -1;
};
console.log(strStr('mississippi', 'issip'));