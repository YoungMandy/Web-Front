// var longestPalindrome = function (s) {
//   const len = s.length;
//   if (!s || len < 2) {
//     return s;
//   }
//   let str = s[0];
//   let maxLen = len;
//   let left = 0;

//   while (maxLen > 1) {
//     let right = left + maxLen - 1;
//     const childStr = s.substring(left, right);
//     debugger
//     if (isSymmetry(childStr)) {
//       str = childStr;
//       break;
//     } else {
//       left++;
//       if (left + maxLen - 1 > len - 1) {
//         maxLen--;
//         left = 0;
//       }
//     }
//   }

//   return str;
// };

// function isSymmetry(str) {
//   if (!str) return false;
//   if (str.length == 1) return true;
//   if (str.length == 2) return str[0] == str[1];

//   let left = 0;
//   let right = str.length - 1;
//   while (left < right) {
//     if (str[left] == str[right]) {
//       left++;
//       right--;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }

// longestPalindrome('bb');
var longestPalindrome = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let res = '';

  for (let i = n; i >= 0; i--) {
    // 左边界i从数组最大值开始
    for (let j = i; j < n; j++) {
      // 右边界从 i的位置开始
      dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.substring(i, j + 1);
      }
    }
  }

  return res;
};