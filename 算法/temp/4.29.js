
// 求1到100的和
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

console.log(sum(1, 100));

