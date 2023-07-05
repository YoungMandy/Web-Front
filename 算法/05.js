var longestPalindrome = function (s) {
  const len = s.length;
  if (!s || len < 2) {
    return s;
  }
  let str = s[0];
  let maxLen = len;
  let left = 0;

  while (maxLen > 1) {
    let right = left + maxLen - 1;
    const childStr = s.substring(left, right);
    debugger
    if (isSymmetry(childStr)) {
      str = childStr;
      break;
    } else {
      left++;
      if (left + maxLen - 1 > len - 1) {
        maxLen--;
        left = 0;
      }
    }
  }

  return str;
};

function isSymmetry(str) {
  if (!str) return false;
  if (str.length == 1) return true;
  if (str.length == 2) return str[0] == str[1];

  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] == str[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }
  return true;
}

longestPalindrome('bb');