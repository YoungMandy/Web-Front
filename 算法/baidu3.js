function maxPrefix (arr) {
  let res = '';
  if (arr.length < 2) {
    return res;
  }
  const str = arr[0];
  const comparison = arr.slice(1);

  for (let i = 0; i < str.length; i++){
    const matchFlag = comparison.every(
      item => str.charAt(i) == item.charAt(i)
    );
    if (matchFlag) {
      res += str.charAt(i);
    } else {
      return res;
    }
  }
  return res;
 
  // 补全此处代码
}

console.log(maxPrefix(['flower', 'flow', 'flight'])); // 'fl'
// 输入不存在公共前缀
console.log(maxPrefix(['dog', 'racecar', 'car'])); // ""
