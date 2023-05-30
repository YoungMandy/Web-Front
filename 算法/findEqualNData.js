// 随意给定一个无序的不重复的数组data,任意抽取n个数相加，和为sum，也可能无解，写出该函数

// 求出所有解的方法
function find (data, sum) {
 
  data.sort((a, b) => a - b);
  let res = new Set();

  let map = new Map();

  dfs(0,data,sum);

  function dfs (start, data, target) {
    let right = data.length;
    let total = 0;
    for (let i = start; i < data.length; i++) {
      right--;
      total += data[i];
      if (!map.has(data[right])) {
        map.set(data[right],data[right]);
      }
      if (total === target) {
        
        let temp = data.slice(start, i + 1);
        res.add(temp.sort().join(","));
        
      } else if (map.has(target - total) && data[i] !== (target - total)) {
        
        let temp = data.slice(start, i + 1);
        temp.push(map.get(sum - total))
        res.add(temp.sort().join(','));

      } else if (right <= i) {
        dfs(start + 1, data, target);
        break;
      } 
      
    }
  }

  console.log(res);
  return res;

}

// 判断是否有解的方案
function find (data, n, sum) {
  if (n == 0 && sum == 0) {
    return true
  }
  if (n < 0) {
    return false;
  }
  if (n > 0) {
    for (let i = 0; i < data.length; i++) {
      let temp = data.slice(i + 1, data.length);
      return find(temp, n - 1, sum - data[i]) || find(temp,n,sum);
    }
  } 
}

console.log(find([-1, 1, 2,3,4,6],4,8));