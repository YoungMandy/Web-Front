/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 == 0 && x != 0)) {
    return false; // 复数不是回文数
  }

  let res = 0;

  while (x > res) {// 当res 大于x,说明已经取出了一半的数
    let temp = x % 10; //取到尾数
    res = res * 10 + temp;
    x = parseInt(x / 10);
  }

  // 形如121,最后res = 12,x= 1, 把最后一个2去除，两者相等说明是回文
  // 形如123,最后res = 32,x= 1, 把最后一个2去除，两者不等说明不是回文
  return x == res || x == parseInt(res / 10);
};
isPalindrome(123);
