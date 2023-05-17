// 第一种解法：分而治之
// var myPow = function (x, n) {
//   if (!n) {
//     return 1;
//   }
//   if (n === 1)
//   {
//     return x;
//   }

//   if (n < 1) {
//     return 1 / myPow(x, -n);
//   }

//   if (n % 2) {
//     // 奇数
//     return x * myPow(x, (n - 1) / 2) * myPow(x, (n - 1) / 2);
//   }

//   return myPow(x, n / 2) * myPow(x, n / 2);
// };

// 第二种位与
var myPow = function (x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let pow = 1;
  while (n) {
    if (n & 1) {
      pow *= x;
    }

    x *= x;
    n >>= 1;
  }

  return pow;
};

console.log(myPow(3, 47));