var helper = function (number) {
  let res = '';
  let interStr;
  let decimalStr;
  if (Number.isInteger(number)) {
    // 整数
    interStr = number + '';
  } else {
    const [left, right] = (number + '').split('.');
    interStr = left;
    decimalStr = right;
  }
  const arr = interStr.split('');
  let len = arr.length;
  let index = 0;
  while (len) {
    if (index === 2) {
      res = len !== 1 ? ',' + arr[len - 1] + res : arr[len - 1] + res;
      index = 0;
    } else {
      res = arr[len - 1] + res;
      index++;
    }
    len--;
  }
  return decimalStr ? res + '.' + decimalStr : res;
};

function toThousands(number) {
  if (!number) return;
  let res = '';

  if (number > 0) {
    // 正数
    res = helper(number);
    return res;
  } else {
    const str = (number + '').substring(1);
    res = helper(Number(str));

    return '-' + res;
  }

  // 补全此处代码
}
var toThousands = function (number) {
  // 补全此处代码
};

console.log(toThousands(123)); // '123'

console.log(toThousands(1234)); // '1,234'

console.log(toThousands(-123456.789)); // '-123,456.789'
