// 合并两个有序数组
function merge (a, b) {
  const res = [];
  while (a?.length > 0 && b?.length > 0) {
    if (a[0] < b[0]) {
      res.push(a.shift())
    } else {
      res.push(b.shift())
    }
  }
  while (a?.length > 0) {
    res.push(a.shift())
  }

  while (b?.length > 0) {
    res.push(b.shift())
  }

  return res;
}

const a = [1, 3, 4, 5, 6];
const b = [2, 3, 4, 4, 6, 7, 9];
console.log(merge(a,b))

