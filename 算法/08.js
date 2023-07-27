/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  s = s.trimStart();
  const MAX = Math.pow(2, 31) - 1;
  const MIN = -Math.pow(2, 31);
  let minus = false; // 是负数
  let res = 0;
  let prev;
  let lockRes = false;
  console.log('s', s);
  debugger

  for (let i = 0; i < s.length; i++) {
    if (lockRes) {
      return minus ? -res : res;
    }
    let cur = s[i];

    if (prev !== undefined) {
      // 已经记录有值
      if (prev == '+' || prev == '-') {
        if (cur == '-' || cur == '+' || isNaN(cur) || cur == ' ') {
          return 0;
        } else {
          helper(cur);
        }
      } else if (!isNaN(prev)) {
        if (isNaN(cur) || cur == ' ') {
          return minus ? -res : res;
        } else {
          helper(cur);
        }
      }
      prev = cur;
    } else {
      prev = cur;
      if (cur == '+') {
        minus = false;
      }else if (cur == '-') {
        minus = true;
      }else if (!isNaN(cur)) {
        helper(cur);
      }else if (isNaN(cur)) {
        return 0;
      }
    }
  }

  function helper (cur) {
    res = res * 10 + Number(cur);

    if (minus) {
      if (-res < MIN) {
        res = -MIN;// 因为返回的时候还会根据minus的值判断是否加符号
        lockRes = true;
      }
    } else {
      if (res > MAX) {
        res = MAX;
        lockRes = true
      }
    }
  }

  return minus ? -res : res;
};
console.log(myAtoi(" + 314"));
