/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestBalancedSubstring = function (s) {
  let len = 0;
  const n = s.length;
  let temp = [s[0]];
  let i = 1;
  debugger

  while (i < n) {
    let ch = s[i];
    let count = 0;
    while (temp[temp.length - 1] == '0' && ch == '1') {
      debugger
      temp.pop();
      count++;
      if (len < count) {
        len = count;
      }
      i++;
      ch = s[i];
    }
    if (count > 0) {
      temp = [];
    }

 
      temp.push(ch)
   
    i++;
  }

  return len * 2;
};

const res = findTheLongestBalancedSubstring('001011');
console.log(res);
