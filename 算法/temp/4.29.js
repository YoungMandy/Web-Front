
function sum (min, max) {
  let s = 0;
  
  if (min > max) {
    return 0;
  } else if(min == max) {
    s = s + min;
  } else if (min < max) {
    s = s + min + max;
    min++;
    max--;
    s = s + sum(min, max);
  } 

  return s;
}

// console.log(sum(1, 100));

console.log(Math.trunc(10.123456789))// 去掉小数部分
console.log(Math.sign(10.8))
