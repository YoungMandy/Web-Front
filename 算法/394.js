/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  debugger
  const n = s.length;
  let res = "";
  let multi = 0;
  const stack = [];

  for (let i = 0; i < n; i++) {
    const x = s[i];
    if ('0' <= x && x <= '9') {
      multi = multi * 10 + Number(x);
    } else if (x == '[') {
      stack.push([multi, res]);
      res = "";
      multi = 0;

    } else if (x == "]") {
      const [cur_multi, last_res] = stack.pop()
      res = last_res + res.repeat(cur_multi);

    } else {
      res = res + x;
    }
  }

  return res;

};

decodeString("3[a]2[bc]");