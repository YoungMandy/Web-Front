/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  const n = s.length;
  if (n < 2 || numRows < 2) {
    return s;
  }
 
  let row = 0;
  let col = 0;
  let skip = false;
  let temp = new Array(numRows).fill('');

  for (let i = 0; i < n; i++) {
    if (!skip && row < numRows) {
      temp[row] = temp[row] + s[i];
      row++;
    } else if (row - 1 >= 0) {
      skip = true;
      if (row == numRows) {
        row--;
      }
      row--;
      col++;
      temp[row] = temp[row] + s[i];

      if (row - 1 < 0) {
        skip = false;
        row++;
      }
    }
  }

  let str = '';
  for (let i = 0; i < numRows; i++) {
    str = str + temp[i];
  }

  return str;
};
