function a () {
  const prices = [
    7,
8,
4,
6,
3,
1,
6,
7,
10];
  // Write your code here

  const n = prices.shift(); // 宝石的数量
  let v = prices.pop(); // 拥有的钱
  let max = 0;

  function dfs (i, c, count) {

    if (i >= n) return;
    max = Math.max(count, max);

    const x = prices[i];

    if (c > x) {
      dfs(i + 1,c - x,count+ 1)
    } else {
      dfs(i + 1, c, count)
    }
    dfs(i+ 1, v, 0)
    
  }
  dfs(0,v,0)

  console.log(max);


}

a();