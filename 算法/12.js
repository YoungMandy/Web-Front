/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const char = num + '';
  const map = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M',
    4: 'IV',
    9: 'IX',
    40: 'XL',
    90: 'XC',
    400: 'CD',
    900: 'CM',
  };
  const table = {
    0: 'next',
    1: 'direct',
    2: 'combination',
    3: 'combination',
    4: 'direct',
    5: 'direct',
    6: 'combination',
    7: 'combination',
    8: 'combination',
    9: 'direct',
  };
  const numMap = {
    2: [1, 1],
    3: [1, 1, 1],
    6: [1, 5],
    7: [1, 1, 5],
    8: [1, 1, 1, 5],
  };
  let radix = -1;
  let res = '';

  for (let i = char.length - 1; i >= 0; i--) {
    radix++;
    let c = char[i];
    let state = table[c];
    if (state == 'next') {
      continue;
    } else if (state == 'direct') {
      num = Number(c) * Math.pow(10, radix);
      computedNum(num);
    } else if (state == 'combination') {
      const group = numMap[c];
      for (value of group) {
        computedNum(value * Math.pow(10, radix));
      }
    }
  }

  function computedNum(num) {
    if (map[num]) {
      res = map[num] + res;
    } else {
      let count = 0;
      while (!map[num]) {
        num = num / 10;
        count++;
      }
      let ch = map[num];
      while (count) {
        res = ch + res;
        count--;
      }
    }
  }
  return res;
};

console.log(intToRoman(3));
