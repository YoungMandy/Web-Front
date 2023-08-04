// /**
//  * @param {string} s
//  * @return {number}
//  */
// var myAtoi = function (s) {
//   s = s.trimStart();
//   const MAX = Math.pow(2, 31) - 1;
//   const MIN = -Math.pow(2, 31);
//   let minus = false; // 是负数
//   let res = 0;
//   let prev;
//   let lockRes = false;
//   console.log('s', s);
//   debugger

//   for (let i = 0; i < s.length; i++) {
//     if (lockRes) {
//       return minus ? -res : res;
//     }
//     let cur = s[i];

//     if (prev !== undefined) {
//       // 已经记录有值
//       if (prev == '+' || prev == '-') {
//         if (cur == '-' || cur == '+' || isNaN(cur) || cur == ' ') {
//           return 0;
//         } else {
//           helper(cur);
//         }
//       } else if (!isNaN(prev)) {
//         if (isNaN(cur) || cur == ' ') {
//           return minus ? -res : res;
//         } else {
//           helper(cur);
//         }
//       }
//       prev = cur;
//     } else {
//       prev = cur;
//       if (cur == '+') {
//         minus = false;
//       }else if (cur == '-') {
//         minus = true;
//       }else if (!isNaN(cur)) {
//         helper(cur);
//       }else if (isNaN(cur)) {
//         return 0;
//       }
//     }
//   }

//   function helper (cur) {
//     res = res * 10 + Number(cur);

//     if (minus) {
//       if (-res < MIN) {
//         res = -MIN;// 因为返回的时候还会根据minus的值判断是否加符号
//         lockRes = true;
//       }
//     } else {
//       if (res > MAX) {
//         res = MAX;
//         lockRes = true
//       }
//     }
//   }

//   return minus ? -res : res;
// };
// console.log(myAtoi(" + 314"));

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  debugger;
  const MAX = Math.pow(2, 31) - 1;
  const MIN = -Math.pow(2, 31);
  s = s.trimStart();
  const table = {
    start: ['start', 'signed', 'in_number', 'end'],
    signed: ['end', 'end', 'in_number', 'end'],
    in_number: ['end', 'end', 'in_number', 'end'],
    end: ['end', 'end', 'end', 'end'],
  };
  let sign = 1; //默认是正数
  let state = 'start';
  let res = 0;

  function getState(state, c) {
    debugger;
    let col;

    switch (c) {
      case ' ':
        col = 0;
        break;
      case '+':
      case '-':
        col = 1;
        break;
      default:
        col = 3;
    }
    if (!isNaN(c) &&  c !== ' ') {
      col = 2;
    }

    return table[state][col];
  }
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    state = getState(state, c);
    if (state == 'in_number') {
      res = res * 10 + Number(c);
      res = sign == 1 ? Math.min(res, MAX) : Math.min(res, -MIN);
    } else if (state == 'signed') {
      if (c == '+') {
        sign = 1;
      } else {
        sign = -1;
      }
    } else if (state == 'end') {
      return sign * res;
    }
  }
  return sign * res;
};
console.log(myAtoi('4193 with words'));
