function computeBottle (n) {
  let sum = 0;
  let num = n;
  while (num > 3) {
    let replaceCount = Math.floor(num / 3); // 可以置换的瓶子数
    sum += replaceCount;
    num = (num % 3) + replaceCount;
  }
  return sum;
}

console.log(computeBottle(1200));// 599