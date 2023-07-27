// 解法一、字符反转
// var reverse = function(x) {
//   let n = (x + '').length;
//   let prev = '';

//   if (x < 0) {
//     prev = '-';
//     x = x + '';
//     x = x.substring(1);
//     n = x.length;
//   } else {
//     x = x + '';
//   }

//   if (n < 2) {
//     return x;
//   }

//   const MAX = Math.pow(2, 31) - 1;
//   const MIN = -Math.pow(2, 31);

//   let temp = 0;

//   for (let i = n - 1; i >= 0; i--) {
//     const char = x[i];
//     temp = temp * 10 + Number(char);
//     if (temp > MAX || -temp < MIN) {
//       return 0;
//     }
//   }

//   if (prev) {
//     return - temp;
//   } else {
//     return temp;
//   }
// };

// 解法二、 整数mod及除法
var reverse = function(x) {
  debugger
  let num = x;
  let res = 0;
  const MAX = Math.pow(2, 31) - 1;
  const MIN = -Math.pow(2, 31);

  while (num != 0) {
    let temp = num % 10; //取末尾的数

    res = res * 10 + temp;

    if (res > MAX || res < MIN) {
      return 0;
    }
    console.log(parseInt(num/10))
    // console.log(Math.floor(num / 10))
    console.log('\n')

    num = parseInt(num / 10);
  }

  return res;
};

console.log(reverse(-123));





